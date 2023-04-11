const global = {
    currentPage: window.location.pathname
};

async function displayTopRatedMovies() {
    const { results } = await fetchAPIData('movie/top_rated');
    console.log(results);
    results.forEach(movie => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="movie-details.html?id=${movie.id}">
                ${
                    movie.poster_path 
                        ?
                        `<img
                            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
                            class="card-img-top"
                            alt="${movie.title}"
                        />`
                        :
                        `<img
                            src="images/no-image.jpg"
                            class="card-img-top"
                            alt="${movie.title}"
                        />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">
                    <small class="text-muted">Release: ${movie.release_date}</small>
                </p>
            </div>
      `;

        document.querySelector('#top-rated-movies').appendChild(div);
    });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '63efb783f2eefda8ceea8307d905a2ae';
    const API_URL = 'https://api.themoviedb.org/3/';
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
}

// Highlight active link
function highlightActiveLink() {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
        if (link.getAttribute('href') === global.currentPage) {
            link.classList.add('active');
        }
    });
}

// Initialize App
function init() {
    switch (global.currentPage) {
        case '/javascript/flixx-app/index.html':
            console.log('Home');
            displayTopRatedMovies();
            break;
        case '/javascript/flixx-app/shows.html':
            console.log('Shows');
            break;
        case '/javascript/flixx-app/movie-details.html':
            console.log('Movie Details');
            break;
        case '/javascript/flixx-app/tv-details.html':
            console.log('TV Details');
            break;
        case '/javascript/flixx-app/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
