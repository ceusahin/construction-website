import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/construction/services";
const GALLERY_API_URL = "http://localhost:8080/api/construction/gallery";

const ServiceSettings = () => {
  const [services, setServices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("tr");
  const [selectedService, setSelectedService] = useState(null);

  // Yeni servis ekleme için çok dilli form verisi
  const [formData, setFormData] = useState({
    tr: { serviceName: "", serviceDescription: "" },
    en: { serviceName: "", serviceDescription: "" },
  });

  // Düzenleme formu için (seçilen dil bazlı)
  const [editFormData, setEditFormData] = useState({
    serviceName: "",
    serviceDescription: "",
  });

  const [serviceImageUrl, setServiceImageUrl] = useState("");
  const [servicePublicId, setServicePublicId] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [isAddingNewService, setIsAddingNewService] = useState(false);

  // Temizleme fonksiyonu, isAddingNewService durumuna göre reset yapar
  const resetStates = (keepAddingNewService = false) => {
    setSelectedService(null);
    setFormData({
      tr: { serviceName: "", serviceDescription: "" },
      en: { serviceName: "", serviceDescription: "" },
    });
    setEditFormData({ serviceName: "", serviceDescription: "" });
    setServiceImageUrl("");
    setServicePublicId("");
    setGalleryVisible(false);

    if (!keepAddingNewService) {
      setIsAddingNewService(false);
    }
  };

  // Servisleri çek (seçili dil bazlı gösterim için translations içinden alıyoruz)
  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin`);
      const servicesWithTranslations = response.data.map((service) => {
        const translation = service.translations?.find(
          (t) => t.languageCode === selectedLanguage
        );
        return {
          ...service,
          serviceName: translation?.serviceName || "",
          serviceDescription: translation?.serviceDescription || "",
        };
      });

      setServices(servicesWithTranslations);
      resetStates();
    } catch (error) {
      console.error("Servisler yüklenirken hata oluştu:", error);
    }
  }, [selectedLanguage]);

  const fetchGallery = useCallback(async () => {
    try {
      const response = await axios.get(GALLERY_API_URL);
      setGalleryImages(response.data);
    } catch (error) {
      console.error("Galeri yüklenirken hata oluştu:", error);
      setGalleryImages([]);
    }
  }, []);

  useEffect(() => {
    fetchServices();
    fetchGallery();
  }, [fetchServices, fetchGallery]);

  // Dil değiştiğinde seçili servis, formlar sıfırlanır
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
    resetStates();
  };

  // Servis seçildiğinde edit moda geçer
  const handleServiceClick = (service) => {
    if (isAddingNewService) setIsAddingNewService(false);

    setSelectedService(service);
    setEditFormData({
      serviceName: service.serviceName || "",
      serviceDescription: service.serviceDescription || "",
    });
    setServiceImageUrl(service.imageUrl || "");
    setServicePublicId(service.publicId || "");
  };

  // Düzenleme formu inputları
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Yeni servis ekleme formu inputları
  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    const [lang, field] = name.split("_");

    setFormData((prev) => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        [field]: value,
      },
    }));
  };

  // Düzenlenen servisi kaydet
  const handleSave = async () => {
    if (!selectedService) {
      alert("Lütfen düzenlenecek bir servis seçin.");
      return;
    }
    if (!editFormData.serviceName.trim()) {
      alert("Servis adı boş olamaz.");
      return;
    }
    try {
      const updated = {
        id: selectedService.id,
        translations: [
          {
            languageCode: selectedLanguage,
            serviceName: editFormData.serviceName,
            serviceDescription: editFormData.serviceDescription,
          },
        ],
        imageUrl: serviceImageUrl,
        publicId: servicePublicId,
      };

      await axios.put(`${API_BASE_URL}/admin/${selectedService.id}`, updated);

      alert("Servis başarıyla güncellendi.");
      fetchServices();
      resetStates();
    } catch (error) {
      console.error("Servis güncellenirken hata oluştu:", error);
      alert("Güncelleme sırasında hata oluştu.");
    }
  };

  // Yeni servis ekle
  const handleAddService = async () => {
    if (!formData.tr.serviceName.trim() || !formData.en.serviceName.trim()) {
      alert("Her iki dil için de servis adı girilmelidir.");
      return;
    }
    try {
      const newService = {
        translations: [
          {
            languageCode: "tr",
            serviceName: formData.tr.serviceName,
            serviceDescription: formData.tr.serviceDescription,
          },
          {
            languageCode: "en",
            serviceName: formData.en.serviceName,
            serviceDescription: formData.en.serviceDescription,
          },
        ],
        imageUrl: serviceImageUrl,
        publicId: servicePublicId,
      };

      await axios.post(`${API_BASE_URL}/admin/add`, newService);
      alert("Yeni servis başarıyla eklendi.");
      fetchServices();
      resetStates();
    } catch (error) {
      console.error("Servis eklenirken hata oluştu:", error);
      alert("Servis eklenirken hata oluştu.");
    }
  };

  // Silme işlemi
  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Bu servisi silmek istediğinize emin misiniz?")) return;

    try {
      // Burada URL'i ihtiyacına göre ayarlayabilirsin
      await axios.delete(`${API_BASE_URL}/admin/${serviceId}`);

      alert("Servis başarıyla silindi.");
      fetchServices();
      resetStates();
    } catch (error) {
      console.error("Servis silinirken hata oluştu:", error);
      alert("Silme işlemi sırasında hata oluştu.");
    }
  };

  // Galeriden resim seçildiğinde
  const handleImageSelect = (img) => {
    setServiceImageUrl(img.imageUrl);
    setServicePublicId(img.publicId);
    setGalleryVisible(false);
  };

  return (
    <div className="w-2/3">
      {/* Dil seçimi ve yeni servis butonu */}
      <div className="flex justify-between items-center mb-4">
        <select
          value={selectedLanguage}
          onChange={handleLanguageChange}
          className="border px-4 py-2 rounded-md"
          disabled={isAddingNewService || selectedService !== null}
        >
          <option value="tr">Türkçe</option>
          <option value="en">English</option>
        </select>

        <button
          onClick={() => {
            setIsAddingNewService(true);
            resetStates(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
          disabled={isAddingNewService || selectedService !== null}
        >
          Yeni Servis Ekle
        </button>
      </div>

      {/* Yeni servis ekleme formu */}
      {isAddingNewService && (
        <div className="mb-6 border border-gray-300 p-6 rounded-md shadow-lg bg-gray-50 relative">
          <button
            onClick={() => resetStates()}
            className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            aria-label="Yeni servis ekleme formunu kapat"
          >
            ✕ Kapat
          </button>

          <h2 className="text-xl font-bold mb-4">Yeni Servis Ekle</h2>

          {serviceImageUrl && (
            <img
              src={serviceImageUrl}
              alt="Seçilen Servis Görseli"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}

          {/* Türkçe inputlar */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Servis Adı (TR)</label>
            <input
              type="text"
              name="tr_serviceName"
              value={formData.tr.serviceName}
              onChange={handleAddInputChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Açıklama (TR)</label>
            <textarea
              name="tr_serviceDescription"
              value={formData.tr.serviceDescription}
              onChange={handleAddInputChange}
              rows={4}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          {/* İngilizce inputlar */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Service Name (EN)</label>
            <input
              type="text"
              name="en_serviceName"
              value={formData.en.serviceName}
              onChange={handleAddInputChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Description (EN)</label>
            <textarea
              name="en_serviceDescription"
              value={formData.en.serviceDescription}
              onChange={handleAddInputChange}
              rows={4}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Servis Resmini Seç</label>
            <button
              onClick={() => setGalleryVisible(true)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
            >
              Resim Seç
            </button>
          </div>

          <button
            onClick={handleAddService}
            className="bg-blue-600 text-white px-6 py-2 rounded-md"
          >
            Kaydet
          </button>
        </div>
      )}

      {/* Servis listesi */}
      <div className="flex flex-col space-y-4">
        {services.length === 0 && <p>Servis bulunamadı.</p>}
        {services.map((service, index) => (
          <div
            key={service.id || service.serviceName + index}
            className={`border border-gray-300 p-4 rounded-md shadow flex justify-between items-center ${
              selectedService?.id === service.id ? "bg-blue-100" : ""
            }`}
          >
            <div>
              <h3 className="text-xl font-bold">
                {service.serviceName || "İsim yok"}
              </h3>
              <p className="text-gray-700">
                {service.serviceDescription || "Açıklama yok"}
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleServiceClick(service)}
                className="bg-yellow-400 text-black px-3 py-1 rounded hover:bg-yellow-500 transition"
              >
                Düzenle
              </button>

              <button
                onClick={() => handleDeleteService(service.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Servis düzenleme alanı */}
      {selectedService && (
        <div className="mt-10 border border-gray-300 p-6 rounded-md shadow-lg bg-gray-50 relative">
          <button
            onClick={() => resetStates()}
            className="absolute top-2 right-2 text-red-500 font-bold text-xl"
            aria-label="Servis düzenleme formunu kapat"
          >
            ✕ Kapat
          </button>

          <h2 className="text-xl font-bold mb-4">Servis Düzenle</h2>

          {serviceImageUrl && (
            <img
              src={serviceImageUrl}
              alt="Seçili Servis Görseli"
              className="w-full h-48 object-cover rounded-md mb-4"
            />
          )}

          <div className="mb-4">
            <label className="block font-medium mb-1">Servis Adı</label>
            <input
              type="text"
              name="serviceName"
              value={editFormData.serviceName}
              onChange={handleEditInputChange}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Açıklama</label>
            <textarea
              name="serviceDescription"
              value={editFormData.serviceDescription}
              onChange={handleEditInputChange}
              rows={4}
              className="w-full border px-3 py-2 rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-2">Servis Resmini Seç</label>
            <button
              onClick={() => setGalleryVisible(true)}
              className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
            >
              Resim Seç
            </button>
          </div>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-6 py-2 rounded-md"
          >
            Kaydet
          </button>
        </div>
      )}

      {/* Galeri modalı */}
      {galleryVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-md p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Galeri</h3>
              <button
                onClick={() => setGalleryVisible(false)}
                className="text-red-500 font-semibold"
              >
                ✕ Kapat
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.length === 0 && (
                <p>Galeri boş veya yüklenemedi.</p>
              )}
              {galleryImages.map((img, index) => (
                <img
                  key={img.publicId || index}
                  src={img.imageUrl}
                  alt={img.title || "gallery"}
                  onClick={() => handleImageSelect(img)}
                  className={`w-full h-24 object-cover rounded-md cursor-pointer border-2 ${
                    img.imageUrl === serviceImageUrl
                      ? "border-blue-600"
                      : "border-transparent"
                  }`}
                  title="Resim seç"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSettings;
