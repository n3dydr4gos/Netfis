import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
    getMovieDetails,
    getMovieImages,
    getMovieVideos,
    getSerieDetails,
    getSerieImages,
    getSerieVideos,
    similarOperaFunction,
} from "../services/api";
import Button from "../components/Button";
import Modal from "../components/Modal";
import { Play } from "lucide-react";
import Layout from "../Layouts/Layout";
import FavouriteButton from "../components/FavouriteButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Card from "../components/Card";



export default function Details() {
    const location = useLocation();
    const { opera } = location.state || {}; // prendi l'oggetto passato da Link

    const [details, setDetails] = useState(null);
    const [video, setVideo] = useState(null);
    const [image, setImage] = useState(null);
    const [similarOpera, setSimilarOpera] = useState(null);

    // --- Fetch dettagli principali ---
    useEffect(() => {
        if (!opera) return;

        const fetchData = async () => {
            try {
                let detailsData, imagesData, videosData;

                if (opera.title) {
                    detailsData = await getMovieDetails(opera.id);
                    imagesData = await getMovieImages(opera.id);
                    videosData = await getMovieVideos(opera.id);
                } else {
                    detailsData = await getSerieDetails(opera.id);
                    imagesData = await getSerieImages(opera.id);
                    videosData = await getSerieVideos(opera.id);
                }

                setDetails(detailsData);
                setImage(imagesData.backdrops?.[0]?.file_path || null);

                const trailerRaw =
                    videosData.results.find((v) => v.type === "Trailer" && v.site === "YouTube") ||
                    videosData.results.find((v) => v.site === "YouTube");

                setVideo(trailerRaw?.key || "");
            } catch (err) {
                console.error("Errore fetch details:", err);
            }
        };

        fetchData();
    }, [opera]);

    // --- Fetch similar opera ---
    useEffect(() => {
        if (!opera) return;

        const fetchSimilar = async () => {
            try {
                const result = await similarOperaFunction(opera.genres, opera.title ? "film" : "tv");
                setSimilarOpera(result);
            } catch (err) {
                console.error("Errore fetch similar opera:", err);
            }
        };

        fetchSimilar();
    }, [opera]);

    // --- Loading state ---
    if (!details || !image || !video) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="relative flex items-center min-h-fit lg:h-[70vh] flex-col lg:flex-row 2xl:h-screen w-full overflow-hidden mx-auto px-10 lg:px-56">
                {/* Background image */}
                <img
                    src={`https://image.tmdb.org/t/p/original${image}`}
                    alt={details.title || details.name}
                    className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
                />

                <div className="absolute inset-0 top-0 left-0 w-4/5 bg-linear-to-r from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
                <div className="absolute inset-y-0 top-0 right-0 w-1/2 bg-linear-to-l from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
                <div className="absolute bottom-0 right-0 w-full h-[55%] bg-linear-to-t from-[#181818] to-transparent z-10 opacity-0 lg:opacity-100"></div>

                {/* Trailer iframe */}
                <iframe
                    src={`https://www.youtube.com/embed/${video}?autoplay=1&mute=1&controls=0&loop=1&playlist=${video}`}
                    className="lg:absolute top-0 left-0 w-screen h-full object-cover object-center opacity-0 lg:opacity-100"
                    allow="autoplay; encrypted-media;"
                    allowFullScreen
                    style={{ pointerEvents: "none" }}
                />

                {/* Content */}
                <div className="relative z-20 max-w-2xl mb-40 md:mb-0">
                    {/* Titolo */}
                    <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4">
                        {details.title || details.name}
                    </h2>

                    {/* Info aggiuntive */}
                    <div className="text-white text-sm mb-4 flex flex-wrap gap-4">
                        {details.adult && <span className="px-2 py-1 bg-red-600 rounded">Vietato ai minori</span>}
                        {opera.runtime
                            ? `${opera.runtime} min`
                            : opera.number_of_seasons
                                ? `${opera.number_of_seasons} stagioni`
                                : "N/A"}
                        {details.genres?.length > 0 && (
                            <span >
                                {details.genres.map((g) => g.name).join(", ")}
                            </span>
                        )}
                        {opera.release_date?.slice(0, 4) ||
                            opera.first_air_date?.slice(0, 4)}
                    </div>

                    {/* Overview */}
                    <h3 className="text-white text-md leading-relaxed drop-shadow-md mb-4">{details.overview}</h3>

                    {/* Pulsanti */}
                    <div className="flex flex-col gap-4 md:flex-row my-10">
                        <Button className={"w-full md:w-auto justify-center md:justify-self-auto"}>
                            <Play /> Guarda ora
                        </Button>
                        <FavouriteButton className={"bg-transparent border-white border-2  w-full md:w-auto justify-center md:justify-self-auto"} opera={opera} />

                    </div>
                </div>


            </div>

            {/* Se vuoi mostrare similarOpera */}
            {similarOpera && similarOpera.length > 0 && (
                <div className="mt-10 px-10 lg:px-56">
                    <h3 className="text-white font-bold text-2xl mb-4">
                        {opera.title && ("Altri film simili:")}
                        {!opera.title && ("Altre serie tv simili:")}
                    </h3>

                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={2}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 4 },
                            1024: { slidesPerView: 6 },
                            1280: { slidesPerView: 8 },
                        }}
                    >
                        {similarOpera.map(item => (
                            <SwiperSlide key={item.id}>
                                <Card key={item.id} id={item.id} name={item.name} image={item.poster_path} type={item.title ? "film" : "serie"} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                </div>
            )}

        </Layout>
    );
}
