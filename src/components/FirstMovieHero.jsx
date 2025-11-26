import { Play } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";

export default function FirstMovieHero({ movie, image, trailer, details }) {
  const [isOpen, setIsOpen] = useState(false);

  const firstMovieTrailerSafe = trailer || "GV3HUDMQ-F8";
  const firstMovieDescription = details?.overview || movie?.overview;

  if (!movie || !image || !firstMovieDescription) return null;

  return (
    <>
      {isOpen && (
        <Modal opera={details} operaImage={image} setIsOpen={setIsOpen} />
      )}

      <div className="relative flex items-center min-h-fit lg:h-[70vh] flex-col lg:flex-row 2xl:h-screen w-full overflow-hidden mx-auto px-10 lg:px-56">
        <img
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={movie.title}
          className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
        />

        <div className="absolute inset-0 top-0 left-0 w-4/5 bg-linear-to-r from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
        <div className="absolute inset-y-0 top-0 right-0 w-1/2 bg-linear-to-l from-black to-transparent z-10 opacity-0 lg:opacity-100"></div>
        <div className="absolute bottom-0 right-0 w-full h-[55%] bg-linear-to-t from-[#181818] to-transparent z-10 opacity-0 lg:opacity-100"></div>

        <iframe
          src={`https://www.youtube.com/embed/${firstMovieTrailerSafe}?autoplay=1&mute=1&controls=0&loop=1&playlist=${firstMovieTrailerSafe}`}
          className="lg:absolute top-0 left-0 w-screen h-full object-cover object-center opacity-0 lg:opacity-100"
          allow="autoplay; encrypted-media;"
          allowFullScreen
          style={{ pointerEvents: "none" }}
        />

        <div className="relative z-20 max-w-2xl mb-40 md:mb-0">
          <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4 text-shadow-[2px_2px_40px_rgba(0,0,0,0.5)] text-shadow-white">
            {movie.title}
          </h2>
          <h3 className="text-white text-md leading-relaxed drop-shadow-md">
            {firstMovieDescription}
          </h3>
          <div className="flex flex-col gap-4 md:flex-row my-10">
            <Button>
              <Play /> Guarda ora
            </Button>
            <Button type="secondary" onClick={() => setIsOpen(true)}>
              Altre informazioni
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
