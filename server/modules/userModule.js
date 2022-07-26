const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    user_img: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProfileImg'
    },
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    bio: {
        type: String,
    }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);