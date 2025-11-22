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
  const res = await fetch(`${API_URL}/movie/${movieId}?language=it-IT`, options);
  const data = await res.json();
  return data;
}

export async function getSerieDetails(serieId) {
  const res = await fetch(`${API_URL}/tv/${serieId}?language=it-IT`, options);
  const data = await res.json();
  return data;
}

export async function getMovieGenres() {
  const res = await fetch(`${API_URL}/genre/movie/list?language=it-IT`, options);
  const data = await res.json();
  return Object.fromEntries(data.genres.map(g => [g.id, g.name]));
}


export async function getSerieGenrs(serieId) {
  const res = await fetch(`${API_URL}/tv/${serieId}?language=it-IT`, options);
  const data = await res.json();
  return data;
}
    
