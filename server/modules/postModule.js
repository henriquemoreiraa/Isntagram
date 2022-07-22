const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    post_img: {
        type: String,
        require: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User' 
    },
}, {
    timestamps: true 
});

module.exports = mongoose.module('Post', postSchema);