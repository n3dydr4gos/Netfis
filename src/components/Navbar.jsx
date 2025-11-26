import { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "../assets/netfis_nobg.png";
import { FavouritesProvider, useFavourites } from "../context/FavouritesContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { getFavouritesCount } = useFavourites();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  function navigate() {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }

  return (
    <nav className=" h-14 fixed top-0 w-full bg-black/70 backdrop-blur-xs text-white z-100">
      <div className="container mx-auto h-14 flex items-center justify-between gap-4 px-4 sm:p-0">
        {/* Desktop nav */}
        <div className="hidden w-full md:flex">
          <ul className="list-none flex flex-row gap-8 items-center">
            <li>
              <Link
                to={"/movies"}
                className="hover:text-white transition"
                onClick={() => navigate()}
              >
                Film
              </Link>
            </li>
            <li>
              <Link
                to={"/series"}
                className="hover:text-white transition"
                onClick={() => navigate()}
              >
                Serie Tv
              </Link>
            </li>
            <li>
              <Link
                to={"/favourites"}
                className="hover:text-white transition"
                onClick={() => navigate()}
              >
                <div className="relative">Preferiti {getFavouritesCount() >= 1 && (
                  <span className="absolute -top-1 -right-4 text-white rounded-4xl bg-red-800 p-2 text-xs h-4 w-4 items-center flex justify-center animate-bounce transition-all"> {getFavouritesCount()} </span>)}
                </div>
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex md:justify-center w-full">
          <Link to="/" onClick={() => navigate()}>
            <img
              src={Logo}
              alt="Netfis logo"
              className="w-full h-28 object-contain object-center"
            />
          </Link>
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden w-full md:flex ms-auto items-center justify-end gap-6 ">
          <Link to="/search" onClick={() => navigate()} className="flex items-center gap-2 border-2 py-1 px-4 rounded-full">
            <Search size={16} /> Cerca
          </Link>
          <a
            className="flex items-center gap-2 hover:text-white transition"
            href="#"
          >
            <User size={18} />
          </a>
        </div>
        <div className="md:hidden w-full flex justify-end">
          <button
            className="relative w-8 h-8 flex flex-col justify-center items-center gap-1 z-100 group md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 
      ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            ></span>

            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 
      ${menuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>

            <span
              className={`block w-6 h-0.5 bg-white rounded transition-all duration-300 
      ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
        inert={!menuOpen ? true : undefined}
      >
        {/* Slide-in panel */}
        <aside
          className={`absolute top-0 right-0 w-64 bg-black/90 backdrop-blur-xl z-50 transform transition-transform duration-300 ${menuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 flex flex-col">
            <nav className="flex-1">
              <ul className="flex flex-col gap-4 text-gray-200">
                <li>
                  <Link
                    to={"/movies"}
                    onClick={() => navigate()}
                    className="block py-2 px-1 text-lg"
                  >
                    Film
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/series"}
                    onClick={() => navigate()}
                    className="block py-2 px-1 text-lg"
                  >
                    Serie Tv
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/favourites"}
                    onClick={() => navigate()}
                    className="block py-2 px-1 text-lg"
                  >
                    <div className="relative">Preferiti {getFavouritesCount() >= 1 && (
                      <span className="absolute top-0 left-15 text-white rounded-4xl bg-red-800 p-2 text-xs h-4 w-4 items-center flex justify-center animate-bounce transition-all"> {getFavouritesCount()} </span>)}
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-4">
              <div className="flex flex-col gap-3 text-gray-300">
                <Link to={"/search"} className="flex items-center gap-2 py-2">
                  <Search size={16} /> Cerca
                </Link>
                <a href="#" className="flex items-center gap-2 py-2">
                  <User size={18} /> Account
                </a>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  onClick={() => navigate()}
                  className="block w-full text-center py-2 border border-zinc-700 rounded text-sm"
                >
                  Accedi
                </Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </nav>
  );
}
