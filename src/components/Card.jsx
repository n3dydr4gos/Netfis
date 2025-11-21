import { useState } from "react";
import Modal from "./Modal";

export default function Card({ id, image, name, opera }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                id={id}
                className="w-full flex flex-col text-red-500 rounded-xl shadow-lg h-fit py-4 hover:scale-105 transition-all cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={`https://image.tmdb.org/t/p/original/${image}`}
                    alt={name}
                    className="rounded-4xl h-full shadow-lg hover:shadow-gray-800"
                />
                <h4 className="text-white text-center pt-2">{name}</h4>
            </div>

            {isOpen && (
                <Modal opera={opera} operaImage={image} setIsOpen={setIsOpen} />
            )}
        </>
    );
}
