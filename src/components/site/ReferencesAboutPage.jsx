import { useState, useEffect, useMemo } from "react"; // useMemo'yu import et
import "../../App.css";

const References = () => {
  const [isLoading, setIsLoading] = useState(true);

  // references array'ini useMemo ile sar
  const references = useMemo(
    () => [
      {
        name: "İstanbul Belediyesi",
        iconUrl: "/images/logo-2.png",
      },
      {
        name: "XYZ Holding",
        iconUrl: "/images/logo-bursa.jpg",
      },
      {
        name: "ABC Holding",
        iconUrl: "/images/logo-dogu.png",
      },
      {
        name: "Adana Holding",
        iconUrl: "/images/brsm-p-logo.png",
      },
      {
        name: "Gelişim İnşaat",
        iconUrl: "/images/brsm-siyah-logo.png",
      },
    ],
    []
  ); // boş dependency array, sadece bir kere oluşturulacak

  useEffect(() => {
    const duplicatedReferences = [...references, ...references, ...references];

    Promise.all(
      duplicatedReferences.map((ref) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = ref.iconUrl;
          img.onload = resolve;
          img.onerror = reject;
        });
      })
    )
      .then(() => setIsLoading(false))
      .catch((err) => {
        console.error("Error loading images:", err);
        setIsLoading(false);
      });
  }, [references]); // references'ı dependency olarak ekledik

  const duplicatedReferences = [...references, ...references, ...references];

  return (
    <div className="py-20 bg-white overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Referanslarımız
      </h2>

      <div className="relative w-full overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="logo-slider">
            {duplicatedReferences.map((ref, index) => (
              <div key={index} className="flex-shrink-0">
                <img
                  src={ref.iconUrl}
                  alt={ref.name}
                  loading="lazy"
                  className="w-[250px] h-[150px] object-contain filter grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default References;
