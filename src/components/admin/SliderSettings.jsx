import React, { useEffect, useState } from "react";
import axios from "axios";
import useLanguage from "../../contexts/language/useLanguage";

const SliderSettings = () => {
  const { language } = useLanguage();
  const [sliders, setSliders] = useState([]);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedSliderIndex, setSelectedSliderIndex] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(false);

  useEffect(() => {
    fetchSliders(language);
  }, [language]);

  const fetchSliders = async (lang) => {
    const res = await axios.get(
      `http://localhost:8080/api/construction/slider/${lang}`
    );
    setSliders(res.data);
  };

  const handleTranslationChange = (index, lang, field, value) => {
    setSliders((prevSliders) => {
      const updated = [...prevSliders];
      const translations = { ...(updated[index].translations || {}) };
      translations[lang] = { ...translations[lang], [field]: value };
      updated[index] = { ...updated[index], translations };
      return updated;
    });
  };

  const handleInputChange = (index, field, value) => {
    setSliders((prevSliders) => {
      const updated = [...prevSliders];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleSave = async (slider) => {
    if (slider.id) {
      alert("Bu slider zaten kayıtlı, güncelle butonunu kullanın.");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:8080/api/construction/slider`,
        slider
      );
      const savedSlider = res.data;
      setSliders((prev) => [...prev, savedSlider]);
    } catch (err) {
      console.error("Slider kaydetme hatası:", err);
    }
  };

  const handleUpdate = async (slider) => {
    if (!slider.id) {
      alert("Bu slider henüz kayıtlı değil, önce kaydetmelisiniz.");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:8080/api/construction/slider/${slider.id}`,
        slider
      );
      const updatedSlider = res.data;
      setSliders((prev) => {
        const idx = prev.findIndex((s) => s.id === updatedSlider.id);
        if (idx !== -1) {
          const copy = [...prev];
          copy[idx] = updatedSlider;
          return copy;
        }
        return prev;
      });
      alert("Slider güncellendi.");
    } catch (err) {
      console.error("Slider güncelleme hatası:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      alert("Henüz kaydedilmemiş bir slider silinemez.");
      return;
    }
    await axios.delete(`http://localhost:8080/api/construction/slider/${id}`);
    fetchSliders(language);
  };

  // Galeri modalını açar ve backend'den fotoğrafları çeker
  const openGallery = async (sliderIndex) => {
    setSelectedSliderIndex(sliderIndex);
    setShowGallery(true);
    setGalleryLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:8080/api/construction/gallery"
      );
      setGalleryImages(res.data);
    } catch (error) {
      console.error("Galeriden fotoğraf alınamadı", error);
      setGalleryImages([]);
    } finally {
      setGalleryLoading(false);
    }
  };

  // Galeriden seçilen resmi slider'a atar ve modalı kapatır
  const selectImage = (imageUrl) => {
    if (selectedSliderIndex === null) return;
    const updated = [...sliders];
    updated[selectedSliderIndex].imageUrl = imageUrl;
    setSliders(updated);
    setShowGallery(false);
    setSelectedSliderIndex(null);
  };

  return (
    <div>
      {sliders.map((slider, i) => (
        <div key={slider.id || i} className="border p-4 my-4 rounded shadow">
          <img
            src={slider.imageUrl || "/"}
            alt="slider"
            className="w-full h-48 object-cover mb-2"
          />

          {/* Dil bağımsız alanlar */}
          <label>Image URL (Cloudinary’den seçilecek)</label>
          <input
            type="text"
            value={slider.imageUrl}
            onChange={(e) => handleInputChange(i, "imageUrl", e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <button
            onClick={() => openGallery(i)}
            className="bg-indigo-600 text-white px-3 py-1 rounded mb-2"
          >
            Galeriden Görsel Seç
          </button>

          {/* Dil bazlı alanlar */}
          <div className="flex space-x-4">
            {/* Türkçe */}
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Türkçe</h3>
              <label>Title</label>
              <input
                type="text"
                value={slider.translations?.tr?.title || ""}
                onChange={(e) =>
                  handleTranslationChange(i, "tr", "title", e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Description</label>
              <textarea
                value={slider.translations?.tr?.description || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "tr",
                    "description",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 1 Text</label>
              <input
                type="text"
                value={slider.translations?.tr?.button1Text || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "tr",
                    "button1Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 2 Text</label>
              <input
                type="text"
                value={slider.translations?.tr?.button2Text || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "tr",
                    "button2Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 1 URL</label>
              <input
                type="text"
                value={slider.button1Url || ""}
                onChange={(e) =>
                  handleInputChange(i, "button1Url", e.target.value)
                } // burada handleInputChange olmalı
                className="border px-2 py-1 rounded w-full mb-2"
              />

              <label>Button 2 URL</label>
              <input
                type="text"
                value={slider.button2Url || ""}
                onChange={(e) =>
                  handleInputChange(i, "button2Url", e.target.value)
                } // burada da handleInputChange
                className="border px-2 py-1 rounded w-full mb-2"
              />
            </div>

            {/* İngilizce */}
            <div className="flex-1">
              <h3 className="font-semibold mb-1">English</h3>
              <label>Title</label>
              <input
                type="text"
                value={slider.translations?.en?.title || ""}
                onChange={(e) =>
                  handleTranslationChange(i, "en", "title", e.target.value)
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Description</label>
              <textarea
                value={slider.translations?.en?.description || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "en",
                    "description",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 1 Text</label>
              <input
                type="text"
                value={slider.translations?.en?.button1Text || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "en",
                    "button1Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 2 Text</label>
              <input
                type="text"
                value={slider.translations?.en?.button2Text || ""}
                onChange={(e) =>
                  handleTranslationChange(
                    i,
                    "en",
                    "button2Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
              <label>Button 1 URL</label>
              <input
                type="text"
                value={slider.button1Url || ""}
                onChange={(e) =>
                  handleInputChange(i, "button1Url", e.target.value)
                } // burada handleInputChange olmalı
                className="border px-2 py-1 rounded w-full mb-2"
              />

              <label>Button 2 URL</label>
              <input
                type="text"
                value={slider.button2Url || ""}
                onChange={(e) =>
                  handleInputChange(i, "button2Url", e.target.value)
                } // burada da handleInputChange
                className="border px-2 py-1 rounded w-full mb-2"
              />
            </div>
          </div>

          {/* Butonlar */}
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mr-4 mt-3"
            onClick={() => handleSave(slider)}
          >
            Kaydet
          </button>

          <button
            className="bg-yellow-600 text-white px-4 py-2 rounded mr-4"
            onClick={() => handleUpdate(slider)}
          >
            Güncelle
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded"
            onClick={() => handleDelete(slider.id)}
          >
            Sil
          </button>
        </div>
      ))}

      {sliders.length < 3 && (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          onClick={() =>
            setSliders([
              ...sliders,
              {
                id: null,
                imageUrl: "",
                title: "",
                description: "",
                button1Text: "",
                button1Url: "",
                button2Text: "",
                button2Url: "",
              },
            ])
          }
        >
          Yeni Slider Ekle
        </button>
      )}

      {/* Galeri Modal */}
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg overflow-auto max-h-[80vh] w-full max-w-5xl p-4 relative">
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-2 right-4 text-3xl font-bold"
              title="Kapat"
            >
              &times;
            </button>

            <h3 className="text-xl font-bold mb-4">Galeriden Fotoğraf Seç</h3>

            {galleryLoading ? (
              <p>Yükleniyor...</p>
            ) : galleryImages.length === 0 ? (
              <p>Galeri boş</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div
                    key={img.id}
                    className="cursor-pointer border rounded overflow-hidden hover:shadow-lg"
                    onClick={() => selectImage(img.imageUrl)}
                  >
                    <img
                      src={img.imageUrl}
                      alt={img.title}
                      className="w-full h-32 object-cover"
                    />
                    <p className="text-center text-sm p-1 truncate">
                      {img.title}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SliderSettings;
