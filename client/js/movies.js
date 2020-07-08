import { initializeFirebase, checkUserState, signOutUser, signInUser } from "./firebase/firebase.js";
import { elements, baseUrls } from "./models/base.js";
import UserMovies from './models/userInfo.js';

class MainMovie {
    constructor() {
        this.json = {};
        this.movie = '';
    }

    async getMovie() {
        const api_url = baseUrls.api_url;

        // let movieId = sessionStorage.getItem('movieId');

        //get movieId from the url
        let params = (new URL(document.location)).searchParams;
        let movieId = params.get('movieId')
        let movie = params.get('movie');
        console.log(movie)
        console.log(movieId)


        let search_api = 'movie' + '/' + movieId;
        const response = await fetch(api_url + search_api);
        this.json = await response.json();
        console.log(this.json);
        this.movie = this.json.title;

        //set movie in session storage
        this.setMovie();

        this.createMovie();
        this.getCast();
        this.getReviews();
        this.getRecommendations();
        this.budgetToString();

    }

    createMovie() {
        const picture_url = baseUrls.picture_url;
        try {
            elements.headerLarge.style.backgroundImage = `url(${picture_url + 'original' + this.json.backdrop_path})`;
            elements.poster.src = baseUrls.picture_url + 'w300' + this.json.poster_path;
            elements.poster.alt = this.json.title;

            let movieRelease = this.json.release_date.split('-', 1);
            console.log(movieRelease)
            elements.movieTitle.textContent = this.json.title;

            elements.rating.textContent = this.getCertificate();
            elements.releaseYear.textContent = `(${movieRelease[0]})`;
            elements.releaseDate.textContent = this.json.release_date;
            elements.runtime.textContent = String(this.json.runtime) + ' mins';
            elements.genre.textContent = this.getGenre();
            elements.voteAverage.textContent = this.json.vote_average;
            elements.tagline.textContent = this.json.tagline;
            elements.summary.textContent = this.json.overview;
            elements.twitterLink.href = 'https://www.twitter.com/' + this.json.external_ids.twitter_id;
            elements.facebookLink.href = 'https://www.facebook.com/' + this.json.external_ids.facebook_id;
            elements.instagramLink.href = 'https://www.instagram.com/' + this.json.external_ids.instagram_id;
            elements.homepageLink.href = this.json.homepage;
            // element.reviews.


            // elements.status.firstChild.textContent = this.json.status;
            // elements.revenue.firstChild.textContent = this.json.revenue;
            // elements.budget.firstChild.textContent = this.json.budget;
            // elements.language.firstChild.nodeValue = this.json.language;
            elements.status.insertAdjacentHTML("beforeend", this.json.status)
            elements.revenue.insertAdjacentHTML("beforeend", '$' + this.json.revenue.toLocaleString());
            elements.budget.insertAdjacentHTML("beforeend", '$' + this.json.budget.toLocaleString());;
            elements.language.insertAdjacentHTML("beforeend", this.json.spoken_languages.name);;
        }
        catch (error) {
            console.log(error)
        }
    }

    setMovie() {
        sessionStorage.setItem("movieID", this.json.id);
        console.log('ji')
    }

    getCast() {
        const cast = this.json.credits.cast.slice(0, 8);
        let html

        console.log(cast)

        cast.forEach((el) => {
            let picture = baseUrls.picture_url + 'w185' + el.profile_path;

            html = `
                        <li class="card people">
                            <a href="${`/client/views/actor.html?actorId=${el.id}&actor=${el.name}`}" data-src="${el.id}">
                                <img class="img-size" src="${picture}" alt="${el.name}">
                            </a>
                            <p>
                                <a href="#"> ${el.character}</a>
                            </p>
                            <p>${el.name}</p>
                        </li>
            `;
            elements.castCarousel.insertAdjacentHTML('beforeend', html)
        });

    }


    budgetToString() {
        let stringBudget = this.json.budget;

        console.log(stringBudget.toLocaleString())


    }


    getCertificate() {

        let certificate = this.json.release_dates.results.find(el => el.iso_3166_1 === 'US');
        // .find(el => el.iso_3166_1 === 'US')

        return certificate.release_dates[0].certification;
    }

    getGenre() {
        let genre = this.json.genres;
        let genreString = [];

        genre.forEach(element => {
            genreString.push(element.name);
        });

        genreString.join(' | ')
        // genre.forEach(element => {
        //     genreString += element.name + '|';
        // });

        // console.log(genreString.slice(0, -1));


        return genreString.join(' | ');
    }

    getReviews() {
        let reviews = this.json.reviews;
        let random_number;
        let newReviewArray;

        if (reviews.length == 0) {
            elements.discussionTitle.textContent = 'No Review Author';
            elements.discussionText.textContent = 'No Reviews available yet';
            //elements.discussionTitle.href = reviews.results.url;
        }
        if (this.json.reviews.total_results > 3) {
            random_number = Math.floor(Math.random() * 3)
            console.log(random_number)
            newReviewArray = this.json.reviews.results[random_number];
            elements.discussionTitle.textContent = 'Review Written by ' + newReviewArray.author;
            elements.discussionText.textContent = newReviewArray.content;
            elements.discussionTitle.href = newReviewArray.url;
        }
        else {
            elements.discussionTitle.textContent = 'Review Written by ' + newReviewArray.author;
            elements.discussionText.textContent = newReviewArray.content;
            elements.discussionTitle.href = newReviewArray.url;
        }
        // let random_number = Math.floor(Math.random() * this.json.reviews.total)
    }

    getRecommendations() {
        let recommendation = this.json.recommendations;
        console.log(recommendation)
        let html
        //recommendations no larger than 10.

        if ((recommendation.total_results >= 10) ? true : false) {
            recommendation.results.slice(0, 9).forEach((el) => {
                html = `
                        <li class="image_card">
                            <div class="image_content">
                                <a href="${`/client/views/movies.html?movieId=${el.id}&movie=${el.title}`}">
                                    <img src="${baseUrls.picture_url + 'w300' + el.backdrop_path}"></img>
                                </a>
                            </div>
                        </li>
                `;
                elements.recommendedMovies.insertAdjacentHTML("beforeend", html)
            });
        }
        else {
            recommendation.results.forEach((el) => {
                html = `
                <li class="image_card">
                    <div class="image_content">
                        <a href="${`/client/views/movies.html?movieId=${el.id}&movie=${el.title}`}">
                            <img src="${baseUrls.picture_url + 'w300' + el.backdrop_path}"></img>
                        </a>
                    </div>
                </li>
        `;
                elements.recommendedMovies.insertAdjacentHTML("beforeend", html)
            });
        }

    }

}

// Initialize Firebase
initializeFirebase();

// check if user is still signed in
checkUserState();


// Tooltips Initialization
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })
const api_url = "http://localhost:5000/";
const mainMovie = new MainMovie();

mainMovie.getMovie();


// document.addEventListener('load', (event) => {
//     if (logout.textContent === 'Sign Out') {
//         //get the user movies
//         let stringMovies = sessionStorage.getItem('userMovies');
//         userMovie.userMovies = JSON.parse(stringMovies);

//         isMovie = userMovie.userMovies.includes(popular.movie);
//         console.log(isMovie)

//         if (isMovie) {
//             elements.bookmark.classList.add('indigo-text');
//         }


//     }

// });


$(window).on("load", (event) => {
    console.log("in jquery functino")
    let user = sessionStorage.getItem('user');
    let userMovie = new UserMovies();
    let isbookmark;
    let isWatchlist;
    let params = (new URL(document.location)).searchParams;
    let movie = params.get('movie');

    if (user) {
        //get the user movies
        let bookmarks = sessionStorage.getItem('bookmarks');
        userMovie.bookmarks = JSON.parse(bookmarks);
        let watchlist = sessionStorage.getItem('watchlist');
        userMovie.watchlist = JSON.parse(watchlist);

        console.log(mainMovie.movie)
        isbookmark = userMovie.bookmarks.includes(movie);
        isWatchlist = userMovie.watchlist.includes(movie);
        console.log(isbookmark)

        if (isbookmark) {
            elements.bookmark.classList.add('blue-text');
        }
        if (isWatchlist) {
            elements.watchList.classList.add('blue-text');
        }




    }

});





$(document).on('click', '.bookmark', (event) => {
    console.log("in the jquery favorites function");
    let user = sessionStorage.getItem('user');
    const logout = document.querySelector('#logout-button');
    const bookmark = document.querySelector('.fa-bookmark');
    const movie = mainMovie.movie;




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



$(document).on('click', '.list', (event) => {
    //console.log("in the jquery function");
    let user = sessionStorage.getItem('user');
    const logout = document.querySelector('#logout-button');
    const watchList = document.querySelector('.fa-list');
    const movie = mainMovie.movie;

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




// .vote_average, .favorites-heart {
//     font-weight: 300;

//     font-size: 18px;
//     /* font-weight: 700; */
//     line-height: 50px;
//     position: absolute;
//     width: 50px;
//     text-align: center;
// }
// .vote_average::after, .favorites-heart::after {

//     border-radius: 100%;
//     border: 2px solid #C4AF3D;
//     /* #ee927b */
//     content: '';
//     height: 100%;
//     left: 0;
//     position: absolute;
//     top: 0;
//     width: 100%;

// }



// (function () {

//     const api_url = "http://localhost:5000/";
//     const picture_url = "https://image.tmdb.org/t/p/";

//     window.addEventListener("load", async () => {
//         let movieId = sessionStorage.getItem('movieId');
//         let search_api = "".concat('movie', '/', movieId);
//         const response = await fetch(api_url + search_api);
//         const json = await response.json();
//         console.log(json)

//         document.querySelector(".card-img-top").src = picture_url + 'original' + json.poster_path




//     });



// })();


{/* <div class="container">
            <div class="content-wrapper">
                <!-- Card -->
                <div class="card">

                    <!-- Card image -->
                    <div class="view overlay">
                        <img class="card-img-top" src="" alt="Card image cap">
                        <a href="#!">
                            <div class="mask rgba-white-slight"></div>
                        </a>
                    </div>

                    <!-- Card content -->
                    <div class="card-body">

                        <!-- Title -->
                        <h4 class="card-title">Card title</h4>
                        <!-- Text -->
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of
                            the card's
                            content.</p>
                        <!-- Button -->
                        <a href="#" class="btn btn-primary">Button</a>

                    </div>

                </div>
                <!-- Card -->

            </div>

        </div> */}