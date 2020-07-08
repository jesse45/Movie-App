import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import { showLoading } from "./models/loading.js";
import UserMovies from './models/userInfo.js';

class People {
    constructor(api_url, picture_url) {
        this.api_url = api_url;
        this.picture_url = picture_url;
        this.json = {};
        this.total_pages = 0;
        this.pageNumber = 1;

    }

    async loadMovies() {

        let search_api = 'popularPeople/' + this.pageNumber;
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
    getTotalPages() {
        return this.total_pages;
    }


    createMoviesSearchResults(json) {
        let picture_size = "w185";

        // function to create elements
        let resultsArray = json;

        let html = '';

        resultsArray.forEach((el) => {

            let card_image = this.picture_url + picture_size + el.profile_path;

            html = `<div class="card card-results">
                        <div class="view overlay">
                            <img class="card-img-top card_radius" src="${card_image}" alt="Card image cap">
                            <a href="${`/client/views/actor.html?actorId=${el.id}&actor=${el.name}`}" data-src="${el.id}" >
                                <div class="mask rgba-white-slight"></div>
                            </a>
                            
                        </div>

                        <div class="card-body">
                            <h6 class="card-title">
                                <a href="${`/client/views/actor.html?actorId=${el.id}`}" data-src="${el.id}" >
                                    ${el.name}
                                </a>
                            </h6>
                            <p></p>
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

const api_url = "http://localhost:5000/";
const picture_url = "https://image.tmdb.org/t/p/";

const people = new People(api_url, picture_url);

const loading = elements.loading;

people.loadMovies().then((resolve) => {
    console.log(resolve);
    people.createMoviesSearchResults(resolve);
})

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;


    // console.log({ scrollTop, scrollHeight, clientHeight });
    // console.log(document.documentElement.pageYOffset)

    if (clientHeight + scrollTop >= scrollHeight) {
        //console.log("to the bottom")

        showLoading(people, loading);
    }
});