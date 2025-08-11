import { useState } from "react";
import Menu from "../components/admin/Menu";
import PageContent from "../layouts/PageContent";
import Dashboard from "../components/admin/Dashboard";
import FooterSettings from "../components/admin/FooterSettings";
import SocialMediaSettings from "../components/admin/SocialMediaSettings";
import SeoSettings from "../components/admin/SeoSettings";
import SliderSettings from "../components/admin/SliderSettings";
import CompanyInfoSettings from "../components/admin/CompanyInfoSettings";
import ExperienceSettings from "../components/admin/ExperienceSettings";
import ContactInfoSettings from "../components/admin/ContactInfoSettings";
import ServiceSettings from "../components/admin/ServiceSettings";
import ServiceTextSettings from "../components/admin/ServiceTextSettings";
import AboutSectionSettings from "../components/admin/AboutSectionSettings";
import LogoSettings from "../components/admin/UploadHeader";

function Panel() {
  const [activePage, setActivePage] = useState("anasayfa");
  const [activeSiteSetting, setActiveSiteSetting] = useState("header-logo");
  const [activeContentItem, setActiveContentItem] = useState("");

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

  const servicesContextSettings = [
    { label: "Başlık/Yazı İçerik Ayarları", key: "services-context" },
    { label: "Hizmet Ekle/Çıkar/Düzenle", key: "services-card" },
  ];

  const userSettings = [
    { label: "Kullanıcı Listesi", key: "user-list" },
    { label: "Kullanıcı Ekle", key: "add-user" },
  ];

  return (
    <PageContent>
      <div className="flex bg-[#101010]">
        <Menu
          activePage={activePage}
          activeContentItem={activeContentItem}
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
        <div className="ml-60 flex-1">
          {activeContentItem ? (
            <>
              {activeContentItem === "anasayfa-icerik" && (
                <div className="p-14 space-y-6 text-white">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="">/</span>
                    <h1 className="text-l font-light">İçerik Ayarları</h1>
                    <span className="">/</span>
                    <h1 className="text-xl font-bold">Ana Sayfa</h1>
                  </div>
                  <div className="flex flex-col gap-4 mb-8">
                    <SliderSettings />
                    <ExperienceSettings />
                    <ContactInfoSettings />
                  </div>
                </div>
              )}
              {activeContentItem === "hakkimizda" && (
                <div className="p-14 space-y-6 text-white">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="">/</span>
                    <h1 className="text-l font-light">İçerik Ayarları</h1>
                    <span className="">/</span>
                    <h1 className="text-xl font-bold">Hakkımızda</h1>
                  </div>
                  <AboutSectionSettings />
                </div>
              )}
              {activeContentItem === "hizmetlerimiz" && (
                <div className="p-14 space-y-6">
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-l font-light">İçerik Ayarları</h1>
                    <span className="text-gray-500">/</span>
                    <h1 className="text-xl font-bold text-gray-700">
                      Hizmetlerimiz
                    </h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    {servicesContextSettings.map((item) => (
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
                    {activeSiteSetting === "services-context" && (
                      <div className="flex flex-row gap-10">
                        <ServiceTextSettings />
                        <ServiceSettings />
                      </div>
                    )}
                    {activeSiteSetting === "services-card" && (
                      <div>
                        <ServiceSettings />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {activeContentItem === "projelerimiz" && (
                <div>Projelerimiz İçerik Ayarları Burada</div>
              )}
              {activeContentItem === "blog" && (
                <h1>Blog İçerik Ayarları Burada</h1>
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
                  <div className="flex flex-row items-center gap-4 text-white">
                    <h1 className="text-l font-light">Yönetim Paneli</h1>
                    <span className="">/</span>
                    <h1 className="text-xl font-bold">Site Yönetimi</h1>
                  </div>
                  <div className="flex gap-4 mb-8">
                    <div className="flex flex-col items-center gap-10 w-full">
                      <LogoSettings />
                      <CompanyInfoSettings />
                      <FooterSettings />
                      <SocialMediaSettings />
                      <SeoSettings />
                    </div>
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
