const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const Post = require("../modules/postModule");
const PostImg = require("../modules/postImgModule");
const ProfileImg = require("../modules/profileImgModule");

const createPost = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.body.id);
  const userImg = await ProfileImg.findById(userId.user_img);
  const taggedUsers = await User.find({ name: req.body.tagged });

  if (!req.file) {
    res.status(400);
    throw new Error("Please add a file");
  }

  const postImg = await PostImg.create({
    name: req.file.originalname,
    size: req.file.size,
    key: req.file.filename,
  });

  const post = await Post.create({
    title: req.body.title,
    post_img: postImg._id,
    likes: [],
    comments: [],
    tagged: taggedUsers._id,
    shares: [],
    user: {
      name: userId.name,
      user_img: userImg.key,
      user_id: userId._id,
    },
    user_id: req.body.id,
  });
  console.log("req:", req.body.tagged, "mongo:", taggedUsers);
  res.status(200).json(post);
});

const getPosts = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id);

  if (!userId) {
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  const maptest = userId.following.map((t) => t.user_id);

  // shares: userId.following, $or
  //         tagged: userId.following
  const posts = await Post.find({ user_id: maptest })
    .sort({ createdAt: -1 })
    .populate(["post_img", "comments", "shares", "tagged", "likes"]);

  res.status(200).json(posts);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ likes: -1 })
    .populate(["post_img", "comments", "shares", "tagged", "likes"]);

  res.status(200).json(posts);
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user_id: req.params.id })
    .sort({ createdAt: -1 })
    .populate(["post_img", "comments", "likes"]);

  res.status(200).json(posts);
});

const getTaggedUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ tagged: req.params.id })
    .sort({ createdAt: -1 })
    .populate(["post_img", "comments", "likes"]);

  res.status(200).json(posts);
});

const getSharedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ shares: req.params.id })
    .sort({ createdAt: -1 })
    .populate(["post_img", "comments", "likes"]);

  res.status(200).json(posts);
});

const likePost = asyncHandler(async (req, res) => {
  const postId = await Post.findById(req.params.id);

  if (!postId) {
    res.status(400);
    throw new Error("Post not found");
  }

  await postId.likes.push(req.body.id);

  postId.save();
  res.status(200).json(postId);
});

const removeLike = asyncHandler(async (req, res) => {
  const postId = await Post.findById(req.params.id);

  if (!postId) {
    res.status(400);
    throw new Error("Post not found");
  }

  const removeLike = await postId.likes.filter(
    (userId) => userId._id.toString() !== req.body.id
  );
  postId.likes = removeLike;

  postId.save();
  res.status(200).json(postId);
});

const tagUser = asyncHandler(async (req, res) => {
  const postId = await Post.findById(req.params.id);
  const taggedUser = await User.findOne({ name: req.body.userName });

  if (!postId) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!taggedUser) {
    res.status(400);
    throw new Error("User not found");
  }

  await postId.tagged.push(taggedUser._id);

  postId.save();
  res.status(200).json(postId);
});

const sharePost = asyncHandler(async (req, res) => {
  const postId = await Post.findById(req.params.id);

  if (!postId) {
    res.status(400);
    throw new Error("Post not found");
  }

  await postId.shares.push(req.body.id);

  postId.save();
  res.status(200).json(postId);
});

const postImg = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const updatePostImg = await Post.findByIdAndUpdate(
    req.params.id,
    {
      post_img: postImg._id,
    },
    {
      new: true,
    }
  );

  res.status(200).json(updatePostImg);
});

const updatePost = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "UPDATE POST" });
});

const deletePost = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Post not found");
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json(req.params.id);
});

module.exports = {
  createPost,
  getPosts,
  updatePost,
  likePost,
  deletePost,
  sharePost,
  tagUser,
  postImg,
  getAllPosts,
  getUserPosts,
  getTaggedUserPosts,
  getSharedPosts,
  removeLike,
};
