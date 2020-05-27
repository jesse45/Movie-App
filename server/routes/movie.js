const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router();

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

router.get('/movie/:movieId', async (req, res) => {
    let searchName = req.params.movieId
    let api_url = "".concat(base_url, 'movie/', searchName, '?api_key=', api_key, '&language=en-US');
    // let api_url = 'https://api.themoviedb.org/3/movie/429617?api_key=a5f259e4f1f408e6ec6d0ac6c7c69403&language=en-US';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //console.log(json);
    res.json(json);
});

module.exports = router;