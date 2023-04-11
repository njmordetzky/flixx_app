const global = {
    currentPage: window.location.pathname
};

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
