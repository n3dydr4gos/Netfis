export default function Footer() {
  return (
    <footer className="w-full bg-black/70 backdrop-blur-sm text-gray-400 mt-10 border-t border-zinc-800 text-center">
      <div className="container mx-auto px-4 pb-10">
        <img
          src="/netfis_nobg.svg"
          alt="logo netfis"
          className="object-cover w-[250px] h-[200px] mx-auto"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 text-sm mb-8">
          <a href="#" className="hover:text-white transition">
            Centro assistenza
          </a>
          <a href="#" className="hover:text-white transition">
            Account
          </a>
          <a href="#" className="hover:text-white transition">
            Media Center
          </a>
          <a href="#" className="hover:text-white transition">
            Relazioni con gli investitori
          </a>
          <a href="#" className="hover:text-white transition">
            Lavora con noi
          </a>
          <a href="#" className="hover:text-white transition">
            Condizioni d’uso
          </a>
          <a href="#" className="hover:text-white transition">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition">
            Preferenze cookie
          </a>
        </div>

        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Netfis - Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  );
}
