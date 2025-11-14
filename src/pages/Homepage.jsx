
import { useState, useEffect } from "react";
import FirstMovieHero from "../components/FirstMovieHero";
import Card from "../components/Card";
import Layout from "../Layouts/Layout";

export default function Homepage() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [firstMovie, setFirstMovie] = useState({});
    const [firstMovieImage, setFirstMovieImage] = useState();
    const [trailer, setTrailer] = useState("");

    const API_URL = import.meta.env.VITE_API_BASE_URL; // preso da .env
    const TOKEN = import.meta.env.VITE_APP_BEARER_TOKEN; // preso da .env

    const fetchData = async () => {
        try {

            const options = {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TOKEN}`,
                },
            };

            const movieRes = await fetch(`${API_URL}/movie/popular?language=it-IT`, options);
            const movieData = await movieRes.json();
            setMovies(movieData.results || []);

            const seriesRes = await fetch(`${API_URL}/tv/popular?language=it-IT`, options);
            const seriesData = await seriesRes.json();
            setSeries(seriesData.results || []);
            setFirstMovie(movieData.results[0]);

            const firstMovieRes = await fetch(`${API_URL}/movie/${movieData.results[0].id}/images`, options);
            const firstMovieData = await firstMovieRes.json();
            const firstMovieImageRaw = firstMovieData.backdrops.find(image => image.height >= 1500);

            const firstMovieVideos = await fetch(`${API_URL}/movie/${movieData.results[0].id}/videos`, options);
            const videosData = await firstMovieVideos.json();
            console.log(videosData);
            const trailerRaw = videosData.results.find(video => video.type === "Trailer" && video.size === 1080 && video.site === "YouTube");
            console.log("https://www.youtube.com/watch?v=" + trailerRaw.key);
            setTrailer(trailerRaw.key);

            const firstMovideDetails = await fetch(`${API_URL}/movie/${movieData.results[0].id}`, options);
            setFirstMovieImage(firstMovieImageRaw.file_path);



        } catch (error) {
            console.error("Errore nel fetch dei dati TMDB:", error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    return (

        <Layout>
            <div className="h-[70vh] w-full bg-black">
                <FirstMovieHero firstMovie={firstMovie} firstMovieImage={firstMovieImage} firstMovieTrailer={trailer} />

            </div>
            <div className="h-[10vh] w-full  bg-linear-to-b from-black to-transparent z-10"></div>

            <div className="container px-3 mx-auto">

                <section>
                    <h3 className="text-3xl font-bold mb-4 text-white">Migliori film <span className="text-red-500 font-bold"> trending</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {movies.map((movie) => (
                            <Card key={movie.id} name={movie.name} image={movie.poster_path} />
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-3xl font-bold mb-4 text-white">Migliori Serie TV <span className="text-red-500 font-bold"> trending</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {series.map((tv) => (
                            <Card key={tv.id} name={tv.name} image={tv.poster_path} />
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
