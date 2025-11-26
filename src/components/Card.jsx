import { useState } from "react";
import Modal from "./Modal";
import { getMovieDetails, getSerieDetails } from "../services/api";
import FallbackImage from "../assets/fallback_img.png";

export default function Card({ id, image, name, type, className }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opera, setOpera] = useState(null);

 const imageUrl = image ? `https://image.tmdb.org/t/p/original/${image}` : FallbackImage;

 console.log(type);
  async function getDetails() {
    const details =
      type === "serie" ? await getSerieDetails(id) : await getMovieDetails(id);
    setOpera(details);
    return details;
  }

  return (
    <>
      <div
        id={id}
        className={`max-w-80 h-full items-center  flex flex-col pb-2 cursor-pointer hover:scale-105 transition-transform duration-300 group ${className}`}
        onClick={() => {
          setIsOpen(true);
          getDetails();
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover  rounded-xl shadow-lg hover:shadow-lg group-hover:shadow-red-900 transition-shadow duration-300"
        />
        <h4 className="text-white text-center p-2 pb-0 transition-all duration-300 text-nowrap">{name}</h4>
      </div>

      {isOpen && opera && (
        <Modal opera={opera} operaImage={image} setIsOpen={setIsOpen} />
      )}
    </>
  );
}
