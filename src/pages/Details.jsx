import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import {
  fetchOperaById,
  getMovieDetails,
  getMovieImages,
  getMovieVideos,
  getSerieDetails,
  getSerieImages,
  getSerieVideos,
  getSimilar,
} from "../services/api";

import Button from "../components/Button";
import { Play, Volume2, VolumeX } from "lucide-react";
import Layout from "../Layouts/Layout";
import FavouriteButton from "../components/FavouriteButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

import Card from "../components/Card";
import TecnicalInfoDetails from "../components/TecnicalInfoDetails";
import Actor from "../components/Actor";
import Selector from "../components/Selector";
import Loader from "../components/Loader";
import YouTube from "react-youtube";

export default function Details() {
  // React Router utilities
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // Raw opera (passed from previous page)
  let { operaRaw } = location.state || {};

  // Determine content type based on URL
  const contentType = location.pathname.includes("/movie") ? "movie" : "tv";

  // State variables with clearer English names
  const [operaData, setOperaData] = useState(operaRaw || null);
  const [detailsData, setDetailsData] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [videoKeyTMP, setVideoKeyTMP] = useState(null);
  const [similarContent, setSimilarContent] = useState(null);


  // -------------------------------------------
  // YouTube trailer setup
  // -------------------------------------------

  const [muted, setMuted] = useState(true);
  const [player, setPlayer] = useState(null);

  const onReady = (event) => {
    setPlayer(event.target);
    event.target.mute();
  };

  const toggleMute = () => {
    if (!player) return;
    if (muted) {
      player.unMute();
      setMuted(false);
    } else {
      player.mute();
      setMuted(true);
    }
  };



  // -------------------------------------------
  // Fetch main opera if not provided via state
  // -------------------------------------------
  useEffect(() => {
    const loadOpera = async () => {
      try {
        if (!operaData || operaData.id.toString() !== id.toString()) {
          const fetched = await fetchOperaById(id, contentType);

          if (!fetched) {
            navigate("/error");
            return;
          }

          setOperaData(fetched);
          setMuted(true);
          

        }
      } catch (err) {
        console.error(err);
        navigate("/error");
      }
    };

    loadOpera();
  }, [id, operaData, contentType, navigate]);

  // -------------------------------------------------------------
  // Once operaData is ready, fetch details, images and video
  // -------------------------------------------------------------
  useEffect(() => {
    if (!operaData) return;

    const loadDetails = async () => {
      try {
        let detailResponse;
        let imageResponse;
        let videoResponse;

        // TV Show uses "name", Movie uses "title"
        const isMovie = Boolean(operaData.title);

        if (isMovie) {
          detailResponse = await getMovieDetails(operaData.id);
          imageResponse = await getMovieImages(operaData.id);
          videoResponse = await getMovieVideos(operaData.id);
        } else {
          detailResponse = await getSerieDetails(operaData.id);
          imageResponse = await getSerieImages(operaData.id);
          videoResponse = await getSerieVideos(operaData.id);
        }



        if (!detailResponse) {
          navigate("/error");
          return;
        }

        setDetailsData(detailResponse);
        setMainImage(imageResponse.backdrops?.[0]?.file_path || null);

        const trailer =
          videoResponse.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
          ) || videoResponse.results.find((v) => v.site === "YouTube");

        setVideoKey(trailer?.key || "");
      } catch (err) {
        console.error(err);
        navigate("/error");
      }
    };

    loadDetails();

    // -------------------------------------------------------
    // Fetch similar content for recommendations
    // -------------------------------------------------------
    const loadSimilarContent = async () => {
      try {
        const result = await getSimilar(
          operaData.id,
          operaData.title ? "film" : "tv"
        );

        setSimilarContent(result);
      } catch {
        setSimilarContent([]);
      }
    };

    loadSimilarContent();
  }, [operaData, navigate]);

  // -------------------------------------------------------
  // Fallback video if no trailer was found
  // -------------------------------------------------------
  useEffect(() => {
    if (!videoKey) {
      setVideoKeyTMP("GV3HUDMQ-F8");
    }
  }, [videoKey, operaData]);

  // -------------------------------------------------------
  // Loader state
  // -------------------------------------------------------
  if (!detailsData) {
    return <Loader />;
  }

  // -------------------------------------------------------
  // Render component
  // -------------------------------------------------------
  return (
    <Layout>
      {/* Hero section */}
      <div className="relative flex items-center min-h-fit lg:h-[70vh] flex-col lg:flex-row 2xl:h-screen w-full overflow-hidden mx-auto px-10 lg:px-56">
        {/* Background image */}
        {mainImage && (
          <img
            src={`https://image.tmdb.org/t/p/original${mainImage}`}
            alt={detailsData.title || detailsData.name}
            className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
          />
        )}

        {/* Gradients */}
        <div className="absolute inset-0 top-0 left-0 w-4/5 bg-linear-to-r from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
        <div className="absolute inset-y-0 top-0 right-0 w-1/2 bg-linear-to-l from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
        <div className="absolute bottom-0 right-0 w-full h-[55%] bg-linear-to-t from-[#181818] to-transparent z-10 opacity-0 lg:opacity-100"></div>

        {/* Trailer */}
        <YouTube
        key={videoKey || videoKeyTMP}
          videoId={videoKey || videoKeyTMP}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: videoKey || videoKeyTMP,
              rel: 0,
            },
          }}
          onReady={onReady}
          className="lg:absolute top-0 left-0 w-screen h-0 lg:h-full object-cover object-center opacity-0 lg:opacity-100"
        />

        <Button
          onClick={toggleMute}
          className="hidden lg:flex absolute bottom-[10%] right-40 p-2 bg-black/70 rounded-full z-30 items-center justify-center hover:scale-110 transition-transform"
        >
          {muted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
        </Button>

        {/* Details content */}
        <div className="relative z-20 max-w-2xl py-15 lg:py-0 mt-8 lg:mt-0">
          <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4">
            {detailsData.title || detailsData.name}
          </h2>

          <div className="text-white text-sm mb-4 flex flex-wrap gap-4">
            {detailsData.adult && (
              <span className="px-2 py-1 bg-red-600 rounded">
                Vietato ai minori
              </span>
            )}

            {operaData.runtime
              ? `${operaData.runtime} min`
              : operaData.number_of_seasons
                ? `${operaData.number_of_seasons} stagioni`
                : "N/A"}

            {detailsData.genres?.length > 0 && (
              <span>{detailsData.genres.map((g) => g.name).join(", ")}</span>
            )}

            {operaData.release_date?.slice(0, 4) ||
              operaData.first_air_date?.slice(0, 4)}
          </div>

          <h3 className="text-white text-md leading-relaxed drop-shadow-md mb-4">
            {detailsData.overview}
          </h3>

          <div className="flex flex-col gap-4 sm:flex-row mt-10">
            <Button className="w-full sm:w-auto justify-center sm:justify-self-auto" trailer={videoKey || videoKeyTMP} type="guarda">
              <Play /> Guarda ora
            </Button>

            <FavouriteButton
              className="bg-transparent border-white border-2 w-full sm:w-auto justify-center sm:justify-self-auto"
              opera={operaData}
            />
          </div>
        </div>
      </div>

      {/* Episodes section */}
      {!operaData.title && (
        <div className="mt-10 px-10 lg:px-56">
          <h3 className="text-white font-bold text-2xl mb-4 ms-3">Episodi</h3>
          <Selector opera={operaData} />
        </div>
      )}

      {/* Cast */}
      {detailsData.credits?.cast && detailsData.credits.cast.length > 0 && (
        <div className="mt-16 px-10 lg:px-56">
          <h3 className="text-white font-bold text-2xl mb-4">
            Cast principale
          </h3>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            breakpoints={{
              640: { slidesPerView: 5 },
              768: { slidesPerView: 6 },
              1024: { slidesPerView: 7 },
            }}
          >
            {detailsData.credits.cast.slice(0, 12).map((actor) => (
              <SwiperSlide key={actor.id}>
                <Actor actor={actor} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Technical details */}
      <div className="mt-16 px-10 lg:px-56 text-white">
        <h3 className="font-bold text-2xl mb-6">Dettagli tecnici</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-90">
          <TecnicalInfoDetails details={detailsData} />
        </div>
      </div>

      {/* Similar content */}
      {similarContent && similarContent.length > 0 && (
        <div className="mt-10 px-10 lg:px-56">
          <h3 className="text-white font-bold text-2xl mb-4">
            {operaData.title && "Altri film simili:"}
            {!operaData.title && "Altre serie tv simili:"}
          </h3>

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            navigation
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="min-h-100 h-fit"
          >
            {similarContent.map((item) => (
              <SwiperSlide key={item.id} >
                <Card
                  className="aspect-9/16 w-full h-full"
                  id={item.id}
                  type={item.title ? "movie" : "serie"}
                  name={item.title || item.original_name}
                  image={item.poster_path}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </Layout>
  );
}
