import { useMedia } from "../context/MediaContext";
import Card from "../components/Card";
import Layout from "../Layouts/Layout";
import FirstMovieHero from "../components/FirstMovieHero";
import Loader from "../components/Loader";

export default function Homepage() {
  const { movies, series, hero, loading } = useMedia();

  if (loading) return <Loader />;
  if (!hero) return null;

  return (
    <Layout>
      <FirstMovieHero
        movie={hero.movie}
        image={hero.image}
        trailer={hero.trailer}
        details={hero.details}
      />
      <div className="container mx-auto ">
        <section>
          <h3 className="text-3xl font-bold mb-4 text-white">
            Migliori film{" "}
            <span className="text-red-500 font-bold"> trending</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {movies.map((movie) => (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.title}
                image={movie.poster_path}
                type={"movie"}
              />
            ))}
          </div>
        </section>
        <section>
          <h3 className="text-3xl font-bold mb-4 text-white">
            Migliori Serie TV{" "}
            <span className="text-red-500 font-bold"> trending</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            {series.map((tv) => (
              <Card
                key={tv.id}
                id={tv.id}
                name={tv.name}
                image={tv.poster_path}
                type={"serie"}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
