const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUser, deleteUser, followUser, unfollowUser, updateUserImg } = require('../controllers/userController');
const multer = require('multer');
const multerConfig = require('../config/multer')


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user').get(getUser);
router.route('/:id').put(updateUser).delete(deleteUser);
router.route('/follow/:id').put(followUser);
router.route('/unfollow/:id').delete(unfollowUser)
router.route('/img/:id').put(multer(multerConfig).single('file'), updateUserImg)


module.exports = router;