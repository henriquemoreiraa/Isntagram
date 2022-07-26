const mongoose = require('mongoose');

const postImgSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    key: {
        type: String,
        required: true
    },
}, {
    timestamps: true 
});

module.exports = mongoose.model('PostImg', postImgSchema);