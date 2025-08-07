import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import LanguageSelector from "../components/admin/LanguageSelector";

function Header() {
  const [logo, setLogo] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get("/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const menuItems = [
    { label: "ANA SAYFA", path: "/" },
    { label: "HAKKIMIZDA", path: "/hakkimizda" },
    { label: "HİZMETLERİMİZ", path: "/hizmetlerimiz" },
    { label: "PROJELERİMİZ", path: "/projelerimiz" },
    { label: "BLOG", path: "/blog" },
    { label: "REFERANSLAR", path: "/referanslarimiz" },
    { label: "İLETİŞİM", path: "/iletisim" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#101270] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between h-22 items-center">
        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          {logo && (
            <img
              src={logo.imageUrl}
              alt="Site Logo"
              className="w-34 h-16 object-contain"
            />
          )}
        </div>

        <ul className="hidden md:flex space-x-6 text-base">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `group relative font-bold inline-block transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white hover:text-gray-400"
                  }`
                }
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </NavLink>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-black focus:outline-none"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobil Menü */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col space-y-3 px-6 pb-8 text-gray-700 text-end mt-4 bg-[#101270]">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `group relative inline-block transition-colors duration-300 ${
                    isActive ? "text-white " : "text-white"
                  }`
                }
              >
                {item.label}
                <span
                  className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ${
                    location.pathname === item.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <LanguageSelector />
      </div>
    </header>
  );
}

export default Header;
