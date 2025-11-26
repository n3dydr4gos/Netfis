import { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext();

export function FavouritesProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    const saved = localStorage.getItem("favourites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (item) => {
    if (!favourites.some((f) => f.id === item.id && f.type === item.type)) {
      setFavourites([...favourites, item]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter((f) => f.id !== id));
  };

  const isFavourite = (id) => favourites.some((f) => f.id === id);

  function getFavouritesCount() {
    return favourites.length;
  }

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite, isFavourite, getFavouritesCount }}
    >
      {children}
    </FavouritesContext.Provider>
  );
}

export const useFavourites = () => useContext(FavouritesContext);
