const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router();

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

router.get('/movie/:movieId', async (req, res) => {
    let searchName = req.params.movieId
    let api_url = "".concat(base_url, 'movie/', searchName, '?api_key=', api_key, '&language=en-US');
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //console.log(json);
    res.json(json);
});


router.get('/movie/popular/:page', async (req, res) => {
    let page = req.params.page;
    let api_url = "".concat(base_url, 'movie/popular', '?api_key=', api_key, '&language=en-US', '&page=', page);

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    //res.status(200).json(json);
    res.json(json);

});

router.get('/movie/now_playing/:page', async (req, res) => {
    let page = req.params.page;
    let api_url = "".concat(base_url, 'movie/now_playing', '?api_key=', api_key, '&language=en-US', '&page=', page);

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    res.json(json);
});

router.get('/movie/upcoming/:page', async (req, res) => {
    let page = req.params.page;
    let api_url = "".concat(base_url, 'movie/upcoming', '?api_key=', api_key, '&language=en-US', '&page=', page);

    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    res.json(json);
});

module.exports = router;
