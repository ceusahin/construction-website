import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const SeoSettings = () => {
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  useEffect(() => {
    axiosInstance.get("/seo").then((res) => setSeo(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axiosInstance.put("/seo", seo).then((res) => {
      alert("SEO bilgileri güncellendi!" + res.data);
    });
  };

  return (
    <div className="p-6 dark:text-white rounded-2xl shadow-md border border-gray-300 dark:border-gray-800 space-y-6 w-2/3 mx-auto hover:shadow-lg">
      <h2 className="text-xl font-bold">SEO Ayarları</h2>

      <label className="block font-semibold">
        Başlık (Şirket ismi geçmeli, 50-60 karakter arası ideal)
      </label>
      <input
        type="text"
        name="title"
        value={seo.title}
        onChange={handleChange}
        placeholder="Title"
        className="border border-gray-300 p-3 dark:border-gray-700 dark:bg-gray-800 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      <label className="block font-semibold">
        Açıklama (120-150 karakter arası ideal)
      </label>
      <textarea
        name="description"
        value={seo.description}
        onChange={handleChange}
        placeholder="Description"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded w-full resize-none focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        rows={4}
      />

      <label className="block font-semibold">
        Keywords (Virgülle ayırın, 15-20 kelime arası ideal)
      </label>
      <input
        type="text"
        name="keywords"
        value={seo.keywords}
        onChange={handleChange}
        placeholder="Keywords (virgülle ayır)"
        className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-500 transition"
      />

      <button
        onClick={handleSave}
        className="bg-red-500 hover:bg-[#c62121] cursor-pointer text-white px-5 py-2 rounded transition"
      >
        Kaydet
      </button>
    </div>
  );
};

export default SeoSettings;
