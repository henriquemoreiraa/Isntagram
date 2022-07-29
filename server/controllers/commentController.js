const asyncHandler = require('express-async-handler');
const Comments = require("../modules/commentsModule");
const Answers = require('../modules/answerModule')
const Post = require("../modules/postModule");
const User = require("../modules/userModule");
const ProfileImg = require('../modules/profileImg')

const createComment = asyncHandler( async (req, res) => {
    const post = await Post.findById(req.params.id);
    const userId = await User.findById(req.body.id);
    const userImg = await ProfileImg.findById(userId.user_img)

    if (!req.body.comment) {
        res.status(400);
        throw new Error('Please add a comment');
    };

    const comment = await Comments.create({
        comment: req.body.comment,
        user: {
            name: userId.name,
            user_img: userImg.key,
            user_id: userId._id
        },
        likes: [],
        answer: [],
    });

    await post.comments.push(comment._id);
    post.save();

    res.status(200).json(comment);    
});

const likeComment = asyncHandler( async (req, res) => {
    const comment = await Comments.findById(req.params.id);

    if (!comment) {
        res.status(400);
        throw new Error('Comment not found');
    };

    await comment.likes.push(req.body.id);

    comment.save();
    res.status(200).json(comment);
    
});

const updateComment = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE POST' });
});

const deleteComment = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE POST' });
});


const answerComment = asyncHandler ( async (req, res) => {
    const comment = await Comments.findById(req.params.id);

    if (!req.body.answer) {
        res.status(400);
        throw new Error('Please add a answer');
    };

    const answer = await Answers.create({
        answer: req.body.answer,
        user_id: req.body.id,
        likes: []
    });

    await comment.answers.push(answer._id);
    comment.save();

    res.status(200).json(answer);  
});

const likeAnswer = asyncHandler( async (req, res) => {
    const answer = await Answers.findById(req.params.id);
    
    if (!answer) {
        res.status(400);
        throw new Error('Answer not found');
    };
    
    await answer.likes.push(req.body.id);
    
    answer.save();
    res.status(200).json(answer);
    
});

const updateAnswer = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'UPDATE POST' });
});

const deleteAnswer = asyncHandler( async (req, res) => {
    res.status(200).json({ message: 'DELETE POST' });
});


module.exports = {
    createComment,
    updateComment,
    likeComment,
    deleteComment,
    answerComment,
    likeAnswer,
    updateAnswer,
    deleteAnswer
};