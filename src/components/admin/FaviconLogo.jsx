import React, { useEffect, useState } from "react";
import axios from "axios";

const FaviconLogo = () => {
  const [favicon, setFavicon] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/favicon")
      .then((res) => setFavicon(res.data))
      .catch(() => setFavicon(null));
  }, []);

  // Favicon <head> içine yaz
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon?.imageUrl || "";
  }, [favicon]);

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axios
      .post("http://localhost:8080/api/construction/favicon", formData)
      .then((res) => setFavicon(res.data))
      .catch(() => alert("Favicon yüklenirken hata oluştu"))
      .finally(() => setLoading(false));
  };

  const clearFavicon = () => {
    axios
      .delete("http://localhost:8080/api/construction/favicon")
      .then(() => setFavicon(null))
      .catch(() => alert("Favicon kaldırılırken hata oluştu"));
  };

  return (
    <div className="p-4 text-center flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Favicon</h2>

      {favicon ? (
        <img
          src={favicon.imageUrl}
          alt="favicon"
          className="w-30 h-30 object-cover rounded shadow"
        />
      ) : (
        <p className="text-gray-500 italic mb-4">Favicon henüz yüklenmedi</p>
      )}
      <div className="flex flex-col items-center">
        <label
          htmlFor="upload-favicon"
          className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Yükleniyor..." : "Favicon Yükle"}
        </label>
        <input
          id="upload-favicon"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />

        {favicon && (
          <button
            onClick={clearFavicon}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            Favicon Kaldır
          </button>
        )}
      </div>
    </div>
  );
};

export default FaviconLogo;
