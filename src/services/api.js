const API_URL = import.meta.env.VITE_API_BASE_URL;
const TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN;

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
};

export async function getPopularMovies() {
  const res = await fetch(`${API_URL}/movie/popular?language=it-IT`, options);
  const data = await res.json();
  return data.results || [];
}

export async function getPopularSeries() {
  const res = await fetch(`${API_URL}/tv/popular?language=it-IT`, options);
  const data = await res.json();
  return data.results || [];
}

export async function getMovieImages(movieId) {
  const res = await fetch(`${API_URL}/movie/${movieId}/images`, options);
  const data = await res.json();
  return data;
}

export async function getMovieVideos(movieId) {
  const res = await fetch(`${API_URL}/movie/${movieId}/videos`, options);
  const data = await res.json();
  return data;
}

export async function getMovieDetails(movieId) {
  const res = await fetch(
    `${API_URL}/movie/${movieId}?language=it-IT`,
    options
  );
  const data = await res.json();
  return data;
}

export async function getSerieImages(serieId) {
  const res = await fetch(`${API_URL}/tv/${serieId}/images`, options);
  const data = await res.json();
  return data;
}

export async function getSerieVideos(serieId) {
  const res = await fetch(`${API_URL}/tv/${serieId}/videos`, options);
  const data = await res.json();
  return data;
}

export async function getSerieDetails(serieId) {
  const res = await fetch(`${API_URL}/tv/${serieId}?language=it-IT`, options);
  const data = await res.json();
  return data;
}

export async function getMovieGenres() {
  const res = await fetch(
    `${API_URL}/genre/movie/list?language=it-IT`,
    options
  );
  const data = await res.json();
  return Object.fromEntries(data.genres.map((g) => [g.id, g.name]));
}

export async function getSeriesGenres() {
  const res = await fetch(`${API_URL}/genre/tv/list?language=it-IT`, options);
  const data = await res.json();
  return Object.fromEntries(data.genres.map((g) => [g.id, g.name]));
}

export async function searchMulti(query) {
  const res = await fetch(
    `${API_URL}/search/multi?query=${encodeURIComponent(query)}&language=it-IT`,
    options
  );

  const data = await res.json();
  return data.results || [];
}

export async function similarOperaFunction(genres, type) {
  const endpoint = type === "film" ? "movie" : "tv";
  const genreIds = genres.map(g => g.id).join("|");
  const res = await fetch(
    `${API_URL}/discover/${endpoint}?with_genres=${genreIds}&language=it-IT`,
    options
  );
  const data = await res.json();
  return data.results || [];
}
