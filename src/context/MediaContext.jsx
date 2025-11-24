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
  const [firstMovie, setFirstMovie] = useState(null);
  const [firstMovieDetails, setFirstMovieDetails] = useState(null);
  const [firstMovieImage, setFirstMovieImage] = useState(null);
  const [trailer, setTrailer] = useState(null);
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

      const randomIndex = Math.floor(Math.random() * moviesData.length);
      const first = moviesData[randomIndex];
      setFirstMovie(first);

      const images = await getMovieImages(first.id);
      let bigImage = images.backdrops.find((img) => img.height >= 1500);

      // Se non ne trova una >= 1500, prende quella con l’altezza maggiore
      if (!bigImage) {
        bigImage = images.backdrops.reduce((max, img) => {
          return img.height > max.height ? img : max;
        });
      }

      setFirstMovieImage(bigImage?.file_path);

      const videos = await getMovieVideos(first.id);

      // Cerca il trailer YouTube specifico
      let trailer = videos.results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
      );

      // Se non esiste, prende un video YouTube a caso
      if (!trailer) {
        const youtubeVideos = videos.results.filter((v) => v.site === "YouTube");
        if (youtubeVideos.length > 0) {
          trailer = youtubeVideos[Math.floor(Math.random() * youtubeVideos.length)];
        }
      }

      setTrailer(trailer?.key);

      const firstDetails = await getMovieDetails(first.id);
      setFirstMovieDetails(firstDetails);
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
        firstMovie,
        firstMovieImage,
        trailer,
        loading,
        firstMovieDetails,
        genres,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}
