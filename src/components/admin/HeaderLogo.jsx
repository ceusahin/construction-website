import React, { useEffect, useState } from "react";
import axios from "axios";

const HeaderLogo = () => {
  const [logo, setLogo] = useState(null);
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mevcut logo'yu çek
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/gallery/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));
  }, []);

  const openModal = () => {
    axios
      .get("http://localhost:8080/api/construction/gallery")
      .then((res) => setImages(res.data));
    setShowModal(true);
  };

  const handleSelectLogo = (id) => {
    axios
      .put(`http://localhost:8080/api/construction/gallery/logo/${id}`)
      .then((res) => {
        setLogo(res.data);
        setShowModal(false);
      });
  };

  const clearLogo = () => {
    axios
      .delete("http://localhost:8080/api/construction/gallery/logo")
      .then(() => {
        setLogo(null);
        setShowModal(false);
      });
  };

  return (
    <div className="p-4 mt-6">
      <h2 className="text-lg font-semibold mb-2">Header Logo</h2>

      {logo ? (
        <img
          src={logo.imageUrl}
          alt="Header Logo"
          className="w-24 h-24 object-cover rounded shadow"
        />
      ) : (
        <p className="text-gray-500 italic">Henüz logo seçilmedi.</p>
      )}

      <button
        onClick={openModal}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Logo Seç
      </button>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold mb-4">Logo Olarak Seç</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer ${
                    logo?.id === image.id
                      ? "ring-4 ring-blue-500"
                      : "hover:ring-2 hover:ring-gray-400"
                  }`}
                  onClick={() => handleSelectLogo(image.id)}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-32 object-cover"
                  />
                  <p className="text-center text-sm p-1">{image.title}</p>
                </div>
              ))}
              <div
                onClick={clearLogo}
                className="w-full h-32 border-2 border-dashed flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-100 rounded"
              >
                Logoyu Kaldır
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

export default HeaderLogo;
