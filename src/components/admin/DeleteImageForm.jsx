import { useEffect, useState } from "react";
import axios from "axios";

export default function DeleteImageForm() {
  const [images, setImages] = useState([]);

  const fetchImages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/construction/gallery"
      );
      setImages(res.data);
    } catch (err) {
      console.error("Resimleri çekerken hata oluştu:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu resmi silmek istediğinize emin misiniz?")) return;
    try {
      await axios.delete(
        `http://localhost:8080/api/construction/gallery/${id}`
      );
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Silme sırasında hata oluştu:", err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Galeri</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="rounded overflow-hidden shadow-lg border"
          >
            <img
              src={img.imageUrl}
              alt={img.title}
              className="w-full h-48 object-cover"
            />
            <div className="px-4 py-2">
              <h3 className="text-md font-semibold">{img.title}</h3>
              <button
                onClick={() => handleDelete(img.id)}
                className="mt-2 bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
