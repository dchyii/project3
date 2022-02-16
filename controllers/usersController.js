const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../models/usersModel");
const Image = require("../models/postImagesModel");

//*GET seed users
router.get("/seed", async (req, res) => {
  const seedUsers = [
    {
      username: "CaptainFish",
      email: "fish@docks.com",
      password: "",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "friendly_barbarian9",
      email: "battlecry@gmail.com",
      password: "arhgahhgr",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "photo_34",
      email: "photos34@hotmail.com",
      password: "photo!23",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "bomb",
      email: "bomb@nathan.com",
      password: "asdq11",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "BirdBird",
      email: "Bird@hotmail.com",
      password: "BigBadBird123",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "Transfomers",
      email: "trans@formers.com",
      password: "Oppppp1",
      superAdmin: false,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
    {
      username: "AdminMan",
      email: "admin@instagramps.com",
      password: "1234",
      superAdmin: true,
      profilePhoto:
        "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
    },
  ];
  try {
    await User.deleteMany({});
    seedUsers.forEach((user) => {
      user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });
    const seededUsers = await User.create(seedUsers);

    res
      .status(200)
      .json({ status: "ok", message: "seeded users", data: seededUsers });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* Create new user
router.post("/new", async (req, res) => {
  req.body.password = bcrypt.hashSync(
    req.body.password,
    bcrypt.genSaltSync(10)
  );
  try {
    const createdUser = await User.create(req.body);
    req.session.currentUser = createdUser;
    console.log("created user is: ", createdUser);
    res.json({ status: "ok", message: "user created", data: createdUser });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* GET all users - superadmin
router.get("/superadmin", async (req, res) => {
  try {
    const allUsers = await User.find({});
    res
      .status(200)
      .json({ status: "ok", message: "get all users", data: allUsers });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get all username - superadmin
router.get("/superadmin/allusername", async (req, res) => {
  try {
    const allUsernames = await User.find({});
    const usernameMap = [];
    allUsernames.forEach((user) => {
      usernameMap.push({
        username: user.username,
        userid: user._id,
        profilePhoto: user.profilePhoto,
      });
      return usernameMap;
    });
    res
      .status(200)
      .json({ status: "ok", message: "get all username", data: usernameMap });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* sessions on log in
router.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({ username: req.body.username });
    if (!foundUser) {
      res.json({ status: "not ok", message: "no user found" });
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.json({ status: "ok", message: "user found", data: foundUser });
      } else {
        res.json({ status: "not ok", message: "password does not match" });
      }
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* log out
router.delete("/", async (req, res) => {
  req.session.destroy(() => {
    res.json({ status: "ok", message: "logged out" });
  });
});

//* auth
const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.json({ status: "not ok", message: "please login or sign up" });
  }
};

//*get user information
router.get("/userinfo", isAuthenticated, async (req, res) => {
  const user = req.session.currentUser;
  try {
    const foundUserInfo = await User.find({ _id: user });
    res
      .status(200)
      .json({ status: "ok", message: "get user info", data: foundUserInfo });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//*edit user information
router.put("/userinfo", isAuthenticated, async (req, res) => {
  const user = req.session.currentUser;
  const changedUserInfo = req.body;
  try {
    const editedUserInfo = await User.findOneAndUpdate(
      { _id: user },
      changedUserInfo,
      { new: true }
    );
    res.status(200).json({
      status: "ok",
      message: "edit user info",
      data: editedUserInfo,
    });
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

//* get user posts
router.get("/:userid", isAuthenticated, async (req, res) => {
  const { userid } = req.params;
  const user = req.session.currentUser;
  try {
    const foundUserPosts = await Image.find({ imageAuthor: userid });
    if (user === userid) {
      res.status(200).json({
        status: "ok",
        message: "get user home page",
        data: foundUserPosts,
      });
    } else {
      res.json({
        status: "not ok",
        message: "please log in with the correct username",
      });
    }
  } catch (error) {
    res.json({ status: "not ok", message: error.message });
  }
});

module.exports = router;
