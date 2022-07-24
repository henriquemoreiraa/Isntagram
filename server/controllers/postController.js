const asyncHandler = require('express-async-handler');
const User = require("../modules/userModule");
const Post = require("../modules/postModule");

const createPost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'CREATE POST' });
    
});

const getPosts = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'GET POSTS' });
    
});

const updatePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE POST' });
});

const likePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'LIKE POST' });
    
});

const commentPost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'COMMENT POST' });
    
});

const deletePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE POST' });
});

module.exports = {
    createPost,
    getPosts,
    updatePost,
    likePost,
    commentPost,
    deletePost,
};