const asyncHandler = require('express-async-handler');
const User = require("../modules/userModule");
const Post = require("../modules/postModule");

const createPost = asyncHandler( async (req, res) => {
    if (!req.body.img) {
        res.status(400);
        throw new Error('Please add an image')
    };

    const post = await Post.create({
        title: req.body.title,
        post_img: req.body.img,
        likes: [],
        comments: [],
        user_id: req.body.id
    });

    res.status(200).json(post);    
});

const getPosts = asyncHandler( async (req, res) => {
    const posts = await Post.find().populate(['comments'])
    res.status(200).json(posts);  
});

const updatePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE POST' });
});

const likePost = asyncHandler( async (req, res) => {
    const postId = await Post.findById(req.params.id);

    if (!postId) {
        res.status(400);
        throw new Error('Post not found');
    };

    await postId.likes.push(req.body.id);

    postId.save();
    res.status(200).json(postId);
    
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