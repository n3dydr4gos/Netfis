import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";

export default function Errorpage() {
  return (
    <Layout>
      <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center">
        <h1 className="text-7xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold mb-3">Pagina non trovata</h2>
        <p className="text-gray-400 max-w-md mb-8">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <Link
          to="/"
          className="bg-red-600 hover:bg-red-700 transition px-6 py-3 rounded-md font-medium"
        >
          Torna alla home
        </Link>
      </div>
    </Layout>
  );
}
