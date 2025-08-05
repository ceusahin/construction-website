import React, { useEffect, useState } from "react";
import axios from "axios";

const defaultForm = {
  h1: "",
  h2: "",
  paragraph: "",
  media1Type: "image",
  imageUrl1: "",
  publicId1: "",
  youtubeVideoId: "",
  media2Type: "image",
  imageUrl2: "",
  publicId2: "",
};

function GalleryModal({ isOpen, onClose, onSelect }) {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      fetchGallery();
    }
  }, [isOpen]);

  const fetchGallery = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/construction/gallery"
      );
      setGallery(res.data);
    } catch (err) {
      console.warn("Galeri verisi alınamadı", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center bg-black/50 items-center z-50">
      <div className=" rounded border bg-white p-4 max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center">
          <h3 className="text-xl mb-4 font-semibold">Galeri - Resim Seç</h3>
          <button
            onClick={onClose}
            className="text-red-500 font-bold text-xl border rounded-2xl px-2 py-1 cursor-pointer mb-4"
            type="button"
          >
            ✕ Kapat
          </button>
        </div>
        {loading && <p>Yükleniyor...</p>}
        {!loading && gallery.length === 0 && <p>Galeri boş.</p>}
        <div className="grid grid-cols-5 gap-3">
          {gallery.map((img) => (
            <img
              key={img.publicId}
              src={img.imageUrl}
              alt={img.publicId}
              className="w-65 h-60 object-cover cursor-pointer border rounded hover:ring-2 hover:ring-blue-500"
              onClick={() => {
                onSelect(img);
                onClose();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AboutSectionForm({ language, section }) {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [modalMediaKey, setModalMediaKey] = useState(null); // 1 or 2

  const API_URL = `http://localhost:8080/api/construction/about/${language}/${section}`;

  useEffect(() => {
    fetchData();
  }, [language, section]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL);
      setForm((prev) => ({
        ...prev,
        ...res.data,
        media1Type: res.data.youtubeVideoId ? "video" : "image",
        media2Type: "image",
      }));
    } catch (err) {
      console.warn("Veri alınamadı, yeni kayıt olabilir." + err);
      setForm(defaultForm);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Modalda seçilen resmi forma kaydet
  const handleSelectImage = (mediaNum, image) => {
    if (mediaNum === 1) {
      setForm((prev) => ({
        ...prev,
        imageUrl1: image.imageUrl,
        publicId1: image.publicId,
        youtubeVideoId: "",
        media1Type: "image",
      }));
    } else if (mediaNum === 2) {
      setForm((prev) => ({
        ...prev,
        imageUrl2: image.imageUrl,
        publicId2: image.publicId,
        media2Type: "image",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(API_URL, { ...form, languageCode: language, section });
      setMessage("Güncelleme başarılı.");
    } catch (err) {
      console.error(err);
      setMessage("Güncelleme başarısız.");
    }
  };

  if (loading) return <p>Yükleniyor...</p>;

  const renderMediaInput = (mediaNum) => {
    const mediaTypeKey = mediaNum === 1 ? "media1Type" : "media2Type";
    const urlKey = mediaNum === 1 ? "imageUrl1" : "imageUrl2";

    return (
      <>
        <div className="mb-2">
          <select
            name={mediaTypeKey}
            value={form[mediaTypeKey]}
            onChange={(e) => {
              const val = e.target.value;
              if (mediaNum === 1) {
                setForm((prev) => ({
                  ...prev,
                  media1Type: val,
                  youtubeVideoId: val === "video" ? prev.youtubeVideoId : "",
                  imageUrl1: val === "image" ? prev.imageUrl1 : "",
                  publicId1: val === "image" ? prev.publicId1 : "",
                }));
              } else {
                setForm((prev) => ({
                  ...prev,
                  media2Type: val,
                  imageUrl2: val === "image" ? prev.imageUrl2 : "",
                  publicId2: val === "image" ? prev.publicId2 : "",
                }));
              }
            }}
            className="select select-bordered w-full max-w-xs border px-2 py-1 rounded-md"
          >
            <option value="image">Resim</option>
            {mediaNum === 1 && <option value="video">Video</option>}
          </select>
        </div>

        {form[mediaTypeKey] === "image" ? (
          <>
            <button
              type="button"
              onClick={() => setModalMediaKey(mediaNum)}
              className="border px-2 py-1 rounded-md bg-orange-500 text-white cursor-pointer hover:bg-blue-600 transition-colors"
            >
              Resim Seç
            </button>

            {form[urlKey] && (
              <img
                src={form[urlKey]}
                alt="Seçilen"
                className="mb-4 rounded border max-w-xs mt-2"
                style={{ maxHeight: "150px", objectFit: "contain" }}
              />
            )}
          </>
        ) : mediaNum === 1 ? (
          <div>
            <label className="block font-semibold mb-1">
              YouTube Video ID:
            </label>
            <input
              name="youtubeVideoId"
              value={form.youtubeVideoId}
              onChange={handleChange}
              placeholder="Video ID"
              className="input w-full max-w-xs border px-3 py-2"
            />
          </div>
        ) : null}
      </>
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-xl font-bold border-b-black border-b-2 mb-8 w-37">
          {section === "top" ? "Üst Kısım" : "Alt Kısım"} -{" "}
          {language.toUpperCase()}
        </h2>

        <div>
          <label className="block font-semibold mb-2">Üst Başlık</label>
          <input
            name="h1"
            value={form.h1}
            onChange={handleChange}
            placeholder="H1 Başlık"
            className="input w-full border px-2 py-1 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">Alt Başlık</label>
          <input
            name="h2"
            value={form.h2}
            onChange={handleChange}
            placeholder="H2 Alt Başlık"
            className="input w-full border px-2 py-1 rounded-md"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Paragraf:</label>
          <textarea
            name="paragraph"
            value={form.paragraph}
            onChange={handleChange}
            placeholder="Paragraf metni"
            className="textarea w-full border px-2 py-1 rounded-md"
            rows={4}
          />
        </div>

        <div>
          <label className="block font-semibold mb-2">1. Medya</label>
          {renderMediaInput(1)}
        </div>

        <div>
          <label className="block font-semibold mb-2">2. Medya</label>
          {renderMediaInput(2)}
        </div>

        <button
          type="submit"
          className="border px-3 py-2 rounded-md bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-colors"
        >
          Kaydet
        </button>

        {message && <p className="mt-2">{message}</p>}
      </form>

      <GalleryModal
        isOpen={modalMediaKey !== null}
        onClose={() => setModalMediaKey(null)}
        onSelect={(img) => handleSelectImage(modalMediaKey, img)}
      />
    </>
  );
}
