import React, { useEffect, useState } from "react";
import axios from "axios";

const FaviconLogo = () => {
  const [favicon, setFavicon] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mevcut favicon'u çek
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/gallery/favicon")
      .then((res) => setFavicon(res.data))
      .catch(() => setFavicon(null));
  }, []);

  // Favicon'u <head> içine yaz
  useEffect(() => {
    let link = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = favicon?.imageUrl || "";
  }, [favicon]);

  const openModal = () => {
    axios
      .get("http://localhost:8080/api/construction/gallery")
      .then((res) => setImages(res.data));
    setShowModal(true);
  };

  const selectFavicon = (id) => {
    axios
      .put(`http://localhost:8080/api/construction/gallery/favicon/${id}`)
      .then((res) => {
        setFavicon(res.data);
        setShowModal(false);
      });
  };

  const clearFavicon = () => {
    axios
      .delete("http://localhost:8080/api/construction/gallery/favicon")
      .then(() => {
        setFavicon(null);
        setShowModal(false);
      });
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-2">Favicon</h2>

      {favicon ? (
        <img
          src={favicon.imageUrl}
          alt="favicon"
          className="w-16 h-16 object-cover rounded shadow"
        />
      ) : (
        <p className="text-gray-500 italic">Favicon Yok</p>
      )}

      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Favicon Seç
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Favicon Seç</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer ${
                    favicon?.id === img.id
                      ? "ring-4 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                  onClick={() => selectFavicon(img.id)}
                >
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-sm p-1">{img.title}</p>
                </div>
              ))}
              <div
                onClick={clearFavicon}
                className="w-full h-32 border-2 border-dashed flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-100 rounded"
              >
                Favicon Kaldır
              </div>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Kapat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaviconLogo;
