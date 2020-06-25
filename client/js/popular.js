import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import { showLoading } from "./models/loading.js";
import UserMovies from './models/userInfo.js';

class Popular {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url
        this.json = {};
        this.total_pages = 0;
        this.pageNumber = 1;
        this.movie = '';
    }

    async loadMovies() {

        let search_api = "".concat('movie', '/', 'popular', '/', this.pageNumber);
        console.log(search_api);

        const response = await fetch(this.api_url + search_api);
        this.json = await response.json();
        this.total_pages = this.json.total_pages;

        console.log(this.json)

        if (this.pageNumber >= this.total_pages) {
            this.pageNumber = 1;
        }
        else {
            this.pageNumber++;
        }

        return this.json.results;
    }

    storeMovieId(id) {
        sessionStorage.setItem("movieID", id);
    }

    getTotalPages() {
        return this.total_pages;
    }

    getMovies() {
        return this.json.results;
    }

    createMoviesSearchResults(json) {
        let picture_size = "w342";

        // function to create elements
        let resultsArray = json;

        let html = '';

        resultsArray.forEach((el) => {

            let card_image = "".concat(this.picture_url, picture_size, el.poster_path);

            html = `<div class="card card-results">
                        <div class="view overlay">
                            <div class="icon-button">
                                <ion-icon name="ellipsis-horizontal-circle-sharp" class="ion-icon" 
                                data-movie="${el.title}"></ion-icon>
                            </div>
                            <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                            <a href="/client/views/movies.html" data-src="${el.id}" >
                                <div class="mask rgba-white-slight"></div>
                            </a>
                            
                        </div>

                        <div class="card-body">
                            <h6 class="card-title">
                                <a href="/client/views/movies.html" data-src="${el.id}" >
                                    ${el.title}
                                </a>
                            </h6>
                            <p>${el.release_date}</p>
                        </div>

                    </div>`;

            document.querySelector(".content-wrapper").insertAdjacentHTML('beforeend', html)

        });

        tippy('.ion-icon', {
            content:
                `<p class="favorites-popup" >Sign Up to add to Favorite</p>
                 <hr>
                 <a class="link-popup"  href="/client/views/loginUser.html">Login</a>
                 <hr>
                 <p class="watchlist-popup" >Sign in to add to watchlist</p>`,

            inlinePositioning: true,
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            touch: true,
            interactive: true,
            allowHTML: true
        });


    }



}

// Initialize Firebase
initializeFirebase();
//cheack if still signed in
checkUserState();


const api_url = "http://localhost:5000/"
const picture_url = "https://image.tmdb.org/t/p/";

const popular = new Popular(api_url, picture_url);

const loading = elements.loading;

popular.loadMovies().then((resolve) => {
    console.log(resolve);
    popular.createMoviesSearchResults(resolve);
})
    .catch((reject) => {
        console.log(reject)
    });


//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src;
    let movie = event.srcElement.parentNode.dataset.movie;

    sessionStorage.setItem("movieId", movieId)
    sessionStorage.setItem("movieTitle", movie);
});



window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;


    // console.log({ scrollTop, scrollHeight, clientHeight });
    // console.log(document.documentElement.pageYOffset)

    if (clientHeight + scrollTop >= scrollHeight) {
        //console.log("to the bottom")

        showLoading(popular, loading);
    }
});

// const ionIcon = document.querySelector('.content-wrapper');

// ionIcon.addEventListener("click", (event) => {
// const favorites = document.querySelector('.favorites-popup');
// const watchlist = document.querySelector('.watchlist-popup');
// const rating = document.querySelector('.user-rating');
// const loginLink = document.querySelector('.link-popup');

// const logout = document.querySelector('#logout-button');

// let userMovie = new UserMovies();


// // console.log(event)

// if (logout.textContent === 'Sign Out') {
//     let stringMovies = sessionStorage.getItem('userMovies');
//     userMovie.userMovies = JSON.parse(stringMovies);
//     console.log(userMovie.userMovies)


//     const favorite_html = `<p class="favorites-popup" id="favorites"><i class="fas fa-bookmark ${}"></i> Add to Favorites</p>`;
//     const watchlist_html = `<p class="link-popup" id="watchlist"><i class="fas fa-list"></i> Add to Watchlist</p>`;
//     const rating_html = `<p class="watchlist-popup" id="rating"><i class="fas fa-star"></i> Your Rating</p>`;
//     // remove login link
//     // add icons to favorites, watchlist, and ratins and add links

//     favorites.innerHTML = '';
//     watchlist.innerHTML = '';
//     loginLink.innerHTML = '';
//     favorites.outerHTML = favorite_html;

//     loginLink.outerHTML = watchlist_html;

//     watchlist.outerHTML = rating_html;

//     //console.log(event.target.classList.contains('favorites-popup'))

//     //use event.target to delegate the DOM element that was click on
//     /*
//         if(event.target == favorites) {//do something}
//         else if(...){do something else}
//     */

// }
//console.log(event.target.classList.contains('favorites-popup'))



// });

$(document).on('click', '.ion-icon', (event) => {
    console.log("in the jquery function");
    //console.log(event.target.closest('.ion-icon'));

    //get movie from the current movie
    let theMovie = event.target.closest('.ion-icon');
    popular.movie = theMovie.dataset.movie
    //console.log(popular.movie)


    const favorites = document.querySelector('.favorites-popup');
    const watchlist = document.querySelector('.watchlist-popup');
    const rating = document.querySelector('.user-rating');
    const loginLink = document.querySelector('.link-popup');

    const logout = document.querySelector('#logout-button');

    let userMovie = new UserMovies();
    let isMovie;

    // console.log(event)

    if (logout.textContent === 'Sign Out') {
        //get the user movies
        let stringMovies = sessionStorage.getItem('userMovies');
        userMovie.userMovies = JSON.parse(stringMovies);

        isMovie = userMovie.userMovies.includes(popular.movie)


        const favorite_html = `<p class="favorites-popup" id="favorites"><i class="fas fa-bookmark ${isMovie ? 'indigo-text' : ''} "></i> Add to Favorites</p>`;
        const watchlist_html = `<p class="link-popup" id="watchlist"><i class="fas fa-list"></i> Add to Watchlist</p>`;
        const rating_html = `<p class="watchlist-popup" id="rating"><i class="fas fa-star"></i> Your Rating</p>`;
        // remove login link
        // add icons to favorites, watchlist, and ratins and add links

        // favorites.html = '';
        // watchlist.innerHTML = '';
        // loginLink.innerHTML = '';
        // favorites.outerHTML = favorite_html;

        // loginLink.outerHTML = watchlist_html;

        // watchlist.outerHTML = rating_html;

        $('.favorites-popup').html(favorite_html);
        $('.link-popup').html(watchlist_html);
        $('.watchlist-popup').html(rating_html);

        //console.log(event.target.classList.contains('favorites-popup'))

        //use event.target to delegate the DOM element that was click on
        /*
            if(event.target == favorites) {//do something}
            else if(...){do something else}
        */

    }

})

$(document).on('click', '#favorites', (event) => {
    //console.log("in the jquery function");
    const logout = document.querySelector('#logout-button');
    const bookmark = document.querySelector('.fa-bookmark');
    const movie = popular.movie;




    if (logout.textContent === 'Sign Out') {

        // check if indigo-text is in the classlist
        // if it is then post else delete



        firebase.auth().currentUser.getIdToken().then(async (idToken) => {

            let postRoute = "".concat(api_url + "api/favorites");
            let deleteRoute = "".concat(api_url + "unsubscribe/favorites/")
            let userIdToken = { id: idToken, movie: movie };

            if (bookmark.classList.contains('indigo-text')) {
                const removeMovie = await fetch(deleteRoute, {

                    method: 'DELETE',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await removeMovie.json();
                console.log(data);
                sessionStorage.setItem('userMovies', JSON.stringify(data))

                bookmark.classList.remove('indigo-text')
            }
            else {

                const addMovie = await fetch(postRoute, {

                    method: 'POST',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data2 = await addMovie.json();
                console.log(data2)
                sessionStorage.setItem('userMovies', JSON.stringify(data2))
                bookmark.classList.add('indigo-text')
            }

        }).catch((error) => {
            // Handle error
            console.log(error)
        });

    }
    else {
        console.log("please login")
    }

})


$(document).on('click', '#watchlist', (event) => {
    //console.log("in the jquery function");
    const logout = document.querySelector('#logout-button');
    const movie = popular.movie;

    console.log(movie);


    if (logout.textContent === 'Sign Out') {



        firebase.auth().currentUser.getIdToken().then(async (idToken) => {

            let postRoute = "".concat(api_url + "api/watchlist")
            let userIdToken = { id: idToken, movie: movie };

            await fetch(postRoute, {

                method: 'POST',
                body: JSON.stringify(userIdToken),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(data => {
                console.log(data.text())
            })
        }).catch((error) => {
            // Handle error
            console.log(error)
        });

    }
    else {
        console.log("please login")
    }

})

// document.querySelector('.content-container').addEventListener("click", (event) => {

//     const favorite_event = document.querySelector('#favorites');
//     const watchlist_event = document.querySelector('#watchlist');
//     const rating_event = document.querySelector('#rating');
//     console.log(favorite_event)
//     if (event.target === favorite_event) {
//         console.log(favorite_event)
//     }



//     // const result_post = await fetch_post.json();
//     // console.log(result_post)
// })


// function addToUserList() {
//     const favorite_event = document.querySelector('#favorites');
//     const watchlist_event = document.querySelector('#watchlist');
//     const rating_event = document.querySelector('#rating');

//     firebase.auth().currentUser.getIdToken().then(async (idToken) => {

//         let postRoute = "".concat(api_url + "api/posts")
//         let userIdToken = { id: idToken }

//         await fetch(postRoute, {

//             method: 'POST',
//             body: JSON.stringify(userIdToken),
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//         }).then(data => {
//             console.log(data.text())
//         })
//     }).catch((error) => {
//         // Handle error
//         console.log(error)
//     });
// }


//sign out user out of firebase
signOutUser(elements.signoutButton)