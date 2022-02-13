const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
    text: String,
    author: {type: Schema.Types.ObjectId, ref: "User"},
    timestamp: (new Date),
    likes: [{type: Schema.Types.ObjectId, ref: "User"}],
    postImage: [{type: Schema.Types.ObjectId, ref: "PostImage" }]
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;