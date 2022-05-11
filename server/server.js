require("dotenv").config();

const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();

const authRouter = require("./routes/auth");
const indexRouter = require("./routes/index");
const chat = require("./routes/socket.io");

const port = 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false, maxAge: 24 * 60 * 60 * 1000 },

    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/sessions",
    }),
  })
);
app.use(passport.authenticate("session"));

app.use("/", authRouter);
app.use("/", indexRouter);

app.set("port", port);

const server = require("http").createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

chat(io);

server.listen(port, () => {
  console.log("listening on port: ", port);
});
