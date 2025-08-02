function OurServicesCard({ name, img, description }) {
  return (
    <a
      href="/contact"
      className="group relative block h-[450px] rounded-3xl overflow-hidden shadow-lg"
    >
      {/* Arkaplan görseli */}
      <img
        alt={name}
        src={img}
        className="absolute inset-0 h-full w-full object-cover group-hover:blur-[4px] opacity-100 transition-all duration-300 group-hover:opacity-50"
      />

      {/* Karanlık overlay */}
      <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 z-10" />

      {/* İçerik */}
      <div className="relative h-full px-6 pb-6 flex flex-col justify-end z-10 overflow-hidden">
        {/* Hizmet Başlığı */}
        <div
          className="absolute z-20 xl:w-[500px] text-center group-hover:text-left transition-all duration-500
            top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            group-hover:top-20 group-hover:left-69 group-hover:transform-none"
        >
          <p className="text-2xl font-bold tracking-widest text-blue-300 group-hover:text-blue-700 drop-shadow-md transition-colors">
            Hizmet
          </p>
          <h3 className="text-3xl font-bold text-white group-hover:text-black drop-shadow-lg transition-colors">
            {name}
          </h3>
        </div>

        {/* Açıklama ve Buton */}
        <div className="mt-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
          <p className="text-xl text-black font-bold mb-6 line-clamp-4 drop-shadow-md">
            {description}
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-lg">
            Detaylar
          </button>
        </div>
      </div>
    </a>
  );
}

export default OurServicesCard;
