import { useState } from "react";
import { Search } from "lucide-react";
import { searchMulti } from "../services/api";
import Card from "../components/Card";
import Layout from "../Layouts/Layout";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useMedia } from "../context/MediaContext";
import Loader from "../components/Loader";

export default function SearchModal() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { movies, series } = useMedia();

  async function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);

    const data = await searchMulti(query);
    setResults(data);
    setLoading(false);
  }

  return (
    <Layout>
      <section className="container mx-auto pb-10 text-white">
        <div className="my-auto">
          <h1 className="text-3xl font-bold mb-6">Cerca un film o una serie</h1>
          {/* Form ricerca */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-6">
            <input
              type="text"
              className="flex-1 bg-zinc-800 p-3 rounded"
              placeholder="Nome del film/serie..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button className="bg-red-600 px-4 py-2 rounded hover:bg-red-700 cursor-pointer">
              <Search size={16} />
            </button>
          </form>
        </div>
        {/* Loading */}
        {loading && <Loader />}
        {/* Nessun risultato */}
        {!loading && results.length === 0 && hasSearched && (
          <p>Nessun risultato trovato.</p>
        )}

        {/* Prima del submit form */}
        {!hasSearched && (
          <>
            {/* SWIPER FILM */}
            <div className="py-3">
              <h3 className="font-semibold text-2xl mb-2">Film popolari</h3>

              {/* MOBILE */}
              <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {movies.map((movie) => (
                  <div key={movie.id} className="min-w-40 snap-start">
                    <Card
                      id={movie.id}
                      type="movie"
                      name={movie.title}
                      image={movie.poster_path}
                    />
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={4}
                  spaceBetween={20}
                  navigation
                  loop
                >
                  {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                      <Card
                        id={movie.id}
                        type="movie"
                        name={movie.title}
                        image={movie.poster_path}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* SWIPER SERIE */}
            <div className="py-3">
              <h3 className="font-semibold text-2xl mb-2">Serie popolari</h3>

              {/* MOBILE */}
              <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                {series.map((serie) => (
                  <div key={serie.id} className="min-w-40 snap-start">
                    <Card
                      id={serie.id}
                      type="serie"
                      name={serie.name}
                      image={serie.poster_path}
                    />
                  </div>
                ))}
              </div>

              {/* DESKTOP */}
              <div className="hidden md:block">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={4}
                  spaceBetween={20}
                  navigation
                  loop
                >
                  {series.map((serie) => (
                    <SwiperSlide key={serie.id}>
                      <Card
                        id={serie.id}
                        type="serie"
                        name={serie.name}
                        image={serie.poster_path}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </>
        )}

        {/* Risultati */}
        {results.some((r) => r.media_type === "movie") && (
          <div className="py-6">
            <h3 className="font-semibold text-2xl">Film trovati</h3>

            {/* MOBILE */}
            <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {results
                .filter((item) => item.media_type === "movie")
                .map((movie) => (
                  <div
                    key={`movie-${movie.id}`}
                    className="min-w-40 snap-start"
                  >
                    <Card
                      id={movie.id}
                      type="movie"
                      name={movie.title}
                      image={movie.poster_path}
                    />
                  </div>
                ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                loop
              >
                {results
                  .filter((item) => item.media_type === "movie")
                  .map((movie) => (
                    <SwiperSlide key={`movie-${movie.id}`}>
                      <Card
                        id={movie.id}
                        type="movie"
                        name={movie.title}
                        image={movie.poster_path}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        )}

        {results.some((r) => r.media_type === "tv") && (
          <div className="py-6">
            <h3 className="font-semibold text-2xl">Serie TV trovate</h3>

            {/* MOBILE */}
            <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              {results
                .filter((item) => item.media_type === "tv")
                .map((serie) => (
                  <div
                    key={`serie-${serie.id}`}
                    className="min-w-40 snap-start"
                  >
                    <Card
                      id={serie.id}
                      type="serie"
                      name={serie.name || serie.original_name}
                      image={serie.poster_path}
                    />
                  </div>
                ))}
            </div>

            {/* DESKTOP */}
            <div className="hidden md:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={4}
                navigation
                loop
              >
                {results
                  .filter((item) => item.media_type === "tv")
                  .map((serie) => (
                    <SwiperSlide key={`serie-${serie.id}`}>
                      <Card
                        id={serie.id}
                        type="serie"
                        name={serie.name || serie.original_name}
                        image={serie.poster_path}
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}
