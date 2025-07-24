import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  MessageCircle,
  X,
} from "lucide-react";

const iconMap = {
  Facebook: Facebook,
  Instagram: Instagram,
  X: Twitter,
  Whatsapp: MessageCircle,
  Linkedin: Linkedin,
};

const ContactUs = () => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/social-media")
      .then((res) => {
        setActive(res.data.filter((s) => s.visible));
      });
  }, []);

  return (
    <div className="flex justify-center space-x-6 py-4 bg-gray-100">
      {active.map((link) => {
        const Icon = iconMap[link.platform];
        return (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600 transition-colors"
          >
            {Icon && <Icon size={75} />}
          </a>
        );
      })}
    </div>
  );
};

export default ContactUs;
