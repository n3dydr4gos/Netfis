import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Layout from "../Layouts/Layout";
import Card from "../components/Card";
import { useMedia } from "../context/MediaContext";

export default function Movies() {
  const { movies, genres = {}, loading } = useMedia();

  if (loading) return <p className="text-white">Caricamento...</p>;

  const genreIdToName = genres;

  function groupMoviesByGenre(moviesList) {
    const groups = {};

    moviesList.forEach((movie) => {
      const ids = movie.genre_ids ?? [];

      if (ids.length === 0) {
        const name = "Senza categoria";
        groups[name] = groups[name] ?? [];
        groups[name].push(movie);
        return;
      }

      ids.forEach((id) => {
        const genreName = genreIdToName[id] || "Senza categoria";
        groups[genreName] = groups[genreName] ?? [];
        if (!groups[genreName].some((m) => m.id === movie.id)) {
          groups[genreName].push(movie);
        }
      });
    });

    return groups;
  }

  const moviesByGenre = groupMoviesByGenre(movies || []);

  const sortedGenreEntries = Object.entries(moviesByGenre)
    .filter(([genreName]) => genreName !== "Senza categoria")
    .sort((a, b) => b[1].length - a[1].length);

  return (
    <Layout>
      <div className="h-full bg-[#181818] px-4 md:px-12 md:pt-12">
        <h2 className="text-5xl font-extrabold py-4">
          Film popolari per categoria
        </h2>
        <h3>
          Romantici, divertenti, drammatici, horror e tanto altro: solo i film
          sanno suscitare così tante emozioni. Un'ampia scelta di titoli per
          avventure infinite.
        </h3>

        {sortedGenreEntries.map(([genreName, films]) => (
          <div key={genreName} className="py-12">
            <h3 className="font-semibold text-2xl">{genreName}</h3>

            {/* MOBILE */}
            <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {films.map((movie) => (
                <div
                  key={`${genreName}-${movie.id}`}
                  className="min-w-40 snap-start"
                >
                  <Card name={movie.title} image={movie.poster_path} />
                </div>
              ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block py-4 relative overflow-visible">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={6}
                navigation
                loop
              >
                {films.map((movie) => (
                  <SwiperSlide key={`${genreName}-${movie.id}`}>
                    <Card name={movie.title} image={movie.poster_path} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
