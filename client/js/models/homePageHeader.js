
function homepageHeader() {

    const obj = {
        homePageLink: '/client/index.html',
        loginButton: '/client/views/loginUser.html',
        logoutButton: '/client/views/registerUser.html',
        movies: '/client/views/popular.html',
        nowPlaying: '/client/views/nowPlaying.html',
        upcoming: '/client/views/upcoming.html'
    }


    const markup = `
    <nav class="navbar sticky-top navbar-expand-lg navbar-dark blue-gradient">
    <div class="container">
        <!-- Navbar brand -->
        <a class="navbar-brand" href="${obj.homePageLink}">Navbar</a>

        <!-- Collapse button -->
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
            aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Collapsible content -->
        <div class="collapse navbar-collapse" id="basicExampleNav">

            <!-- Links -->
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="${obj.homePageLink}">Home
                        <span class="sr-only">(current)</span>
                    </a>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">Movies</a>
                    <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="${obj.movies}">Popular</a>
                        <a class="dropdown-item" href="${obj.nowPlaying}">Now Playing</a>
                        <a class="dropdown-item" href="${obj.upcoming}">Upcoming</a>
                    </div>
                </li>

                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">People</a>
                    <div class="dropdown-menu dropdown-primary" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#">Popular People</a>
                    </div>
                </li>

            </ul>
            <!-- Links -->
            <ul class="navbar-nav ml-auto ">

                <li class="nav-item">
                    <a class="nav-link" id="login-button" href="${obj.loginButton}">Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" id="logout-button" href="${obj.logoutButton}">Sign Up</a>
                </li>
            </ul>


            <!-- <form class="form-inline">
            <div class="md-form my-0">
                <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
            </div>
        </form> -->
        </div>
        <!-- Collapsible content -->
    </div>
</nav>

    
    `;
    document.querySelector("body").insertAdjacentHTML('afterbegin', markup)
}


homepageHeader();
