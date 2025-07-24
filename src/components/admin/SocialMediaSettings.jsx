import React, { useEffect, useState } from "react";
import axios from "axios";
import SwitchOnOff from "./SwitchOnOff";

const SocialMediaSettings = () => {
  const [settings, setSettings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/social-media")
      .then((res) => setSettings(res.data));
  }, []);

  const handleToggle = (platform) => {
    const item = settings.find((s) => s.platform === platform);
    axios
      .put(
        `http://localhost:8080/api/construction/social-media/${platform}`,
        null,
        {
          params: { visible: !item.visible, url: item.url || "" },
        }
      )
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
    axios
      .put(
        `http://localhost:8080/api/construction/social-media/${platform}`,
        null,
        {
          params: { visible: item.visible, url: normalized },
        }
      )
      .then((res) => {
        setSettings((prev) =>
          prev.map((s) =>
            s.platform === platform ? { ...s, url: res.data.url } : s
          )
        );
      });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Sosyal Medya Ayarları</h2>
      <p>URL adresini "https://(URL adresiniz)" şeklinde girin.</p>
      {settings.map((s) => (
        <div key={s.platform} className="flex items-center space-x-4">
          <span className="w-24 capitalize">{s.platform}</span>
          <input
            type="text"
            className="border px-2 py-1 rounded w-80"
            value={s.url}
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
