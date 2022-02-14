const express = require("express");
const router = express.Router();
const Image = require("../models/postImagesModel");

//*GET seed images

router.get("/seed", async (req, res) => {
  const seedImages = [
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110_1280.jpg",
      description: "Dog on mountain lake",
      likes: ["6209d3f9e297a16a568fad25", "6209d3f9e297a16a568fad28"],
      author: "6209d3f9e297a16a568fad24",
      equipment: "Canon DSLR 550",
      tags: ["animal", "dog", "mountain lake"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2020/06/20/01/24/frog-5319326_1280.jpg",
      description: "Frog in the rain",
      likes: ["6209d3f9e297a16a568fad24", "6209d3f9e297a16a568fad27"],
      author: "6209d3f9e297a16a568fad25",
      equipment: "Polaroid",
      tags: ["animal", "frog", "rain"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2019/04/26/23/07/duisburg-4158910_1280.jpg",
      description: "Tiger and Turtle, Duisburg",
      likes: ["6209d3f9e297a16a568fad29", "6209d3f9e297a16a568fad2a"],
      author: "6209d3f9e297a16a568fad28",
      equipment: "Apple iPhone 13 Pro MAX",
      tags: ["duisburg", "bridge"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2017/10/05/22/39/seashell-2821388_1280.jpg",
      description: "Sea shells on the beach",
      likes: ["6209d3f9e297a16a568fad29", "6209d3f9e297a16a568fad2a"],
      author: "6209d3f9e297a16a568fad28",
      equipment: "Apple iPhone 13 Pro MAX",
      tags: ["sea shells", "beach"],
    },
  ];
  try {
    await Image.deleteMany({});
    const createdPostImage = await Image.create(seedImages);
    res.status(200).json({
      status: "ok",
      message: "seeded post images",
      data: { createdPostImage },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
