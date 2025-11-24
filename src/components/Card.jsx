import { useState } from "react";
import Modal from "./Modal";
import { getMovieDetails, getSerieDetails } from "../services/api";

export default function Card({ id, image, name, type }) {
  const [isOpen, setIsOpen] = useState(false);
  const [opera, setOpera] = useState(null);

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
        className="w-full h-full flex flex-col pb-2 cursor-pointer hover:scale-105 transition-transform duration-300 group"
        onClick={() => {
          setIsOpen(true);
          getDetails();
        }}
      >
        <img
          src={`https://image.tmdb.org/t/p/original/${image}`}
          alt={name}
          className="w-full h-full md:h-[400px] object-cover rounded-xl shadow-lg hover:shadow-lg group-hover:shadow-red-900 transition-shadow duration-300"
        />
        <h4 className="text-white text-center p-2 pb-0  transition-all duration-300">{name}</h4>
      </div>

      {isOpen && opera && (
        <Modal opera={opera} operaImage={image} setIsOpen={setIsOpen} />
      )}
    </>
  );
}
