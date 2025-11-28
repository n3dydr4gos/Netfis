<p align="center">
<img src="src/assets/netfis_nobg.png" style="width: 200px; object-fit: cover;" alt="Netfis Logo" />
</p>

# 🎬 Netfis

Netfis is an improved Netflix clone created for educational and
portfolio purposes by **Dragos Nedelcu** and **Davide Martinelli**.

The application offers:
- Real-time movie & TV show data
- Trailers, cast, seasons, and similar content
- Favorites system (local persistence)
- Smooth UI inspired by modern streaming platforms

The project focuses on clean architecture, performance, and high-quality UX.

---

## 🚀 Technologies Used

| Technology    | Version | Why it was chosen |
| :------------ | :-----: | :--------------- |
| React         | 19+     | Component architecture, fast rendering |
| Vite          | 7+      | Extremely fast dev server and builds |
| TailwindCSS   | 4+      | Rapid styling, minimal custom CSS |
| React Router  | 7.9     | SPA routing, URL params handling |
| Swiper        | 12+     | Netflix-like sliders/carousels |
| Lucide React  | 0.553   | Lightweight modern icons |
| TMDB API      | —       | High-quality movie/series data |

Node recommended: **>= 22.0**

---

## 📂 Project Structure

```
src/
│
├── assets/          # Logos, images, and other static assets
├── components/      # Reusable UI components (Card, Loader, Navbar, etc.)
├── context/         # Context API for global state (MediaContext, FavouritesContext)
├── hooks/           # Custom hooks
├── layouts/         # Layouts (Navbar + Footer wrapper)
├── pages/           # Main pages (Home, Movies, Series, Details, Search)
└── services/        # API functions and fetch utilities
```

---

## ⚙️ Main Features

- Netflix-style homepage with dynamic hero
- Movie & TV show listings
- Detailed pages with cast, episodes, trailers, and similar content
- Global state management using **Context API**
- Favorites stored locally via **localStorage**
- Fully responsive layout
- Smooth animations

---

## 🌐 APIs Used

**TMDB API Documentation:** [https://developer.themoviedb.org/docs/getting-started](https://developer.themoviedb.org/docs/getting-started)

### Movies

| Function | Description |
|----------|-------------|
| `getPopularMovies()` | Fetch popular movies |
| `getMovieImages(movieId)` | Fetch movie backdrops and posters |
| `getMovieVideos(movieId)` | Fetch trailers and video clips |
| `getMovieDetails(movieId)` | Fetch full movie details (videos, images, credits, keywords) |
| `getMovieGenres()` | Fetch all movie genres |

### TV Series

| Function | Description |
|----------|-------------|
| `getPopularSeries()` | Fetch popular TV series |
| `getSerieImages(serieId)` | Fetch TV show backdrops and posters |
| `getSerieVideos(serieId)` | Fetch trailers and video clips |
| `getSerieDetails(serieId)` | Fetch full TV show details (videos, images, credits, keywords) |
| `getSeasonDetails(tvId, seasonNumber)` | Fetch details for a specific season |
| `getSeriesGenres()` | Fetch all TV genres |

### Search & Recommendations

| Function | Description |
|----------|-------------|
| `searchMulti(query)` | Search for movies, series, and people |
| `similarOperaFunction(genres, type)` | Fetch similar movies/series by genres |

### Homepage / Curated Content

| Function | Description |
|----------|-------------|
| `getHomeContent()` | Fetch curated categories for homepage with movies/series |

### Generic Fetch by ID

| Function | Description |
|----------|-------------|
| `fetchOperaById(id, type)` | Fetch movie/TV by ID. Returns `null` if not found |

---

## 🔐 Environment Variables

```
VITE_APP_BEARER_TOKEN=YOUR_TMDB_API_KEY
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

---

## ▶️ Running the Project

```bash
npm install
npm run dev
```

---

## 🧠 Why Context API instead of Redux?

- Minimal global state required
- No complex reducers needed
- Zero boilerplate
- Better developer experience
- Context API is sufficient for this project

---

## 📦 External Libraries Justification

- **TailwindCSS** — Faster UI building, utility-first approach  
- **Swiper** — Netflix-like horizontal sliders  
- **Lucide-react** — Lightweight, modern icon set  
- **React Router** — Dynamic routing for SPA pages

---

## ⚠️ Known Issues / Limitations

- Missing trailers for some titles  
- Missing backdrops (fallbacks used)  
- API rate limits  
- Favorites stored locally only  
- No authentication  
- No multi-language support

---

## 📜 License

Open-source for educational and portfolio purposes.

---

## ✨ Authors

- **Dragos Nedelcu** — [GitHub](https://github.com/n3dydr4gos) — nedydragos@gmail.com  
- **Davide Martinelli** — [GitHub](https://github.com/davide-its) — davide.martinelli15@gmail.com

