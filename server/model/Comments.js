const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    movie: String,
    comment: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Comment', commentSchema)