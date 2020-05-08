//let header = document.querySelector('h1').textContent = "I like movies";
let carousel_pics = document.querySelectorAll(".carousel_images");

const api_url = "http://localhost:5000/"


getMovie(api_url).then((data) => {
    let trending_movies = data;
    let poster = [];
    let trending_movies_url = "https://image.tmdb.org/t/p/w154";
    //console.log(trending_movies)
    for (let i = 0; i < trending_movies.results.length; i++) {
        poster.push({
            "id": trending_movies.results[i]["id"],
            "title": trending_movies.results[i]["title"],
            "poster_path": trending_movies.results[i]["poster_path"]
        });
    }
    console.log(poster.length)
    //console.log(poster)

    // Object.keys(trending_movies.results).forEach(key => {
    //     console.log(`${key} :  ${trending_movies.results[key]}`);
    //     Object.keys(trending_movies.results[key]).forEach(key2 => {
    //         console.log(`${key2} :  ${trending_movies.results[key][key2]}`);
    //         poster.push({key2 : trending_movies.results[key][key2] })
    //     })
    // })




    for (let i = 0; i < poster.length; i++) {
        let poster_image = "".concat(trending_movies_url, poster[i]["poster_path"]);
        console.log(poster_image)

        html = `<li class="glide__slide">
            <div class="image">
                <div class="wrapper">
                    <a onclick="storeMovieId('${poster[i]["id"]}')" href="${'/client/views/movies.html'}" class="image">
                        <img class="carousel_images" src="${poster_image}" alt="">
                    </a>
                </div>
            </div>
        </li>`;

        document.querySelector(".glide__slides").insertAdjacentHTML('beforeend', html)
        // carousel_pics[i].src = "".concat(trending_movies_url, poster[i]["poster_path"]);
        // console.log(carousel_pics);
    }

    let variable = {
        type: 'carousel',
        startAt: 0,
        perView: 7,
        gap: 100,
        width: 100

    }

    let glide = new Glide('.glide', variable)

    glide.mount()

});


async function getMovie(url) {

    const fetch_response = await fetch(url);
    return await fetch_response.json();

}


// glide

//function for setting up carousel
//"https://image.tmdb.org/t/p/w154/db32LaOibwEliAmSL2jjDF6oDdj.jpg"
//create an array of images and initialize each img to the array


function storeMovieId(id) {
    sessionStorage.setItem("movieID", id);
}

