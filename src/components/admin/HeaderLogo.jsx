import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const HeaderLogo = () => {
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get("/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axiosInstance
      .post("/logo", formData)
      .then((res) => setLogo(res.data))
      .catch(() => alert("Logo yüklenirken hata oluştu"))
      .finally(() => setLoading(false));
  };

  const clearLogo = () => {
    axiosInstance
      .delete("/logo")
      .then(() => setLogo(null))
      .catch(() => alert("Logo kaldırılırken hata oluştu"));
  };

  return (
    <div className="p-4 text-center flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">Header Logo</h2>

      {logo ? (
        <img
          src={logo.imageUrl}
          alt="Header Logo"
          className="w-30 h-30 object-cover rounded shadow"
        />
      ) : (
        <p className="text-gray-500 italic mb-4">Henüz logo yüklenmedi</p>
      )}
      <div className="flex flex-col items-center">
        <label
          htmlFor="upload-logo"
          className={`mt-4 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer ${
            loading ? "opacity-50 pointer-events-none" : "hover:bg-blue-700"
          }`}
        >
          {loading ? "Yükleniyor..." : "Logo Yükle"}
        </label>
        <input
          id="upload-logo"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />

        {logo && (
          <button
            onClick={clearLogo}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            disabled={loading}
          >
            Logoyu Kaldır
          </button>
        )}
      </div>
    </div>
  );
};

export default HeaderLogo;
