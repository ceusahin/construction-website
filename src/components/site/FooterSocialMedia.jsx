import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";

const FooterSocialMedia = () => {
  const [activeLinks, setActiveLinks] = useState([]);

  useEffect(() => {
    axiosInstance.get("/social-media").then((res) => {
      setActiveLinks(res.data.filter((s) => s.visible));
    });
  }, []);

  return (
    <div>
      <h3 className="font-bold mb-2">Bizi Takip Edin</h3>
      <ul className="space-y-1">
        {activeLinks.map((link) => (
          <li key={link.platform}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-white"
            >
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSocialMedia;
