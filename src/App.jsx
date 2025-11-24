import {Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Search from "./pages/SearchModal";
import Errorpage from "./pages/ErrorPage";
import Movies from "./pages/Movies";
import Series from "./pages/Series";
import { FavouritesProvider } from "./context/FavouritesContext";
import Details from "./pages/Details";

export default function App() {
  return (
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="/details" element={<Details />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </FavouritesProvider>
  );
}
