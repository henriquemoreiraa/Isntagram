const express = require("express");
const router = express.Router();
const {
  createPost,
  getPosts,
  updatePost,
  likePost,
  deletePost,
  sharePost,
  tagUser,
  postImg,
  removeLike,
  getAllPosts,
  getUserPosts,
  getTaggedUserPosts,
  getSharedPosts,
} = require("../controllers/postController");
const multer = require("multer");
const multerConfig = require("../config/multer");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/create")
  .post(protect, multer(multerConfig).single("file"), createPost);
router.route("/post/:id").get(protect, getPosts);
router.route("/").get(protect, getAllPosts);
router.route("/user/:id").get(protect, getUserPosts);
router.route("/user/tagged/:id").get(protect, getTaggedUserPosts);
router.route("/user/shared/:id").get(protect, getSharedPosts);
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);
router.route("/like/:id").put(protect, likePost);
router.route("/removeLike/:id").put(protect, removeLike);
router.route("/share/:id").put(protect, sharePost);
router.route("/tagUser/:id").put(protect, tagUser);
router
  .route("/post/:id")
  .put(protect, multer(multerConfig).single("file"), postImg);

module.exports = router;
