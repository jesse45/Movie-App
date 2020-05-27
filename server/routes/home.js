const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router();

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

router.get('/', async (req, res) => {
    let trending_url = "".concat(base_url, 'trending/movie/day?api_key=', api_key);
    let popular_url = "".concat(base_url, 'movie/popular?api_key=', api_key, '&language=en-US&page=1');
    let upcoming_url = "".concat(base_url, 'movie/upcoming?api_key=', api_key, '&language=en-US&page=1');
    const fetch_trending = await fetch(trending_url);
    const trending_results = await fetch_trending.json();

    const fetch_popular = await fetch(popular_url);
    const popular_results = await fetch_popular.json();

    const fetch_upcoming = await fetch(upcoming_url);
    const upcoming_results = await fetch_upcoming.json();

    const requested_movies = { trending_results, popular_results, upcoming_results }
    console.log(requested_movies)

    res.json(requested_movies)
});

module.exports = router;