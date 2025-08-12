import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import useLanguage from "../../contexts/useLanguage";
import ThemeToggle from "../../utils/ThemeToggle";
import LanguageSelector from "./LanguageSelector";

function PanelHeader() {
  const { language } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 bg-gray-700 dark:bg-black p-4 z-0 pl-60">
      <div className="container mx-auto flex items-center justify-between">
        {/* Search bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <input
              type="text"
              placeholder={language === "tr" ? "Ara..." : "Search..."}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-400 dark:text-gray-400" />
          </div>
        </div>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <ThemeToggle />

          {/* Logout */}
          <button className="flex w-34 items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
            <FaSignOutAlt />
            <span>{language === "tr" ? "Çıkış Yap" : "Logout"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default PanelHeader;
