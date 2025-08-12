import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useLanguage from "../../contexts/useLanguage";
import SwitchOnOff from "../../utils/SwitchOnOff";

const ExperienceSettings = () => {
  const { language } = useLanguage();

  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axiosInstance.get("/experience");
      setExperiences(res.data);
    } catch (err) {
      console.error("Veriler alınamadı", err);
    }
  };

  const handleAdd = () => {
    if (experiences.length >= 4) {
      alert("En fazla 4 experience olabilir.");
      return;
    }

    const newExp = {
      id: null,
      visible: true,
      translations: [
        { language: "tr", numberText: "", labelText: "" },
        { language: "en", numberText: "", labelText: "" },
      ],
    };

    setExperiences([...experiences, newExp]);
  };

  const handleDelete = async (id) => {
    if (!id) {
      setExperiences((prev) => prev.filter((e) => e.id !== null));
      return;
    }

    try {
      await axiosInstance.delete(`/experience/${id}`);
      alert("Tecrübe silindi.");
      fetchExperiences();
    } catch (err) {
      console.error("Silme hatası", err);
      alert("Silme sırasında hata oluştu");
    }
  };

  const handleVisibleToggle = async (index) => {
    const updated = [...experiences];
    const exp = updated[index];
    exp.visible = !exp.visible;
    setExperiences(updated);

    try {
      if (!exp.id) return;

      await axiosInstance.post(`/experience`, exp);
    } catch (error) {
      console.error("Görünürlük güncellenirken hata oluştu", error);
      alert("Görünürlük güncellenirken hata oluştu");
      exp.visible = !exp.visible;
      setExperiences([...updated]);
    }
  };

  const handleTranslationChange = (index, field, value) => {
    const updated = [...experiences];
    const transIndex = updated[index].translations.findIndex(
      (t) => t.language === language
    );
    if (transIndex !== -1) {
      updated[index].translations[transIndex][field] = value;
    }
    setExperiences(updated);
  };

  const handleSave = async (exp) => {
    try {
      await axiosInstance.post("/experience", exp);
      alert("Tecrübe kaydedildi.");
      fetchExperiences();
    } catch (err) {
      console.error("Kaydetme hatası", err);
      alert("Kaydetme sırasında hata oluştu");
    }
  };

  return (
    <div className="mt-16 w-full mx-auto dark:text-white">
      <h2 className="text-2xl font-bold mb-4">Tecrübe Yönetimi</h2>
      <p className="mb-6 italic">Maksimum 4 adet tecrübe eklenebilir.</p>

      {experiences.length < 4 && (
        <button
          onClick={handleAdd}
          className="bg-red-500 cursor-pointer text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#c62121] transition"
        >
          Yeni Tecrübe Ekle
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-6">
        {experiences.map((exp, index) => {
          const currentLang = language; // Dili buradan alıyoruz
          const currentTrans =
            exp.translations.find((t) => t.language === currentLang) || {};

          return (
            <div
              key={exp.id || index}
              className="border dark:border-gray-800 border-gray-300 rounded-2xl shadow-lg p-6 hover:shadow-xl cursor-default"
            >
              <div className="mb-4 flex items-center justify-between">
                <label className="font-semibold flex items-center gap-2">
                  Görünürlük:
                  <SwitchOnOff
                    checked={exp.visible}
                    onChange={() => handleVisibleToggle(index)}
                  />
                </label>
              </div>

              <div className="mb-4">
                <label className="block font-semibold mb-1">Sayı</label>
                <input
                  type="text"
                  value={currentTrans.numberText || ""}
                  onChange={(e) =>
                    handleTranslationChange(index, "numberText", e.target.value)
                  }
                  className="w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white text-black bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 "
                />
              </div>

              <div className="mb-6">
                <label className="block font-semibold mb-1">Metin</label>
                <input
                  type="text"
                  value={currentTrans.labelText || ""}
                  onChange={(e) =>
                    handleTranslationChange(index, "labelText", e.target.value)
                  }
                  className="w-full border border-gray-300 dark:text-white dark:border-gray-700 dark:bg-gray-800 text-black bg-gray-50 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-400 "
                />
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => handleSave(exp)}
                  className="bg-green-600 cursor-pointer text-white px-5 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded-lg shadow-md hover:bg-[#c62121] cursor-pointer transition"
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

export default ExperienceSettings;
