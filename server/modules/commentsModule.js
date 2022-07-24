const mongoose = require('mongoose');

const commentsShema = mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answers'
    }]
}, {
    timestamps: true 
});

module.exports = mongoose.model('Comments', commentsShema);
