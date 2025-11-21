import { createContext, useContext, useEffect, useState } from "react";
import {
  getPopularMovies,
  getPopularSeries,
  getMovieImages,
  getMovieVideos,
} from "../services/api";

const MediaContext = createContext();
export const useMedia = () => useContext(MediaContext);

export function MediaProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const [firstMovie, setFirstMovie] = useState(null);
  const [firstMovieImage, setFirstMovieImage] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    try {
      const moviesData = await getPopularMovies();
      const seriesData = await getPopularSeries();

      setMovies(moviesData);
      setSeries(seriesData);

      // Film principale
      const first = moviesData[0];
      setFirstMovie(first);

      const images = await getMovieImages(first.id);
      const bigImage = images.backdrops.find(img => img.height >= 1500);
      setFirstMovieImage(bigImage?.file_path);

      const videos = await getMovieVideos(first.id);
      const trailer = videos.results.find(
        v => v.type === "Trailer" && v.site === "YouTube"
      );
      setTrailer(trailer?.key);

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
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}
