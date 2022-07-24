const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require("../modules/userModule");

const registerUser = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    };

    const userEmailExists = await User.findOne({ email });
    const userNameExists = await User.findOne({ name });
    

    if (userEmailExists || userNameExists) {
        res.status(400);
        throw new Error('User already exists');
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        user_img: 'test',
        bio: '',
        followers: [],
        following: [],
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            user_img: user.user_img,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    };
});

const loginUser = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            user_img: user.user_img,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    };
});

const getUser = asyncHandler( async (req, res) => {
    const users = await User.find().populate(['followers', 'following'])
    res.status(200).json(users);
});

const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE USER' });
});

const followUser = asyncHandler( async (req, res) => {
    const userId = await User.findById(req.params.id);
    const userFollowing = await User.findById(req.body.id);

    if (!userId) {
        res.status(400);
        throw new Error('User not found');
    };

    await userId.followers.push(req.body.id);
    await userFollowing.following.push(req.params.id);

    userId.save();
    userFollowing.save();
    res.status(200).json(userId);
});

const unfollowUser = asyncHandler( async (req, res) => {
    const userFollowed = await User.findById(req.params.id);
    const userFollower = await User.findById(req.body.id);

    if (!userFollowed) {
        res.status(400);
        throw new Error('User not found');
    };

    const deleteUserFollowed = await userFollowed.followers.filter(userId => userId.toString() !== req.body.id);
    userFollowed.followers = deleteUserFollowed;

    const deleteUserFollower = await userFollower.following.filter(userId => userId.toString() !== req.params.id);
    userFollower.following = deleteUserFollower;

    await userFollowed.save();
    await userFollower.save();
    res.status(200).json(userFollowed);
});

const deleteUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE USER' });
});

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    followUser,
    unfollowUser,
    deleteUser
};