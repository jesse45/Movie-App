import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js"

class LoginUser {
    constructor(loginForm) {
        this.loginForm = loginForm;
    }
    loginUser() {
        this.loginForm.addEventListener("click", async (event) => {
            event.preventDefault();
            //let name = document.querySelector("#userName")
            let email = elements.email;
            let password = elements.password

            // console.log(`${name.value} and password is ${password.value}`);
            console.log(event);

            let reqObj = {
                //check email to see if it is a valid format in the login.html user email input
                //name: name.value,
                email: email.value,
                password: password.value
            }

            signInUser(reqObj.email, reqObj.password);


        });

    }

}

// Initialize Firebase
initializeFirebase();

//check if user is still signed in
checkUserState();


const loginForm = elements.loginForm;
const login = new LoginUser(loginForm)

login.loginUser();
