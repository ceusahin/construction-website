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
        className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:blur-[4px] group-hover:opacity-50"
      />

      {/* Karanlık overlay */}
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/0 transition-opacity duration-300 z-10" />

      {/* Başlık: tam ortada başlar, hover’da yukarı çıkar */}
      <div
        className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2
                   flex flex-col items-center text-center transition-transform duration-500 group-hover:-translate-y-[120px]"
      >
        <p className="text-2xl font-bold tracking-widest text-blue-300 group-hover:text-blue-700 drop-shadow-md transition-colors">
          Hizmet
        </p>
        <h3 className="text-3xl font-bold text-white group-hover:text-black drop-shadow-lg transition-colors">
          {name}
        </h3>
      </div>

      {/* Açıklama ve Buton: hover’da görünür */}
      <div className="absolute bottom-6 left-0 w-full z-20 px-6 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-center">
        <p className="text-xl text-white group-hover:text-black font-bold mb-6 line-clamp-4 drop-shadow-md">
          {description}
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-lg">
          Detaylar
        </button>
      </div>
    </a>
  );
}

export default OurServicesCard;
