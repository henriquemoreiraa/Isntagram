const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const ProfileImg = require("../modules/profileImgModule");
const Comments = require("../modules/commentsModule");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).send("Please add all fields");
    throw new Error("Please add all fields");
  }

  const userEmailExists = await User.findOne({ email });
  const userNameExists = await User.findOne({ name });

  if (userEmailExists || userNameExists) {
    res.status(400).send("User already exists");
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    user_img: "62e6d3bbaf78ad7fc2b88691",
    bio: "",
    followers: [],
    following: [],
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      user_img: user.user_img,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      user_img: user.user_img,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).send("Invalid credentials");
    throw new Error("Invalid credentials");
  }
});

const getUser = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id).populate(["user_img"]);

  res.status(200).json(userId);
});

const getUsers = asyncHandler(async (req, res) => {
  const userId = await User.find().populate(["user_img"]);

  res.status(200).json(userId);
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  const test = await Comments.find({ user: req.params.id });
  const { password, name, email, bio } = req.body;
  let salt;
  let hashedPassword;

  if (password) {
    salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(password, salt);
  }

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      bio,
      password: hashedPassword,
    },
    {
      new: true,
    }
  );

  console.log(test);
  res.status(200).json(updatedUser);
});

const followUser = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id);
  const userFollowing = await User.findById(req.body.id);
  const userFollowedImg = await ProfileImg.findById(userId.user_img);
  const userFollowingImg = await ProfileImg.findById(userFollowing.user_img);

  if (!userId) {
    res.status(400);
    throw new Error("User not found");
  }

  await userId.followers.push({
    name: userFollowing.name,
    user_img: userFollowingImg.key,
    user_id: userFollowing._id,
  });
  await userFollowing.following.push({
    name: userId.name,
    user_img: userFollowedImg.key,
    user_id: userId._id,
  });

  userId.save();
  userFollowing.save();
  res.status(200).json(userId);
});

const unfollowUser = asyncHandler(async (req, res) => {
  const userFollowed = await User.findById(req.params.id);
  const userFollower = await User.findById(req.body.id);

  if (!userFollowed) {
    res.status(400);
    throw new Error("User not found");
  }

  const deleteUserFollowed = await userFollowed.followers.filter(
    (userId) => userId.user_id !== req.body.id
  );
  userFollowed.followers = deleteUserFollowed;

  const deleteUserFollower = await userFollower.following.filter(
    (userId) => userId.user_id !== req.params.id
  );
  userFollower.following = deleteUserFollower;

  await userFollowed.save();
  await userFollower.save();
  res.status(200).json(userFollowed);
});

const updateUserImg = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }

  const profileImg = await ProfileImg.create({
    name: req.file.originalname,
    size: req.file.size,
    key: req.file.filename,
  });

  const updateProfileImg = await User.findByIdAndUpdate(
    req.params.id,
    {
      user_img: profileImg._id,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updateProfileImg);
});

const deleteUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "DELETE USER" });
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getUsers,
  updateUser,
  followUser,
  unfollowUser,
  updateUserImg,
  deleteUser,
};
