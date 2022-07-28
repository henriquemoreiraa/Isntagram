const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, likePost, deletePost, sharePost, tagUser, postImg } = require('../controllers/postController');
const multer = require('multer');
const multerConfig = require('../config/multer');
const { protect } = require('../middleware/authMiddleware');

router.route('/create').post(protect, multer(multerConfig).single('file'), createPost);
router.route('/post').get(protect, getPosts);
router.route('/:id').put(protect, updatePost).delete(protect, deletePost);
router.route('/like/:id').put(protect, likePost);
router.route('/share/:id').put(protect, sharePost)
router.route('/tagUser/:id').put(protect, tagUser)
router.route('/post/:id').put(protect, multer(multerConfig).single('file'), postImg)

module.exports = router;