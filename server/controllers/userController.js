const asyncHandler = require('express-async-handler');

const registerUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'REGISTER' });
});

const loginUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'LOGIN' });
});

const getUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'GET USER' });
});

const updateUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE USER' });
});

const deleteUser = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE USER' });
});

module.exports = {
    registerUser,
    loginUser,
    getUser,
    updateUser,
    deleteUser
};