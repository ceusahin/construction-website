import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useLanguage from "../contexts/useLanguage";
import SocialMedia from "../components/site/SocialMedia";

const Footer = () => {
  const [menus, setMenus] = useState([]);
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [logoUrl, setLogoUrl] = useState(null);
  const { language } = useLanguage();

  useEffect(() => {
    axiosInstance
      .get(`/footer-menu/${language}`)
      .then((res) => {
        console.log("Footer menüleri:", res.data);
        setMenus(res.data);
      })
      .catch((err) => {
        console.error("Footer menüleri alınamadı:", err);
      });

    axiosInstance
      .get(`/company/${language}`)
      .then((res) => {
        setCompanyTitle(res.data.companyName);
        setCompanyDescription(res.data.companyDescription);
      })
      .catch((err) => {
        console.error("Şirket bilgisi alınamadı:", err);
      });

    axiosInstance
      .get("/logo")
      .then((res) => {
        setLogoUrl(res.data.imageUrl || res.data);
      })
      .catch((err) => {
        console.error("Logo alınamadı:", err);
      });
  }, [language]);

  return (
    <footer className="bg-[#101270] text-white py-10 px-6 md:px-16 lg:px-24 xl:px-54">
      <div className="flex flex-wrap justify-around gap-10">
        {/* Şirket Bilgileri + Sosyal Medya */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 items-center sm:items-start max-w-xs sm:max-w-none text-center sm:text-left flex-shrink-0">
          <div>
            {logoUrl && (
              <img
                src={logoUrl}
                alt="Şirket Logosu"
                className="mb-4 w-36 sm:w-40 object-contain mx-auto sm:mx-0"
              />
            )}
            <h3 className="text-xl font-semibold mb-2">{companyTitle}</h3>
            <p className="text-white max-w-[280px] sm:max-w-[416px] mx-auto sm:mx-0">
              {companyDescription}
            </p>
          </div>
          <div>
            <SocialMedia />
          </div>
        </div>

        {/* Menüler */}
        {menus.length === 0 && (
          <p className="text-gray-400 w-full text-center mt-6">
            Footer menüleri yükleniyor...
          </p>
        )}

        {menus.map((menu) => (
          <div
            key={menu.id}
            className="text-center xl:text-left min-w-[150px] max-w-xs w-full sm:w-auto"
          >
            <h4 className="mb-4 font-semibold text-lg">{menu.title}</h4>
            {menu.items && menu.items.length > 0 ? (
              <ul className="space-y-2">
                {menu.items.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      className="text-gray-300 hover:text-white transition"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">
                Bu menüye ait öğe bulunmamaktadır.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BDSM DIGITAL. Tüm Hakları Saklıdır.
      </div>
    </footer>
  );
};

export default Footer;
