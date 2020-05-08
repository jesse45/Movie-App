const header = document.getElementById("hello");

const api_url = "http://localhost:5000/"
const picture_url = "https://image.tmdb.org/t/p/";

window.addEventListener('load', async (event) => {
    let params = (new URL(document.location)).searchParams;
    let searchName = params.get('name')
    console.log(searchName)
    let params2 = new URL(document.location)
    console.log(params2)
    let responseData = {};
    //console.log(event)
    // event.preventDefault();
    //const formData = new FormData(form);
    //const name = formData.get('name');

    let search_api = "".concat('search', '/', searchName);
    const response = await fetch(api_url + search_api);
    const json = await response.json();

    const content = "this is a test"

    const mew = {
        searchName,
        content
    };
    const testing = "users"
    fetch(api_url + testing, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': 'application/json'
        }
    })

    let picture_size = "w92";

    // function to create elements
    let resultsArray = json.results;

    let html = '';

    resultsArray.forEach((el) => {

        let card_image = "".concat(picture_url, picture_size, el.poster_path);

        html = `<div class="card">
    <div class="card-body">
        <a onclick="storeMovieId('${el.id}')" href="${'/client/views/movies.html'}">
            <h5 class="card-title">"${"Panel Titile"}"</h5>
            <img src="${card_image}" alt="">
        </a>
        <p class="card_text">
        "${el.overview}"
    </p>
    </div>
</div>`;

        document.querySelector(".content-wrapper").insertAdjacentHTML('beforeend', html)


        // let newDiv = document.createElement("div")
        // let header = document.createElement("h5")
        // let paragraph = document.createTextNode(el.overview)
        // let p1 = document.createElement("p")
        // let anotherDiv = document.createElement("div")
        // let card_image = document.createElement("img");
        // let link = document.createElement("a");
        // anotherDiv.classList.add("card");
        // document.querySelector(".content-wrapper").appendChild(anotherDiv)
        // newDiv.classList.add("card-body");
        // anotherDiv.appendChild(newDiv);
        // header.classList.add("card-title");
        // link.href = "".concat("/movie/", el.id)
        // newDiv.appendChild(link)
        // header.textContent = "Panel Title";
        // link.appendChild(header);
        // p1.classList.add("card-text")
        // p1.appendChild(paragraph)
        // link.appendChild(p1)
        // card_image.src = "".concat(picture_url, picture_size, el.poster_path);
        // link.appendChild(card_image)
        // console.log(link.href)
    })



});

function storeMovieId(id) {
    sessionStorage.setItem("movieID", id);
}

//header.textContent = "Hi"
//console.log(responseData)

