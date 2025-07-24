import React, { useEffect, useState } from "react";
import axios from "axios";

const SeoSettings = () => {
  const [seo, setSeo] = useState({
    title: "",
    description: "",
    keywords: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/seo")
      .then((res) => setSeo(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSeo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.put("http://localhost:8080/api/construction/seo", seo).then((res) => {
      alert("SEO bilgileri güncellendi!" + res.data);
    });
  };

  return (
    <div className="space-y-4 w-1/2">
      <h2 className="text-xl font-bold">SEO Ayarları</h2>
      <input
        type="text"
        name="title"
        value={seo.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 w-full rounded"
      />

      <textarea
        name="description"
        value={seo.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded"
      />

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
