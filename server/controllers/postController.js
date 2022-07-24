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
        tagged: [],
        shares: [],
        user_id: req.body.id
    });

    res.status(200).json(post);    
});

const getPosts = asyncHandler( async (req, res) => {
    const posts = await Post.find().populate(['tagged'])
    res.status(200).json(posts);  
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

const tagUser = asyncHandler( async (req, res) => {
    const postId = await Post.findById(req.params.id);
    const taggedUser = await User.findOne({name: req.body.userName });

    if (!postId) {
        res.status(400);
        throw new Error('Post not found');
    };

    if (!taggedUser) {
        res.status(400);
        throw new Error('User not found');
    };

    await postId.tagged.push(taggedUser._id);

    postId.save();
    res.status(200).json(postId);
    
});

const sharePost = asyncHandler( async (req, res) => {
    const postId = await Post.findById(req.params.id);

    if (!postId) {
        res.status(400);
        throw new Error('Post not found');
    };

    await postId.shares.push(req.body.id);

    postId.save();
    res.status(200).json(postId); 
});

const updatePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE POST' });
});

const deletePost = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE POST' });
});

module.exports = {
    createPost,
    getPosts,
    updatePost,
    likePost,
    deletePost,
    sharePost,
    tagUser
};