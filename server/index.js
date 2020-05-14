const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const cookieParser = require('cookie-parser')

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

// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*")
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");

//     if (req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Headers', 'PUT, POST, PATCH, DELETE, GET')
//         return res.status(200).json({})
//     }
//     next();
// });


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