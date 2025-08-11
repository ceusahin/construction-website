import React, { useEffect, useState } from "react";
import SwitchOnOff from "../../utils/SwitchOnOff";
import axiosInstance from "../../api/axiosInstance";

const SocialMediaSettings = () => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axiosInstance.get("/social-media").then((res) => setSettings(res.data));
  }, []);

  const handleToggle = (platform) => {
    const item = settings.find((s) => s.platform === platform);
    axiosInstance
      .put(`/social-media/${platform}`, null, {
        params: { visible: !item.visible, url: item.url || "" },
      })
      .then((res) => {
        setSettings((prev) =>
          prev.map((s) =>
            s.platform === platform ? { ...s, visible: res.data.visible } : s
          )
        );
      });
  };

  const normalizeUrl = (url) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `https://${url}`;
  };

  const handleUrlChange = (platform, newUrl) => {
    const item = settings.find((s) => s.platform === platform);
    const normalized = normalizeUrl(newUrl);
    axiosInstance
      .put(`/social-media/${platform}`, null, {
        params: { visible: item.visible, url: normalized },
      })
      .then((res) => {
        setSettings((prev) =>
          prev.map((s) =>
            s.platform === platform ? { ...s, url: res.data.url } : s
          )
        );
      });
  };

  return (
    <div className="p-6 text-white rounded-2xl shadow-md border border-white space-y-6 w-2/3 mx-auto hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-bold">Sosyal Medya Ayarları</h2>
      <p className="text-sm mb-4">
        URL adresini "https://(URL adresiniz)" şeklinde girin.
      </p>
      {settings.map((s) => (
        <div
          key={s.platform}
          className="flex items-center space-x-4 px-4 py-3 rounded-md border border-white"
        >
          <span className="w-24 capitalize font-semibold">{s.platform}</span>
          <input
            type="text"
            className="border border-white text-black bg-gray-50 px-3 py-2 rounded flex-1 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            value={s.url}
            placeholder="URL"
            onChange={(e) => handleUrlChange(s.platform, e.target.value)}
          />
          <SwitchOnOff
            checked={s.visible}
            onChange={() => handleToggle(s.platform)}
          />
        </div>
      ))}
    </div>
  );
};

export default SocialMediaSettings;
