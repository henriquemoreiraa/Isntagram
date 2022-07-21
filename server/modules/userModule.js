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
        type: String,
        required: true
    },
    followers: {
        type: Array,
        required: true
    },
    following: {
        type: Array,
        required: true
    },
    bio: {
        type: String,
        required: true
    }, 
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);