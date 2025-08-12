import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import SwitchOnOff from "../../utils/SwitchOnOff";
import useLanguage from "../../contexts/useLanguage";

const NEW_KEY = "new"; // null id için key

const ContactInfoSettings = () => {
  const [contactInfos, setContactInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  const { language } = useLanguage();

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
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleTranslationChange = (infoId, field, value) => {
    setContactInfos((prev) =>
      prev.map((info) => {
        const key = info.id === null ? NEW_KEY : info.id;
        if (key !== (infoId === null ? NEW_KEY : infoId)) return info;

        // Sadece aktif dil için güncelle
        return {
          ...info,
          translations: info.translations.map((t) =>
            t.language === language ? { ...t, [field]: value } : t
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
      } catch (error) {
        console.error("Silme hatası:", error);
        alert("Silme sırasında hata oluştu.");
      }
    }
  };

  const handleAddNew = () => {
    const usedTypes = contactInfos.map((info) => info.type);
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
      translations: [
        { language: "tr", title: "", content: "" },
        { language: "en", title: "", content: "" },
      ],
    };
    setContactInfos((prev) => [newInfo, ...prev]);
  };

  if (loading)
    return (
      <div className="text-center text-lg font-bold py-10 text-gray-600">
        Yükleniyor...
      </div>
    );

  return (
    <div className="w-full mt-20 mx-auto dark:text-white">
      <h2 className="text-2xl font-bold mb-4">İletişim Bilgileri Yönetimi</h2>
      <p className="mb-6 italic">Maksimum 4 adet eklenebilir.</p>
      <div className="mb-6">
        <button
          onClick={handleAddNew}
          className="bg-red-500 cursor-pointer text-white px-5 py-2 rounded-lg shadow hover:bg-[#c62121] transition"
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

          // Sadece aktif dilin translation verisini al
          const currentTrans = info.translations.find(
            (t) => t.language === language
          ) || { title: "", content: "" };

          return (
            <div
              key={key}
              className="w-full sm:w-[48%] rounded-2xl shadow-lg p-6 border border-gray-300 dark:border-gray-800"
            >
              <div className="flex flex-wrap items-center gap-6 mb-5">
                <label className="font-semibold min-w-[110px] flex items-center gap-2">
                  Tür:
                  <select
                    value={info.type}
                    onChange={(e) => handleTypeChange(info.id, e.target.value)}
                    className="ml-3 border text-black dark:bg-gray-800 border-gray-300 dark:border-gray-700 dark:text-white cursor-pointer rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <option value="PHONE">Telefon</option>
                    <option value="EMAIL">Email</option>
                    <option value="ADDRESS">Adres</option>
                    <option value="WORK_HOURS">Çalışma Saatleri</option>
                  </select>
                </label>

                <label className="flex items-center gap-3 font-semibold cursor-pointer select-none">
                  Görünürlük:
                  <SwitchOnOff
                    checked={info.isActive}
                    onChange={() => handleIsActiveToggle(info.id)}
                  />
                </label>
              </div>

              <div className="mb-5">
                <label className="block font-semibold mb-2">Başlık</label>
                <input
                  type="text"
                  value={currentTrans.title}
                  onChange={(e) =>
                    handleTranslationChange(info.id, "title", e.target.value)
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 text-black rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-2">İçerik</label>
                <textarea
                  value={currentTrans.content}
                  onChange={(e) =>
                    handleTranslationChange(info.id, "content", e.target.value)
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white bg-gray-50 text-black rounded-lg px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-red-400"
                  rows={4}
                />
              </div>

              <div className="flex gap-5">
                <button
                  onClick={() => handleSave(info)}
                  className="bg-green-600 cursor-pointer hover:bg-green-800 text-white px-6 py-3 rounded-lg shadow-md transition"
                >
                  Kaydet
                </button>

                <button
                  onClick={() => handleDelete(info)}
                  className="bg-red-500 hover:bg-[#c62121] cursor-pointer text-white px-6 py-3 rounded-lg shadow-md transition"
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
