const asyncHandler = require("express-async-handler");
const Comments = require("../modules/commentsModule");
const Answers = require("../modules/answerModule");
const Post = require("../modules/postModule");
const User = require("../modules/userModule");
const ProfileImg = require("../modules/profileImgModule");

const createComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  const userId = await User.findById(req.body.id);
  const userImg = await ProfileImg.findById(userId.user_img);

  if (!req.body.comment || !req.body.id) {
    res.status(400);
    throw new Error("Please add a comment");
  }

  const comment = await Comments.create({
    comment: req.body.comment,
    user: {
      name: userId.name,
      user_img: userImg.key,
      user_id: userId._id,
    },
    likes: [],
    answer: [],
  });

  await post.comments.push(comment._id);
  post.save();

  res.status(200).json(comment);
});

const likeComment = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Comment not found");
  }

  await comment.likes.push(req.body.id);

  comment.save();
  res.status(200).json(comment);
});

const removelikeComment = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Post not found");
  }

  const removeLike = await comment.likes.filter(
    (commentId) => commentId._id.toString() !== req.body.id
  );
  comment.likes = removeLike;

  comment.save();
  res.status(200).json(comment);
});

const updateComment = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "UPDATE POST" });
});

const deleteComment = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Comment not found");
  }

  await Comments.findByIdAndDelete(req.params.id);
  res.status(200).json(req.params.id);
});

const answerComment = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);
  const userId = await User.findById(req.body.id);
  const userImg = await ProfileImg.findById(userId.user_img);

  if (!req.body.answer) {
    res.status(400);
    throw new Error("Please add a answer");
  }

  await comment.answers.push({
    answer: req.body.answer,
    user: {
      name: userId.name,
      user_img: userImg.key,
      user_id: userId._id,
    },
    likes: [],
  });
  comment.save();

  res.status(200).json(comment);
});

const likeAnswer = asyncHandler(async (req, res) => {
  const comment = await Comments.findById(req.params.id);

  if (!comment) {
    res.status(400);
    throw new Error("Answer not found");
  }

  await comment.answers.likes.push(req.body.id);

  comment.save();
  res.status(200).json(comment);
});

const updateAnswer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "UPDATE POST" });
});

const deleteAnswer = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "DELETE POST" });
});

module.exports = {
  createComment,
  updateComment,
  likeComment,
  deleteComment,
  answerComment,
  likeAnswer,
  updateAnswer,
  deleteAnswer,
  removelikeComment,
};
