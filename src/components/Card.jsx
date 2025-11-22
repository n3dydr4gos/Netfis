import { useState } from "react";
import Modal from "./Modal";
import { getMovieDetails, getSerieDetails } from "../services/api";

export default function Card({ id, image, name, type }) {
    const [isOpen, setIsOpen] = useState(false);
    const [opera, setOpera] = useState([]);

    async function getDetails() {
        const details = type == "serie" ? await getSerieDetails(id) : await getMovieDetails(id);
        setOpera(details);
        return details;
    }

    return (
        <>
            <div
                id={id}
                className="w-full flex flex-col text-red-500 rounded-xl shadow-lg h-fit py-4 hover:scale-105 transition-all cursor-pointer"
                onClick={() => { setIsOpen(true), getDetails() }}
            >
                <img
                    src={`https://image.tmdb.org/t/p/original/${image}`}
                    alt={name}
                    className="w-full h-[200px] md:h-[400px] object-cover rounded-xl shadow-lg hover:shadow-gray-800"
                />
                <h4 className="text-white text-center pt-2">{name}</h4>
            </div>

            {isOpen && (
                <Modal opera={opera} operaImage={image} setIsOpen={setIsOpen} />
            )}
        </>
    );
}
