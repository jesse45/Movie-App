const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const User = require('../model/User')
const router = express.Router()
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');



router.post('/register', async (req, res) => {

    //validate data
    const { error } = registerValidation(req.body)

    if (error) return res.status(400).send(error.details[0].message);

    //checking if email is in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exists')

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    }
    catch (err) {
        res.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {
    //validate data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    //checking if email is in database
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email or password is incorrect')

    //Password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass) return res.status(400).send('Invalid password')

    // Create and assign a token
    const token = jsonWebToken.sign({ _id: user.id }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).send(token);

});


module.exports = router;