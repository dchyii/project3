const express = require("express");
const router = express.Router();
const Comment = require("../models/commentsModel");

//*get seed comments

router.get("/seed", async (req, res) => {
  const seedComments = [
    {
      text: "Good photo",
      author: "6209d3f9e297a16a568fad26",
      postImage: "6209e781da6c8e7613b5e9c3",
    },
    {
      text: "not good photo",
      author: "6209d3f9e297a16a568fad24",
      likes: ["6209d3f9e297a16a568fad25", "6209d3f9e297a16a568fad27"],
      postImage: "6209e781da6c8e7613b5e9c3",
    },
    {
      text: "go home",
      author: "6209d3f9e297a16a568fad28",
      likes: ["6209d3f9e297a16a568fad28"],
      postImage: "6209e781da6c8e7613b5e9c2",
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
