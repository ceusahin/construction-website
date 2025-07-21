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

  return (
    <div className="mt-16 px-4 2xl:px-60 flex flex-col items-center justify-center text-center 2xl:mt-30">
      <h1 className="text-[20px] font-medium text-[#747474] 2xl:text-[35px]">
        Hizmetlerimiz
      </h1>
      <h1 className="text-[30px] font-bold mt-2 2xl:text-[45px]">
        Güvenilir ve Kapsamlı Hizmetlerimizle Yanınızdayız
      </h1>
      <p className="text-[16px] text-[#747474] mt-2 2xl:text-[25px] 2xl:mb-14">
        İnşaat, tekstil, tarım ve hayvancılık alanlarında geniş kapsamlı
        hizmetler sunuyoruz. Tüm süreçlerde kalite ve müşteri memnuniyeti
        önceliğimizdir.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex relative flex-col gap-4 2xl:gap-0 items-center border-2 border-blue-300 my-6 text-center rounded-tl-4xl rounded-br-4xl lg:h-[550px] 2xl:h-[700px] lg:justify-between lg:overflow-hidden"
          >
            <img
              src={service.img}
              className="w-full rounded-tl-4xl rounded-br-4xl object-cover pb-4 lg:h-[250px] 2xl:h-[400px] lg:pb-0"
            />
            <h2 className="text-2xl font-bold px-4 lg:px-6 2xl:text-[35px]">
              {service.name}
            </h2>
            <p className="mb-4 px-4 text-[#747474] lg:px-6 2xl:text-[25px]">
              {service.description}
            </p>
            <button className="mb-8 2xl:mb-8">
              <a
                href="/contact"
                className="bg-blue-500 text-white px-6 py-3 2xl:px-16 2xl:py-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Detaylar
              </a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OurServices;
