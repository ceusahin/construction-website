import React, { useEffect, useState } from "react";
import axios from "axios";

const ExperienceSettings = () => {
  const [experiences, setExperiences] = useState([]);
  const [activeLangTabs, setActiveLangTabs] = useState({});

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/construction/experience"
      );
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

    await axios.delete(
      `http://localhost:8080/api/construction/experience/${id}`
    );
    alert("Tecrübe silindi.");
    fetchExperiences();
  };

  const handleChange = (index, field, value) => {
    const updated = [...experiences];
    updated[index][field] = value;
    setExperiences(updated);
  };

  const handleTranslationChange = (index, lang, field, value) => {
    const updated = [...experiences];
    const transIndex = updated[index].translations.findIndex(
      (t) => t.language === lang
    );
    if (transIndex !== -1) {
      updated[index].translations[transIndex][field] = value;
    }
    setExperiences(updated);
  };

  const handleSave = async (exp) => {
    try {
      await axios.post(
        "http://localhost:8080/api/construction/experience",
        exp
      );
      alert("Tecrübe eklendi.");

      fetchExperiences();
    } catch (err) {
      console.error("Kaydetme hatası", err);
    }
  };

  const handleLangTabChange = (id, lang) => {
    setActiveLangTabs((prev) => ({ ...prev, [id]: lang }));
  };

  return (
    <div className="">
      <h2 className="text-xl font-bold mb-2">Tecrübe Yönetimi</h2>
      <p className="mb-4">Maksimum 4 adet tecrübe eklenebilir.</p>

      {experiences.length < 4 && (
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          Yeni Tecrübe Ekle
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experiences.map((exp, index) => {
          const currentLang = activeLangTabs[exp.id || index] || "tr";
          const currentTrans =
            exp.translations.find((t) => t.language === currentLang) || {};

          return (
            <div key={exp.id || index} className="border rounded shadow p-4">
              <div className="mb-3">
                <label className="font-semibold block mb-1">Görünürlük</label>
                <select
                  value={exp.visible ? "true" : "false"}
                  onChange={(e) =>
                    handleChange(index, "visible", e.target.value === "true")
                  }
                  className="border px-2 py-1 w-full"
                >
                  <option value="true">Göster</option>
                  <option value="false">Gizle</option>
                </select>
              </div>

              <div className="flex space-x-2 mb-2">
                <button
                  onClick={() => handleLangTabChange(exp.id || index, "tr")}
                  className={`px-4 py-1 rounded-t ${
                    currentLang === "tr"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  Türkçe
                </button>
                <button
                  onClick={() => handleLangTabChange(exp.id || index, "en")}
                  className={`px-4 py-1 rounded-t ${
                    currentLang === "en"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  English
                </button>
              </div>

              <div className="mt-6 rounded mb-3">
                <label className="font-semibold block mb-1">
                  Sayı ({currentLang})
                </label>
                <input
                  type="text"
                  value={currentTrans.numberText || ""}
                  onChange={(e) =>
                    handleTranslationChange(
                      index,
                      currentLang,
                      "numberText",
                      e.target.value
                    )
                  }
                  className="border px-2 py-1 w-full mb-2"
                />

                <label className="font-semibold block mb-1">
                  Metin ({currentLang})
                </label>
                <input
                  type="text"
                  value={currentTrans.labelText || ""}
                  onChange={(e) =>
                    handleTranslationChange(
                      index,
                      currentLang,
                      "labelText",
                      e.target.value
                    )
                  }
                  className="border px-2 py-1 w-full"
                />
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => handleSave(exp)}
                  className="bg-green-600 text-white px-4 py-1 rounded"
                >
                  Kaydet
                </button>
                <button
                  onClick={() => handleDelete(exp.id)}
                  className="bg-red-600 text-white px-4 py-1 rounded"
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
