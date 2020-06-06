import { elements } from "./base.js";



const deleteLoading = () => {
    const loading = elements.loading;
    loading.classList.remove('show');
}

let pages = 0;
export const showLoading = (searchPage, loading) => {
    loading.classList.add('show');


    let total_pages = searchPage.getTotalPages() - 1;

    // load more data
    if (pages < total_pages) {

        setTimeout(() => {
            searchPage.loadMovies().then((resolve) => {


                console.log(resolve)
                searchPage.createMoviesSearchResults(resolve)
                deleteLoading();

            })
                .catch((reject) => {
                    console.log(reject)
                })


        }, 700);
        pages++;

    }
    else {
        deleteLoading();
    }



}