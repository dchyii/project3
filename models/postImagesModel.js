const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postImageSchema = Schema(
  {
    imgPath: { type: String, required: true },
    description: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    author: { type: Schema.Types.ObjectId, ref: "User" },
    equipment: String,
    tags: [String],
  },
  { timestamps: true }
);

const PostImage = mongoose.model("PostImage", postImageSchema);

module.exports = PostImage;
