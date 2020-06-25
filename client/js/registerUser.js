import { initializeFirebase, register } from "./firebase/firebase.js";
import { elements } from "./models/base.js";


class RegisterUser {
    constructor(api_url, loginForm) {
        this.api_url = api_url;
        this.loginForm = loginForm;
    }

    signUp() {
        this.loginForm.addEventListener("click", async (event) => {
            event.preventDefault();
            let name = document.querySelector("#name")
            let username = document.querySelector("#userName")
            let email = document.querySelector("#userEmail")
            let password = document.querySelector('#password')

            // console.log(`${name.value} and password is ${password.value}`);
            console.log(event);

            let reqObj = {
                //check email to see if it is a valid format in the login.html user email input
                name: name.value,
                username: username.value,
                email: email.value,
                password: password.value
            }

            console.log(reqObj)

            register(reqObj.name, reqObj.username, reqObj.email, reqObj.password);




            // const response = await fetch(api_url + "api/user/login", {
            //     method: 'POST',
            //     body: JSON.stringify(reqObj),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     //credentials: 'include'

            //in the server add the users uuid 

            // });

            // const jwt = await response.text();
            // console.log(jwt)

            ///document.cookie = jwt
            //window.location.replace("../index.html")
        });
    }
}

// Initialize Firebase
initializeFirebase();


const api_url = "http://localhost:5000/"

const loginForm = elements.loginForm;

const user = new RegisterUser(api_url, loginForm)



user.signUp();
