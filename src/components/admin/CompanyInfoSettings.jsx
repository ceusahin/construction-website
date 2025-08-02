import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const CompanyInfoSettings = () => {
  const [companyName, setCompanyName] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const companyId = 1; // DB'deki şirket info id'si

  useEffect(() => {
    setLoading(true);
    axiosInstance
      .get(`/company/${companyId}`)
      .then((res) => {
        setCompanyName(res.data.companyName);
        setCompanyDescription(res.data.companyDescription || "");
      })
      .catch(() => {
        setMessage("Şirket bilgileri alınamadı.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSave = () => {
    setLoading(true);
    axiosInstance
      .put(`/company/${companyId}`, {
        companyName,
        companyDescription,
      })
      .then(() => setMessage("Şirket bilgileri güncellendi."))
      .catch(() => setMessage("Güncelleme başarısız."))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-xl font-bold mb-4">Şirket Bilgileri Ayarları</h2>
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

          <label className="block mb-1 font-semibold">Şirket Açıklaması</label>
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
          {message && <p className="mt-2">{message}</p>}
        </>
      )}
    </div>
  );
};

export default CompanyInfoSettings;
