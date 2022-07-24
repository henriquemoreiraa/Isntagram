const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, likePost, commentPost, deletePost } = require('../controllers/postController');

router.route('/create').post(createPost);
router.route('/post').get(getPosts);
router.route('/:id').put(updatePost).delete(deletePost);
router.route('/like/:id').put(likePost);
router.route('/comment/:id').put(commentPost)

module.exports = router;