import React, { useCallback, useEffect, useState } from "react";
import axios from "../../api/axiosInstance";
import useLanguage from "../../contexts/useLanguage";

const FooterSettings = () => {
  const { language } = useLanguage();

  const [menus, setMenus] = useState([]);
  const [selectedMenuId, setSelectedMenuId] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const [showNewMenuInput, setShowNewMenuInput] = useState(false);
  const [newMenuTitle, setNewMenuTitle] = useState("");

  const [newItem, setNewItem] = useState({ name: "", url: "" });

  const [message, setMessage] = useState("");

  const loadMenuItems = async (menuId) => {
    try {
      const res = await axios.get(`/footer-menu-item/by-menu/${menuId}`);
      setMenuItems(res.data);
      setMessage("");
    } catch {
      setMenuItems([]);
      setMessage("Menü öğeleri yüklenirken hata oluştu.");
    }
  };

  const loadMenus = useCallback(async () => {
    try {
      const res = await axios.get(`/footer-menu/${language}`);
      setMenus(res.data);
      setSelectedMenuId(null);
      setMenuItems([]);
      setMessage("");
    } catch {
      setMessage("Menüler yüklenirken hata oluştu.");
    }
  }, [language]);

  useEffect(() => {
    if (language) loadMenus();
  }, [language, loadMenus]);

  const addMenu = async () => {
    if (!newMenuTitle.trim()) {
      setMessage("Lütfen menü başlığı girin.");
      return;
    }
    try {
      await axios.post("/footer-menu", {
        language,
        title: newMenuTitle.trim(),
      });
      setNewMenuTitle("");
      setShowNewMenuInput(false);
      loadMenus();
      setMessage("Menü başarıyla eklendi.");
    } catch {
      setMessage("Menü eklenirken hata oluştu.");
    }
  };

  const deleteMenu = async (menuId) => {
    if (!window.confirm("Bu menüyü silmek istediğinizden emin misiniz?"))
      return;
    try {
      await axios.delete(`/footer-menu/${menuId}`);
      if (menuId === selectedMenuId) {
        setSelectedMenuId(null);
        setMenuItems([]);
      }
      loadMenus();
      setMessage("Menü silindi.");
    } catch {
      setMessage("Menü silinirken hata oluştu.");
    }
  };

  const addItem = async () => {
    if (!newItem.name.trim() || !newItem.url.trim()) {
      setMessage("Öğe adı ve URL boş bırakılamaz.");
      return;
    }
    try {
      await axios.post(`/footer-menu-item/${selectedMenuId}`, {
        name: newItem.name.trim(),
        url: newItem.url.trim(),
      });
      setNewItem({ name: "", url: "" });
      loadMenuItems(selectedMenuId);
      setMessage("Öğe başarıyla eklendi.");
    } catch {
      setMessage("Öğe eklenirken hata oluştu.");
    }
  };

  const deleteItem = async (itemId) => {
    if (!window.confirm("Bu öğeyi silmek istediğinizden emin misiniz?")) return;
    try {
      await axios.delete(`/footer-menu-item/${itemId}`);
      loadMenuItems(selectedMenuId);
      setMessage("Öğe silindi.");
    } catch {
      setMessage("Öğe silinirken hata oluştu.");
    }
  };

  const closeContentPanel = () => {
    setSelectedMenuId(null);
    setMenuItems([]);
    setMessage("");
  };

  return (
    <div className="w-2/3 mx-auto p-6 text-white rounded-2xl border border-white shadow-md hover:shadow-lg transition">
      <h2 className="text-3xl font-bold mb-6">Footer Menü Yönetimi</h2>

      {message && (
        <div className="mb-4 p-3 bg-red-100 text-red-600 rounded select-none">
          {message}
        </div>
      )}

      <div
        className={`flex gap-6 ${!selectedMenuId ? "flex-col" : "flex-row"}`}
      >
        {/* Sol panel: Menü Listesi */}
        <div
          className={`border border-white rounded-lg p-4 shadow-sm ${
            selectedMenuId ? "w-1/3" : "w-full"
          }`}
        >
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowNewMenuInput((v) => !v)}
              className="bg-red-500 cursor-pointer hover:bg-[#c62121] text-white rounded px-4 py-2 transition w-full"
            >
              {showNewMenuInput ? "İptal" : "Menü Ekle"}
            </button>
          </div>

          {showNewMenuInput && (
            <div className="mb-4">
              <input
                type="text"
                placeholder="Yeni Menü Başlığı"
                className="border border-white bg-gray-50 text-black rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                value={newMenuTitle}
                onChange={(e) => setNewMenuTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addMenu();
                }}
                autoFocus
              />
              <button
                onClick={addMenu}
                className="mt-2 bg-green-700 hover:bg-green-800 text-white rounded px-4 py-2 w-full transition"
              >
                Kaydet
              </button>
            </div>
          )}

          {menus.length === 0 ? (
            <p className="text-gray-500 mt-4">Henüz menü yok.</p>
          ) : (
            <ul className="space-y-2 max-h-[400px] overflow-auto">
              {menus.map((menu) => (
                <li
                  key={menu.id}
                  onClick={() => {
                    setSelectedMenuId(menu.id);
                    loadMenuItems(menu.id);
                  }}
                  className={`cursor-pointer px-3 py-2 rounded-md border flex justify-between items-center transition ${
                    menu.id === selectedMenuId
                      ? "border-red-600 bg-[#101010] font-semibold"
                      : "border-red-500 hover:bg-[#c62121]"
                  }`}
                >
                  <span>{menu.title}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteMenu(menu.id);
                    }}
                    className="text-gray-50 hover:text-gray-400 cursor-pointer text-2xl font-bold"
                    title="Sil"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Sağ panel: Seçilen Menü İçeriği (2/3 genişlik) */}
        {selectedMenuId && (
          <div className="w-2/3 border border-gray-300 rounded-lg p-6 shadow-sm relative">
            <button
              onClick={closeContentPanel}
              className="absolute top-3 right-3 text-red-500 hover:text-[#c62121] cursor-pointer text-3xl font-bold leading-none"
              aria-label="İçerik panelini kapat"
            >
              ×
            </button>

            <h3 className="text-2xl font-bold mb-6">Menü Öğeleri</h3>

            {menuItems.length === 0 ? (
              <p className="text-gray-500 mb-6">
                Bu menüye ait öğe bulunmamaktadır.
              </p>
            ) : (
              <ul className="space-y-3 max-h-80 overflow-auto mb-6">
                {menuItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded"
                  >
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-sm text-blue-600 break-all">
                        {item.url}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteItem(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                      title="Öğeyi Sil"
                    >
                      🗑 Sil
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Öğe Adı"
                className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={newItem.name}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <input
                type="text"
                placeholder="URL"
                className="border border-gray-300 rounded px-3 py-2 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                value={newItem.url}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, url: e.target.value }))
                }
              />
              <button
                onClick={addItem}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded px-6 py-2 transition"
              >
                ➕ Öğeyi Ekle
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FooterSettings;
