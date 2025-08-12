import LanguageSelector from "./LanguageSelector";
import ThemeToggle from "../../utils/ThemeToggle";

const menuItems = [
  { label: "Ana Sayfa", key: "anasayfa" },
  { label: "Site Yönetimi", key: "site-yonetimi" },
  { label: "Kullanıcılar", key: "kullanicilar" },
];

const contentItems = [
  { label: "Ana Sayfa", key: "anasayfa-icerik" },
  { label: "Hakkımızda", key: "hakkimizda" },
  { label: "Hizmetlerimiz", key: "hizmetlerimiz" },
  { label: "Projelerimiz", key: "projelerimiz" },
  { label: "Blog", key: "blog" },
  { label: "Referanslar", key: "referanslar" },
  { label: "İletişim", key: "iletisim" },
];

const Menu = ({ onSelect, activePage, activeContentItem }) => {
  const isActive = (key) => activePage === key || activeContentItem === key;

  return (
    <div className="fixed left-0 top-0 h-screen w-60 dark:bg-black bg-gray-700 text-white z-50 flex flex-col px-6 pt-8 gap-8 overflow-y-auto">
      <img
        src="/images/brsm-p-logo.webp"
        alt=""
        className="h-10 object-contain"
      />
      <div className="text-xl font-bold tracking-wide text-center text-white dark:text-red-500">
        YÖNETİM PANELİ
      </div>

      {/* Menü */}
      <ul className="flex flex-col gap-2">
        <h3 className="px-2 py-4 text-s text-red-500 font-bold text-xl">
          Menü
        </h3>
        {menuItems.map((item) => (
          <li key={item.key}>
            <button
              className={`w-full text-left px-2 py-2 rounded transition-colors cursor-pointer ${
                isActive(item.key)
                  ? "bg-red-500 text-white font-semibold"
                  : "hover:bg-red-500 hover:text-white"
              }`}
              onClick={() => onSelect && onSelect(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>

      {/* İçerik Ayarları */}
      <ul className="flex flex-col gap-2">
        <h3 className="px-2 py-4 text-s text-red-500 font-bold text-xl">
          İçerik Ayarları
        </h3>
        {contentItems.map((item) => (
          <li key={item.key}>
            <button
              className={`w-full cursor-pointer text-left px-2 py-2 rounded transition-colors ${
                isActive(item.key)
                  ? "bg-red-500 text-white font-semibold"
                  : "hover:bg-red-500 hover:text-white"
              }`}
              onClick={() => onSelect && onSelect(item.key)}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
