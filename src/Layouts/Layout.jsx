import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="pt-14 p-4 sm:p-8 bg-black text-white">{children}</div>
      <Footer />
    </>
  );
}
