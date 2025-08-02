import ServiceCardServicePage from "./ServiceCardServicePage";

function ServicePageMain() {
  const services = [
    {
      id: 1,
      name: "İnşaat Hizmetleri",
      description:
        "Konut, ticari yapı ve altyapı projelerinde tasarımdan teslimata kadar tüm aşamaları üstleniyoruz. Kaliteli malzeme ve uzman ekip ile güvenli yapılar inşa ediyoruz.",
      img: "images/hizmetler-insaat.jpg",
    },
    {
      id: 2,
      name: "Tekstil Üretimi",
      description:
        "Kumaş üretimi, dikim ve özel tasarım ürünler dahil olmak üzere tekstil sektörüne yönelik geniş kapsamlı çözümler sunuyoruz.",
      img: "images/hizmetler-tekstil.jpg",
    },
    {
      id: 3,
      name: "Sürdürülebilir Tarım Uygulamaları",
      description:
        "Modern tekniklerle buğday, mısır, arpa gibi temel ürünlerin üretimini yapıyor, tarımsal verimliliği artırmak için sürdürülebilir çözümler uyguluyoruz.",
      img: "images/hizmetler-tarim.jpg",
    },
    {
      id: 4,
      name: "Hayvancılık ve Besicilik",
      description:
        "Sağlıklı ve hijyenik koşullarda büyükbaş ve küçükbaş hayvan yetiştiriciliği yapıyoruz. Besi, bakım ve üretim süreçlerinde yüksek standartlara sahibiz.",
      img: "images/hizmetler-hayvancilik.jpg",
    },
  ];

  return (
    <div className="mx-66 mt-14">
      <div className="text-center mb-10">
        <h1 className="text-base md:text-lg font-medium text-[#747474]">
          Hizmetlerimiz
        </h1>
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mt-2">
          Committed to Excellence in Construction
        </h2>
        <p className="text-sm md:text-base text-[#747474] mt-3">
          For over 15 years, we have been delivering top-notch construction
          services that transform dreams into reality. With a commitment to
          innovation, precision, and sustainability, we’ve completed 300+
          projects globally.
        </p>
      </div>
      <div className="mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCardServicePage
              key={service.id}
              title={service.name}
              description={service.description}
              img={service.img}
              details={service.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ServicePageMain;
