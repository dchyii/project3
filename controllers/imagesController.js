const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const Image = require("../models/postImagesModel");
const Comment = require("../models/commentsModel");

//*GET seed images

router.get("/seed", async (req, res) => {
  const seedImages = [
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2016/11/21/00/47/view-1844110_1280.jpg",
      description: "Dog on mountain lake",
      imageLikes: ["620c6a8ea434bd67c7f99054", "620c6a8ea434bd67c7f99055"],
      imageAuthor: "620c6a8ea434bd67c7f99056",
      equipment: "Canon DSLR 550",
      tags: ["animal", "dog", "mountain lake"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2020/06/20/01/24/frog-5319326_1280.jpg",
      description: "Frog in the rain",
      imageLikes: ["620c6a8ea434bd67c7f99059", "620c6a8ea434bd67c7f9905a"],
      imageAuthor: "620c6a8ea434bd67c7f99057",
      equipment: "Polaroid",
      tags: ["animal", "frog", "rain"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2019/04/26/23/07/duisburg-4158910_1280.jpg",
      description: "Tiger and Turtle, Duisburg",
      imageLikes: ["620c6a8ea434bd67c7f99058", "620c6a8ea434bd67c7f99057"],
      imageAuthor: "620c6a8ea434bd67c7f9905a",
      equipment: "Apple iPhone 13 Pro MAX",
      tags: ["duisburg", "bridge"],
    },
    {
      imgPath:
        "https://cdn.pixabay.com/photo/2017/10/05/22/39/seashell-2821388_1280.jpg",
      description: "Sea shells on the beach",
      imageLikes: ["620c6a8ea434bd67c7f99056", "620c6a8ea434bd67c7f99054"],
      imageAuthor: "6209d3f9e297a16a568fad28",
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

//* get all images

router.get("/allimages", async (req, res) => {
  try {
    const allImages = await Image.find({});
    res
      .status(200)
      .json({ status: "ok", message: "get all images", data: allImages });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* authentication for user
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.json({ status: "not ok", message: "please login or sign up" });
  }
};

//authentication for superadmin
const isSuperadmin = (req, res, next) => {
  const user = req.session.currentUser;
  if (user && user.superAdmin === true) {
    return next();
  } else {
    res.json({
      status: "not ok",
      message: "user is not a superadmin",
    });
  }
};

//* create new user post
router.post("/new", isAuthenticated, async (req, res) => {
  // const { userid } = req.params;
  const user = req.session.currentUser;

  const newImagePost = {
    imgPath: req.body.imgPath,
    description: req.body.description,
    imageAuthor: user,
    equipment: req.body.equipment,
    tags: req.body.tags,
  };
  if (!newImagePost.imgPath) {
    res.status(400).json({ status: "not ok", message: "please upload image" });
  }
  try {
    const createdNewImagePost = await Image.create(newImagePost);

    res.status(200).json({
      status: "ok",
      message: "create new image post",
      data: createdNewImagePost,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* create new comment
router.post("/:postid/comment", isAuthenticated, async (req, res) => {
  const { postid } = req.params;
  const user = req.session.currentUser;
  const newComment = {
    comment: req.body.comment,
    commentAuthor: user,
    postImage: postid,
  };
  try {
    const createdNewComment = await Comment.create(newComment);
    res.status(200).json({
      status: "ok",
      message: "create new comment",
      data: createdNewComment,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get comment
router.get("/:postid/:commentid", async (req, res) => {
  // console.log(req.params.postid, req.params.commentid);
  try {
    const getComment = await Comment.findById(req.params.commentid);
    res.status(200).json({
      status: "ok",
      message: "get individual comment",
      data: getComment,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete comment
router.delete("/:postid/:commentid", isAuthenticated, async (req, res) => {
  const user = req.session.currentUser;
  try {
    const getComment = await Comment.findById(req.params.commentid);
    if (getComment.commentAuthor.toString() === user._id) {
      const deleteComment = await Comment.findByIdAndDelete(
        req.params.commentid
      );
      res.status(200).json({
        status: "ok",
        message: "deleted comment",
        data: deleteComment,
      });
    } else {
      res.json({
        status: "not ok",
        message: "cannot delete image. please log in with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* edit comment
router.put("/:postid/:commentid", isAuthenticated, async (req, res) => {
  const user = req.session.currentUser;
  const changedComment = {
    comment: req.body.comment,
  };
  try {
    const getComment = await Comment.findById(req.params.commentid);
    if (getComment.commentAuthor.toString() === user._id) {
      const editedComment = await Comment.findByIdAndUpdate(
        req.params.commentid,
        changedComment,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "ok",
        message: "edited comments",
        data: editedComment,
      });
    } else {
      res.json({
        status: "not ok",
        message: "cannot edit comment. please log in with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* view individual post
router.get("/:postid/", async (req, res) => {
  const { postid } = req.params;

  try {
    const foundImagePosts = await Image.findById(postid);
    const foundComments = await Comment.find({ postImage: postid.postid });
    console.log("Find image post", foundImagePosts);
    console.log("Find comments", foundComments);
    res.status(200).json({
      status: "ok",
      message: "get individual post",
      data: {
        imagePosts: foundImagePosts,
        comments: foundComments,
      },
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* like image post
router.put("/:postid/like", isAuthenticated, async (req, res) => {
  const { postid } = req.params;
  const user = req.session.currentUser;
  try {
    const foundImagePosts = await Image.findById(postid);
    await foundImagePosts.imageLikes.push(user);
    foundImagePosts.save();
    res.status(200).json({
      status: "ok",
      message: user.username + " liked post",
      data: foundImagePosts,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* unlike image post
router.put("/:postid/unlike", isAuthenticated, async (req, res) => {
  const { postid } = req.params;
  const user = req.session.currentUser;
  try {
    const foundImagePosts = await Image.findByIdAndUpdate(
      postid,
      {
        $pull: { imageLikes: user._id },
      },
      {
        new: true,
      }
    );

    foundImagePosts.save();
    res.status(200).json({
      status: "ok",
      message: user.username + " unliked post",
      data: foundImagePosts,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete image post by superadmin
router.delete("/superadmin/:postid", isSuperadmin, async (req, res) => {
  const { postid } = req.params;
  try {
    const deleteImagePostBySuperadmin = await Image.findByIdAndDelete(postid);
    res.status(200).json({
      status: "ok",
      message: "deleted image post by superadmin",
      data: deleteImagePostBySuperadmin,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* edit image post
router.put("/:postid", isAuthenticated, async (req, res) => {
  const { postid } = req.params;
  const changedImagePosts = req.body;
  const user = req.session.currentUser;
  try {
    const findImagePost = await Image.findById(postid);

    if (findImagePost.imageAuthor.toString() === user._id) {
      const editedImagePosts = await Image.findByIdAndUpdate(
        postid,
        changedImagePosts,
        {
          new: true,
        }
      );
      res.status(200).json({
        status: "ok",
        message: "edited image post",
        data: editedImagePosts,
      });
    } else {
      res.json({
        status: "not ok",
        message: "cannot edit image. please log in with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* delete image post
router.delete("/:postid", isAuthenticated, async (req, res) => {
  const { postid } = req.params;
  const user = req.session.currentUser;
  try {
    const findImagePost = await Image.findById(postid);
    if (findImagePost.imageAuthor.toString() === user._id) {
      const deletedImagePost = await Image.findByIdAndDelete(postid);
      res.status(200).json({
        status: "ok",
        message: "deleted image post",
        data: deletedImagePost,
      });
    } else {
      res.json({
        status: "not ok",
        message: "cannot delete image. please log in with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
