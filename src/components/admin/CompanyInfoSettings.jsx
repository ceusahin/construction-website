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
    <div className="p-6 rounded-2xl text-white shadow-md border border-white w-2/3 mx-auto hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-xl font-bold mb-6">
        Şirket Bilgileri Ayarları (
        {language?.toUpperCase() || "Dil seçili değil"})
      </h2>

      {loading ? (
        <p>Yükleniyor...</p>
      ) : (
        <>
          <label className="block mb-2 font-semibold">Şirket İsmi</label>
          <input
            type="text"
            className="border border-white px-3 py-2 text-black bg-gray-50 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label className="block mb-2 font-semibold">
            Şirket Açıklaması (Max. 200 karakter)
          </label>
          <textarea
            className="border border-white bg-gray-50 text-black px-3 py-2 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            value={companyDescription}
            onChange={(e) => setCompanyDescription(e.target.value)}
            rows={4}
          />

          <button
            onClick={handleSave}
            className="bg-red-500 text-white px-5 py-2 rounded hover:bg-[#c62121] cursor-pointer disabled:opacity-50 transition"
            disabled={loading}
          >
            Kaydet
          </button>

          {/* Mesaj gösterimini alert yerine inline yaparsan daha iyi olur */}
          {message && (
            <p className="mt-4 text-sm text-gray-600 italic">{message}</p>
          )}
        </>
      )}
    </div>
  );
};

export default CompanyInfoSettings;
