// Selector recap

const button = document.getElementById('click-me');

button.addEventListener('click', (e) => {
  e.currentTarget.innerText = 'Hold still...';
  e.currentTarget.setAttribute("disabled", 'true');
  e.currentTarget.setAttribute('data-uid', 'hsadka');
});


// Movie search with OMDb (GET request)

const movies = document.querySelector('#movies');
const searchForm = document.querySelector('#search-movies');
const input = document.querySelector('#keyword');

const searchMovies = (query) => {
  fetch(`http://www.omdbapi.com/?apikey=adf1f2d7&s=${query}`)
    .then((response) => response.json())
    .then((data) => {
      data.Search.forEach((result) => {
        const movie = `<li class="list-inline-item">
          <img src="${result.Poster}">
          <p>${result.Title}</p>
        </li>`
        movies.insertAdjacentHTML('beforeend', movie);
      });
    });
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault();
  movies.innerHTML = '';
  searchMovies(input.value);
});

// Location search with Algolia (POST request)

const searchInput = document.querySelector("#search");

const searchAlgoliaPlaces = (event) => {
  fetch("https://places-dsn.algolia.net/1/places/query", {
    method: "POST",
    body: JSON.stringify({ query: event.currentTarget.value })
  })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
    });
};

searchInput.addEventListener("keyup", searchAlgoliaPlaces);
