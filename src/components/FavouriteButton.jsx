import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { useFavourites } from "../context/FavouritesContext";

export default function FavouriteButton({ opera, className }) {
  const { favourites, addFavourite, removeFavourite } = useFavourites();
  const [isFavourite, setIsFavourite] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setIsFavourite(favourites.some((fav) => fav.id === opera.id));
  }, [favourites, opera.id]);

  const toggleFavourite = () => {
    if (isFavourite) {
      removeFavourite(opera.id);
    } else {
      addFavourite(opera);
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  };

  return (
    <button
      onClick={toggleFavourite}
      className={`flex items-center cursor-pointer font-bold bg-red-800 py-3 px-5 rounded-2xl w-fit gap-3 shadow-[2px_2px_30px] shadow-red-800 hover:shadow-[0px_0px_20px] hover:shadow-red-600 hover:scale-105 transition-all ${isFavourite ? "bg-white text-black shadow-white/30" : "bg-red-700"} p-3 ${
        animate ? "scale-105" : "scale-100"
      } ${className}`}
    >
      <Heart
        className={`transition-colors duration-300  ${
          isFavourite ? "text-red-500" : "text-white"
        }`}
      />
      {isFavourite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    </button>
  );
}
