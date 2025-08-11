import React, { useEffect, useState } from "react";
import useLanguage from "../../contexts/useLanguage";
import axiosInstance from "../../api/axiosInstance";

const SliderSettings = () => {
  const { language } = useLanguage();

  const [sliders, setSliders] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!language) return;
    fetchSliders(language);
    setSelectedIndex(null);
  }, [language]);

  const fetchSliders = async (lang) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/slider/${lang}`);
      setSliders(res.data || []);
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Sliderlar yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const selectedSlider = selectedIndex !== null ? sliders[selectedIndex] : null;

  const updateSliderField = (field, value) => {
    if (selectedIndex === null) return;
    setSliders((prev) => {
      const copy = [...prev];
      copy[selectedIndex] = { ...copy[selectedIndex], [field]: value };
      return copy;
    });
  };

  const updateTranslationField = (field, value) => {
    if (selectedIndex === null) return;
    setSliders((prev) => {
      const copy = [...prev];
      const currentSlider = copy[selectedIndex];
      const translations = { ...(currentSlider.translations || {}) };
      translations[language] = {
        ...(translations[language] || {
          title: "",
          description: "",
          button1Text: "",
          button2Text: "",
        }),
        [field]: value,
      };
      copy[selectedIndex] = { ...currentSlider, translations };
      return copy;
    });
  };

  const addNewSlider = () => {
    if (sliders.length >= 3) {
      alert("Maksimum 3 slider eklenebilir.");
      return;
    }
    const newSlider = {
      id: null,
      imageUrl: "",
      button1Url: "",
      button2Url: "",
      translations: {
        tr: { title: "", description: "", button1Text: "", button2Text: "" },
        en: { title: "", description: "", button1Text: "", button2Text: "" },
      },
    };
    setSliders((prev) => [...prev, newSlider]);
    setSelectedIndex(sliders.length);
    setMessage("");
  };

  const saveSlider = async () => {
    if (selectedIndex === null) return;
    const slider = sliders[selectedIndex];

    if (!slider.imageUrl) {
      alert("Lütfen slider için bir resim yükleyin.");
      return;
    }
    if (!slider.translations[language]?.title?.trim()) {
      alert("Lütfen başlık alanını doldurun.");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/slider", slider);
      const savedSlider = res.data;
      setSliders((prev) =>
        prev.map((s, i) => (i === selectedIndex ? savedSlider : s))
      );
      setMessage("Slider başarıyla kaydedildi.");
    } catch (err) {
      console.error(err);
      setMessage("Slider kaydedilirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const updateSlider = async () => {
    if (selectedIndex === null) return;
    const slider = sliders[selectedIndex];
    if (!slider.id) {
      alert("Slider öncelikle kaydedilmeli.");
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.put(`/slider/${slider.id}`, slider);
      const updatedSlider = res.data;
      setSliders((prev) =>
        prev.map((s, i) => (i === selectedIndex ? updatedSlider : s))
      );
      setMessage("Slider güncellendi.");
    } catch (err) {
      console.error(err);
      setMessage("Slider güncellenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSlider = async () => {
    if (selectedIndex === null) return;
    const slider = sliders[selectedIndex];
    if (!slider.id) {
      alert("Henüz kaydedilmemiş slider silinemez.");
      return;
    }
    if (!window.confirm("Sliderı silmek istediğinize emin misiniz?")) return;
    setLoading(true);
    try {
      await axiosInstance.delete(`/slider/${slider.id}`);
      await fetchSliders(language);
      setSelectedIndex(null);
      setMessage("Slider silindi.");
    } catch (err) {
      console.error(err);
      setMessage("Slider silinirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const onFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setMessage("Resim yükleniyor...");
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await axiosInstance.post("/slider/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (selectedIndex === null) return;
      setSliders((prev) => {
        const copy = [...prev];
        copy[selectedIndex].imageUrl = res.data.imageUrl;
        return copy;
      });
      setMessage("Resim yüklendi.");
    } catch (err) {
      console.error(err);
      setMessage("Resim yüklenirken hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const closeSettings = () => {
    setSelectedIndex(null);
    setMessage("");
  };

  return (
    <div className="space-y-8 min-h-screen">
      <h2 className="text-2xl font-semibold text-left mb-4">
        Slider Yönetimi ({language?.toUpperCase() || "TR"})
      </h2>
      <p className="italic text-lg">Maksimum 3 adet slider eklenebilir.</p>

      {message && (
        <div className="bg-yellow-100 text-yellow-900 p-3 rounded-md mb-6">
          {message}
        </div>
      )}

      <div className="flex w-full gap-8">
        {/* Slider Listesi */}
        <div
          className="flex flex-col space-y-6 w-1/3 transition cursor-pointer"
          style={{ flexShrink: 0, maxHeight: "100vh" }}
        >
          {/* Yeni Slider Ekle */}
          {sliders.length < 3 && (
            <button
              onClick={addNewSlider}
              className="flex items-center justify-center border border-dashed border-white cursor-pointer rounded-2xl h-40 text-white hover:text-red-500 hover:border-red-500 transition"
              title="Yeni Slider Ekle"
              disabled={loading}
            >
              + Yeni Slider
            </button>
          )}

          {/* Slider Kartlar */}
          {loading ? (
            <div className="flex items-center justify-center w-full h-32">
              <p>Yükleniyor...</p>
            </div>
          ) : sliders.length === 0 ? (
            <div className="flex items-center justify-center w-full h-32 text-gray-400 italic">
              <p>Slider bulunamadı.</p>
            </div>
          ) : (
            sliders.map((slider, i) => (
              <div
                key={slider.id || `new-${i}`}
                onClick={() => setSelectedIndex(i)}
                className={`relative border-4 rounded-3xl transition-transform duration-300 ease-in-out
                  ${
                    selectedIndex === i
                      ? "border-red-700 scale-105"
                      : "border-red-300 hover:border-red-500"
                  }
                `}
                title={slider.translations?.[language]?.title || "Başlık yok"}
              >
                <img
                  src={slider.imageUrl || "/placeholder.png"}
                  alt="slider"
                  className="object-fill aspect-video rounded-2xl"
                  draggable={false}
                />
              </div>
            ))
          )}
        </div>

        {/* Ayar Paneli */}
        {!selectedSlider && (
          <div
            className="flex justify-center items-center w-2/3 border-2 border-dashed border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <h1 className="text-gray-500 text-xl font-medium">
              Ayarlamak için bir slider seçin.
            </h1>
          </div>
        )}

        {selectedSlider && (
          <div className="relative w-2/3 border border-gray-300 rounded-2xl p-6 shadow-sm hover:shadow-md transition max-h-[100vh] overflow-y-auto space-y-6">
            {/* Kapatma butonu */}
            <div className="flex justify-end mb-4">
              <button
                onClick={closeSettings}
                className="text-white hover:scale-120 text-3xl bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 cursor-pointer font-bold rounded-full w-10 h-10 flex items-center justify-center transition"
                aria-label="Kapat"
                title="Kapat"
                type="button"
              >
                ×
              </button>
            </div>

            {/* Resim Yükleme */}
            <div>
              <label className="block font-semibold mb-2">Slider Resmi</label>
              <img
                src={selectedSlider.imageUrl || "/placeholder.png"}
                alt="Seçili slider"
                className="w-full max-h-64 object-contain rounded-2xl mb-4"
                draggable={false}
              />

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
                disabled={loading}
              />

              <label
                htmlFor="fileInput"
                className="inline-block border px-4 py-2 text-white bg-red-500 hover:bg-red-950 cursor-pointer rounded select-none"
              >
                Dosya Seç
              </label>
            </div>

            {/* Metin ve URL alanları */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-1">Başlık</label>
                <input
                  type="text"
                  value={selectedSlider.translations?.[language]?.title || ""}
                  onChange={(e) =>
                    updateTranslationField("title", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Açıklama</label>
                <textarea
                  rows={3}
                  value={
                    selectedSlider.translations?.[language]?.description || ""
                  }
                  onChange={(e) =>
                    updateTranslationField("description", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Buton 1 Metni
                </label>
                <input
                  type="text"
                  value={
                    selectedSlider.translations?.[language]?.button1Text || ""
                  }
                  onChange={(e) =>
                    updateTranslationField("button1Text", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Buton 1 URL</label>
                <input
                  type="text"
                  value={selectedSlider.button1Url || ""}
                  onChange={(e) =>
                    updateSliderField("button1Url", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Buton 2 Metni
                </label>
                <input
                  type="text"
                  value={
                    selectedSlider.translations?.[language]?.button2Text || ""
                  }
                  onChange={(e) =>
                    updateTranslationField("button2Text", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Buton 2 URL</label>
                <input
                  type="text"
                  value={selectedSlider.button2Url || ""}
                  onChange={(e) =>
                    updateSliderField("button2Url", e.target.value)
                  }
                  className="w-full border border-gray-300 bg-gray-50 text-black rounded-2xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Butonlar */}
            <div className="flex gap-4 justify-end">
              {!selectedSlider.id ? (
                <button
                  onClick={saveSlider}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-2xl transition shadow"
                  disabled={loading}
                >
                  Kaydet
                </button>
              ) : (
                <>
                  <button
                    onClick={updateSlider}
                    className="bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white px-6 py-2 rounded-2xl transition shadow"
                    disabled={loading}
                  >
                    Güncelle
                  </button>
                  <button
                    onClick={deleteSlider}
                    className="bg-red-500 hover:bg-red-900 cursor-pointer text-white px-6 py-2 rounded-2xl transition shadow"
                    disabled={loading}
                  >
                    Sil
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SliderSettings;
