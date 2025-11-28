import { Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Search from "./pages/SearchModal";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import { FavouritesProvider } from "./context/FavouritesContext";
import Details from "./pages/Details";
import Errorpage from "./pages/Errorpage";

export default function App() {
  return (
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/tv" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<Details />} />
        <Route path="/tv/:id" element={<Details />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </FavouritesProvider>
  );
}
