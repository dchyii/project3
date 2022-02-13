//* dependencies
require("dotenv").config();
const { urlencoded } = require("express");
const path = require("path");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const userController = require("./controllers/usersController");

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
app.use(express.json());
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

//* routes
app.use("/api/test", (req, res) => {
  res.send("test route is working");
});

//* listen
app.listen(PORT, () => {
  console.log("app is listening on:", PORT);
});
