import React, { useEffect, useState } from "react";
import axios from "axios";
import useLanguage from "../../contexts/useLanguage";

const API_BASE_URL = "http://localhost:8080/api/construction/services-text";

const ServiceTextSettings = () => {
  const { language } = useLanguage();
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
      console.error("Veri alınırken hata oluştu:", error);
      setFormData({ h1: "", h2: "", paragraph: "" });
      setMessage("Veri bulunamadı, yeni içerik ekleyebilirsiniz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (language) {
      fetchData(language);
    }
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
        id: null,
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
    <div className="w-2/3 mx-auto p-8 mt-8 rounded-lg border dark:text-white dark:border-gray-800 border-gray-300 hover:shadow-lg">
      <h1 className="text-2xl font-extrabold mb-8">
        Hizmetlerimiz Metin Düzenleme
      </h1>

      <div className="space-y-6">
        <div>
          <label htmlFor="h1" className="block text-md font-medium mb-1">
            Başlık (H1)
          </label>
          <input
            id="h1"
            type="text"
            name="h1"
            value={formData.h1}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Ana başlığı girin"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-2 text-black dark:text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <div>
          <label htmlFor="h2" className="block text-md font-medium mb-1">
            Alt Başlık (H2)
          </label>
          <input
            id="h2"
            type="text"
            name="h2"
            value={formData.h2}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Alt başlığı girin"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 px-4 py-2 text-black dark:text-white placeholder-gray-400 shadow-sm focus:outline-none focus:ring-red-500 focus:ring-2"
          />
        </div>

        <div>
          <label htmlFor="paragraph" className="block text-md font-medium mb-1">
            Paragraf
          </label>
          <textarea
            id="paragraph"
            name="paragraph"
            rows={6}
            value={formData.paragraph}
            onChange={handleInputChange}
            disabled={loading}
            placeholder="Paragraf metnini girin"
            className="block w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-3 text-black placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-y"
          />
        </div>

        {message && (
          <p
            className={`text-sm font-medium ${
              message.toLowerCase().includes("hata")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={loading}
          className="inline-flex cursor-pointer items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin mr-2 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
              Kaydediliyor...
            </>
          ) : (
            "Kaydet"
          )}
        </button>
      </div>
    </div>
  );
};

export default ServiceTextSettings;
