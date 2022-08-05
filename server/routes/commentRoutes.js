const express = require("express");
const router = express.Router();
const {
  createComment,
  updateComment,
  deleteComment,
  likeComment,
  answerComment,
  likeAnswer,
  updateAnswer,
  deleteAnswer,
  removelikeComment,
} = require("../controllers/commentController");

router.route("/post/:id").post(createComment);
router.route("/:id").put(updateComment).delete(deleteComment);
router.route("/like/:id").put(likeComment);
router.route("/removeLike/:id").put(removelikeComment);

router.route("/comment/:id").put(answerComment);
router.route("/answer/:id").put(updateAnswer).delete(deleteAnswer);
router.route("/answer/like/:id").put(likeAnswer);

module.exports = router;
