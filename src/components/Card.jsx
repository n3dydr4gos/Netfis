export default function Card({ image, name }) {
  return (
    <div className="w-full rounded-xl shadow-lg transition-all cursor-pointer flex flex-col overflow-visible">
      <img
        src={`https://image.tmdb.org/t/p/original/${image}`}
        alt={name}
        className="w-full h-[140px] md:h-[200px] object-cover rounded-xl shadow-lg hover:shadow-white/60"
      />
      <h4 className="text-white text-center pt-2">{name}</h4>
    </div>
  );
}
