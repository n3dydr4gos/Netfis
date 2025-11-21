import { useMedia } from "../context/MediaContext";
import Card from "../components/Card";
import Layout from "../Layouts/Layout";
import FirstMovieHero from "../components/FirstMovieHero";

export default function Homepage() {
  const { movies, series, firstMovie, firstMovieImage, trailer, loading } = useMedia();
  
  const detailRes = await fetch(`${API_URL}/movie/${selectedMovie.id}?language=it-IT`, options);
  const detailData = await detailRes.json();

  // Salvo i dettagli completi nel tuo state
  setFirstMovie(detailData);

  if (loading) return <p className="text-white">Caricamento...</p>;

  return (
    <Layout>
      <FirstMovieHero
        firstMovie={firstMovie}
        firstMovieImage={firstMovieImage}
        firstMovieTrailer={trailer}
      />

      <div className="container px-3 mx-auto">
        <section>
          <h3 className="text-3xl font-bold mb-4 text-white">
            Migliori film <span className="text-red-500 font-bold"> trending</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {movies.map(movie => (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.title}
                image={movie.poster_path}
              />
            ))}
          </div>
        </section>
 <section>
                    <h3 className="text-3xl font-bold mb-4 text-white">Migliori Serie TV <span className="text-red-500 font-bold"> trending</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {series.map((tv) => (
                            <Card key={tv.id} id={tv.id} name={tv.name} image={tv.poster_path} opera={tv} />
                        ))}
                    </div>
                </section>
      </div>
    </Layout>
  );
}
