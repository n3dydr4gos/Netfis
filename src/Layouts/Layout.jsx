import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <div className="py-14 bg-black text-white">{children}</div>
      <Footer />
    </>
  );
}
