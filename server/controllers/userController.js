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

    const userExists = await User.findOne({ email });

    if (userExists) {
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
    res.status(200).json({ message: 'GET USER' });
});

const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE USER' });
});

const followUser = asyncHandler( async (req, res) => {
    const userId = await User.findById(req.params.id);

    if (!userId) {
        res.status(400);
        throw new Error('User not found');
    };

    const updateFollowersUser = await User.findByIdAndUpdate(req.params.id, { followers: { id: req.body.user_id, name: req.body.name, user_img: req.body.user_img } }, {
        new: true
    });

    const updateFollowingUser = await User.findByIdAndUpdate(req.body.follower_id, { following: { id: userId.id, name: userId.name, user_img: userId.user_img } }, {
        new: true
    })

    res.status(200).json(updateFollowersUser)
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
    deleteUser
};