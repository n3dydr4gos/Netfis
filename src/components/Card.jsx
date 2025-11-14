export default function Card({ key, image, name }) {
    return (
        <div key={key} className=" text-red-500 rounded-xl shadow-lg h-fit py-4 hover:scale-105 transition-all cursor-pointer">
            <img
                src={`https://image.tmdb.org/t/p/original/${image}`}
                alt={name}
                className="rounded-4xl h-full shadow-lg hover:shadow-gray-800"
            />

            {/* {<iframe
                src="https://www.youtube.com/embed/9WZllcEgWrM?autoplay=1&mute=1&controls=0&loop=1&playlist=9WZllcEgWrM"
                className="absolute inset-0 w-full h-full object-cover object-top"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
            />} */}
        </div>
    )
}