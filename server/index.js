const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const cookieParser = require('cookie-parser')

// Firebase admin setup

var admin = require("firebase-admin");

var serviceAccount = require("./movie-app-auth-d60e4-firebase-adminsdk-tunxu-f311ff7b5f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://movie-app-auth-d60e4.firebaseio.com"
});


const app = express();

// Connect to Database
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config()

mongoose.connect(
    process.env.DB_CONNECT,
    { userNewUrlParser: true },
    () => { console.log("connected to db") })


//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post')

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

app.use(cookieParser())


app.use(cors());


app.use(express.json());

app.use(require('./routes/home'));
app.use(require('./routes/search'));
app.use(require('./routes/movie'));


app.use('/api/user', authRoute);
app.use('/api/posts', postRoute)


app.listen(5000, () => {
    console.log("Listening on localhost 5000")
});




app.post('/users', (req, res) => {
    console.log(req.body);

    res.send(req.body);
});