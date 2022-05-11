const e = require("cors");
var express = require("express");
var router = express.Router();
const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

router.get("/authUser", async (req, res) => {
  try {
    await client.connect();
    const _usersCollection = await client
      .db("messaging-app")
      .collection("users");
    const user = await _usersCollection.findOne({
      _id: new ObjectID(req.user.user_id),
    });
    await client.close();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.send(req.user);
  }
  // res.send(req.user);
});

router.get("/searchUser", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");

    const request = req.query.searchQuery.split("#");
    console.log(request);

    let user = await sessionDB.findOne({
      name: request[0],
      hashtag: request[1],
    });

    const currentUser = await sessionDB.findOne({
      _id: new ObjectID(req.query.id),
    });

    let isfriend = false;

    currentUser.friendsList.map((friend) => {
      if (friend._id.equals(user._id)) {
        isfriend = true;
      }
    });

    let hasRequestSent = false;

    currentUser.request.sent.map((requestSent) => {
      if (requestSent._id.equals(user._id)) {
        hasRequestSent = true;
      }
    });

    user = { ...user, isFriend: isfriend, hasRequestSent: hasRequestSent };

    console.log(user);

    await client.close();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/friendRequestSent", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");
    const currentUser = await sessionDB.findOne({
      _id: new ObjectID(req.body.sentByID),
    });

    const friendToBe = await sessionDB.findOne({
      _id: new ObjectID(req.body.friendTobeID),
    });

    await sessionDB.updateOne(
      { _id: new ObjectID(req.body.sentByID) },
      {
        $set: {
          request: {
            sent: [
              ...currentUser.request.sent,
              {
                _id: friendToBe._id,
                name: friendToBe.name,
                hashtag: friendToBe.hashtag,
                pfp: friendToBe.pfp,
              },
            ],
            pending: [...currentUser.request.pending],
          },
        },
      }
    );

    await sessionDB.updateOne(
      { _id: new ObjectID(req.body.friendTobeID) },
      {
        $set: {
          request: {
            sent: [...friendToBe.request.sent],
            pending: [
              ...friendToBe.request.pending,
              {
                _id: currentUser._id,
                name: currentUser.name,
                hashtag: currentUser.hashtag,
                pfp: currentUser.pfp,
              },
            ],
          },
        },
      }
    );
    const user = await sessionDB.findOne({
      _id: new ObjectID(req.body.sentByID),
    });

    await client.close();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/responseToRequest", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");

    const currentUser = await sessionDB.findOne({
      _id: new ObjectID(req.body.currentUserID),
    });

    console.log(req.body.currentUserID);
    console.log(req.body.friendID);

    const friendToBe = await sessionDB.findOne({
      _id: new ObjectID(req.body.friendID),
    });

    let newPendingList = [];

    currentUser.request.pending.map((pendingRequest) => {
      if (!pendingRequest._id.equals(friendToBe._id)) {
        newPendingList = [...newPendingList, pendingRequest];
      }
    });

    let newSentList = [];

    friendToBe.request.sent.map((sentRequest) => {
      if (!sentRequest._id.equals(currentUser._id)) {
        newPendingList = [...newPendingList, sentRequest];
      }
    });

    if (req.body.response == "accept") {
      let addToChatList = {
        _id: friendToBe._id,
        name: friendToBe.name,
        hashtag: friendToBe.hashtag,
        pfp: friendToBe.pfp,
        latestMessage: "Say Hello!",
        src: `${currentUser._id}/${friendToBe._id}`,
        hasNotification: false,
        hasNotificationCount: 0,
      };

      await sessionDB.updateOne(
        { _id: currentUser._id },
        {
          $set: {
            friendsList: [
              ...currentUser.friendsList,
              {
                _id: friendToBe._id,
                name: friendToBe.name,
                hashtag: friendToBe.hashtag,
                pfp: currentUser.pfp,
                isQuickAccess: false,
              },
            ],
            request: {
              sent: [...currentUser.request.sent],
              pending: newPendingList,
            },
            chatList: [...currentUser.chatList, addToChatList],
          },
        }
      );

      addToChatList = {
        _id: currentUser._id,
        name: currentUser.name,
        hashtag: currentUser.hashtag,
        pfp: currentUser.pfp,
        latestMessage: "Say Hello!",
        src: `${currentUser._id}/${friendToBe._id}`,
        hasNotification: false,
        hasNotificationCount: 0,
      };

      await sessionDB.updateOne(
        { _id: friendToBe._id },
        {
          $set: {
            friendsList: [
              ...friendToBe.friendsList,
              {
                _id: currentUser._id,
                name: currentUser.name,
                hashtag: currentUser.hashtag,
                pfp: currentUser.pfp,
                isQuickAccess: false,
              },
            ],
            request: {
              sent: newSentList,
              pending: [...friendToBe.request.pending],
            },
            chatList: [...friendToBe.chatList, addToChatList],
          },
        }
      );
    } else {
      await sessionDB.updateOne(
        { _id: currentUser._id },
        {
          $set: {
            request: {
              sent: [...currentUser.request.sent],
              pending: newPendingList,
            },
          },
        }
      );

      await sessionDB.updateOne(
        { _id: friendToBe._id },
        {
          $set: {
            request: {
              sent: newSentList,
              pending: [...friendToBe.request.pending],
            },
          },
        }
      );
    }

    const user = await sessionDB.findOne({
      _id: new ObjectID(currentUser._id),
    });

    await client.close();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get("/getUserPfp", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");
    const currentUser = await sessionDB.findOne({
      _id: new ObjectID(req.query._id),
    });
    await client.close();
    res.send(currentUser.pfp);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/addUserToQuickAccess", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");
    const userToBeAdded = await sessionDB.findOne({
      _id: new ObjectID(req.body.otherUser._id),
    });
    const user = await sessionDB.findOne({
      _id: new ObjectID(req.body.currentuserId),
    });

    let newFriendsList = [];
    let indexForChatList = 0;

    user.friendsList.map((friend, index) => {
      if (friend._id.equals(userToBeAdded._id)) {
        newFriendsList.push({
          _id: friend._id,
          name: friend.name,
          hashtag: friend.hashtag,
          pfp: friend.pfp,
          isQuickAccess: true,
        }),
          (indexForChatList = index);
      } else {
        newFriendsList.push(friend);
      }
    });

    await sessionDB.updateOne(
      { _id: user._id },
      {
        $set: {
          friendsList: newFriendsList,
          quickAccessList: [
            ...user.quickAccessList,
            {
              _id: userToBeAdded._id,
              name: userToBeAdded.name,
              src: user.chatList[indexForChatList].src,
              pfp: userToBeAdded.pfp,
              hasNotification: false,
              notificationCount: 0,
            },
          ],
        },
      }
    );

    await client.close();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/removeUserToQuickAccess", async (req, res) => {
  try {
    await client.connect();
    const sessionDB = await client.db("messaging-app").collection("users");
    const userToBeRemoved = await sessionDB.findOne({
      _id: new ObjectID(req.body.otherUser._id),
    });
    const user = await sessionDB.findOne({
      _id: new ObjectID(req.body.currentuserId),
    });

    let newFriendsList = [];
    let indexForChatList = 0;

    user.friendsList.map((friend, index) => {
      if (friend._id.equals(userToBeRemoved._id)) {
        newFriendsList.push({
          _id: friend._id,
          name: friend.name,
          hashtag: friend.hashtag,
          pfp: friend.pfp,
          isQuickAccess: false,
        }),
          (indexForChatList = index);
      } else {
        newFriendsList.push(friend);
      }
    });

    let newQuickAccessList = [];

    user.quickAccessList.map((friend) => {
      if (!friend._id.equals(userToBeRemoved._id)) {
        newQuickAccessList.push(friend);
      }
    });

    await sessionDB.updateOne(
      { _id: user._id },
      {
        $set: {
          friendsList: newFriendsList,
          quickAccessList: newQuickAccessList,
        },
      }
    );

    await client.close();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get("/getFriendsListAndgetUserChatList", async (req, res) => {
  try {
    await client.connect();
    const groupDB = await client.db("messaging-app").collection("groups");
    const userDB = await client.db("messaging-app").collection("users");

    const user = await userDB.findOne({
      _id: new ObjectID(req.query._id),
    });

    const groupsWithUser = await groupDB
      .find({
        "users._id": new ObjectID(req.query._id),
      })
      .toArray();

    await client.close();
    res.send({ friends: user.friendsList, groups: groupsWithUser });
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get("/groupUserProfiles", async (req, res) => {
  try {
    const tmp = new MongoClient(uri);
    await tmp.connect();
    const groupDB = await tmp.db("messaging-app").collection("groups");
    console.log(req.query._id);

    const groupsWithUser = await groupDB
      .find({
        src: req.query.src,
        "users._id": new ObjectID(req.query._id),
      })
      .toArray();

    await tmp.close();
    res.send(groupsWithUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/createGroup", async (req, res) => {
  try {
    await client.connect();
    const groupDB = await client.db("messaging-app").collection("groups");

    req.body.users.forEach((user) => {
      user._id = new ObjectID(user._id);
    });

    const insertResult = await groupDB.insertOne({
      name: req.body.name,
      src: "",
      latestMessage: "Say Hello!",
      users: req.body.users,
      Messages: [],
    });

    await groupDB.updateOne(
      { _id: insertResult.insertedId },
      {
        $set: {
          src: `groups/${insertResult.insertedId}-${req.body.users[0]._id}`,
        },
      }
    );

    const groupsWithUser = await groupDB
      .find({
        "users._id": new ObjectID(req.body.users[0]._id),
      })
      .toArray();

    await client.close();
    res.send(groupsWithUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

const profileImageUrls = [
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp1.png?raw=true",
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp2.png?raw=true",
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp3.png?raw=true",
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp4.png?raw=true",
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp5.png?raw=true",
  "https://github.com/Daqy/secure-messaging-app/blob/main/client/public/profiles/pfp6.png?raw=true",
];

function randomNumberGenerator(max) {
  return Math.floor(Math.random() * (max - 1 + 1)) + 1 - 1;
}

router.post("/DeleteAccount", async (req, res) => {
  console.log("run?");
  try {
    await client.connect();
    const sessionDB = await client.db("sessions").collection("sessions");
    const AllSessions = await sessionDB.find().toArray();
    let id = req.body.sessionID;
    AllSessions.forEach((session) => {
      if (req.body.sessionID.includes(session._id)) {
        id = session._id;
      }
    });
    await sessionDB.deleteOne({
      _id: id,
    });

    const groupDB = await client.db("messaging-app").collection("groups");
    const users = await client.db("messaging-app").collection("users");
    const federated_credentials = await client
      .db("messaging-app")
      .collection("federated_credentials");

    // req.body.users.forEach((user) => {
    //   user._id = new ObjectID(user._id);
    // });

    const newUserInformation = {
      name: "<Deleted User>",
      hashtag: "none",
      pfp: profileImageUrls[randomNumberGenerator(profileImageUrls.length)],
    };

    const friendsWithuser = await users
      .find({
        "friendsList._id": new ObjectID(req.body._id),
      })
      .toArray();

    let newInfo = [];

    friendsWithuser.forEach((user) => {
      let newfriendsList = [];

      user.friendsList.map((friend) => {
        if (req.body._id.includes(friend._id)) {
          newfriendsList.push({
            _id: friend._id,
            ...newUserInformation,
            isQuickAccess: false,
          });
        } else {
          newfriendsList.push({
            _id: friend._id,
            name: friend.name,
            hashtag: friend.hashtag,
            pfp: friend.pfp,
            isQuickAccess: false,
          });
        }
      });

      let newchatList = [];

      user.chatList.map((chat) => {
        if (req.body._id.includes(chat._id)) {
          newchatList.push({
            _id: chat._id,
            ...newUserInformation,
            latestMessage: chat.latestMessage,
            src: chat.src,
            hasNotification: chat.hasNotification,
            hasNotificationCount: chat.hasNotificationCount,
          });
        } else {
          newchatList.push(chat);
        }
      });

      let newQuickAccessList = [];

      user.quickAccessList.map((access) => {
        if (!req.body._id.includes(access._id)) {
          newQuickAccessList.push(access);
        }
      });
      newInfo.push({
        friendsList: newfriendsList,
        chatList: newchatList,
        quickAccess: newQuickAccessList,
      });
    });
    console.log("friendsListUpdate");

    console.log(newInfo);

    friendsWithuser.forEach(
      async (friend, index) =>
        await updateLists(users, friend._id, newInfo, index)
    );

    const groupsWithUser = await groupDB
      .find({
        "users._id": new ObjectID(req.body._id),
      })
      .toArray();

    let newGroupUsers = [];
    groupsWithUser.map((group) => {
      let tmp = [];

      group.users.map((user) => {
        if (req.body._id.includes(user._id)) {
          tmp.push({
            _id: user._id,
            ...newUserInformation,
          });
        } else {
          tmp.push(user);
        }
      });
      newGroupUsers.push(tmp);
    });

    groupsWithUser.forEach(async (group, index) => {
      await groupDB.updateOne(
        { _id: group._id },
        {
          $set: {
            users: newGroupUsers[index],
          },
        }
      );
    });

    console.log("user update");

    await users.updateOne(
      { _id: new ObjectID(req.body._id) },
      {
        $set: {
          ...newUserInformation,
          request: {
            sent: [],
            pending: [],
          },
          friendsList: [],
          chatList: [],
          serverList: [],
          quickAccessList: [],
        },
      }
    );

    console.log("cred");

    const credentialsUser = await federated_credentials.findOne({
      user_id: new ObjectID(req.body._id),
    });

    console.log("cred delete");

    await federated_credentials.deleteOne({
      _id: credentialsUser._id,
    });

    // console.log("friendsList");

    // console.log(user);
    // console.log(credentialsUser);
    // console.log(friendsWithuser);

    // const insertResult = await groupDB.insertOne({
    //   name: req.body.name,
    //   src: "",
    //   latestMessage: "Say Hello!",
    //   users: req.body.users,
    //   Messages: [],
    // });

    await client.close();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

async function updateLists(db, id, newInfo, index) {
  await db.updateOne(
    { _id: id },
    {
      $set: {
        friendsList: newInfo[index].friendsList,
        chatList: newInfo[index].chatList,
        quickAccessList: newInfo[index].quickAccess,
      },
    }
  );
}

module.exports = router;
