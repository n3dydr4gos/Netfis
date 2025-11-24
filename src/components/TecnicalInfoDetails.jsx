export default function TecnicalInfoDetails({ details }) {
    return (
        <>
            {details.tagline && (
                <div>
                    <span className="font-bold">Tagline:</span>
                    <p className="italic">{details.tagline}</p>
                </div>
            )}

            <div>
                <span className="font-bold">Lingue:</span>
                <p>{details.spoken_languages?.map((l) => l.english_name).join(", ")}</p>
            </div>

            <div>
                <span className="font-bold">Produzione:</span>
                <p>{details.production_companies?.map((c) => c.name).join(", ")}</p>
            </div>
        </>
    );
}