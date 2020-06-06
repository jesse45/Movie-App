import { initializeFirebase, checkUserState, signOutUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import { showLoading } from "./models/loading.js";

class NowPlaying {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url;
        this.json = {};
        this.total_pages = 0;
        this.pageNumber = 1;
    }

    async loadMovies() {

        let search_api = "".concat('movie', '/', 'now_playing', '/', this.pageNumber);
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

    createMoviesSearchResults(json) {
        let picture_size = "w342";

        // function to create elements
        let resultsArray = json;

        let html = '';

        resultsArray.forEach((el) => {

            let card_image = "".concat(this.picture_url, picture_size, el.poster_path);

            html = `<div class="card card-results">
                        <div class="view overlay">
                            <ion-icon name="ellipsis-horizontal-circle-sharp"></ion-icon>
                            <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                            <a href="/client/views/movies.html" data-src="${el.id}">
                                <div class="mask rgba-white-slight"></div>
                            </a>
                        </div>

                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                                <p>March 30 2019</p>
                        </div>
                    </div>`;

            document.querySelector(".content-wrapper").insertAdjacentHTML('beforeend', html)

        });
    }

}


// Initialize Firebase
initializeFirebase();
//cheack if still signed in
checkUserState();

// how many pages in the search

const api_url = "http://localhost:5000/"
const picture_url = "https://image.tmdb.org/t/p/";

const nowPlaying = new NowPlaying(api_url, picture_url);

const loading = elements.loading;


const loadObjects = nowPlaying.loadMovies()
console.log(loadObjects)

loadObjects.then((resolve) => {
    console.log(resolve)
    nowPlaying.createMoviesSearchResults(resolve)
})
    .catch((reject) => {
        console.log(reject)
    })

//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src
    sessionStorage.setItem("movieId", movieId)
})

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    // console.log({ scrollTop, scrollHeight, clientHeight });

    if (clientHeight + scrollTop >= scrollHeight) {
        //console.log("to the bottom")

        showLoading(nowPlaying, loading);
    }
});





//sign out user out of firebase
signOutUser(elements.signoutButton)