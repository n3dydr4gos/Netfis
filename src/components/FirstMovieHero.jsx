/* 
  FirstMovieHero Component
  ------------------------
  Displays a large hero section for the first highlighted movie on the homepage.
  - Shows a background image, YouTube trailer (autoplay), title, and description.
  - Provides two buttons: "Guarda ora" and "Altre informazioni".
  - Opens a modal with movie details when requested.
  - Includes fallback trailer and safe access to movie/description props.
*/

import { Play, Volume2, VolumeX } from "lucide-react";
import Button from "./Button";
import { useState } from "react";
import Modal from "./Modal";
import YouTube from "react-youtube";

export default function FirstMovieHero({ movie, image, trailer, details }) {
  const [isOpen, setIsOpen] = useState(false);
  ;
  const firstMovieTrailerSafe = trailer || "GV3HUDMQ-F8";
  const firstMovieDescription = details?.overview || movie?.overview;


  if (!movie || !image || !firstMovieDescription) return null;

  const [muted, setMuted] = useState(true);
  const [player, setPlayer] = useState(null);


  if (!movie || !firstMovieDescription) return null;

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

        <YouTube
          videoId={firstMovieTrailerSafe}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: firstMovieTrailerSafe,
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

        <div className="relative z-20 max-w-2xl py-15 lg:py-0 mt-8 lg:mt-0">
          <h2 className="text-white text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-4 text-shadow-[2px_2px_40px_rgba(0,0,0,0.5)] text-shadow-white">
            {movie.title}
          </h2>
          <h3 className="text-white text-md leading-relaxed drop-shadow-md">
            {firstMovieDescription}
          </h3>
          <div className="flex flex-col gap-4 md:flex-row mt-10">
            <Button className={"w-full md:w-auto justify-center md:justify-self-auto"} trailer={firstMovieTrailerSafe} type="guarda">
              <Play /> Guarda ora
            </Button>
            <Button type="secondary" onClick={() => setIsOpen(true)} className={"w-full md:w-auto justify-center md:justify-self-auto"}>
              Altre informazioni
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
