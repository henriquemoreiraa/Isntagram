const asyncHandler = require("express-async-handler");
const User = require("../modules/userModule");
const Post = require("../modules/postModule");
const PostImg = require("../modules/postImgModule");
const Comments = require("../modules/commentsModule");

const createPost = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.body.id);

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
    shares: [],
    user: req.body.id,
  });

  res.status(200).json(post);
});

const getPosts = asyncHandler(async (req, res) => {
  const userId = await User.findById(req.params.id);

  if (!userId) {
    const posts = await Post.find();
    res.status(200).json(posts);
  }
  const mapfol = userId.following.map((fol) => fol);

  const posts = await Post.find({ user: mapfol })
    .sort({ createdAt: -1 })
    .populate(["post_img", "likes"]);

  res.status(200).json(posts);
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find()
    .sort({ likes: -1 })
    .populate(["post_img", "likes"]);

  res.status(200).json(posts);
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ user: req.params.id })
    .sort({ createdAt: -1 })
    .populate(["post_img", "likes"]);

  res.status(200).json(posts);
});

const getSharedPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ shares: req.params.id })
    .sort({ createdAt: -1 })
    .populate(["post_img", "likes"]);

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

const deletePost = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Post not found");
  }

  await Post.findByIdAndDelete(req.params.id);
  res.status(200).json(req.params.id);
});

const getPostComment = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.send(400);
    throw new Error("Post not found");
  }

  const comment = await Comments.find({ post: req.params.id }).sort({
    createdAt: -1,
  });

  res.status(200).json(comment);
});

module.exports = {
  createPost,
  getPosts,
  likePost,
  deletePost,
  sharePost,
  postImg,
  getAllPosts,
  getUserPosts,
  getSharedPosts,
  removeLike,
  getPostComment,
};
