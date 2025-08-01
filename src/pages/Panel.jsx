import { useState } from "react";
import Menu from "../components/admin/Menu";
import PageContent from "../layouts/PageContent";
import Dashboard from "../components/admin/Dashboard";
import UploadImageForm from "../components/admin/UploadImageForm";
import GalleryViewer from "../components/admin/GalleryViewer";
import DeleteImageForm from "../components/admin/DeleteImageForm";
import HeaderLogo from "../components/admin/HeaderLogo";
import FaviconLogo from "../components/admin/FaviconLogo";
import FooterSettings from "../components/admin/FooterSettings";
import SocialMediaSettings from "../components/admin/SocialMediaSettings";
import SeoSettings from "../components/admin/SeoSettings";
import SliderSettings from "../components/admin/SliderSettings";
import CompanyInfoSettings from "../components/admin/CompanyInfoSettings";
import ExperienceSettings from "../components/admin/ExperienceSettings";
import ContactInfoSettings from "../components/admin/ContactInfoSettings";

function Panel() {
  const [activePage, setActivePage] = useState("anasayfa");
  const [activeSiteSetting, setActiveSiteSetting] = useState("header-logo");
  const [activeContentItem, setActiveContentItem] = useState("anasayfa-icerik");

  const messages = [
    {
      name: "Ahmet",
      email: "ahmet@mail.com",
      message: "Merhaba, fiyat bilgisi alabilir miyim?",
    },
    {
      name: "Seda",
      email: "seda@mail.com",
      message: "Proje hakkında detay rica ediyorum.",
    },
  ];

  const projects = [
    { name: "Konut Projesi", startDate: "2025-07-10", status: "Devam Ediyor" },
    { name: "AVM İnşaatı", startDate: "2025-06-15", status: "Tamamlandı" },
  ];

  const siteSettings = [
    { label: "Header Ayarları", key: "header-settings" },
    { label: "Footer Ayarları", key: "footer-settings" },
    { label: "Sosyal Medya Bağlantıları", key: "social-media" },
    { label: "SEO Ayarları", key: "seo-settings" },
  ];

  const mainPageContextSettings = [
    { label: "Slider Ayarları", key: "context-slider" },
    { label: "Tecrübe", key: "context-experience" },
    { label: "Şirket Bilgi Ayarları", key: "context-about-company" },
  ];

  const gallerySettings = [
    { label: "Fotoğraflar", key: "fotograflar" },
    { label: "Fotoğraf Ekle", key: "fotograf-ekle" },
    { label: "Fotoğraf Sil", key: "fotograf-sil" },
  ];

  const userSettings = [
    { label: "Kullanıcı Listesi", key: "user-list" },
    { label: "Kullanıcı Ekle", key: "add-user" },
  ];

  return (
    <PageContent>
      <div className="flex">
        <Menu
          onSelect={(key) => {
            if (
              [
                "anasayfa-icerik",
                "hakkimizda",
                "hizmetlerimiz",
                "projelerimiz",
                "blog",
                "referanslar",
                "iletisim",
              ].includes(key)
            ) {
              setActiveContentItem(key);
              setActivePage(null);
            } else {
              setActivePage(key);
              setActiveContentItem(null);
            }
          }}
        />
        <div className="ml-60 flex-1 p-8">
          {/* Eğer activeContentItem varsa, sadece onun içeriğini göster */}
          {activeContentItem ? (
            <>
              {activeContentItem === "anasayfa-icerik" && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-l font-light">İçerik Ayarları</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-xl font-bold text-gray-700">
                      Ana Sayfa
                    </h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    {mainPageContextSettings.map((item) => (
                      <button
                        key={item.key}
                        className={`px-4 py-2 rounded ${
                          activeSiteSetting === item.key
                            ? "bg-yellow-400 text-gray-900 font-semibold"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveSiteSetting(item.key)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    {activeSiteSetting === "context-slider" && (
                      <div>
                        <SliderSettings />
                      </div>
                    )}
                    {activeSiteSetting === "context-experience" && (
                      <div>
                        <ExperienceSettings />
                      </div>
                    )}
                    {activeSiteSetting === "context-about-company" && (
                      <div>
                        <ContactInfoSettings />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeContentItem === "hakkimizda" && (
                <div>Hakkımızda İçerik Ayarları Burada</div>
              )}
              {activeContentItem === "hizmetlerimiz" && (
                <div>Hizmetlerimiz İçerik Ayarları Burada</div>
              )}
              {activeContentItem === "projelerimiz" && (
                <div>Projelerimiz İçerik Ayarları Burada</div>
              )}
              {activeContentItem === "blog" && (
                <>
                  <h1>Blog İçerik Ayarları Burada</h1>
                </>
              )}
              {activeContentItem === "referanslar" && (
                <div>Referanslar İçerik Ayarları Burada</div>
              )}
              {activeContentItem === "iletisim" && (
                <div>İletişim İçerik Ayarları Burada</div>
              )}
            </>
          ) : (
            <>
              {activePage === "anasayfa" && (
                <Dashboard
                  onlineCount={4}
                  todayOnlineCount={16}
                  monthlyOnlineCount={115}
                  totalOnlineCount={512}
                  messages={messages}
                  projects={projects}
                />
              )}
              {activePage === "site-yonetimi" && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-xl font-bold text-gray-700">
                      Site Yönetimi
                    </h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    {siteSettings.map((item) => (
                      <button
                        key={item.key}
                        className={`px-4 py-2 rounded ${
                          activeSiteSetting === item.key
                            ? "bg-yellow-400 text-gray-900 font-semibold"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveSiteSetting(item.key)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    {activeSiteSetting === "header-settings" && (
                      <div className="flex flex-col gap-10 w-3/4">
                        <div className="flex flex-col md:flex-row md:justify-between gap-20 mt-5">
                          <div className="bg-white shadow-lg border-gray-400 border p-6 md:w-1/2">
                            <HeaderLogo />
                          </div>
                          <div className="bg-white shadow-lg border-gray-400 border p-6 md:w-1/2">
                            <FaviconLogo />
                          </div>
                        </div>
                        <div className="">
                          <CompanyInfoSettings />
                        </div>
                      </div>
                    )}
                    {activeSiteSetting === "footer-settings" && (
                      <div>
                        <FooterSettings />
                      </div>
                    )}
                    {activeSiteSetting === "social-media" && (
                      <div>
                        <SocialMediaSettings />
                      </div>
                    )}
                    {activeSiteSetting === "seo-settings" && (
                      <div>
                        <SeoSettings />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activePage === "galeri" && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-xl font-bold text-gray-700">Galeri</h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    {gallerySettings.map((item) => (
                      <button
                        key={item.key}
                        className={`px-4 py-2 rounded ${
                          activeSiteSetting === item.key
                            ? "bg-yellow-400 text-gray-900 font-semibold"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveSiteSetting(item.key)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    {activeSiteSetting === "fotograflar" && (
                      <div>
                        <GalleryViewer />
                      </div>
                    )}
                    {activeSiteSetting === "fotograf-ekle" && (
                      <div>
                        <UploadImageForm />
                      </div>
                    )}
                    {activeSiteSetting === "fotograf-sil" && (
                      <div>
                        <DeleteImageForm />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activePage === "kullanicilar" && (
                <div className="p-6 space-y-6">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-xl font-bold text-gray-700">
                      Kullanıcılar
                    </h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    {userSettings.map((item) => (
                      <button
                        key={item.key}
                        className={`px-4 py-2 rounded ${
                          activeSiteSetting === item.key
                            ? "bg-yellow-400 text-gray-900 font-semibold"
                            : "bg-gray-200 text-gray-700"
                        }`}
                        onClick={() => setActiveSiteSetting(item.key)}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div>
                    {activeSiteSetting === "user-list" && (
                      <div>Kullanıcı Listesi İçeriği Burada</div>
                    )}
                    {activeSiteSetting === "add-user" && (
                      <div>Kullanıcı Ekle İçeriği Burada</div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageContent>
  );
}

export default Panel;
