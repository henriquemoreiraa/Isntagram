const express = require('express');
const router = express.Router();
const { createPost, getPosts, updatePost, likePost, deletePost, sharePost, tagUser } = require('../controllers/postController');

router.route('/create').post(createPost);
router.route('/post').get(getPosts);
router.route('/:id').put(updatePost).delete(deletePost);
router.route('/like/:id').put(likePost);
router.route('/share/:id').put(sharePost)
router.route('/tagUser/:id').put(tagUser)

module.exports = router;