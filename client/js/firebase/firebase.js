import * as checkLogin from './checkLogin.js'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAx-zPI44CQFE41cgP5mW7F_LPStSIbIYE",
    authDomain: "movie-app-auth-d60e4.firebaseapp.com",
    databaseURL: "https://movie-app-auth-d60e4.firebaseio.com",
    projectId: "movie-app-auth-d60e4",
    storageBucket: "movie-app-auth-d60e4.appspot.com",
    messagingSenderId: "40945681558",
    appId: "1:40945681558:web:36967e45f2479e98762eb7",
    measurementId: "G-Q81DFKEW52"
};
// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
};

export const signInUser = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function (data) {
            checkLogin.loggedIn();
            console.log(data);
            //dont allow for reaccess to to the login screen
            window.location.replace("../index.html")
        })
        .catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            console.log(errorCode + ' - ' + errorMessage)
        });

};

export const signOutUser = (signoutbutton) => {

    signoutbutton.addEventListener("click", (event) => {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
            checkLogin.loggedOut();
            console.log("user signed out")
        }).catch(function (error) {
            // An error happened.
        });
    })
};

export const register = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function (data) {
            console.log(data)
            // reset the form
        })
        .catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let hi = 'ji'

            console.log(errorCode + '  -  ' + errorMessage)
        });
};

export const checkUserState = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;
            var idtoken = user.getIdToken()
            // ...
            checkLogin.loggedIn();
            console.log(idtoken)

        } else {
            checkLogin.loggedOut();
            // User is signed out.
            // ...
            console.log("user is signed out")
        }
    });

};