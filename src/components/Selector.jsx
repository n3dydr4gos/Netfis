import { useEffect, useState } from "react";
import { getSeasonDetails } from "../services/api";
import fallbackImg from "../assets/fallback_img.png";


export default function Selector({ opera }) {
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loadingSeason, setLoadingSeason] = useState(false);
  const [seasonDetails, setSeasonDetails] = useState(null);
  const [expandedEpisodes, setExpandedEpisodes] = useState({});

  const MAX_CHARS = 250;

  function getPreview(text) {
    if (!text) return "";
    return text.length > MAX_CHARS ? text.slice(0, MAX_CHARS) + "..." : text;
  }

  function toggleEpisode(id) {
    setExpandedEpisodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }

  // --- Fetch stagione ---
  useEffect(() => {
    if (opera.title) return;

    const fetchSeason = async () => {
      try {
        setLoadingSeason(true);
        const data = await getSeasonDetails(opera.id, selectedSeason);
        setSeasonDetails(data);
      } catch (err) {
        console.error("Errore fetch stagione:", err);
      } finally {
        setLoadingSeason(false);
      }
    };

    fetchSeason();
  }, [opera, selectedSeason]);

  return (
    <>
      {opera.number_of_seasons > 1 && (
        <div className="text-white">
          <div className="flex items-center justify-start flex-wrap w-full">
            <label className="text-lg px-3">Seleziona Stagione: </label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(Number(e.target.value))}
              className="text-white bg-gray-700 px-3 py-1 rounded-lg mx-3 w-fit"
            >
              {Array.from(
                { length: opera.number_of_seasons },
                (_, i) => i + 1
              ).map((num) => (
                <option key={num} value={num}>
                  Stagione {num}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {loadingSeason ? (
        <p className="text-white mt-4">Caricamento episodi...</p>
      ) : seasonDetails?.episodes?.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2">
          {seasonDetails.episodes.map((ep) => {
            const fullText = ep.overview || "Nessuna descrizione disponibile";
            const isExpanded = expandedEpisodes[ep.id] || false;
            const isTooLong = fullText.length > MAX_CHARS;

            return (
              <div key={ep.id} className="flex gap-5 grid grid-cols-1 2xl:grid-cols-2 mb-6 p-5 rounded">
                <img
                  src={
                    ep.still_path
                      ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                      : fallbackImg
                  }
                  alt={ep.name || "Episodio senza titolo"}
                  className="w-full object-cover rounded-xl shadow-lg lg:max-h-50"
                />

                <div className="text-white flex flex-col 2xl:me-10">
                  <h4 className="font-bold">
                    Episodio {ep.episode_number}: {ep.name}
                  </h4>

                  <p className="text-sm opacity-80">
                    {isExpanded ? fullText : getPreview(fullText)}
                  </p>

                  {isTooLong && (
                    <button
                      onClick={() => toggleEpisode(ep.id)}
                      className="text-xs text-red-500 mt-1 hover:underline self-start cursor-pointer"
                    >
                      {isExpanded ? "Mostra meno" : "Visualizza tutto"}
                    </button>
                  )}

                  <p className="text-xs mt-1 opacity-50">
                    {ep.air_date || "N/A"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-white mt-4 px-10 lg:px-56">
          Nessun episodio trovato.
        </p>
      )}
    </>
  );
}
