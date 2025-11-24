import { useEffect, useState } from "react";
import { getSeasonDetails } from "../services/api";

export default function Selector({ opera }) {

    const [selectedSeason, setSelectedSeason] = useState(1);
    const [loadingSeason, setLoadingSeason] = useState(false); // opzione per loading
    const [seasonDetails, setSeasonDetails] = useState(null);
    const [expandedEpisodes, setExpandedEpisodes] = useState({});

    function toggleEpisode(id) {
        setExpandedEpisodes(prev => ({
            ...prev,
            [id]: !prev[id],
        }));
    }


    useEffect(() => {
        if (opera.title) return; // solo per serie

        const fetchSeason = async () => {
            try {
                setLoadingSeason(true);
                const data = await getSeasonDetails(opera.id, selectedSeason);
                console.log("Season data:", data); // <--- controlla che arrivi
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
            {
                opera.number_of_seasons > 1 && (
                    <div className=" text-white">
                        <label className="text-xl">Seleziona Stagione: </label>
                        <select
                            value={selectedSeason}
                            onChange={(e) => setSelectedSeason(Number(e.target.value))}
                            className="text-white bg-gray-700 px-3 py-1 rounded-lg mx-3"
                        >
                            {Array.from({ length: opera.number_of_seasons }, (_, i) => i + 1).map(num => (
                                <option key={num} value={num}>Stagione {num}</option>
                            ))}
                        </select>
                    </div>
                )
            }

            {loadingSeason ? (
                <p className="text-white mt-4">Caricamento episodi...</p>
            ) : seasonDetails?.episodes?.length > 0 ? (
                <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 ">
                    {seasonDetails.episodes.map(ep => {

                        const isExpanded = expandedEpisodes[ep.id] || false;

                        return (
                            <div key={ep.id} className="flex gap-4 mb-6 p-3 rounded">
                                <img
                                    src={ep.still_path ? `https://image.tmdb.org/t/p/w300${ep.still_path}` : "/no-image.jpg"}
                                    alt={ep.name}
                                    className="w-48 h-28 object-cover rounded"
                                />
                                <div className="text-white flex flex-col">
                                    <h4 className="font-bold">
                                        Episodio {ep.episode_number}: {ep.name}
                                    </h4>

                                    {/* Overview tagliato o completo */}
                                    <p className={`text-sm opacity-80 ${isExpanded ? "" : "line-clamp-3"}`}>
                                        {ep.overview || "Nessuna descrizione disponibile"}
                                    </p>

                                    {/* Bottone per espandere / chiudere */}
                                    {ep.overview && ep.overview.length > 100 && (
                                        <button
                                            onClick={() => toggleEpisode(ep.id)}
                                            className="text-xs text-red-500 mt-1 hover:underline self-start cursor-pointer"
                                        >
                                            {isExpanded ? "Mostra meno" : "Visualizza tutto"}
                                        </button>
                                    )}
                                    <p className="text-xs mt-1 opacity-50">{ep.air_date || "N/A"}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <p className="text-white mt-4 px-10 lg:px-56">Nessun episodio trovato.</p>
            )}
        </>
    );
}