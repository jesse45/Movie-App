export default class UserMovies {
    constructor() {
        this.userMovies = [];
    }

    setMovie(movies) {
        this.userMovies = movies;
    }

    persistData() {
        sessionStorage.setItem('userMovies', JSON.stringify(this.userMovies));
    }
}