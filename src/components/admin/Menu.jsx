const menuItems = [
  { label: "Ana Sayfa", key: "anasayfa" },
  { label: "Site Yönetimi", key: "site-yonetimi" },
  { label: "Sayfa Ayarları", key: "sayfa-ayarlari" },
  { label: "Menü Yönetimi", key: "menu-yonetimi" },
  { label: "Kullanıcılar", key: "kullanicilar" },
  { label: "Çıkış", key: "cikis" },
];

const Menu = ({ onSelect }) => (
  <div className="fixed left-0 top-0 h-screen w-60 bg-gray-900 text-white shadow-lg z-50 flex flex-col px-6 pt-8">
    <div className="text-xl font-bold mb-10 tracking-wide text-center">
      YÖNETİM PANELİ
    </div>
    <ul className="flex flex-col gap-4">
      {menuItems.map((item) => (
        <li key={item.key}>
          <button
            className="w-full text-left py-2 px-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition-colors"
            onClick={() => onSelect && onSelect(item.key)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Menu;
