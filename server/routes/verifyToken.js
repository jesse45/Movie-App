

module.exports = function (req, res, next) {


    // idToken comes from the client app
    //console.log(req.body.stsTokenManager.accessToken)
    admin.auth().verifyIdToken(req.body.stsTokenManager.accessToken)
        .then(function (decodedToken) {

            // fetch users info from data base and send it to the client
            let uid = decodedToken.uid;
            // ...
            console.log(uid)
            res.status(200).send(uid)
        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });


    // const token = req.header('auth-token');

    // //console.log(token)
    // if (!token) return res.status(401).send('Access Denied');



    // try {
    //     const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    //     req.user = verified;
    //     //console.log(req.user)
    //     next();
    // }
    // catch (err) {
    //     res.status(400).send('Invalid Token');
    // }
}