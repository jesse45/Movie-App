
(function () {

    let movieId = sessionStorage.getItem('movieID');
    const api_url = "http://localhost:5000/";
    const picture_url = "https://image.tmdb.org/t/p/";

    window.addEventListener("load", async () => {

        let search_api = "".concat('movie', '/', movieId);
        const response = await fetch(api_url + search_api);
        const json = await response.json();
        console.log(json)

        document.querySelector(".card-img-top").src = picture_url + 'original' + json.poster_path




    });



})();