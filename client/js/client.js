import { initializeFirebase, checkUserState, signOutUser } from "./firebase/firebase.js";
import { elements } from "./models/base.js";
import UserMovies from './models/userInfo.js';

class Client {
    constructor(carousel_pics, api_url, signOut) {
        this.carousel_pics = carousel_pics;
        this.api_url = api_url;
        this.signOut = signOut;
        this.popular = [];
        this.movie = '';
    }

    static trending_movies_url = "https://image.tmdb.org/t/p/w185";


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
        this.popular = popular_results;
        console.log(this.popular)
        trending_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="icon-button">
                                    <ion-icon name="ellipsis-horizontal-circle-sharp" class="ion-icon" 
                                    data-movie="${el.title}"></ion-icon>
                                </div>
                                <a href="${'/client/views/movies.html'}" data-src="${el.id}" >
                                    <img class="img-size" src="${poster_image}" alt="">
                                </a>
                                <div class="card-body">
                                    <h6 class="card-title"> ${el.title}</h6>
                                    <p>${el.release_date}</p>
                                </div>
                            </div>
                        </div>
                    `;

            elements.trending_movies.insertAdjacentHTML('beforeend', html);

        });

        popular_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="icon-button">
                                    <ion-icon name="ellipsis-horizontal-circle-sharp" class="ion-icon" 
                                    data-movie="${el.title}"></ion-icon>
                                </div>
                                <a href="${'/client/views/movies.html'}" data-src="${el.id}">
                                    <img class="img-size" src="${poster_image}" alt="">
                                </a>
                                <div class="card-body">
                                    <h6 class="card-title"> ${el.title}</h6>
                                    <p>${el.release_date}</p>
                                </div>
                            </div>
                        </div>
                    `;

            elements.popular_movies.insertAdjacentHTML('beforeend', html)

        });

        upcoming_results.forEach((el) => {
            let poster_image = "".concat(Client.trending_movies_url, el.poster_path);
            let html;
            console.log(poster_image)

            html = `
                        <div class="swiper-slide">
                            <div class="card">
                                <div class="icon-button">
                                    <ion-icon name="ellipsis-horizontal-circle-sharp" class="ion-icon" 
                                    data-movie="${el.title}"></ion-icon>
                                </div>
                                <a href="${'/client/views/movies.html'}" data-src="${el.id}" class="image">
                                    <img class="img-size" src="${poster_image}" alt="">
                                </a>
                                <div class="card-body">
                                    <h6 class="card-title"> ${el.title}</h6>
                                    <p>${el.release_date}</p>
                                </div>
                            </div>
                        </div>
                    `;

            elements.upcoming_movies.insertAdjacentHTML('beforeend', html)
        });

        this.createTippy();

    }

    createTippy() {
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

    setJumbotronImage() {
        let jumbotron_url = "https://image.tmdb.org/t/p/original";
        const background = document.querySelector('.card-background');
        let random_num = Math.floor(Math.random() * 20);
        let poster_image = "".concat(jumbotron_url, this.popular[random_num].backdrop_path);
        console.log(poster_image)
        background.style.backgroundImage = `url(${poster_image})`
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
console.log(signOut)

const client = new Client(carousel_pics, api_url, signOut);


client.getMovie().then((data) => {


    client.createHtmlElements(data);
    client.setJumbotronImage()


});


//store movie id in session
document.addEventListener("click", (event) => {
    let movieId = event.srcElement.parentNode.dataset.src
    sessionStorage.setItem("movieId", movieId)
});



$(document).on('click', '.ion-icon', (event) => {
    console.log("in the jquery function");
    //console.log(event.target.closest('.ion-icon'));
    let theMovie = event.target.closest('.ion-icon');
    client.movie = theMovie.dataset.movie
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
        let stringMovies = sessionStorage.getItem('userMovies');
        userMovie.userMovies = JSON.parse(stringMovies);

        isMovie = userMovie.userMovies.includes(client.movie)


        const favorite_html = `<p class="favorites-popup" id="favorites"><i class="fas fa-bookmark ${isMovie ? 'indigo-text' : ''} "></i> Add to Favorites</p>`;
        const watchlist_html = `<p class="link-popup" id="watchlist"><i class="fas fa-list"></i> Add to Watchlist</p>`;
        const rating_html = `<p class="watchlist-popup" id="rating"><i class="fas fa-star"></i> Your Rating</p>`;


        $('.favorites-popup').html(favorite_html);
        $('.link-popup').html(watchlist_html);
        $('.watchlist-popup').html(rating_html);


    }

});


$(document).on('click', '#favorites', (event) => {
    //console.log("in the jquery function");
    const logout = document.querySelector('#logout-button');
    const bookmark = document.querySelector('.fa-bookmark');
    const movie = client.movie;




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

});



//sign out user out of firebase
signOutUser(signOut)
