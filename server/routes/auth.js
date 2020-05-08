const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const router = express.Router()

router.post('/register', (req, res) => {

    res.send('Register');
});


module.exports = router;