const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUser, deleteUser, followUser, unfollowUser } = require('../controllers/userController');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(getUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/follow/:id').put(followUser);
router.route('/unfollow/:id').delete(unfollowUser)

module.exports = router;