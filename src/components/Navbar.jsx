import React, { useState, useEffect } from "react";
import { Search, User, Menu } from "lucide-react";
import { Link } from "react-router";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", menuOpen);

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [menuOpen]);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className=" h-14 fixed top-0 w-full bg-black/70 backdrop-blur-xs text-white z-100">
      <div className="container mx-auto h-14 flex items-center justify-between gap-4 px-4 sm:p-0">
        {/* Desktop nav */}
        <div className="hidden w-full md:flex">
          <ul className="list-none flex flex-row gap-8 items-center">
            <li>
              <Link to={"/movies"} className="hover:text-white transition">
                Film
              </Link>
            </li>
            <li>
              <Link to={"/series"} className="hover:text-white transition">
                Serie Tv
              </Link>
            </li>
            <li>
              <Link to={"/favourites"} className="hover:text-white transition">
                Preferiti
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo */}
        <div className="flex md:justify-center w-full">
          <Link to="/">
            <img
              src="src/assets/netfis_nobg.png"
              alt="Netfis logo"
              className="w-full h-28 object-contain object-center"
            />
          </Link>
        </div>

        {/* Right actions (desktop) */}
        <div className="hidden w-full md:flex ms-auto items-center justify-end gap-6 ">
          <a
            className="flex items-center gap-2 hover:text-white transition"
            href="#"
          >
            <Search size={16} /> Cerca
          </a>
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
        className={`fixed inset-0 z-40 md:hidden pointer-events-none transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        {/* <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        /> */}

        {/* Slide-in panel */}
        <aside
          className={`absolute top-0 right-0 w-64 bg-black/90 backdrop-blur-xl z-100 shadow-lg transform transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 flex flex-col">
            <nav className="flex-1">
              <ul className="flex flex-col gap-4 text-gray-200">
                <li>
                  <Link
                    to={"/movies"}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-1 text-lg"
                  >
                    Film
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/series"}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-1 text-lg"
                  >
                    Serie Tv
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/favourites"}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 px-1 text-lg"
                  >
                    Preferiti
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-4">
              <div className="flex flex-col gap-3 text-gray-300">
                <a href="#" className="flex items-center gap-2 py-2">
                  <Search size={16} /> Cerca
                </a>
                <a href="#" className="flex items-center gap-2 py-2">
                  <User size={18} /> Account
                </a>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
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
