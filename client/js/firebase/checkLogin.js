import { signOutUser } from "./firebase.js";
import { elements } from "../models/base.js";

export const loggedIn = () => {
    const userName = document.querySelector('.login-button');
    const signOut = document.querySelector('.logout-button');


    userName.href = "/client/views/userPage.html"
    signOut.href = "/client/index.html";

    userName.textContent = 'Username';
    signOut.textContent = 'Sign Out';

}

export const loggedOut = () => {

    // const markUp = `
    // <!--Navbar-->
    // <nav class="navbar sticky-top navbar-expand-lg navbar-dark primary-color">

    //     <!-- Navbar brand -->
    //     <a class="navbar-brand" href="/client/index.html">Navbar</a>

    //     <!-- Collapse button -->
    //     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
    //         aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
    //         <span class="navbar-toggler-icon"></span>
    //     </button>

    //     <!-- Collapsible content -->
    //     <div class="collapse navbar-collapse" id="basicExampleNav">

    //         <!-- Links -->
    //         <ul class="navbar-nav mr-auto">
    //             <li class="nav-item active">
    //                 <a class="nav-link" href="/client/index.html">Home
    //                     <span class="sr-only">(current)</span>
    //                 </a>
    //             </li>

    //             <li class="nav-item">
    //                 <a class="nav-link" href="#">Movies</a>
    //             </li>

    //             <li class="nav-item">
    //                 <a class="nav-link" href="#">People</a>
    //             </li>

    //             <!-- Dropdown -->
    //             <li class="nav-item dropdown">
    //                 <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
    //                     aria-haspopup="true" aria-expanded="false">Dropdown</a>
    //                 <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
    //                     <a class="dropdown-item" href="#">Action</a>
    //                     <a class="dropdown-item" href="#">Another action</a>
    //                     <a class="dropdown-item" href="#">Something else here</a>
    //                 </div>
    //             </li>

    //         </ul>
    //         <!-- Links -->
    //         <ul class="navbar-nav ml-auto ">

    //             <li class="nav-item login-button">
    //                 <a class="nav-link" href="/client/views/loginUser.html">Login</a>
    //             </li>
    //             <li class="nav-item logout-button">
    //                 <a class="nav-link" href="/client/views/registerUser.html">Sign Up</a>
    //             </li>
    //         </ul>


    //         <!-- <form class="form-inline">
    //             <div class="md-form my-0">
    //                 <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
    //             </div>
    //         </form> -->
    //     </div>
    //     <!-- Collapsible content -->

    // </nav>
    // <!--/.Navbar-->


    // `;

    const login = document.querySelector('.login-button');
    const signUp = document.querySelector('.logout-button');
    console.log(login.href)
    login.href = "/client/views/loginUser.html"
    signUp.href = "/client/views/registerUser.html";
    login.textContent = 'LogIn';
    signUp.textContent = 'Sign Up';
}