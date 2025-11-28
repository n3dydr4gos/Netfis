import { Link } from "react-router";
import Layout from "../Layouts/Layout";
import Card from "../components/Card";
import { useFavourites } from "../context/FavouritesContext";

export default function Favourites() {
  const { favourites } = useFavourites();

  if (favourites.length === 0)
    return (
      <Layout>
        <section className="text-white text-center py-20 min-h-[70vh] flex justify-center items-center gap-1">
          <span>Nessun film o serie tra i preferiti. Vai nella pagina dei</span>
          <Link to={"/movies"} className="text-red-600 font-bold">
            <span> Film </span>
          </Link>
          <span> o delle </span>
          <Link to={"/series"} className="text-red-600 font-bold">
            <span> Serie </span>
          </Link>
          <span> e aggiungi i tuoi preferiti!</span>
        </section>
      </Layout>
    );

  return (
    <Layout>
      <section className="container mx-auto py-12 min-h-[70vh]">
        <h2 className="text-5xl font-extrabold py-8">I tuoi preferiti</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {favourites.map((item) => {
            return (
              <Card
                key={`${item.type}-${item.id}`}
                id={item.id}
                name={item.name || item.title}
                type={item.seasons ? "serie" : "movie"}
                image={item.poster_path}
              />
            );
          })}
        </div>
        <div className="text-center p-6 pt-12">
          <span>Scegli altri film/serie preferiti/e. Vai nella pagina dei</span>
          <Link to={"/movies"} className="text-red-600 font-bold">
            <span> Film </span>
          </Link>
          <span> o delle </span>
          <Link to={"/series"} className="text-red-600 font-bold">
            <span>Serie</span>
          </Link>
          <span> e aggiungi i tuoi preferiti!</span>
        </div>
      </section>
    </Layout>
  );
}
