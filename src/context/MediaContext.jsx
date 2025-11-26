import { createContext, useContext, useEffect, useState } from "react";
import {
  getPopularMovies,
  getPopularSeries,
  getMovieImages,
  getMovieVideos,
  getMovieDetails,
  getMovieGenres,
} from "../services/api";

const MediaContext = createContext();
export const useMedia = () => useContext(MediaContext);

export function MediaProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);

  const fetchAll = async () => {
    try {
      const moviesData = await getPopularMovies();
      const seriesData = await getPopularSeries();
      const genresData = await getMovieGenres();

      setMovies(moviesData);
      setSeries(seriesData);
      setGenres(genresData);

      // Filtra solo i film che hanno una descrizione
      const moviesWithOverview = moviesData.filter(
        (movie) => movie.overview && movie.overview.trim() !== ""
      );
      if (moviesWithOverview.length === 0) {
        console.warn("Nessun film con descrizione disponibile");
        setHero(null);
        return;
      }

      const randomIndex = Math.floor(Math.random() * moviesWithOverview.length);
      const first = moviesWithOverview[randomIndex];

      const [images, videos, details] = await Promise.all([
        getMovieImages(first.id),
        getMovieVideos(first.id),
        getMovieDetails(first.id),
      ]);

      let bigImage = images.backdrops.find((img) => img.height >= 1500);
      if (!bigImage) {
        bigImage = images.backdrops.reduce((max, img) =>
          img.height > max.height ? img : max
        );
      }

      let trailer = videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );
      if (!trailer) {
        const yt = videos.results.filter((v) => v.site === "YouTube");
        trailer = yt[Math.floor(Math.random() * yt.length)];
      }

      setHero({
        movie: first,
        image: bigImage?.file_path,
        trailer: trailer?.key,
        details,
      });
    } catch (e) {
      console.error("Errore nel fetch:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <MediaContext.Provider
      value={{
        movies,
        series,
        genres,
        hero,
        loading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}
