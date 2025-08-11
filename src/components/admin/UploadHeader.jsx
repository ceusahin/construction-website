import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import { Upload, Trash2, Loader2 } from "lucide-react";

const UploadHeader = ({ title, fetchUrl, uploadUrl, deleteUrl }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(fetchUrl)
      .then((res) => setImage(res.data))
      .catch(() => setImage(null));
  }, [fetchUrl]);

  const handleFileChange = (e) => {
    if (e.target.files.length === 0) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files[0]);

    axiosInstance
      .post(uploadUrl, formData)
      .then((res) => setImage(res.data))
      .catch(() => alert(`${title} yüklenirken hata oluştu`))
      .finally(() => setLoading(false));
  };

  const clearImage = () => {
    axiosInstance
      .delete(deleteUrl)
      .then(() => setImage(null))
      .catch(() => alert(`${title} kaldırılırken hata oluştu`));
  };

  return (
    <div className="text-white rounded-2xl w-1/2 shadow-md border border-white p-6 flex flex-col items-center gap-4 hover:shadow-lg transition ">
      <h2 className="text-lg font-semibold">{title}</h2>

      <div className="relative w-60 h-60 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
        {loading ? (
          <Loader2 className="animate-spin text-red-500" size={32} />
        ) : image ? (
          <>
            <img
              src={image.imageUrl}
              alt={title}
              className="w-full h-full object-contain"
            />
            <button
              onClick={clearImage}
              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full shadow hover:bg-red-700"
              title="Kaldır"
            >
              <Trash2 size={16} className="cursor-pointer" />
            </button>
          </>
        ) : (
          <label
            htmlFor={`upload-${title}`}
            className="flex flex-col items-center gap-1 cursor-pointer text-gray-500 hover:text-blue-600"
          >
            <Upload size={28} />
            <span className="text-sm">Yükle</span>
          </label>
        )}
        <input
          id={`upload-${title}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={loading}
        />
      </div>

      {image && (
        <p className="text-xs truncate w-full text-center">
          {title} başarıyla yüklendi. <br /> Değiştirmek için önce silin.
        </p>
      )}
    </div>
  );
};

export default function LogoSettings() {
  return (
    <div className="flex flex-col md:flex-row md:justify-center gap-10 mt-6 md:w-2/3">
      <UploadHeader
        title="Header Logo"
        fetchUrl="/logo"
        uploadUrl="/logo"
        deleteUrl="/logo"
      />
      <UploadHeader
        title="Favicon"
        fetchUrl="/favicon"
        uploadUrl="/favicon"
        deleteUrl="/favicon"
      />
    </div>
  );
}
