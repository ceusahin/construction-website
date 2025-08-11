import FadeContent from "../../utils/FadeContent";
import ServiceCardServicePage from "./ServiceCardServicePage";

function ServicePageMain() {
  const services = [
    {
      id: 1,
      name: "İnşaat Hizmetleri",
      description:
        "Konut, ticari yapı ve altyapı projelerinde tasarımdan teslimata kadar tüm aşamaları üstleniyoruz. Kaliteli malzeme ve uzman ekip ile güvenli yapılar inşa ediyoruz.",
      img: "images/hizmetler-insaat.webp",
    },
    {
      id: 2,
      name: "Tekstil Üretimi",
      description:
        "Kumaş üretimi, dikim ve özel tasarım ürünler dahil olmak üzere tekstil sektörüne yönelik geniş kapsamlı çözümler sunuyoruz.",
      img: "images/hizmetler-tekstil.webp",
    },
    {
      id: 3,
      name: "Sürdürülebilir Tarım Uygulamaları",
      description:
        "Modern tekniklerle buğday, mısır, arpa gibi temel ürünlerin üretimini yapıyor, tarımsal verimliliği artırmak için sürdürülebilir çözümler uyguluyoruz.",
      img: "images/hizmetler-tarim.webp",
    },
    {
      id: 4,
      name: "Hayvancılık ve Besicilik",
      description:
        "Sağlıklı ve hijyenik koşullarda büyükbaş ve küçükbaş hayvan yetiştiriciliği yapıyoruz. Besi, bakım ve üretim süreçlerinde yüksek standartlara sahibiz.",
      img: "images/hizmetler-hayvancilik.webp",
    },
    {
      id: 5,
      name: "Hayvancılık ve Besicilik",
      description:
        "Sağlıklı ve hijyenik koşullarda büyükbaş ve küçükbaş hayvan yetiştiriciliği yapıyoruz. Besi, bakım ve üretim süreçlerinde yüksek standartlara sahibiz.",
      img: "images/hizmetler-hayvancilik.webp",
    },
  ];

  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="xl:mx-36 px-4 py-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl xl:text-4xl font-medium text-[#747474]">
            Hizmetlerimiz
          </h2>
          <h1 className="text-4xl xl:text-5xl font-bold my-5">
            Committed to Excellence in Construction
          </h1>
          <p className="text-xl xl:text-2xl text-[#747474] mt-3 xl:mx-46">
            For over 15 years, we have been delivering top-notch construction
            services that transform dreams into reality. With a commitment to
            innovation, precision, and sustainability, we’ve completed 300+
            projects globally.
          </p>
        </div>

        <div className="mb-10">
          <div className="flex flex-wrap justify-center gap-8">
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
    </FadeContent>
  );
}

export default ServicePageMain;
