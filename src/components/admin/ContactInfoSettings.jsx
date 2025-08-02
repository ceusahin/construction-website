import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const LANGUAGES = ["tr", "en"];
const NEW_KEY = "new"; // null id için key

const ContactInfoSettings = () => {
  const [contactInfos, setContactInfos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeLangTabs, setActiveLangTabs] = useState({});

  useEffect(() => {
    fetchContactInfos();
  }, []);

  const fetchContactInfos = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/contact-info");
      const dataArray = Array.isArray(res.data)
        ? res.data
        : res.data.data || [];
      setContactInfos(dataArray);

      const langTabs = {};
      dataArray.forEach((info) => {
        langTabs[info.id] = "tr";
      });
      setActiveLangTabs(langTabs);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslationChange = (infoId, lang, field, value) => {
    setContactInfos((prev) =>
      prev.map((info) => {
        const key = info.id === null ? NEW_KEY : info.id;
        if (key !== (infoId === null ? NEW_KEY : infoId)) return info;
        return {
          ...info,
          translations: info.translations.map((t) =>
            t.language === lang ? { ...t, [field]: value } : t
          ),
        };
      })
    );
  };

  const handleIsActiveToggle = (infoId) => {
    setContactInfos((prev) =>
      prev.map((info) => {
        const key = info.id === null ? NEW_KEY : info.id;
        if (key !== (infoId === null ? NEW_KEY : infoId)) return info;
        return { ...info, isActive: !info.isActive };
      })
    );
  };

  const handleTypeChange = (infoId, newType) => {
    const exists = contactInfos.some(
      (info) => info.id !== infoId && info.type === newType
    );
    if (exists) {
      alert(`${newType} türü zaten seçilmiş! Lütfen farklı bir tür seçin.`);
      return;
    }
    setContactInfos((prev) =>
      prev.map((item) =>
        item.id === infoId || (item.id === null && infoId === null)
          ? { ...item, type: newType }
          : item
      )
    );
  };

  const handleSave = async (info) => {
    try {
      if (info.id) {
        await axiosInstance.put(`/contact-info/${info.id}`, info);
      } else {
        await axiosInstance.post(`/contact-info`, info);
      }
      alert("Kaydedildi");
      fetchContactInfos();
    } catch (err) {
      console.error("Save error:", err);
      alert("Kaydetme sırasında hata oluştu");
    }
  };

  const handleDelete = async (info) => {
    if (!info.id) {
      // Henüz kaydedilmemiş yeni öğeyi frontendden sil
      setContactInfos((prev) => prev.filter((item) => item !== info));
      return;
    }

    if (
      window.confirm("Bu iletişim bilgisini silmek istediğinize emin misiniz?")
    ) {
      try {
        await axiosInstance.delete(`/contact-info/${info.id}`);
        alert("Silindi");
        setContactInfos((prev) => prev.filter((item) => item.id !== info.id));
        // Aktif dil sekmesi ayarlarını da temizleyebilirsin istersen
      } catch (error) {
        console.error("Silme hatası:", error);
        alert("Silme sırasında hata oluştu.");
      }
    }
  };

  const handleAddNew = () => {
    // Mevcut tipleri topla
    const usedTypes = contactInfos.map((info) => info.type);

    // Kullanılmayan ilk type'ı bul (öncelik PHONE, EMAIL, ADDRESS, WORK_HOURS)
    const allTypes = ["PHONE", "EMAIL", "ADDRESS", "WORK_HOURS"];
    const availableType = allTypes.find((t) => !usedTypes.includes(t));

    if (!availableType) {
      alert("Tüm türler zaten kullanılıyor, yeni bilgi ekleyemezsiniz.");
      return;
    }

    const newInfo = {
      id: null,
      type: availableType,
      isActive: true,
      translations: LANGUAGES.map((lang) => ({
        language: lang,
        title: "",
        content: "",
      })),
    };

    setContactInfos((prev) => [newInfo, ...prev]);
    setActiveLangTabs((prev) => ({ ...prev, [NEW_KEY]: "tr" }));
  };

  const handleLangTabClick = (infoId, lang) => {
    const key = infoId === null ? NEW_KEY : infoId;
    setActiveLangTabs((prev) => ({ ...prev, [key]: lang }));
  };

  if (loading)
    return (
      <div className="text-center text-lg font-bold py-10 text-gray-600">
        Yükleniyor...
      </div>
    );

  return (
    <div className="max-w-5xl my-8">
      <h2 className="text-xl font-bold mb-4">İletişim Bilgileri Yönetimi</h2>

      <div className="mb-4">
        <button
          onClick={handleAddNew}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-2"
        >
          Yeni Bilgi Ekle
        </button>
      </div>

      {contactInfos.length === 0 && (
        <p className="text-center text-gray-500">Henüz bilgi yok.</p>
      )}

      <div className="flex flex-wrap gap-6">
        {contactInfos.map((info) => {
          const key = info.id === null ? NEW_KEY : info.id;
          return (
            <div
              key={key}
              className="w-full sm:w-[48%] bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex flex-wrap items-center gap-6 mb-4">
                <label className="font-semibold min-w-[100px] flex items-center gap-2">
                  Tür:
                  <select
                    value={info.type}
                    onChange={(e) => handleTypeChange(info.id, e.target.value)}
                    className="ml-2 border border-gray-300 rounded-md px-2 py-1 text-sm"
                  >
                    <option value="PHONE">Telefon</option>
                    <option value="EMAIL">Email</option>
                    <option value="ADDRESS">Adres</option>
                    <option value="WORK_HOURS">Çalışma Saatleri</option>
                  </select>
                </label>

                <label className="flex items-center gap-2 font-semibold cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={info.isActive}
                    onChange={() => handleIsActiveToggle(info.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  Aktif
                </label>
              </div>

              {/* Dil Sekmeleri */}
              <div className="border-b-2 border-blue-600 flex gap-4 mb-4">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLangTabClick(info.id, lang)}
                    className={`px-5 py-2 font-medium rounded-t-md cursor-pointer transition-colors duration-200 ${
                      activeLangTabs[key] === lang
                        ? "bg-blue-600 text-white border-b-4 border-blue-800"
                        : "bg-transparent text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Aktif dil içerik formu */}
              {info.translations
                .filter((t) => t.language === activeLangTabs[key])
                .map((trans) => (
                  <div key={trans.language}>
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">
                        Başlık:
                      </label>
                      <input
                        type="text"
                        value={trans.title}
                        onChange={(e) =>
                          handleTranslationChange(
                            info.id,
                            trans.language,
                            "title",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block font-semibold mb-1">
                        İçerik:
                      </label>
                      <textarea
                        value={trans.content}
                        onChange={(e) =>
                          handleTranslationChange(
                            info.id,
                            trans.language,
                            "content",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={4}
                      />
                    </div>
                  </div>
                ))}

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => handleSave(info)}
                  className="bg-green-600 hover:bg-green-800 text-white px-6 py-3 rounded-md text-lg transition-colors duration-300"
                >
                  Kaydet
                </button>

                <button
                  onClick={() => handleDelete(info)}
                  className="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-md text-lg transition-colors duration-300"
                >
                  Sil
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ContactInfoSettings;
