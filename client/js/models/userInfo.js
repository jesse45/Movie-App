export default class UserMovies {
    constructor() {
        this.bookmarks = [];
        this.watchlist = [];
    }

    setFavorites(movies) {
        this.bookmarks = movies;
    }

    setWatchList(movies) {
        this.watchlist = movies;
    }

    persistFavorites() {
        sessionStorage.setItem('bookmarks', JSON.stringify(this.bookmarks));
        sessionStorage.setItem("user", true)
    }
    persistWatchlist() {
        sessionStorage.setItem('watchlist', JSON.stringify(this.watchlist));
        sessionStorage.setItem("user", true)
    }
}