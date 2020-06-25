const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const verify = require('./verifyToken');
const User = require('../model/User');

var admin = require("firebase-admin");

router.post('/api/favorites', async (req, res) => {
    // verify if user is valid, then proceed
    // when receiving request to post data, check if user already exists
    // if user exist, persist data to database
    // if the user is not in the database already, create a User schema with the 
    // users firebase info and persist data

    admin.auth().verifyIdToken(req.body.id)
        .then(async function (decodedToken) {
            // fetch users info from data base and send it to the client
            let userEmail = decodedToken.email;
            let uid = decodedToken.uid;
            let query;

            //check if user exists
            const emailExist = await User.findOne({ email: userEmail });
            console.log(emailExist)
            if (emailExist) {
                //User.findOneAndUpdate({email : userEmail}, {$push})
                //if exist check if favorites array to see if the movie is already in the array
                // const ifTrue = await User.find({ email: userEmail }, async (err, result) => {

                if (emailExist.favoriteMovies.includes(req.body.movie)) {
                    console.log("in this function")
                    res.status(200).send(emailExist.favoriteMovies);
                }
                else {
                    const user = await User.findOneAndUpdate({ email: userEmail }, { $push: { favoriteMovies: req.body.movie } }, { new: true });
                    console.log(user);
                    res.status(200).send(user.favoriteMovies);
                }


                // });



                //console.log(user);


            }
            else {
                // create a new user
                const user = new User({
                    name: "bob",
                    username: "champion",
                    email: userEmail,
                    favoriteMovies: [],
                    watchList: [],
                    ratedMovies: []
                });

                try {
                    // create a new user
                    const savedUser = await user.save();
                    res.status(200).send(savedUser);

                } catch (error) {
                    res.status(400).send(err)
                }

            }

            //console.log(decodedToken)



        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });



    //console.log(checking)
    //res.json({ posts: { title: 'my first post', description: 'random data you shouldnt access' } })
    //res.status(200).send("uid")
});

router.post('/api/watchlist', async (req, res) => {
    // verify if user is valid, then proceed
    // when receiving request to post data, check if user already exists
    // if user exist, persist data to database
    // if the user is not in the database already, create a User schema with the 
    // users firebase info and persist data

    admin.auth().verifyIdToken(req.body.id)
        .then(async function (decodedToken) {
            // fetch users info from data base and send it to the client
            let userEmail = decodedToken.email;
            let uid = decodedToken.uid;
            let query;

            const emailExist = await User.findOne({ email: userEmail });
            if (emailExist) {
                //User.findOneAndUpdate({email : userEmail}, {$push})
                const user = await User.update({ email: userEmail }, { $push: { watchList: req.body.movie } });
                // console.log(user);
                res.status(200).send(uid)

            }
            else {
                // create a new user
                const user = new User({
                    name: "bob",
                    username: "champion",
                    email: userEmail,
                    favoriteMovies: [],
                    watchList: [],
                    ratedMovies: []
                });

                try {
                    // create a new user
                    const savedUser = await user.save();
                    res.status(200).send(savedUser);

                } catch (error) {
                    res.status(400).send(err)
                }

            }

            console.log(decodedToken)



        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });



    //console.log(checking)
    //res.json({ posts: { title: 'my first post', description: 'random data you shouldnt access' } })
    //res.status(200).send("uid")
});

router.delete('/unsubscribe/favorites', async (req, res) => {

    admin.auth().verifyIdToken(req.body.id)
        .then(async function (decodedToken) {
            let uid = decodedToken.uid;
            let userEmail = decodedToken.email;

            const emailExist = await User.findOne({ email: userEmail });

            if (emailExist) {
                const user = await User.findOneAndUpdate({ email: userEmail }, { $pull: { favoriteMovies: req.body.movie } }, { new: true }, (err, result) => {
                    console.log(result);

                    //send the updated array to the client
                    res.status(200).send(result.favoriteMovies)
                });
                // console.log(user);


                //send the updated array to the client

            }


            // ...
        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });
});

module.exports = router;