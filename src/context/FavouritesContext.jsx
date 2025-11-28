import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useLocalStorage("favourites", []);

  const addFavourite = (item) => {
    setFavourites((prev) => {
      if (prev.some((el) => el.id === item.id && el.type === item.type))
        return prev;
      return [...prev, item];
    });
  };

  const removeFavourite = (id) => {
    setFavourites((prev) => prev.filter((el) => el.id !== id));
  };

  const isFavourite = (id) => favourites.some((el) => el.id === id);

  const getFavouritesCount = () => favourites.length;

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addFavourite,
        removeFavourite,
        isFavourite,
        getFavouritesCount,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
