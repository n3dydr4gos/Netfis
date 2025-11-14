
import { useState, useEffect } from "react";
import FirstMovieHero from "../components/FirstMovieHero";

export default function Homepage() {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [firstMovie, setFirstMovie] = useState({});
    const [firstMovieImage, setFirstMovieImage] = useState();

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

            const firstMovideDetails = await fetch(`${API_URL}/movie/${movieData.results[0].id}`, options);
            console.log(firstMovideDetails);
            setFirstMovieImage(firstMovieImageRaw.file_path);



        } catch (error) {
            console.error("Errore nel fetch dei dati TMDB:", error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    console.log(firstMovie);
    console.log(firstMovieImage);

    return (

        <>
            <div className="h-[70vh] w-full bg-black">
                <FirstMovieHero firstMovie={firstMovie} firstMovieImage={firstMovieImage} />

            </div>
            <div className="h-[10vh] w-full  bg-linear-to-b from-black to-transparent z-10"></div>

            <div className="container mx-auto">

                <h1 className="text-3xl font-bold mb-4">Migliori Film</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-gray-900 text-white rounded-xl p-2 shadow-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                className="rounded-lg"
                            />
                            <h2 className="mt-2 font-semibold text-center">{movie.title}</h2>
                        </div>
                    ))}
                </div>

                <h1 className="text-3xl font-bold mb-4">📺 Migliori Serie TV</h1>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {series.map((tv) => (
                        <div key={tv.id} className="bg-gray-900 text-white rounded-xl p-2 shadow-lg">
                            <img
                                src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                alt={tv.name}
                                className="rounded-lg"
                            />
                            <h2 className="mt-2 font-semibold text-center">{tv.name}</h2>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
