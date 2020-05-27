const mongoose = require('mongoose');


const moviesRatedSchema = new mongoose.Schema({
    movie: String,
    rating: Number
});

module.exports = mongoose.model('Ratings', moviesRatedSchema)