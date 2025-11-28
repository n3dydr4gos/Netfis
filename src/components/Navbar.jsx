import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { getFavouritesCount } = useFavourites();

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [menuOpen]);

  function navigate() {
    window.scrollTo(0, 0);
    setMenuOpen(false);
  }

  const navLinkClass = ({ isActive }) =>
    `relative hover:text-white transition
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-full after:bg-red-600 after:rounded-full
     ${isActive ? "after:opacity-100" : "after:opacity-0"}`;

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2 py-2 px-1 text-lg relative
     after:content-[''] after:absolute after:left-0 after:bottom-0
     after:h-[2px] after:w-full after:bg-red-600 after:rounded-full
     ${isActive ? "after:opacity-100" : "after:opacity-0"}`;

  return (
    <nav className=" h-14 fixed top-0 w-full bg-black/70 backdrop-blur-xs text-white z-100">
      <div className="container mx-auto h-14 flex items-center justify-between gap-4 px-4 sm:p-0">
        <div className="hidden w-full md:flex ms-5">
          <ul className="list-none flex flex-row gap-8 items-center">
            <li>
              <NavLink to="/movies" onClick={navigate} className={navLinkClass} title="Guarda il catalogo film">
                Film
              </NavLink>
            </li>

            <li>
              <NavLink to="/tvs" onClick={navigate} className={navLinkClass} title="Guarda il catalogo serie tv">
                Serie Tv
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/favourites"
                onClick={navigate}
                className={navLinkClass}
                title="Guarda i tuoi preferiti"
              >
                <div className="relative">
                  Preferiti
                  {getFavouritesCount() >= 1 && (
                    <span className="absolute -top-1 -right-4 text-white rounded-4xl bg-red-800 p-2 text-xs h-4 w-4 flex items-center justify-center">
                      {getFavouritesCount()}
                    </span>
                  )}
                </div>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="flex md:justify-center w-full">
          <Link to="/" onClick={navigate}>
            <img
              src="/netfis_nobg.svg"
              alt="Netfis logo"
              className="w-full h-28 object-contain object-center"
              title="Vai alla homepage"
            />
          </Link>
        </div>

        <div className="hidden w-full md:flex ms-auto items-center justify-end gap-6 me-5">
          <NavLink
            to="/search"
            onClick={navigate}
            className={({ isActive }) =>
              `flex items-center gap-2 border-2 py-1 px-4 rounded-full transition
               ${isActive ? "border-red-600" : ""}`
            }
            title="Cerca nel catalogo"
          >
            <Search size={16} /> Cerca
          </NavLink>
        </div>

        <div className="md:hidden w-full flex justify-end">
          <button
            className="relative w-8 h-8 flex flex-col justify-center items-center gap-1 z-100 group"
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

      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 
          ${
            menuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        inert={!menuOpen ? true : undefined}
      >
        <aside
          className={`absolute rounded-2xl top-0 right-0 w-64 bg-black/90 shadow-2xl shadow-black z-50 transform transition-transform duration-300 
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="p-6 flex flex-col">
            <nav className="flex-1">
              <ul className="flex flex-col gap-4 text-gray-200">
                <li>
                  <NavLink
                    to="/movies"
                    onClick={navigate}
                    className={mobileNavLinkClass}
                    title="Guarda il catalogo film"
                  >
                    Film
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/tvs"
                    onClick={navigate}
                    className={mobileNavLinkClass}
                    title="Guarda il catalogo serie tv"
                  >
                    Serie Tv
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/favourites"
                    onClick={navigate}
                    className={mobileNavLinkClass}
                    title="Guarda i tuoi preferiti"
                  >
                    <div className="relative">
                      Preferiti
                      {getFavouritesCount() >= 1 && (
                        <span className="absolute top-0 left-15 text-white rounded-4xl bg-red-800 p-2 text-xs h-4 w-4 flex items-center justify-center">
                          {getFavouritesCount()}
                        </span>
                      )}
                    </div>
                  </NavLink>
                </li>
              </ul>
            </nav>

            <div className="mt-4">
              <div className="flex flex-col gap-3 text-gray-300">
                <NavLink
                  to="/search"
                  onClick={navigate}
                  className={mobileNavLinkClass}
                  title="Cerca nel catalogo"
                >
                  <Search size={16} /> Cerca
                </NavLink>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </nav>
  );
}
