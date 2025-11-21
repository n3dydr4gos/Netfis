import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Layout from "../Layouts/Layout";
import Card from "../components/Card";
import { useMedia } from "../context/MediaContext";

export default function Movies() {
  const { movies, loading } = useMedia();

  if (loading) return <p className="text-white">Caricamento...</p>;

  return (
    <Layout>
      <div className="h-full bg-[#181818] px-4 md:px-12 md:pt-12">
        <h2 className="text-5xl font-extrabold py-4">Film</h2>
        <h3>
          Romantici, divertenti, drammatici, horror e tanto altro: solo i film
          sanno suscitare così tante emozioni. Un'ampia scelta di titoli per
          avventure infinite.
        </h3>

        <div className="py-12">
          <h3 className="font-semibold text-2xl">I più amati dal pubblico</h3>

          {/* MOBILE: scroll normale */}
          <div className="flex md:hidden py-4 gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
            {movies.map((movie) => (
              <div key={movie.id} className="min-w-40 snap-start">
                <Card name={movie.title} image={movie.poster_path} />
              </div>
            ))}
          </div>

          {/* DESKTOP: carousel */}
          <div className="hidden md:block py-4 relative overflow-visible">
            <Swiper
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={10}
              navigation
              loop
            >
              {movies.map((movie) => (
                <SwiperSlide
                  key={movie.id}
                  className="flex justify-center overflow-visible"
                >
                  <Card name={movie.title} image={movie.poster_path} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </Layout>
  );
}
