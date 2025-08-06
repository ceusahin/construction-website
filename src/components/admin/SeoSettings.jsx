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
    <div className="p-4 bg-white shadow-lg border-gray-400 border space-y-4 pb-6 w-2/3">
      <h2 className="text-xl font-bold">SEO Ayarları</h2>
      <label className="font-medium text-l text-gray-700">
        Başlık (Şirket ismi geçmeli, 50-60 karakter arası ideal)
      </label>
      <input
        type="text"
        name="title"
        value={seo.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full rounded"
      />
      <label className="font-medium text-l text-gray-700">
        Açıklama (120-150 karakter arası ideal)
      </label>
      <textarea
        name="description"
        value={seo.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded"
      />
      <label className="font-medium text-l text-gray-700">
        Keywords (Virgülle ayırın, 15-20 kelime arası ideal)
      </label>
      <input
        type="text"
        name="keywords"
        value={seo.keywords}
        onChange={handleChange}
        placeholder="Keywords (virgülle ayır)"
        className="border p-2 w-full rounded"
      />
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Kaydet
      </button>
    </div>
  );
};

export default SeoSettings;
