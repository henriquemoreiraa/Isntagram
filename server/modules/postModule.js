const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    post_img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'PostImg'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comments',
    }],
    tagged: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    shares: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    user: {
        name: { type: String, required: true },     
        user_img: { type: String, required: true },
        user_id: { type: String, required: true }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);