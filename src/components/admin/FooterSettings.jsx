import { useEffect, useState } from "react";
import SwitchOnOff from "./SwitchOnOff";
import axiosInstance from "../../api/axiosInstance";

// const sectionNames = {
//   aboutUs: "Hakkımızda",
//   pages: "Sayfa Menüsü",
//   contact: "İletişim",
//   projects: "Son Projeler",
// };

const FooterSettings = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/footer-settings")
      .then((res) => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Ayarlar yüklenemedi." + err.data);
        setLoading(false);
      });
  }, []);

  const toggleVisibility = async (sectionKey) => {
    const current = settings.find((s) => s.sectionKey === sectionKey);
    try {
      const res = await axiosInstance.put(
        `/footer-settings/${sectionKey}?visible=${!current.visible}`
      );

      setSettings((prev) =>
        prev.map((s) =>
          s.sectionKey === sectionKey ? { ...s, visible: res.data.visible } : s
        )
      );
    } catch (e) {
      alert("Güncellenirken hata oluştu." + e.data);
    }
  };

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-white rounded shadow w-[25rem]">
      <h2 className="text-xl font-bold mb-6">Footer Bölüm Ayarları</h2>
      <ul className="space-y-4">
        {settings.map((s) => (
          <li
            key={s.sectionKey}
            className="flex items-center justify-between  gap-30"
          >
            <span className="text-lg capitalize">{s.sectionKey}</span>
            <SwitchOnOff
              checked={s.visible}
              onChange={() => toggleVisibility(s.sectionKey, s.visible)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSettings;
