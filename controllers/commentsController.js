const express = require("express");
const router = express.Router();
const Comment = require("../models/commentsModel");

//*get seed comments

router.get("/seed", async (req, res) => {
  const seedComments = [
    {
      comment: "Good photo",
      commentAuthor: "620c6a8ea434bd67c7f99057",
      postImage: "620c6ebb45e77e01bf9e9ab0",
    },
    {
      comment: "not good photo",
      commentAuthor: "620c6a8ea434bd67c7f99055",
      commentLikes: ["620c6a8ea434bd67c7f99054", "620c6a8ea434bd67c7f99056"],
      postImage: "620c6ebb45e77e01bf9e9aaf",
    },
    {
      comment: "go home",
      commentAuthor: "620c6a8ea434bd67c7f99054",
      commentLikes: ["620c6a8ea434bd67c7f99056"],
      postImage: "620c6ebb45e77e01bf9e9aaf",
    },
  ];
  try {
    await Comment.deleteMany({});
    const createdComments = await Comment.create(seedComments);
    res.status(200).json({
      status: "ok",
      message: "seeded comments",
      data: { createdComments },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});



module.exports = router;
