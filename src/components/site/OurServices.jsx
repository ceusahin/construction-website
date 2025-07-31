import MoreButton from "./MoreButton";
import OurServicesCard from "./OurServicesCard";

function OurServices() {
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

  const moreButtonText = "Tüm Hizmetlerimiz";

  return (
    <section className="mt-16 px-4 2xl:px-44 2xl:mt-30">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h2 className="text-xl text-gray-500 font-medium">Hizmetlerimiz</h2>
          <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold mt-2">
            Güvenilir ve Kapsamlı Hizmetlerimizle Yanınızdayız
          </h1>
        </div>
        <div className="w-full md:w-auto flex justify-start md:justify-end">
          <MoreButton text={moreButtonText} />
        </div>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-6">
          {services.map((service) => (
            <OurServicesCard
              key={service.id}
              img={service.img}
              name={service.name}
              description={service.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default OurServices;
