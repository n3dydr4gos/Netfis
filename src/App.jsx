import {Route, Routes } from "react-router";
import Homepage from "./pages/Homepage";
import Favourites from "./pages/Favourites";
import Search from "./pages/Search";
import Errorpage from "./pages/ErrorPage";
import Movies from "./pages/Movies";
import Series from "./pages/Series";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/series" element={<Series />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </>
  );
}
