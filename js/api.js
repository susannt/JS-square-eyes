const API_URL = "https://v2.api.noroff.dev/square-eyes";
const genreSelect = document.getElementById("genre-select");
const movieListContainer = document.getElementById("movie-list");

let allMovies = [];

genreSelect.addEventListener("change", () => {
  const selectedGenre = genreSelect.value;
  showMovies(selectedGenre);
});

async function fetchMovies() {
  movieListContainer.textContent = "Loading movies...";

  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    allMovies = result.data || [];

    const genres = getUniqueGenres(allMovies);
    buildGenreDropdown(genres);

    showMovies("all");
  } catch (error) {
    movieListContainer.textContent = "Failed to load movies. Please try again later.";
    console.error("Error fetching movies:", error);
  }
}

function buildGenreDropdown(genres) {
  genreSelect.innerHTML = ""; 

  const defaultOption = document.createElement("option");
  defaultOption.value = "all";
  defaultOption.textContent = "All";
  genreSelect.appendChild(defaultOption);

  genres.forEach(genre => {
    const option = document.createElement("option");
    option.value = genre;
    option.textContent = genre;
    genreSelect.appendChild(option);
  });
}

function showMovies(filterGenre = "all") {
  movieListContainer.innerHTML = ""; 

  const filteredMovies = filterGenre === "all"
    ? allMovies
    : allMovies.filter(movie => movie.genre === filterGenre);

  if (filteredMovies.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No movies found in this genre.";
    movieListContainer.appendChild(message);
    return;
  }

  filteredMovies.forEach(movie => {
    const movieCard = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = `${movie.title} (${movie.released})`;

    const img = document.createElement("img");
    img.src = movie.image.url;
    img.alt = movie.title;
    img.width = 200;

    const price = document.createElement("p");
    price.textContent = `${movie.price} kr`;

    const link = document.createElement("a");
    link.href = `product.html?id=${movie.id}`;
    link.className = "cta";
    link.textContent = "See more";

    movieCard.appendChild(title);
    movieCard.appendChild(img);
    movieCard.appendChild(price);
    movieCard.appendChild(link);

    movieListContainer.appendChild(movieCard);
  });
}

function getUniqueGenres(movies) {
  const genres = movies.map(movie => movie.genre).filter(Boolean);
  return [...new Set(genres)].sort();
}

fetchMovies();
