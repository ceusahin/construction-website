import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useLanguage from "../../contexts/useLanguage";

const CompanyInfoSettings = () => {
  const { language } = useLanguage();
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!language) return;
    setLoading(true);
    axiosInstance
      .get(`/company/${language}`)
      .then((res) => {
        setCompanyName(res.data.companyName || "");
        setCompanyDescription(res.data.companyDescription || "");
        setMessage("");
      })
      .catch(() => {
        setMessage("Şirket bilgileri alınamadı.");
        setCompanyName("");
        setCompanyDescription("");
      })
      .finally(() => setLoading(false));
  }, [language]);

  const handleSave = () => {
    if (!language) {
      setMessage("Dil seçili değil.");
      return;
    }
    setLoading(true);
    axiosInstance
      .put(`/company/${language}`, {
        companyName,
        companyDescription,
        language,
      })
      .then(() => setMessage("Şirket bilgileri güncellendi."))
      .catch(() => setMessage("Güncelleme başarısız."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 bg-white shadow-lg border-gray-400 border w-2/3">
      <h2 className="text-xl font-bold mb-4">
        Şirket Bilgileri Ayarları (
        {language?.toUpperCase() || "Dil seçili değil"})
      </h2>
      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <label className="block mb-1 font-semibold">Şirket İsmi</label>
          <input
            type="text"
            className="border px-3 py-2 rounded w-full mb-4"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label className="block mb-1 font-semibold">
            Şirket Açıklaması (Max. 200 karakter)
          </label>
          <textarea
            className="border px-3 py-2 rounded w-full mb-4"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            rows={4}
          />

          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Kaydet
          </button>

          {message && alert(message)}
        </>
      )}
    </div>
  );
};

export default CompanyInfoSettings;
