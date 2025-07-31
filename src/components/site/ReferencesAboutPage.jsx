const References = () => {
  //   const [references, setReferences] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:8080/api/construction/references")
  //       .then((res) => setReferences(res.data))
  //       .catch((err) => console.error("Referanslar alınamadı:", err));
  //   }, []);
  const references = [
    {
      name: "İstanbul Belediyesi",
      iconUrl: "/images/projeler-yuksekbina.jpg",
    },
    {
      name: "XYZ Holding",
      iconUrl: "/images/projeler-yuksekbina.jpg",
    },
    {
      name: "Adana Holding",
      iconUrl: null,
    },
    {
      name: "Gelişim İnşaat",
      iconUrl: null,
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-24 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Referanslarımız
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 justify-items-center">
        {references.map((ref, index) => (
          <div
            key={index}
            className="group flex flex-col items-center justify-center transition duration-300 text-center"
          >
            {ref.iconUrl ? (
              <img
                src={ref.iconUrl}
                alt={ref.name}
                className="w-20 h-20 md:w-30 md:h-30 object-contain filter grayscale group-hover:grayscale-0 transition duration-300"
              />
            ) : (
              <span className="text-gray-800 text-sm md:text-base font-medium group-hover:text-blue-600 transition">
                {ref.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default References;
