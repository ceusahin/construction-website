import { useMemo } from "react";
import "../../App.css"; // CSS animasyon burada tanımlı
import FadeContent from "./FadeContent";

const References = () => {
  const references = useMemo(
    () => [
      { name: "İstanbul Belediyesi", iconUrl: "/images/logo-2.webp" },
      { name: "ABC Holding", iconUrl: "/images/logo-dogu.webp" },
      { name: "Adana Holding", iconUrl: "/images/brsm-p-logo.webp" },
      { name: "Gelişim İnşaat", iconUrl: "/images/brsm-siyah-logo.webp" },
    ],
    []
  );

  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="py-20 bg-white overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          Referanslarımız
        </h2>

        <div className="slider-container">
          <div className="slider-track">
            {[...references, ...references].map((ref, index) => (
              <div key={index} className="slider-item">
                <img
                  src={ref.iconUrl}
                  alt={ref.name}
                  loading="lazy"
                  width={250}
                  height={150}
                  className="w-[250px] h-[150px] object-contain filter grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </FadeContent>
  );
};

export default References;
