const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    const checking = req.cookies
    //console.log(checking)
    res.json({ posts: { title: 'my first post', description: 'random data you shouldnt access' } })
});

module.exports = router;