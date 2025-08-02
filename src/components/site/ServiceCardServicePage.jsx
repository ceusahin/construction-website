function ServiceCardServicePage({ title, description, img }) {
  return (
    <div className="bg-white border border-gray-200 shadow-md rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col justify-between">
      <div className="relative h-40 w-full">
        <img
          src={img}
          alt={title}
          className="object-cover w-full h-full filter brightness-75 blur-[1px]"
        />
        <div className="absolute inset-0 bg-black/30" />
        <h3 className="absolute bottom-3 left-4 text-white text-xl font-bold drop-shadow-md">
          {title}
        </h3>
      </div>

      <div className="p-6 flex flex-col flex-1 ">
        <p className="text-gray-700 mb-4">{description}</p>
        <button className="text-end text-sm text-[#101270] font-semibold mt-auto hover:underline transition cursor-pointer">
          Projeleri Gör
        </button>
      </div>
    </div>
  );
}

export default ServiceCardServicePage;
