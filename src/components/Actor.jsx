export default function Actor({ actor }) {
    return (
        <div className="flex flex-col items-center text-white text-center">
            <img
                src={
                    actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/no-actor.jpg"
                }
                className="w-40 h-40 rounded-3xl shadow-xl shadow-black object-cover mb-2"
            />
            <span className="font-semibold text-sm">{actor.name}</span>
            <span className="text-xs opacity-70">{actor.character}</span>
        </div>
    );
}