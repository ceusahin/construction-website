import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import useLanguage from "../../contexts/useLanguage"; // Kendi yoluna göre değiştir

const API_BASE_URL = "http://localhost:8080/api/construction/services";
const GALLERY_API_URL = "http://localhost:8080/api/construction/gallery";

const ServiceSettings = () => {
  const { language } = useLanguage();

  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  const [formData, setFormData] = useState({
    tr: { serviceName: "", serviceDescription: "" },
    en: { serviceName: "", serviceDescription: "" },
  });

  const [editFormData, setEditFormData] = useState({
    serviceName: "",
    serviceDescription: "",
  });

  const [serviceImageUrl, setServiceImageUrl] = useState("");
  const [servicePublicId, setServicePublicId] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  const [galleryVisible, setGalleryVisible] = useState(false);
  const [isAddingNewService, setIsAddingNewService] = useState(false);

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

  const fetchServices = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin`);
      const servicesWithTranslations = response.data.map((service) => {
        const translation = service.translations?.find(
          (t) => t.languageCode === language
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
  }, [language]);

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

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
            languageCode: language,
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

  const handleDeleteService = async (serviceId) => {
    if (!window.confirm("Bu servisi silmek istediğinize emin misiniz?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/admin/${serviceId}`);

      alert("Servis başarıyla silindi.");
      fetchServices();
      resetStates();
    } catch (error) {
      console.error("Servis silinirken hata oluştu:", error);
      alert("Silme işlemi sırasında hata oluştu.");
    }
  };

  const handleImageSelect = (img) => {
    setServiceImageUrl(img.imageUrl);
    setServicePublicId(img.publicId);
    setGalleryVisible(false);
  };

  return (
    <div className="w-2/3 mx-auto dark:text-white border border-gray-300 dark:border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-extrabold text-black dark:text-white">
          Hizmetler Yönetimi
        </h1>

        <button
          onClick={() => {
            setIsAddingNewService(true);
            resetStates(true);
          }}
          disabled={isAddingNewService || selectedService !== null}
          className="px-5 py-3 bg-red-500 hover:bg-[#c62121] text-white rounded-md shadow-md transition disabled:opacity-50 cursor-pointer"
        >
          Yeni Servis Ekle
        </button>
      </div>

      {/* Yeni servis formu */}
      {isAddingNewService && (
        <div className="mb-8 p-6 rounded-lg shadow-lg relative dark:text-white border border-gray-300 dark:border-gray-800">
          <button
            onClick={() => resetStates()}
            className="absolute top-3 right-3 text-red-600 font-bold text-4xl hover:text-red-800 cursor-pointer"
            aria-label="Yeni servis ekleme formunu kapat"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-6 dark:text-white">
            Yeni Servis Ekle
          </h2>

          {serviceImageUrl && (
            <img
              src={serviceImageUrl}
              alt="Seçilen Servis Görseli"
              className="w-full h-56 object-cover rounded-lg mb-6"
            />
          )}

          {/* Türkçe */}
          <div className="mb-5 dark:text-white text-black">
            <label className="block font-medium mb-1">Servis Adı (TR)</label>
            <input
              type="text"
              name="tr_serviceName"
              value={formData.tr.serviceName}
              onChange={handleAddInputChange}
              placeholder="Servis adını girin"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="mb-5">
            <label className="block font-medium mb-1">Açıklama (TR)</label>
            <textarea
              name="tr_serviceDescription"
              value={formData.tr.serviceDescription}
              onChange={handleAddInputChange}
              rows={4}
              placeholder="Servis açıklamasını girin"
              className="w-full rounded-md border border-gray-300 dark:text-white dark:border-gray-700 dark:bg-gray-800 px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* İngilizce */}
          <div className="mb-5">
            <label className="block font-medium mb-1">Service Name (EN)</label>
            <input
              type="text"
              name="en_serviceName"
              value={formData.en.serviceName}
              onChange={handleAddInputChange}
              placeholder="Enter service name"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <div className="mb-6">
            <label className="block font-medium mb-1">Description (EN)</label>
            <textarea
              name="en_serviceDescription"
              value={formData.en.serviceDescription}
              onChange={handleAddInputChange}
              rows={4}
              placeholder="Enter service description"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Servis Resmini Seç</label>
            <button
              onClick={() => setGalleryVisible(true)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-[#c62121]"
            >
              Resim Seç
            </button>
          </div>

          <button
            onClick={handleAddService}
            className="px-6 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition"
          >
            Kaydet
          </button>
        </div>
      )}

      {/* Servis listesi */}
      <div className="space-y-4">
        {services.length === 0 ? (
          <p className="dark:text-white">Servis bulunamadı.</p>
        ) : (
          services.map((service, idx) => (
            <div
              key={service.id || service.serviceName + idx}
              className={`flex justify-between items-center p-5 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-800 border dark:text-white ${
                selectedService?.id === service.id
                  ? "bg-gray-50 dark:bg-gray-900 border border-red-500 dark:border-red-500"
                  : "border-gray-300 hover:shadow-lg"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold">
                  {service.serviceName || "İsim yok"}
                </h3>
                <p className="dark:text-gray-400">
                  {service.serviceDescription || "Açıklama yok"}
                </p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => handleServiceClick(service)}
                  className="px-4 py-2 bg-yellow-400 cursor-pointer text-black rounded-md hover:bg-yellow-500 transition"
                >
                  Düzenle
                </button>

                <button
                  onClick={() => handleDeleteService(service.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-[#c62121] transition"
                >
                  Sil
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Servis düzenleme formu */}
      {selectedService && (
        <div className="mt-10 p-6 border border-gray-300 dark:border-gray-800 rounded-lg shadow-lg relative mx-auto">
          <button
            onClick={() => resetStates()}
            className="absolute top-4 right-4 text-red-600 font-bold text-4xl cursor-pointer hover:text-red-800"
            aria-label="Servis düzenleme formunu kapat"
          >
            &times;
          </button>

          <h2 className="text-2xl font-semibold mb-6">Servis Düzenle</h2>

          {serviceImageUrl && (
            <img
              src={serviceImageUrl}
              alt="Seçili Servis Görseli"
              className="w-full h-56 object-cover rounded-lg mb-6"
            />
          )}

          <div className="mb-6">
            <label className="blockfont-medium mb-1">Servis Adı</label>
            <input
              type="text"
              name="serviceName"
              value={editFormData.serviceName}
              onChange={handleEditInputChange}
              placeholder="Servis adını girin"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent "
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-1">Açıklama</label>
            <textarea
              name="serviceDescription"
              value={editFormData.serviceDescription}
              onChange={handleEditInputChange}
              rows={4}
              placeholder="Servis açıklamasını girin"
              className="w-full rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white px-4 py-2 resize-y focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="mb-6">
            <label className="block font-medium mb-2">Servis Resmini Seç</label>
            <button
              onClick={() => setGalleryVisible(true)}
              className="px-4 py-2 cursor-pointer text-white bg-red-500 rounded-md hover:bg-[#c62121] transition"
            >
              Resim Seç
            </button>
          </div>

          <button
            onClick={handleSave}
            className="px-6 py-3 bg-green-600 cursor-pointer rounded-md text-white font-semibold hover:bg-green-700 transition"
          >
            Kaydet
          </button>
        </div>
      )}

      {/* Galeri modal */}
      {galleryVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-5xl w-full max-h-[80vh] overflow-y-auto shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Galeri</h3>
              <button
                onClick={() => setGalleryVisible(false)}
                className="text-red-600 font-bold text-2xl hover:text-red-800"
                aria-label="Galeri modalını kapat"
              >
                &times;
              </button>
            </div>

            {galleryImages.length === 0 ? (
              <p className="text-gray-500">Galeri boş veya yüklenemedi.</p>
            ) : (
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                  <img
                    key={img.publicId || idx}
                    src={img.imageUrl}
                    alt={img.title || "gallery"}
                    onClick={() => handleImageSelect(img)}
                    className={`w-full h-28 object-cover rounded-lg cursor-pointer border-4 transition ${
                      img.imageUrl === serviceImageUrl
                        ? "border-blue-600"
                        : "border-transparent hover:border-gray-400"
                    }`}
                    title="Resim seç"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceSettings;
