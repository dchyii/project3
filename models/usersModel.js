const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const postImage = require("./postImagesModel");

const userSchema = Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  superAdmin: Boolean,
  profilePhoto: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
