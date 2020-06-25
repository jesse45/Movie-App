var admin = require("firebase-admin");

module.exports = function (req, res, next) {
    let token = req.body;
    //console.log(token.id)


    // idToken comes from the client app
    //console.log(req.body.stsTokenManager.accessToken)
    //let newtoken = "".concat(req.body.id, 'dsafkldjsafkjadskojfdshfsdnflsjdf');
    admin.auth().verifyIdToken(req.body.id)
        .then(function (decodedToken) {

            // fetch users info from data base and send it to the client
            // console.log(userCred)
            let cred = {
                email: decodedToken.email,
                uid: decodedToken.uid
            }
            getLocals(cred);



        }).catch(function (error) {
            // Handle error
            console.log(error)
            res.status(400).send(error)
        });





    next();

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

const getLocals = (cred, def = cred) => {
    //store variables in an object and add to res.local
    userCred.a = cred
    //console.log(userCred)
    // return userCred
}