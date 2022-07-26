const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, likePost, deletePost, sharePost, tagUser, postImg } = require('../controllers/postController');
const multer = require('multer');
const multerConfig = require('../config/multer')

router.route('/create').post(createPost);
router.route('/post').get(getPosts);
router.route('/:id').put(updatePost).delete(deletePost);
router.route('/like/:id').put(likePost);
router.route('/share/:id').put(sharePost)
router.route('/tagUser/:id').put(tagUser)
router.route('/post/:id').put(multer(multerConfig).single('file'), postImg)

module.exports = router;