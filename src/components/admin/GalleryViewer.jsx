import { useEffect, useState } from "react";
import axios from "axios";

const GalleryViewer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/gallery")
      .then((res) => {
        setImages(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fotoğraflar alınamadı:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Yükleniyor...</p>;
  if (images.length === 0)
    return <p className="text-center mt-10">Hiç fotoğraf bulunamadı.</p>;

  return (
    <div className="p-4">
      {/* Üst Menü */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Galeri</h2>
      </div>

      {/* Görünüm Alanı */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((image) => (
          <div
            key={image.id}
            className="bg-white rounded shadow p-2 hover:shadow-lg transition cursor-pointer"
            onClick={() => setSelectedImage(image)}
          >
            <img
              src={image.imageUrl}
              alt={image.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="text-sm font-semibold truncate">{image.title}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-xl p-4 relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-4 text-2xl font-bold"
            >
              &times;
            </button>
            <img
              src={selectedImage.imageUrl}
              alt={selectedImage.title}
              className="w-full h-auto rounded"
            />
            <p className="mt-2 text-center text-lg font-medium">
              {selectedImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryViewer;
