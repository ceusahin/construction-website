import React, { useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import useLanguage from "../../contexts/useLanguage";

const FooterSettings = () => {
  const { language } = useLanguage();
  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", url: "" });

  const fetchMenus = () => {
    axios
      .get(`/footer-menu/${language}`)
      .then((res) => {
        setMenus(res.data);
        // Seçili menüyü dil değişiminde temizlemek için:
        setSelectedMenuId(null);
        setItems([]);
      })
      .catch((err) => console.error("Menüleri getirirken hata:", err));
  };

  const fetchItems = (menuId) => {
    axios
      .get(`/footer-menu-item/by-menu/${menuId}`)
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        setItems([]);
        console.error("Menü öğelerini getirirken hata:", err);
      });
  };

  useEffect(() => {
    fetchMenus();
    setTitle("");
  }, [language]);

  const handleCreateMenu = () => {
    if (!title.trim()) {
      alert("Lütfen bir menü başlığı girin.");
      return;
    }
    axios
      .post("/footer-menu", { language, title })
      .then(() => {
        setTitle("");
        fetchMenus();
      })
      .catch((err) => console.error("Menü oluşturulurken hata:", err));
  };

  const handleDeleteMenu = (id) => {
    axios
      .delete(`/footer-menu/${id}`)
      .then(() => {
        if (id === selectedMenuId) {
          setSelectedMenuId(null);
          setItems([]);
        }
        fetchMenus();
      })
      .catch((err) => console.error("Menü silinirken hata:", err));
  };

  const handleAddItem = () => {
    if (!newItem.name.trim() || !newItem.url.trim()) {
      alert("Lütfen öğe adı ve URL girin.");
      return;
    }
    axios
      .post(`/footer-menu-item/${selectedMenuId}`, {
        name: newItem.name,
        url: newItem.url,
      })
      .then(() => {
        setNewItem({ name: "", url: "" });
        fetchItems(selectedMenuId);
      })
      .catch((err) => console.error("Öğe eklenirken hata:", err));
  };

  const handleDeleteItem = (id) => {
    axios
      .delete(`/footer-menu-item/${id}`)
      .then(() => fetchItems(selectedMenuId))
      .catch((err) => console.error("Öğe silinirken hata:", err));
  };

  return (
    <div className="p-4 bg-white shadow-lg border-gray-400 border space-y-4 pb-6 md:w-2/3">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Footer Menü Yönetimi ({language.toUpperCase()})
      </h2>

      {/* Yeni Menü Ekle */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <input
          type="text"
          placeholder="Yeni Menü Başlığı"
          className="border border-gray-300 px-4 py-2 rounded flex-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleCreateMenu();
          }}
        />
        <button
          onClick={handleCreateMenu}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
        >
          ➕ Menü Ekle
        </button>
      </div>

      {/* Mevcut Menüler */}
      {menus.length === 0 ? (
        <p className="text-gray-500">Henüz menü eklenmemiş.</p>
      ) : (
        <div className="space-y-3">
          {menus.map((menu) => (
            <div
              key={menu.id}
              className={`flex justify-between items-center px-4 py-3 rounded-md border ${
                menu.id === selectedMenuId
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 bg-gray-50"
              }`}
            >
              <div>
                <p className="font-semibold text-gray-800">{menu.title}</p>
                <p className="text-sm text-gray-500">
                  Dil: {menu.language.toUpperCase()}
                </p>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => {
                    setSelectedMenuId(menu.id);
                    fetchItems(menu.id);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded"
                >
                  ✏️ Düzenle
                </button>
                <button
                  onClick={() => handleDeleteMenu(menu.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                >
                  🗑 Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Menü Öğeleri */}
      {selectedMenuId && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mt-6 mb-4">
            🔗 Menü Öğeleri
          </h3>

          {items.length === 0 ? (
            <p className="text-gray-500 mb-4">
              Bu menüye ait öğe bulunmamaktadır.
            </p>
          ) : (
            <ul className="space-y-3 mb-6">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-blue-600">{item.url}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    🗑 Sil
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="Öğe Adı"
              className="border border-gray-300 px-3 py-2 rounded w-full"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              className="border border-gray-300 px-3 py-2 rounded w-full"
              value={newItem.url}
              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
            />
            <button
              onClick={handleAddItem}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
            >
              ➕ Öğeyi Ekle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FooterSettings;
