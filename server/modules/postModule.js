const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    post_img: {
        type: String,
        required: true
    },
    likes: {
        type: String,
    },
    comments: {
        type: String,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
    user_name: {
        type: String
    }
}, {
    timestamps: true 
});

module.exports = mongoose.module('Post', postSchema);