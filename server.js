//* dependencies
require("dotenv").config();
const { urlencoded } = require("express");
const path = require("path");
const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const userController = require("./controllers/usersController");
const imageController = require("./controllers/imagesController");
const commentController = require("./controllers/commentsController");

//* config
const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//* CONNECT MONGODB
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongodb not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
mongoose.connection.once("open", () => {
  console.log("connected to mongoose at " + MONGODB_URI);
});

//* middleware
app.use(express.static(path.join(__dirname, "./client/build")));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(urlencoded({ extended: false }));

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

//* Middleware for routes
app.use("/api/users", userController);
app.use("/api/images", imageController);
app.use("/api/comments", commentController);

//* routes
app.use("/api/test", (req, res) => {
  res.send("test route is working");
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build", "index.html"));
});

//* listen
app.listen(PORT, () => {
  console.log("app is listening on:", PORT);
});
