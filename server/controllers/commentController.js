const asyncHandler = require("express-async-handler");
const Comments = require("../modules/commentsModule");
const Post = require("../modules/postModule");

const createComment = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Post not found");
  }

  if (!req.body.comment || !req.body.id) {
    res.status(400);
    throw new Error("Please add a comment");
  }

  const comment = await Comments.create({
    post: req.params.id,
    comment: req.body.comment,
    user: req.body.id,
    likes: [],
  });

  res.status(200).json(comment);
});

const getAllcomments = asyncHandler(async (req, res) => {
  const comments = await Comments.find().populate("user");
  res.status(200).json(comments);
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

const deleteComment = asyncHandler(async (req, res) => {
  if (!req.params.id) {
    res.status(400);
    throw new Error("Comment not found");
  }

  await Comments.findByIdAndDelete(req.params.id);
  res.status(200).json(req.params.id);
});

module.exports = {
  createComment,
  likeComment,
  deleteComment,
  removelikeComment,
  getAllcomments,
};
