const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router();

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";


router.get('/popularPeople/:id', async (req, res) => {
    let id = req.params.id;

    let api_url = base_url + 'person/popular?' + 'api_key=' + api_key + '&language=en-US' + '&page=' + id;
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();

    res.json(json)
});

router.get('/people/:id', async (req, res) => {
    let id = req.params.id;

    let api_url = base_url + 'person/' + id + '?api_key=' + api_key + '&language=en-US';
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();


    res.json(json)
});





module.exports = router;