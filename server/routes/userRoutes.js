const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser, updateUser, deleteUser, followUser, unfollowUser, updateUserImg, get5User } = require('../controllers/userController');
const multer = require('multer');
const multerConfig = require('../config/multer')
const { protect } = require('../middleware/authMiddleware');

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/user/:id').get(protect ,getUser);
router.route('/:id').put(protect ,updateUser).delete(protect, deleteUser);
router.route('/follow/:id').put(protect, followUser);
router.route('/unfollow/:id').put(protect, unfollowUser)
router.route('/img/:id').put(protect, multer(multerConfig).single('file'), updateUserImg)




module.exports = router;