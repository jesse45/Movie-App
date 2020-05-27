const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         min: 6,
//         max: 255
//     },
//     email: {
//         type: String,
//         required: true,
//         max: 255,
//         min: 6
//     },
//     password: {
//         type: String,
//         required: true,
//         max: 1024,
//         min: 6
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

// module.exports = mongoose.model('User', userSchema);


const userSchema = new mongoose.Schema({
    name: { type: String },
    username: { type: String, required: true },
    email: { type: String, required: true },
    favoriteMovies: [String],
    watchList: [String],
    ratedMovies: [{
        movie: String,
        rating: Number
    }]

});

module.exports = mongoose.model('User', userSchema)