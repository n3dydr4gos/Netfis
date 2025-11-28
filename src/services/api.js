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
    `${API_URL}/movie/${movieId}?language=it-IT&append_to_response=videos,images,credits,keywords`,
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
  const res = await fetch(`${API_URL}/tv/${serieId}?language=it-IT&append_to_response=videos,images,credits,keywords`, options);
  const data = await res.json();
  return data;
}

export async function getSeasonDetails(tvId, seasonNumber) {
  const res = await fetch(
    `${API_URL}/tv/${tvId}/season/${seasonNumber}?language=it-IT`,
    options
  );
  return res.json();
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

export async function getSimilar(operaId, type) {
  const endpoint = type === "film" ? "movie" : "tv";
  const res = await fetch(`${API_URL}/${endpoint}/${operaId}/similar?language=it-IT`, options);
  const data = await res.json();
  return data.results || [];
}


export async function getHomeContent() {
  const combos = [
    {
      label: "Film d’azione con un pizzico di suspense",
      type: "movie",
      genres: [28, 53], // Azione + Thriller
    },
    {
      label: "Commedie romantiche che scaldano il cuore",
      type: "movie",
      genres: [35, 10749], // Commedia + Romantico
    },
    {
      label: "Thriller psicologici",
      type: "movie",
      genres: [53, 18], // Thriller + Dramma
    },
    {
      label: "Serie di fantascienza e mistero",
      type: "serie",
      genres: [10765, 9648], // Sci-Fi + Mistery
    },
    {
      label: "Drammi intensi e coinvolgenti",
      type: "movie",
      genres: [18], // Dramma
    },
    {
      label: "Horror che ti tengono sveglio la notte",
      type: "movie",
      genres: [27, 53], // Horror + Thriller
    },
    {
      label: "Avventure epiche e battaglie leggendarie",
      type: "movie",
      genres: [12, 28], // Fantasy/Avventura + Azione
    },
    {
      label: "Commedie leggere per ridere senza pensieri",
      type: "movie",
      genres: [35], // Commedia
    },
    {
      label: "Serie romantiche con colpi di scena",
      type: "serie",
      genres: [10749, 18], // Romantico + Dramma
    },
    {
      label: "Documentari che aprono la mente",
      type: "movie",
      genres: [99], // Documentario
    },
    {
      label: "Serie crime con misteri da risolvere",
      type: "serie",
      genres: [80, 9648], // Crime + Mistery
    },
    {
      label: "Film d’animazione per grandi e piccini",
      type: "movie",
      genres: [16, 35], // Animazione + Commedia
    },
    {
      label: "Drammi storici e coinvolgenti",
      type: "movie",
      genres: [18, 36], // Dramma + Storia
    },
    {
      label: "Film di guerra con azione e tensione",
      type: "movie",
      genres: [10752, 28], // Guerra + Azione
    }
  ];

  try {
    const fetches = combos.map(combo => {
      const genreString = combo.genres.join(",");
      const endpoint =
        combo.type === "movie" ? "discover/movie" : "discover/tv";

      return fetch(
        `${API_URL}/${endpoint}?with_genres=${genreString}&language=it-IT`,
        options
      )
        .then(r => r.json())
        .then(data => ({
          label: combo.label,
          type: combo.type,
          items: data.results || []
        }));
    });

    const results = await Promise.all(fetches);
    return results;
  } catch (error) {
    console.error("Errore nel caricamento dei contenuti combinati:", error);
    return [];
  }
}

export async function fetchOperaById(id, type) {
  try {
    const res = await fetch(
      `${API_URL}/${type}/${id}&language=it-IT`,
      options
    );

    if (!res.ok) {
      throw new Error("Errore nel recupero dei dati");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Errore fetchOperaById:", err);
    return null;
  }
};
