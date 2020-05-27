import { initializeFirebase, checkUserState, signOutUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js"

class Client {
    constructor(carousel_pics, api_url, signOut) {
        this.carousel_pics = carousel_pics;
        this.api_url = api_url;
        this.signOut = signOut
    }

    static trending_movies_url = "https://image.tmdb.org/t/p/w154";


    async getMovie() {

        try {
            const fetch_response = await fetch(this.api_url);
            return await fetch_response.json();
        }
        catch (error) {
            console.log(error)
        }

    }


    createHtmlElements(data) {
        let movie_data = data;
        console.log(movie_data)
        let trending_results;
        let popular_results;
        let upcoming_results;

        Object.entries(movie_data).forEach(([key, value]) => {
            //let poster_image = "".concat(Client.trending_movies_url, poster[i]["poster_path"]);
            if (key === 'trending_results') {
                trending_results = value.results;
            }
            else if (key === 'popular_results') {
                popular_results = value.results;
            }
            else {
                upcoming_results = value.results;
            }

        });
        console.log(trending_results)
        trending_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `<div class="netflix">
                        <div class="swiper-slide">
                            <a href="${'/client/views/movies.html'}" data-src="${el.id}" class="image">
                                <img class="carousel_images" src="${poster_image}" alt="">
                            </a>
                        </div>
                    </div>`;

            elements.trending_movies.insertAdjacentHTML('beforeend', html)
        });
        popular_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `<div class="netflix">
                        <div class="swiper-slide">
                            <a href="${'/client/views/movies.html'}" data-src="${el.id}" class="image">
                                <img class="carousel_images" src="${poster_image}" alt="">
                            </a>
                        </div>
                    </div>`;

            elements.popular_movies.insertAdjacentHTML('beforeend', html)
        });
        upcoming_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `<div class="netflix">
                        <div class="swiper-slide">
                            <a href="${'/client/views/movies.html'}" data-src="${el.id}" class="image">
                                <img class="carousel_images" src="${poster_image}" alt="">
                            </a>
                        </div>
                    </div>`;

            elements.upcoming_movies.insertAdjacentHTML('beforeend', html)
        });

    }

    //store movie id in session
    storeMovieId(id) {
        sessionStorage.setItem("movieID", id);
    }

}

// Initialize Firebase
initializeFirebase();

// check if user is still signed in
checkUserState();




const carousel_pics = elements.carousel_pics;

const api_url = "http://localhost:5000/"
const signOut = elements.signoutButton;

const client = new Client(carousel_pics, api_url, signOut);


client.getMovie().then((data) => {


    client.createHtmlElements(data)


});


//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src
    sessionStorage.setItem("movieId", movieId)
})



//sign out user out of firebase
signOutUser(signOut)
