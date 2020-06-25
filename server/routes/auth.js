const express = require('express');
//const fetch = require('node-fetch');
const cors = require('cors');
const User = require('../model/User');
const Comment = require('../model/Comments')
const router = express.Router()



var admin = require("firebase-admin");


router.post('/register', async (req, res) => {

    // //validate data
    // const { error } = registerValidation(req.body)

    // if (error) return res.status(400).send(error.details[0].message);

    // //checking if email is in database
    // const emailExist = await User.findOne({ email: req.body.email });
    // if (emailExist) return res.status(400).send('Email already exists')

    // //Hash passwords
    // const salt = await bcrypt.genSalt(10);
    // const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        favoriteMovies: [],
        watchList: [],
        ratedMovies: []
    });


    //create new comment
    const comment = new Comment({
        movie: "Logan",
        comment: "logan was a great movie",
        postedBy: user._id

    })

    try {
        const savedUser = await user.save();

        // user.save(function (error) {
        //     if (!error) {
        //         Comment.findOne({})
        //             .populate('postedBy')
        //             .exec(function (error, posts) {
        //                 console.log(JSON.stringify(posts, null, "\t"))
        //             })
        //     }
        // })
        // Comment.findOne({})
        //     .populate('postedBy')
        //     .exec(function (error, posts) {
        //         console.log(JSON.stringify(posts, null, "\t"))
        //     })

        res.status(200).send(savedUser);
    }
    catch (err) {
        res.status(400).send(err)
    }

});

router.post('/login', async (req, res) => {
    //validate data
    //const { error } = loginValidation(req.body)
    //console.log(error)
    //if (error) return res.status(400).send(error.details[0].message);


    // //checking if email is in database
    // const user = await User.findOne({ email: req.body.email });
    // if (!user) return res.status(400).send('Email or password is incorrect')

    // //Password is correct
    // const validPass = await bcrypt.compare(req.body.password, user.password)
    // if (!validPass) return res.status(400).send('Invalid password')

    // // Create and assign a token
    // const token = jsonWebToken.sign({ _id: user.id }, process.env.TOKEN_SECRET);


    //res.header('auth-token', token).send(token);


    // idToken comes from the client app
    //console.log(req.body.stsTokenManager.accessToken)
    admin.auth().verifyIdToken(req.body.id)
        .then(async function (decodedToken) {

            // fetch users info from data base and send it to the client
            let uid = decodedToken.uid;
            const emailExist = await User.find({ email: req.body.email }, (err, result) => {
                if (result) {
                    res.status(200).send(result[0].favoriteMovies)
                }
                else {
                    res.status(400).send(error)
                }
            });
            // ...
            console.log(uid)

        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });


});


module.exports = router;