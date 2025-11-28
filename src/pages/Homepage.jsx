import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useMedia } from "../context/MediaContext";
import Card from "../components/Card";
import Layout from "../Layouts/Layout";
import FirstMovieHero from "../components/FirstMovieHero";
import Loader from "../components/Loader";
import { Navigation } from "swiper/modules";

export default function Homepage() {
  const { hero, loading, homeOpera } = useMedia();

  if (loading) return <Loader />;
  if (!hero) return null;

  return (
    <Layout>
      <FirstMovieHero
        movie={hero.movie}
        image={hero.image}
        trailer={hero.trailer}
        details={hero.details}
      />
      <div className="container mx-auto px-3 py-10">
        {homeOpera.map((opera, index) => (
          <div className="py-4" key={index}>
            <h3 className="font-semibold text-3xl pb-5 px-3">{opera.label}</h3>
            {/* MOBILE */}
            <div className="flex md:hidden gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
              <Swiper
                modules={[Navigation]}
                spaceBetween={14}
                slidesPerView={Math.min(opera.items.length, 1.5)}
              >
                {opera.items.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <div className="px-3">
                      <Card
                        id={movie.id}
                        type={movie.title ? "movie" : "serie"}
                        name={movie.title || movie.original_name}
                        image={movie.poster_path}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {/* DESKTOP */}
            <div className="hidden md:block">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={Math.min(opera.items.length, 4.5)}
                navigation
              >
                {opera.items.map((movie) => (
                  <SwiperSlide key={movie.id}>
                    <div className="p-3">
                      <Card
                        id={movie.id}
                        type={movie.title ? "movie" : "serie"}
                        name={movie.title || movie.original_name}
                        image={movie.backdrop_path}
                        backdrop={"max-h-42"}
                      />
                    </div>
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
