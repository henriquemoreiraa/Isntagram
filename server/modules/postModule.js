const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String
    },
    post_img: {
        type: String,
        required: true
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
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' 
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('Post', postSchema);