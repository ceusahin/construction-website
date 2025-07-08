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
    <div className="mt-16 px-4">
      <h1 className="text-[20px] font-medium text-[#747474]">Hizmetlerimiz</h1>
      <h1 className="text-[30px] font-bold mt-2">
        Güvenilir ve Kapsamlı Hizmetlerimizle Yanınızdayız
      </h1>
      <p className="text-[16px] text-[#747474] mt-2">
        İnşaat, tekstil, tarım ve hayvancılık alanlarında geniş kapsamlı
        hizmetler sunuyoruz. Tüm süreçlerde kalite ve müşteri memnuniyeti
        önceliğimizdir.
      </p>
      {services.map((service) => (
        <div
          key={service.id}
          className="flex relative flex-col gap-4 items-center border-2 border-blue-300 my-6 text-center rounded-tl-4xl rounded-br-4xl"
        >
          <img
            src={service.img}
            className="w-full rounded-tl-4xl rounded-br-4xl object-cover pb-4"
          />
          <h2 className="text-2xl font-bold px-4">{service.name}</h2>
          <p className="mb-4 px-4 text-[#747474]">{service.description}</p>
          <button className="mb-8">
            <a
              href="/contact"
              className="bg-blue-300 text-white px-6 py-3 rounded-md hover:bg-blue-400 transition-colors"
            >
              Detaylar
            </a>
          </button>
        </div>
      ))}
    </div>
  );
}

export default OurServices;
