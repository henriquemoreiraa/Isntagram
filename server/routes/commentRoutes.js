const express = require("express");
const router = express.Router();
const {
  createComment,
  deleteComment,
  likeComment,
  getAllcomments,
  removelikeComment,
} = require("../controllers/commentController");

router.route("/post/:id").post(createComment);
router.route("/:id").delete(deleteComment);
router.route("/like/:id").put(likeComment);
router.route("/removeLike/:id").put(removelikeComment);
router.route("/").get(getAllcomments);

module.exports = router;
