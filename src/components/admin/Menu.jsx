const menuItems = [
  { label: "Ana Sayfa", key: "anasayfa" },
  { label: "Site Yönetimi", key: "site-yonetimi" },
  { label: "Sayfa Ayarları", key: "sayfa-ayarlari" },
  { label: "Kullanıcılar", key: "kullanicilar" },
  { label: "Galeri", key: "galeri" },
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

const Menu = ({ onSelect }) => (
  <div className="fixed left-0 top-0 h-screen w-60 bg-gray-900 text-white shadow-lg z-50 flex flex-col px-6 pt-8 gap-8 overflow-y-auto">
    <div className="text-xl font-bold tracking-wide text-center">
      YÖNETİM PANELİ
    </div>
    <ul className="flex flex-col gap-4">
      <h3 className="px-2 py-4 text-s text-yellow-400">Menü</h3>
      {menuItems.map((item) => (
        <li key={item.key}>
          <button
            className="w-full text-left px-2 py-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition-colors"
            onClick={() => onSelect && onSelect(item.key)}
          >
            {item.label}
          </button>
        </li>
      ))}
    </ul>

    <ul className="flex flex-col gap-4">
      <h3 className="px-2 py-4 text-s text-yellow-400">İçerik Ayarları</h3>
      {contentItems.map((item) => (
        <li key={item.key}>
          <button
            className="w-full text-left px-2 py-2 rounded hover:bg-yellow-400 hover:text-gray-900 transition-colors"
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
