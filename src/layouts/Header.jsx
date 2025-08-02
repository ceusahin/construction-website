import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import axiosInstance from "../api/axiosInstance";

function Header() {
  const companyId = 1;
  const [logo, setLogo] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));

    axiosInstance
      .get(`/company/${companyId}`)
      .then((res) => setCompanyName(res.data.companyName))
      .catch(() => setCompanyName(null));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#101270] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo ve Şirket Adı */}
        <div className="flex items-center">
          {logo && (
            <img
              src={logo.imageUrl}
              alt="Site Logo"
              className="w-34 h-16 object-contain"
            />
          )}
          <h1 className="ml-3 text-lg md:text-xl font-bold">{companyName}</h1>
        </div>

        {/* Masaüstü Menü */}
        <ul className="hidden md:flex space-x-6 text-base">
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Ana Sayfa
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="/hakkimizda"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Hakkımızda
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/hizmetlerimiz"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Hizmetlerimiz
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Projelerimiz
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Blog
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Referanslar
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            İletişim
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </ul>

        {/* Hamburger Buton (Mobil) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-black focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Animasyonlu Mobil Menü */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out  ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 px-6 pb-8 text-gray-700 text-end mt-4 bg-[#101270]">
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Ana Sayfa
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>

          <a
            href="/hakkimizda"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Hakkımızda
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/hizmetlerimiz"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Hizmetlerimiz
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Projelerimiz
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Blog
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            Referanslar
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="/"
            className="group relative inline-block text-white cursor-pointer transition-colors duration-300 hover:text-gray-400"
          >
            İletişim
            <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gray-400 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </ul>
      </div>
    </header>
  );
}

export default Header;
