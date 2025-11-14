import { Play } from "lucide-react";
import Button from "./Button";
import { useEffect, useState, useTransition } from "react";

export default function FirstMovieHero({ firstMovie, firstMovieImage, firstMovieTrailer }) {



    return (
        <>
            {/* Video YouTube */}


            {/* Placeholder image con dissolvenza */}

            <img
                src={`https://image.tmdb.org/t/p/original${firstMovieImage}`}
                alt={firstMovie?.title}
                className="absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-2000 z-10 opacity-100"

            />


            {/* Gradient*/}
            {/* <div className="absolute inset-x-0 top-5 h-1/3 bg-linear-to-b from-black to-transparent z-10"></div>

            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-black to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-black to-transparent z-10"></div>

            <div className="absolute inset-x-0 bottom-0 h-1/10 bg-gradient-to-t from-black to-transparent z-10"></div> */}
            {/* Content */}
            <div className="relative flex flex-col lg:flex-row justify-center items-center h-screen w-full overflow-hidden mx-auto px-10 lg:px-56">
                <div className="relative z-20 max-w-2xl">
                    <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4 text-shadow-[2px_2px_40px] text-shadow-white">
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

                <iframe
                    src={`https://www.youtube.com/embed/${firstMovieTrailer}?autoplay=1&mute=1&controls=0&loop=1&playlist=${firstMovieTrailer}&modestbranding=1&rel=0`}
                    className=" w-1/2 rounded-4xl aspect-video mx-auto object-cover object-top shadow-[4px_4px_100px] shadow-black z-10"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    style={{ pointerEvents: "none" }}
                />
            </div>
        </>
    );
}
