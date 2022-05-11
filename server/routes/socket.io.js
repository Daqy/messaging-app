const res = require("express/lib/response");
const { MongoClient } = require("mongodb");
const ObjectID = require("mongodb").ObjectID;

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on("join-room", (data) => this.joinRoom(data));
    socket.on("leave-room", () => this.leaveRoom());
    socket.on("getMessages", (data) => this.getMessages(data));
    socket.on("sendMessage", (data) => this.handleSentMessage(data));
    socket.on("disconnect", () => this.disconnect());
  }

  sendMessage(messages) {
    this.io.to([...this.socket.rooms][1]).emit("message", messages);
  }

  async getMessages(data) {
    try {
      if ([...this.socket.rooms][1].includes("groups")) {
        await client.connect();
        const _usersCollection = await client
          .db("messaging-app")
          .collection("groups");
        const Messages = await _usersCollection.findOne({
          src: `${[...this.socket.rooms][1]}`,
        });

        let sendMessages = false;
        Messages.users.map((user) => {
          console.log(data);
          if (user._id == data._id) {
            sendMessages = true;
          }
        });

        const users = await client.db("messaging-app").collection("users");

        for (let index = 0; index < Messages.Messages.length; index++) {
          const user = await users.findOne({
            _id: new ObjectID(Messages.Messages[index].sender_ID),
          });
          Messages.Messages[index]["username"] = user.name;
        }

        // Messages.Messages.forEach(async (message) => {
        //   const tmp = new MongoClient(uri);

        // });

        if (sendMessages) {
          this.sendMessage(Messages.Messages ? Messages.Messages : []);
        }
        await client.close();
      } else {
        const room = [...this.socket.rooms][1];
        const userid = room.split("/")[0];
        const otherid = room.split("/")[1];
        await client.connect();
        const _usersCollection = await client
          .db("messaging-app")
          .collection("dm-messages");

        const users = await client.db("messaging-app").collection("users");

        const Messages = await _usersCollection
          .find({
            chat_ID: `${userid}/${otherid}`,
          })
          .toArray();

        // const user = await users.findOne({
        //   _id: new ObjectID(userid),
        // });

        for (let index = 0; index < Messages.length; index++) {
          const user = await users.findOne({
            _id: new ObjectID(Messages[index].sender_ID),
          });
          Messages[index]["username"] = user.name;
        }

        // Messages.Messages.forEach((message) => {
        //   message["username"] = user.name;
        // });

        this.sendMessage(Messages);
        await client.close();
      }
    } catch (error) {
      console.log(error);
    }

    // this.sendMessage(chatrooms[[...this.socket.rooms][1]].messages);
    // messages.forEach((message) => this.sendMessage(message));
  }

  joinRoom(data) {
    if (data.userid == "groups") {
      this.socket.join(`${data.userid}/${data.otherid}`);
    } else {
      this.socket.join(`${data.userid}/${data.otherid}`);
    }
    this.getMessages(data);
  }

  leaveRoom() {
    this.socket.leave([...this.socket.rooms][1]);
  }

  disconnect() {
    // users.delete(this.socket);
  }

  async handleSentMessage(data) {
    console.log([...this.socket.rooms][1]);
    try {
      if ([...this.socket.rooms][1].includes("groups")) {
        await client.connect();
        const _groupCollection = await client
          .db("messaging-app")
          .collection("groups");

        const group = await _groupCollection.findOne({
          src: `${[...this.socket.rooms][1]}`,
        });

        let newMessages = [];
        if (group.Messages.length > 0) {
          group.Messages.map((message) => newMessages.push(message));
        }

        newMessages.push({
          sender_ID: data.userid,
          date: data.date,
          message: data.message,
        });

        await _groupCollection.updateOne(
          { src: `${[...this.socket.rooms][1]}` },
          { $set: { latestMessage: data.message, Messages: newMessages } }
        );

        await this.getMessages(data);
        await client.close();
      } else {
        await client.connect();
        const _usersCollection = await client
          .db("messaging-app")
          .collection("dm-messages");

        const users = await client.db("messaging-app").collection("users");

        await _usersCollection.insertOne({
          sender_ID: data.userid,
          recipient_ID: data.otherid,
          date: data.date,
          message: data.message,
          chat_ID: data.chatid,
        });

        const user = await users.findOne({
          _id: new ObjectID(data.userid),
        });

        const otherUser = await users.findOne({
          _id: new ObjectID(data.otherid),
        });

        await updateLatestMessage(users, user, otherUser, data.message);
        await updateLatestMessage(users, otherUser, user, data.message);

        await this.getMessages();
        await client.close();
      }
    } catch (error) {
      console.log(error);
    }
    // messages.push({ message: message });
    // this.sendMessage({ message: message });
  }
}

function chat(io) {
  io.on("connection", (socket) => {
    new Connection(io, socket);
  });
}

async function updateLatestMessage(db, user, otherUser, message) {
  let newChatList = [];
  user.chatList.map((chats) => {
    if (chats._id.equals(otherUser._id)) {
      newChatList.push({
        _id: chats._id,
        name: chats.name,
        hashtag: chats.hashtag,
        pfp: chats.pfp,
        latestMessage: message,
        src: chats.src,
        hasNotification: chats.hasNotification,
        hasNotificationCount: chats.hasNotificationCount,
      });
    } else {
      newChatList.push(chats);
    }
  });

  await db.updateOne(
    { _id: user._id },
    {
      $set: {
        chatList: newChatList,
      },
    }
  );
}

module.exports = chat;
