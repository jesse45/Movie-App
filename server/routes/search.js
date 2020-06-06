const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router();

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

router.get('/search/:name', async (req, res) => {
    let searchName = req.params.name
    console.log(searchName)
    let api_url = "".concat(base_url, 'search/movie/?api_key=', api_key, '&language=en-US&query=', searchName, '&include_adult=false');
    console.log(api_url)
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //console.log(json);
    res.json(json);
});

router.get('/search/:name/:id', async (req, res) => {

    // if the search query is
    let searchName = req.params.name;
    let id = req.params.id;
    console.log(searchName)
    let api_url = "".concat(base_url, 'search/movie/?api_key=', api_key, '&language=en-US&query=', searchName, '&page=', id, '&include_adult=false');
    console.log(api_url)
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    //console.log(json);
    res.json(json);
});

module.exports = router;