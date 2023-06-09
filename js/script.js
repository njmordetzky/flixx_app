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

async function displayTopRatedShows() {
    const { results } = await fetchAPIData('tv/top_rated');
    console.log(results);
    results.forEach(show => {
        const div = document.createElement('div');
        div.classList.add('card');
        div.innerHTML = `
            <a href="tv-details.html?id=${show.id}">
                ${
                    show.poster_path 
                        ?
                        `<img
                            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                            class="card-img-top"
                            alt="${show.name}"
                        />`
                        :
                        `<img
                            src="images/no-image.jpg"
                            class="card-img-top"
                            alt="${show.name}"
                        />`
                }
            </a>
            <div class="card-body">
                <h5 class="card-title">${show.name}</h5>
                <p class="card-text">
                    <small class="text-muted">Air Date: ${show.first_air_date}</small>
                </p>
            </div>
      `;

        document.querySelector('#top-rated-shows').appendChild(div);
    });
}

// Display Movie Details
async function displayMovieDetails() {
    const movieID = window.location.search.split('=')[1];
    console.log(movieID);
    const movie = await fetchAPIData(`movie/${movieID}`);
    // overlay for background image
    displayBackgroundImage('movie', movie.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
        <div>
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
        </div>
        <div>
        <h2>${movie.title}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}</p>
        <p>
           ${movie.overview} 
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${movie.genres.map((genre) => 
                `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Movie Info</h2>
        <ul>
        <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(movie.budget)}</li>
        <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(movie.revenue)}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${movie.production_companies.map((company) => `
                <span>${company.name}</span>
            `).join('')}
        </div>
    </div>
    `;

    document.querySelector('#movie-details').appendChild(div);
}

// Display Show Details
async function displayShowDetails() {
    const showID = window.location.search.split('=')[1];
    console.log(showID);
    const show = await fetchAPIData(`tv/${showID}`);
    // overlay for background image
    displayBackgroundImage('tv', show.backdrop_path);

    const div = document.createElement('div');
    div.innerHTML = `
    <div class="details-top">
        <div>
        ${
            show.poster_path 
                ?
                `<img
                    src="https://image.tmdb.org/t/p/w500${show.poster_path}"
                    class="card-img-top"
                    alt="${show.name}"
                />`
                :
                `<img
                    src="images/no-image.jpg"
                    class="card-img-top"
                    alt="${show.name}"
                />`
        }
        </div>
        <div>
        <h2>${show.name}</h2>
        <p>
            <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
        </p>
        <p class="text-muted">Air Date: ${show.last_air_date}</p>
        <p>
           ${show.overview} 
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
            ${show.genres.map((genre) => 
                `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${show.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
        </div>
    </div>
    <div class="details-bottom">
        <h2>Show Info</h2>
        <ul>
        <li><span class="text-secondary">Number Of Episodes:</span> ${show.number_of_episodes}</li>
        <li><span class="text-secondary">Last Episode To Air:</span> ${show.last_episode_to_air.name}</li>
        <li><span class="text-secondary">Status:</span> ${show.status}</li>
        </ul>
        <h4>Production Companies</h4>
        <div class="list-group">
            ${show.production_companies.map((company) => `
                <span>${company.name}</span>
            `).join('')}
        </div>
    </div>
    `;

    document.querySelector('#show-details').appendChild(div);
}

// Display backdrop on details pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.classList.add('background-image');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
    } else {
        document.querySelector('#show-details').appendChild(overlayDiv);  
    }
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = '63efb783f2eefda8ceea8307d905a2ae';
    const API_URL = 'https://api.themoviedb.org/3/';
    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    hideSpinner();
    return data;
}

function showSpinner () {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner () {
    document.querySelector('.spinner').classList.remove('show');
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

function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
            displayTopRatedShows();
            break;
        case '/javascript/flixx-app/movie-details.html':
            console.log('Movie Details');
            displayMovieDetails();
            break;
        case '/javascript/flixx-app/tv-details.html':
            console.log('TV Details');
            displayShowDetails();
            break;
        case '/javascript/flixx-app/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
