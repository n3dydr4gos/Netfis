import { Play } from "lucide-react";
import Button from "./Button";

export default function FirstMovieHero({ firstMovie, firstMovieImage, firstMovieTrailer }) {
    return (
        <div className="relative flex items-center h-fit lg:h-[70vh]  flex-col lg:flex-row 2xl:h-screen w-full overflow-hidden mx-auto px-10 lg:px-56 ">
            {/* Background image */}
            <img
                src={`https://image.tmdb.org/t/p/original${firstMovieImage}`}
                alt={firstMovie?.title}
                className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
            />

            <div className="absolute inset-0 top-0 left-0 w-4/5 bg-linear-to-r from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
            <div className="absolute inset-y-0 top-0 right-0 w-1/2 bg-linear-to-l from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>


            <iframe
                src={`https://www.youtube.com/embed/${firstMovieTrailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${firstMovieTrailer}`}
                className="lg:absolute top-0 left-0 w-screen h-full object-cover object-center opacity-0 lg:opacity-100"
                allow="autoplay; encrypted-media;"
                allowFullScreen
                style={{ pointerEvents: "none" }}
            />

            {/* Content */}

            <div className="relative z-20 max-w-2xl">
                <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4 text-shadow-[2px_2px_40px_rgba(0,0,0,0.5)] text-shadow-white">
                    {firstMovie?.title}
                </h2>
                <h3 className="text-white text-md leading-relaxed drop-shadow-md">
                    {firstMovie?.overview}
                </h3>
                <div className="flex flex-col md:flex-row md:gap-4">
                    <Button>
                        <Play /> Guarda ora
                    </Button>
                    <Button type={"secondary"}>
                        Altre informazioni
                    </Button>
                </div>
            </div>
        </div>
    );
}
