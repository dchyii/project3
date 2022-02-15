const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema(
  {
    comment: String,
    commentAuthor: { type: Schema.Types.ObjectId, ref: "User" },
    commentLikes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    postImage: { type: Schema.Types.ObjectId, ref: "PostImage" },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
