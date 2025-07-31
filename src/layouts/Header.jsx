import axios from "axios";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

function Header() {
  const companyId = 1;
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));

    axios
      .get(`http://localhost:8080/api/construction/company/${companyId}`)
      .then((res) => setCompanyName(res.data.companyName))
      .catch(() => setCompanyName(null));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo ve Şirket Adı */}
        <div className="flex items-center">
          {logo && (
            <img
              src={logo.imageUrl}
              alt="Site Logo"
              className="w-12 h-12 object-cover rounded-full"
            />
          )}
          <h1 className="ml-3 text-lg md:text-xl font-bold">{companyName}</h1>
        </div>

        {/* Masaüstü Menü */}
        <ul className="hidden md:flex space-x-6 text-gray-700 text-base">
          <a className="cursor-pointer hover:text-black" href="/">
            Ana Sayfa
          </a>
          <a className="cursor-pointer hover:text-black" href="/hakkimizda">
            Hakkımızda
          </a>
          <a className="cursor-pointer hover:text-black" href="/hizmetlerimiz">
            Hizmetlerimiz
          </a>
          <a className="cursor-pointer hover:text-black" href="/projelerimiz">
            Projelerimiz
          </a>
          <a className="cursor-pointer hover:text-black" href="/blog">
            Blog
          </a>
          <a className="cursor-pointer hover:text-black" href="/referanslar">
            Referanslar
          </a>
          <a className="cursor-pointer hover:text-black" href="/iletisim">
            İletişim
          </a>
        </ul>

        {/* Hamburger Buton (Mobil) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 hover:text-black focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Animasyonlu Mobil Menü */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 px-6 pb-8 text-gray-700 text-end bg-white mt-4">
          <a className="cursor-pointer hover:text-black" href="/">
            Ana Sayfa
          </a>
          <a className="cursor-pointer hover:text-black" href="/hakkimizda">
            Hakkımızda
          </a>
          <a className="cursor-pointer hover:text-black" href="/hizmetlerimiz">
            Hizmetlerimiz
          </a>
          <a className="cursor-pointer hover:text-black" href="/projelerimiz">
            Projelerimiz
          </a>
          <a className="cursor-pointer hover:text-black" href="/blog">
            Blog
          </a>
          <a className="cursor-pointer hover:text-black" href="/referanslar">
            Referanslar
          </a>
          <a className="cursor-pointer hover:text-black" href="/iletisim">
            İletişim
          </a>
        </ul>
      </div>
    </header>
  );
}

export default Header;
