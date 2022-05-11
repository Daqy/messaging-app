const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const { MongoClient } = require("mongodb");

const uri = process.env.MONGODB_URI;

const router = express.Router();
const client = new MongoClient(uri);

function generateNumber(x, y) {
  return Math.floor(x + (y - x) * Math.random());
}

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

var redirectUrl = "/direct-messages";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/oauth2/redirect/google",
      scope: ["profile"],
    },
    async function (issuer, profile, cb) {
      try {
        await client.connect();
        const _credentialsCollection = await client
          .db("messaging-app")
          .collection("federated_credentials");

        const _usersCollection = await client
          .db("messaging-app")
          .collection("users");

        const userExistInCollection = await _credentialsCollection.findOne({
          provider: issuer,
          subject: profile.id,
        });

        if (userExistInCollection) {
          const user = await _usersCollection.findOne(
            userExistInCollection.user_id
          );

          await client.close();
          return cb(null, {
            user_id: user._id,
            name: user.name,
            hashtag: user.hashtag,
            pfp: user.pfp,
            request: {
              sent: user.request.sent,
              pending: user.request.pending,
            },
            friendsList: user.friendsList,
            chatList: user.chatList,
            serverList: user.serverList,
            quickAccessList: user.quickAccessList,
          });
        } else {
          const checkUsernameInColleciton = await _usersCollection
            .find({
              name: profile.displayName,
            })
            .toArray();

          let number = `${generateNumber(0, 5)}${generateNumber(
            0,
            5
          )}${generateNumber(0, 5)}${generateNumber(0, 5)}`;
          console.log(checkUsernameInColleciton);
          notUnique = true;
          found = false;
          while (notUnique) {
            checkUsernameInColleciton.map((users) => {
              if (users.hashtag == number) {
                found = true;
              }
            });
            if (!found) {
              notUnique = false;
            } else {
              number = `${generateNumber(0, 5)}${generateNumber(
                0,
                5
              )}${generateNumber(0, 5)}${generateNumber(0, 5)}`;
            }
          }

          const userInsertResult = await _usersCollection.insertOne({
            name: profile.displayName,
            hashtag: number,
            pfp: profileImageUrls[
              randomNumberGenerator(profileImageUrls.length)
            ],
            request: {
              sent: [],
              pending: [],
            },
            friendsList: [],
            chatList: [],
            serverList: [],
            quickAccessList: [],
          });

          await _credentialsCollection.insertOne({
            provider: issuer,
            subject: profile.id,
            user_id: userInsertResult.insertedId,
          });

          const user = await _usersCollection.findOne(
            userInsertResult.insertedId
          );

          await client.close();
          return cb(null, {
            user_id: user._id,
            name: user.name,
            hashtag: user.hashtag,
            pfp: user.pfp,
            request: {
              sent: user.request.sent,
              pending: user.request.pending,
            },
            friendsList: user.friendsList,
            chatList: user.chatList,
            serverList: user.serverList,
            quickAccessList: user.quickAccessList,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  )
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      user_id: user.user_id,
      name: user.name,
      hashtag: user.hashtag,
      pfp: user.pfp,
      request: {
        sent: user.request.sent,
        pending: user.request.pending,
      },
      friendsList: user.friendsList,
      chatList: user.chatList,
      serverList: user.serverList,
      quickAccessList: user.quickAccessList,
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

// router.get(
//   "/oauth2/redirect/google",
//   passport.authenticate("google", {
//     successRedirect: `http://localhost:3000${redirectUrl}`,
//     failureRedirect: "http://localhost:3000/login",
//   })
// );

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
    failureMessage: true,
  }),
  function (req, res) {
    res.redirect(`http://localhost:3000${redirectUrl}`);
  }
);

router.post("/logout", async function (req, res) {
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
    res.send(200);
    await client.close();
  } catch (error) {
    console.log(error);
  }
  // await req.logout();
  // console.log("123test:", req.session);
  // // req.session = null;
  // req.session.destroy(function () {
  //   res.status(200).clearCookie("connect.sid", {
  //     path: "/",
  //     httpOnly: false,
  //   });
  //   res
  //     .writeHead(301, {
  //       Location: `http://localhost:3000/login`,
  //     })
  //     .end();
  // });
});

router.get("/login", function (req, res) {
  redirectUrl = req.query.redirectUrl;
  res.redirect("/login/federated/google");
});

router.get("/login/federated/google", passport.authenticate("google"));

module.exports = router;
