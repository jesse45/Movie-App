import { initializeFirebase, checkUserState, signOutUser } from "./firebase/firebase.js"
import { elements } from "./models/base.js"

class SearchPage {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url;
        this.json = {};
    }

    async loadSearchPage() {

        let params = (new URL(document.location)).searchParams;
        let searchName = params.get('name')
        console.log(searchName)
        let params2 = new URL(document.location)
        console.log(params2)
        //clear search parameters

        let search_api = "".concat('search', '/', searchName);
        const response = await fetch(this.api_url + search_api);
        this.json = await response.json();
        console.log(this.json)

        return this.json.results;


    }

    async getsearch() {
        window.addEventListener('load', async (event) => {
            let params = (new URL(document.location)).searchParams;
            let searchName = params.get('name')
            console.log(searchName)
            let params2 = new URL(document.location)
            console.log(params2)


            let search_api = "".concat('search', '/', searchName);
            const response = await fetch(this.api_url + search_api);
            this.json = await response.json();
            console.log(json)
            // const content = "this is a test"

            // const mew = {
            //     searchName,
            //     content
            // };
            // const testing = "users"
            // fetch(this.api_url + testing, {
            //     method: 'POST',
            //     body: JSON.stringify(mew),
            //     headers: {
            //         'content-type': 'application/json'
            //     }
            // })

        });

    }

    storeMovieId(id) {
        sessionStorage.setItem("movieID", id);
    }

    createMoviesSearchResults(json) {
        let picture_size = "w92";

        // function to create elements
        let resultsArray = json;

        let html = '';

        resultsArray.forEach((el) => {

            let card_image = "".concat(this.picture_url, picture_size, el.poster_path);

            html = `<div class="card">
            <div class="card-body">
                <a href="${'/client/views/movies.html'}" data-src="${el.id}">
                    <h5 class="card-title">"${"Panel Titile"}"</h5>
                    <img src="${card_image}" alt="">
                </a>
            <p class="card_text">
                "${el.overview}"
            </p>
            </div>
            </div>`;

            document.querySelector(".content-wrapper").insertAdjacentHTML('beforeend', html)

        })
    }

}


// Initialize Firebase
initializeFirebase();
//cheack if still signed in
checkUserState();


const api_url = "http://localhost:5000/"
const picture_url = "https://image.tmdb.org/t/p/";

const searchPage = new SearchPage(api_url, picture_url);

const loadObjects = searchPage.loadSearchPage()
console.log(loadObjects)

loadObjects.then((resolve) => {
    console.log(resolve)
    searchPage.createMoviesSearchResults(resolve)
})
    .catch((reject) => {
        console.log(reject)
    })

//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src
    sessionStorage.setItem("movieId", movieId)
})

//sign out user out of firebase
signOutUser(elements.signoutButton)
