const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./usersModel");

const postImageSchema = Schema(
  {
    imgPath: { type: String, required: true },
    description: { type: String, required: true },
    imageLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    imageAuthor: { type: Schema.Types.ObjectId, ref: "User" },
    equipment: String,
    tags: [String],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const PostImage = mongoose.model("PostImage", postImageSchema);

module.exports = PostImage;
