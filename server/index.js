const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

//Import Routes
const authRoute = require('./routes/auth');

let base_url = "https://api.themoviedb.org/3/";
let api_key = "a5f259e4f1f408e6ec6d0ac6c7c69403";

app.use(cors());
app.use(express.json());

app.use(require('./routes/home'));
app.use(require('./routes/search'));
app.use(require('./routes/movie'));



app.use('/api/user', authRoute);



app.listen(5000, () => {
    console.log("Listening on localhost 5000")
});




app.post('/users', (req, res) => {
    console.log(req.body);

    res.send(req.body);
});