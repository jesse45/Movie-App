import { elements } from "./models/base.js"

const api_url = "http://localhost:5000/"

const reqObj = {
    userResponse: "this is a test"
}

const response = fetch(api_url + "api/posts", {
    //credentials: 'same-origin',

});

const jwt = response
console.log(jwt)

//sign out user out of firebase
signOutUser(elements.signoutButton)
