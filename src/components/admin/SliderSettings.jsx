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
  const [activeTabs, setActiveTabs] = useState({});

  useEffect(() => {
    fetchSliders(language);
    setSelectedSliderIndex(null);
  }, [language]);

  const fetchSliders = async (lang) => {
    const res = await axios.get(
      `http://localhost:8080/api/construction/slider/${lang}`
    );
    setSliders(res.data);
  };

  const handleTabChange = (lang) => {
    if (selectedSliderIndex === null) return;
    setActiveTabs((prev) => ({ ...prev, [selectedSliderIndex]: lang }));
  };

  const handleTranslationChange = (lang, field, value) => {
    if (selectedSliderIndex === null) return;
    setSliders((prevSliders) => {
      const updated = [...prevSliders];
      const translations = {
        ...(updated[selectedSliderIndex].translations || {}),
      };
      translations[lang] = { ...translations[lang], [field]: value };
      updated[selectedSliderIndex] = {
        ...updated[selectedSliderIndex],
        translations,
      };
      return updated;
    });
  };

  const handleInputChange = (field, value) => {
    if (selectedSliderIndex === null) return;
    setSliders((prevSliders) => {
      const updated = [...prevSliders];
      updated[selectedSliderIndex] = {
        ...updated[selectedSliderIndex],
        [field]: value,
      };
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
      setSliders((prev) => prev.map((s) => (s === slider ? savedSlider : s)));
      setSelectedSliderIndex(sliders.findIndex((s) => s === slider)); // Kayıt sonrası seçili tut
      alert("Slider kaydedildi.");
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
    setSelectedSliderIndex(null);
  };

  const openGallery = async () => {
    if (selectedSliderIndex === null) return;
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

  const selectImage = (imageUrl) => {
    if (selectedSliderIndex === null) return;
    setSliders((prev) => {
      const copy = [...prev];
      copy[selectedSliderIndex].imageUrl = imageUrl;
      return copy;
    });
    setShowGallery(false);
  };

  const selectSavedSlider = (index) => {
    setSelectedSliderIndex(index);
    setActiveTabs((prev) => ({ ...prev, [index]: "tr" }));
  };

  const editingSlider =
    selectedSliderIndex !== null ? sliders[selectedSliderIndex] : null;

  return (
    <div>
      {sliders.filter((s) => s.id).length > 0 && (
        <div className="mb-8 rounded">
          <h2 className="text-xl font-bold mb-2">Kayıtlı Slider'lar</h2>
          <p className="mb-4">Maksimum 3 adet slider eklenebilir.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {sliders
              .map((slider, index) => ({ slider, index }))
              .filter(({ slider }) => slider.id)
              .map(({ slider, index }) => (
                <div
                  key={slider.id}
                  className={`border rounded shadow p-2 cursor-pointer ${
                    selectedSliderIndex === index
                      ? "border-blue-600 bg-blue-100"
                      : ""
                  }`}
                  onClick={() => selectSavedSlider(index)}
                  title="Düzenlemek için tıklayın"
                >
                  <img
                    src={slider.imageUrl}
                    alt="slider"
                    className="w-full h-100 object-cover rounded mb-2"
                  />
                  <p className="text-sm font-medium truncate">
                    {slider.translations?.tr?.title || "Başlık (TR Yok)"}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {slider.translations?.en?.title || "Title (EN Missing)"}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Düzenleme alanı */}
      {editingSlider ? (
        <div className="border p-4 my-4 rounded shadow w-1/2">
          <img
            src={editingSlider.imageUrl || "/"}
            alt="slider"
            className=" h-100 object-contain mb-2"
          />
          <label>Image URL (Cloudinary’den seçilecek)</label>
          <div className="flex">
            <input
              type="text"
              value={editingSlider.imageUrl || ""}
              onChange={(e) => handleInputChange("imageUrl", e.target.value)}
              className="border px-2 py-1 rounded mb-2 mr-1 w-1/2"
            />
            <button
              onClick={openGallery}
              className="bg-indigo-600 text-white px-3 py-1 rounded mb-2"
            >
              Görsel Seç
            </button>
          </div>

          {/* TR/EN Sekmeli İçerik */}
          <div className="mb-4">
            <div className="flex mb-2">
              <button
                onClick={() => handleTabChange("tr")}
                className={`px-4 py-1 rounded-t ${
                  (activeTabs[selectedSliderIndex] || "tr") === "tr"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                Türkçe
              </button>
              <button
                onClick={() => handleTabChange("en")}
                className={`px-4 py-1 rounded-t ${
                  (activeTabs[selectedSliderIndex] || "tr") === "en"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                English
              </button>
            </div>

            <div className="rounded bg-gray-50">
              <h3 className="font-semibold mb-2">
                {(activeTabs[selectedSliderIndex] || "tr") === "tr"
                  ? "Türkçe İçerik"
                  : "English Content"}
              </h3>

              <label>Title</label>
              <input
                type="text"
                value={
                  editingSlider.translations?.[
                    activeTabs[selectedSliderIndex] || "tr"
                  ]?.title || ""
                }
                onChange={(e) =>
                  handleTranslationChange(
                    activeTabs[selectedSliderIndex] || "tr",
                    "title",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />

              <label>Description</label>
              <textarea
                value={
                  editingSlider.translations?.[
                    activeTabs[selectedSliderIndex] || "tr"
                  ]?.description || ""
                }
                onChange={(e) =>
                  handleTranslationChange(
                    activeTabs[selectedSliderIndex] || "tr",
                    "description",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />

              <label>Button 1 Text</label>
              <input
                type="text"
                value={
                  editingSlider.translations?.[
                    activeTabs[selectedSliderIndex] || "tr"
                  ]?.button1Text || ""
                }
                onChange={(e) =>
                  handleTranslationChange(
                    activeTabs[selectedSliderIndex] || "tr",
                    "button1Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />

              <label>Button 2 Text</label>
              <input
                type="text"
                value={
                  editingSlider.translations?.[
                    activeTabs[selectedSliderIndex] || "tr"
                  ]?.button2Text || ""
                }
                onChange={(e) =>
                  handleTranslationChange(
                    activeTabs[selectedSliderIndex] || "tr",
                    "button2Text",
                    e.target.value
                  )
                }
                className="border px-2 py-1 rounded w-full mb-2"
              />
            </div>
          </div>

          {/* URL alanları */}
          <label>Button 1 URL</label>
          <input
            type="text"
            value={editingSlider.button1Url || ""}
            onChange={(e) => handleInputChange("button1Url", e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />
          <label>Button 2 URL</label>
          <input
            type="text"
            value={editingSlider.button2Url || ""}
            onChange={(e) => handleInputChange("button2Url", e.target.value)}
            className="border px-2 py-1 rounded w-full mb-2"
          />

          {/* Aksiyon Butonları */}
          <div className="flex space-x-2 mt-4">
            {!editingSlider.id && (
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={() => handleSave(editingSlider)}
              >
                Kaydet
              </button>
            )}
            {editingSlider.id && (
              <button
                className="bg-yellow-600 text-white px-4 py-2 rounded"
                onClick={() => handleUpdate(editingSlider)}
              >
                Güncelle
              </button>
            )}
            {editingSlider.id && (
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => handleDelete(editingSlider.id)}
              >
                Sil
              </button>
            )}
          </div>
        </div>
      ) : (
        // Eğer seçili slider yoksa, Yeni Slider Ekle butonu gösterelim
        sliders.filter((s) => !s.id).length < 3 && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            onClick={() => {
              setSliders([
                ...sliders,
                {
                  id: null,
                  imageUrl: "",
                  button1Url: "",
                  button2Url: "",
                  translations: {
                    tr: {
                      title: "",
                      description: "",
                      button1Text: "",
                      button2Text: "",
                    },
                    en: {
                      title: "",
                      description: "",
                      button1Text: "",
                      button2Text: "",
                    },
                  },
                },
              ]);
              setSelectedSliderIndex(sliders.length);
              setActiveTabs((prev) => ({ ...prev, [sliders.length]: "tr" }));
            }}
          >
            Yeni Slider Ekle
          </button>
        )
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
