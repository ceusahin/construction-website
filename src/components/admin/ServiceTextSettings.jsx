import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/construction/services-text";

const ServiceTextSettings = () => {
  const [language, setLanguage] = useState("tr");
  const [formData, setFormData] = useState({
    h1: "",
    h2: "",
    paragraph: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const fetchData = async (lang) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/${lang}`);
      setFormData({
        h1: response.data.h1 || "",
        h2: response.data.h2 || "",
        paragraph: response.data.paragraph || "",
      });
    } catch (error) {
      // Eğer veri yoksa temizle
      console.error("Veri alınırken hata oluştu:", error);
      setFormData({ h1: "", h2: "", paragraph: "" });
      setMessage("Veri bulunamadı, yeni içerik ekleyebilirsiniz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(language);
  }, [language]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    try {
      await axios.put(`${API_BASE_URL}/${language}`, {
        id: null, // id backend tarafında gerekirse kullanabilir
        languageCode: language,
        h1: formData.h1,
        h2: formData.h2,
        paragraph: formData.paragraph,
      });
      setMessage("Başarıyla kaydedildi.");
    } catch (error) {
      console.error("Kaydetme sırasında hata oluştu:", error);
      setMessage("Kaydetme sırasında hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-1/2 p-6 border rounded-md shadow-md bg-white">
      <h1 className="text-2xl font-bold mb-6">Hizmetlerimiz Metin Düzenleme</h1>

      <label className="block mb-2 font-semibold">Dil Seçimi</label>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="border rounded px-3 py-2 mb-6 w-full"
        disabled={loading}
      >
        <option value="tr">Türkçe</option>
        <option value="en">English</option>
      </select>

      <label className="block mb-2 font-semibold">Başlık (H1)</label>
      <input
        type="text"
        name="h1"
        value={formData.h1}
        onChange={handleInputChange}
        className="border rounded px-3 py-2 mb-4 w-full"
        disabled={loading}
      />

      <label className="block mb-2 font-semibold">Alt Başlık (H2)</label>
      <input
        type="text"
        name="h2"
        value={formData.h2}
        onChange={handleInputChange}
        className="border rounded px-3 py-2 mb-4 w-full"
        disabled={loading}
      />

      <label className="block mb-2 font-semibold">Paragraf</label>
      <textarea
        name="paragraph"
        rows={5}
        value={formData.paragraph}
        onChange={handleInputChange}
        className="border rounded px-3 py-2 mb-4 w-full"
        disabled={loading}
      />

      {message && (
        <p
          className={`mb-4 ${
            message.includes("hata") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? "Kaydediliyor..." : "Kaydet"}
      </button>
    </div>
  );
};

export default ServiceTextSettings;
