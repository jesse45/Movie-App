import { initializeFirebase, checkUserState, signOutUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import { showLoading } from "./models/loading.js";
import UserMovies from './models/userInfo.js';

class NowPlaying {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url;
        this.json = {};
        this.total_pages = 0;
        this.pageNumber = 1;
        this.movie = '';
    }

    async loadMovies() {

        let search_api = 'movie' + '/' + 'now_playing' + '/' + this.pageNumber;
        console.log(search_api);

        const response = await fetch(this.api_url + search_api);
        this.json = await response.json();
        this.total_pages = this.json.total_pages;

        console.log(this.json);

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
                            <a href="${`/client/views/movies.html?movieId=${el.id}`}" data-src="${el.id}" >
                                <div class="mask rgba-white-slight"></div>
                            </a>
                            
                        </div>

                        <div class="card-body">
                            <h6 class="card-title">
                                <a href="${`/client/views/movies.html?movieId=${el.id}&movie=${el.title}`}" data-src="${el.id}" >
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
                `<p class="bookmark-popup" >Sign Up to add to Favorite</p>
                 <hr>
                 <p class="link-popup">Login</p>
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

// how many pages in the search

const api_url = "http://localhost:5000/";
const picture_url = "https://image.tmdb.org/t/p/";

const nowPlaying = new NowPlaying(api_url, picture_url);

const loading = elements.loading;


nowPlaying.loadMovies().then((resolve) => {
    console.log(resolve)
    nowPlaying.createMoviesSearchResults(resolve)
})
    .catch((reject) => {
        console.log(reject)
    })

//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src;
    let movie = event.srcElement.parentNode.dataset.movie;

    sessionStorage.setItem("movieId", movieId);
    sessionStorage.setItem("movieTitle", movie);
})

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // console.log({ scrollTop, scrollHeight, clientHeight });

    if (clientHeight + scrollTop >= scrollHeight) {
        //console.log("to the bottom")

        showLoading(nowPlaying, loading);
    }
});


$(document).on('click', '.ion-icon', (event) => {
    console.log("in the jquery function");
    //console.log(event.target.closest('.ion-icon'));

    //get movie from the current movie
    let theMovie = event.target.closest('.ion-icon');
    nowPlaying.movie = theMovie.dataset.movie
    //console.log(popular.movie)


    const favorites = document.querySelector('.bookmark-popup');
    const watchlist = document.querySelector('.watchlist-popup');
    const rating = document.querySelector('.user-rating');
    const loginLink = document.querySelector('.link-popup');

    const logout = document.querySelector('#logout-button');

    let userMovie = new UserMovies();
    let isMovie;

    // console.log(event)

    if (logout.textContent === 'Sign Out') {
        //get the user movies
        let stringBookmarks = sessionStorage.getItem('bookmarks');
        userMovie.bookmarks = JSON.parse(stringBookmarks);

        let stringWatchlist = sessionStorage.getItem('watchlist');
        userMovie.watchlist = JSON.parse(stringWatchlist);

        console.log(nowPlaying.movie)
        isMovie = userMovie.watchlist.includes(nowPlaying.movie)
        console.log("ismovie:  " + isMovie)


        const favorite_html = `<p class="bookmark-popup" id="bookmark"><i class="fas fa-bookmark ${userMovie.bookmarks.includes(nowPlaying.movie) ? 'blue-text' : ''} "></i> Add to Favorites</p>`;
        const watchlist_html = `<p class="link-popup" id="watchlist"><i class="fas fa-list ${userMovie.watchlist.includes(nowPlaying.movie) ? 'blue-text' : ''}"></i> Add to Watchlist</p>`;
        const rating_html = `<p class="watchlist-popup" id="rating"><i class="fas fa-star"></i> Your Rating</p>`;
        // remove login link
        // add icons to favorites, watchlist, and ratins and add links

        // favorites.html = '';
        // watchlist.innerHTML = '';
        // loginLink.innerHTML = '';
        // favorites.outerHTML = favorite_html;

        // loginLink.outerHTML = watchlist_html;

        // watchlist.outerHTML = rating_html;

        $('.bookmark-popup').html(favorite_html);
        $('.link-popup').html(watchlist_html);
        $('.watchlist-popup').html(rating_html);

        //console.log(event.target.classList.contains('favorites-popup'))

        //use event.target to delegate the DOM element that was click on
        /*
            if(event.target == favorites) {//do something}
            else if(...){do something else}
        */

    }

});



$(document).on('click', '#bookmark', (event) => {
    console.log("in the jquery favorites function");
    let user = sessionStorage.getItem('user');
    const logout = document.querySelector('#logout-button');
    const bookmark = document.querySelector('.fa-bookmark');
    const movie = nowPlaying.movie;




    if (user) {

        // check if indigo-text is in the classlist
        // if it is then post else delete



        firebase.auth().currentUser.getIdToken().then(async (idToken) => {

            let postRoute = api_url + "api/bookmark";
            let deleteRoute = api_url + "unsubscribe/bookmark";
            let userIdToken = { id: idToken, movie: movie };

            // if bookmark contains this color, remove the movie
            if (bookmark.classList.contains('blue-text')) {
                const removeMovie = await fetch(deleteRoute, {

                    method: 'DELETE',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                const data = await removeMovie.json();
                console.log(data);
                sessionStorage.setItem('bookmarks', JSON.stringify(data))

                bookmark.classList.remove('blue-text')
            }
            else {

                const addMovie = await fetch(postRoute, {

                    method: 'POST',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data2 = await addMovie.json();
                console.log(data2)
                sessionStorage.setItem('bookmarks', JSON.stringify(data2))
                bookmark.classList.add('blue-text')
            }

        }).catch((error) => {
            // Handle error
            console.log(error)
        });

    }
    else {
        console.log("please login")
    }

});


$(document).on('click', '#watchlist', (event) => {
    //console.log("in the jquery function");
    let user = sessionStorage.getItem('user');
    const logout = document.querySelector('#logout-button');
    const watchList = document.querySelector('.fa-list');
    const movie = nowPlaying.movie;

    console.log(movie);


    if (user) {

        firebase.auth().currentUser.getIdToken().then(async (idToken) => {

            let postRoute = "".concat(api_url + "api/watchlist");
            let deleteRoute = api_url + "unsubscribe/watchlist";
            let userIdToken = { id: idToken, movie: movie };

            if (watchList.classList.contains('blue-text')) {
                const removeMovie = await fetch(deleteRoute, {

                    method: 'DELETE',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data = await removeMovie.json();
                console.log(data);
                sessionStorage.setItem('watchlist', JSON.stringify(data))

                watchList.classList.remove('blue-text')
            }
            else {
                const addMovie = await fetch(postRoute, {

                    method: 'POST',
                    body: JSON.stringify(userIdToken),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

                const data2 = await addMovie.json();
                console.log(data2)
                sessionStorage.setItem('watchlist', JSON.stringify(data2))
                watchList.classList.add('blue-text')

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



//sign out user out of firebase
signOutUser(elements.signoutButton)