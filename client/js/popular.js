import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import { showLoading } from "./models/loading.js";

class Popular {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url
        this.json = {};
        this.total_pages = 0;
        this.pageNumber = 1;
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
                                ></ion-icon>
                            </div>
                            <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                            <a href="/client/views/movies.html" data-src="${el.id}">
                                <div class="mask rgba-white-slight"></div>
                            </a>
                            
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">${el.title}</h5>
                            <p>March 30 2019</p>
                        </div>

                    </div>`;

            document.querySelector(".content-wrapper").insertAdjacentHTML('beforeend', html)

        });

        tippy('.ion-icon', {
            content:
                `<p class="favorites-popup">Sign Up to add to Favorite</p>
                 <hr>
                 <a class="link-popup" href="/client/views/loginUser.html">Login</a>
                 <hr>
                 <p class="watchlist-popup">Sign in to add to watchlist</p>`,

            inlinePositioning: true,
            placement: 'bottom',
            theme: 'light',
            trigger: 'click',
            touch: true,
            interactive: true,
            allowHTML: true
        });


    }

    /*
      <ion-icon name="ellipsis-horizontal-circle-sharp" class="ion-icon" data-toggle="collapse" 
                            role="button" aria-expanded="false" aria-controls="multiCollapseExample1" href="#multiCollapseExample1"></ion-icon>
<div class="collapse multi-collapse" id="multiCollapseExample1">
                                    <div class="card card-body c-animation">
                                        Anim pariatur cliche reprehenderit, enim eiusmod high
                                    </div>
                                </div>
    */


    /*
    <div class="card card-results">
                            <div class="view overlay">
                                <ion-icon name="ellipsis-horizontal-circle-sharp" class="btn dropdown-toggle ion-icon" data-toggle="dropdown"></ion-icon>
                                <div class="dropdown-menu">
                                    <p class="dropdown-item" id="drop-content">singn up to favorite</p>
                                </div>
                                <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                                <a href="/client/views/movies.html" data-src="${el.id}">
                                    <div class="mask rgba-white-slight"></div>
                                 </a>
                                
                            </div>
    
                            <div class="card-body">
                                <h5 class="card-title">${el.title}</h5>
                                <p>March 30 2019</p>
                            </div>
    
                        </div>`;
    */


    /*
    <div class="card card-results">
                            <div class="view overlay">
                                <ion-icon name="ellipsis-horizontal-circle-sharp" class="btn dropdown-toggle ion-icon" data-toggle="dropdown" aria-expanded="true"></ion-icon>
                                <div class="dropdown-menu">
                                    <p >singn up to favorite</p>
                                </div>
                                <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                                <a href="/client/views/movies.html" data-src="${el.id}">
                                    <div class="mask rgba-white-slight"></div>
                                </a>
                                
                            </div>
    
                            <div class="card-body">
                                <h5 class="card-title">${el.title}</h5>
                                <p>March 30 2019</p>
                            </div>
    
                        </div>`;
    */


}

// Initialize Firebase
initializeFirebase();
//cheack if still signed in
console.log(checkUserState());


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
    let movieId = event.srcElement.parentNode.dataset.src
    sessionStorage.setItem("movieId", movieId)
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

const ionIcon = document.querySelector('.content-wrapper');

ionIcon.addEventListener("click", (event) => {
    const favorites = document.querySelector('.favorites-popup');
    const watchlist = document.querySelector('.watchlist-popup');
    const rating = document.querySelector('.user-rating');
    const loginLink = document.querySelector('.link-popup');

    const logout = document.querySelector('#logout-button')

    // console.log(event)

    if (logout.textContent === 'Sign Out') {
        const favorite_html = `<a href="#" class="favorite_html"><p><i class="fas fa-bookmark"></i>Add to Favorites</p></a>`;
        const watchlist_html = `<a href="#" id="watchlist_html"><p><i class="fas fa-list"></i> Add to Watchlist</p></a>`;
        const rating_html = `<a href="#" id="rating_html"><p><i class="fas fa-star"></i> Your Rating</p></a>`;
        // remove login link
        // add icons to favorites, watchlist, and ratins and add links

        favorites.outerHTML = favorite_html;

        loginLink.outerHTML = watchlist_html;

        watchlist.outerHTML = rating_html;

        console.log(favorites)
    }
    console.log(event.target.classList.contains('favorites-popup'))
});

function ionIconClick() {
    const favorites = document.getElementsByClassName('.favorites-popup');
    const watchlist = document.querySelector('.watchlist-popup');
    const rating = document.querySelector('.user-rating');
    const loginLink = document.querySelector('.link-popup');

    if (checkUserState()) {
        // remove login link
        // add icons to favorites, watchlist, and ratins and add links
        console.log(favorites)
    }


}

//sign out user out of firebase
signOutUser(elements.signoutButton)