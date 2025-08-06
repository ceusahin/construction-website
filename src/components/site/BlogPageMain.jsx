import { useState } from "react";

const blogData = [
  {
    title: "Proje 1",
    images: [
      "/images/main-slider-1.png",
      "/images/main-slider-3.png",
      "/images/main-slider-2.png",
    ],
  },
  {
    title: "Proje 2",
    images: [
      "/images/main-slider-4.png",
      "/images/main-slider-5.png",
      "/images/main-slider-1.png",
    ],
  },
  {
    title: "Proje 3",
    images: [
      "/images/main-slider-4.png",
      "/images/main-slider-3.png",
      "/images/main-slider-1.png",
    ],
  },
];

function ImageSlider({ images, title }) {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500); // animasyon süresi kadar bekle
  };

  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500); // animasyon süresi kadar bekle
  };

  return (
    <div className="relative w-full h-full group overflow-hidden">
      <div
        className="flex w-full h-full transform transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${title} - ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Başlık overlay */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 text-sm rounded">
        {title}
      </div>

      {/* Navigation butonları */}
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button
          className="bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
          onClick={prevSlide}
          disabled={isAnimating}
        >
          ❮
        </button>
        <button
          className="bg-black/30 hover:bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer disabled:opacity-50"
          onClick={nextSlide}
          disabled={isAnimating}
        >
          ❯
        </button>
      </div>
    </div>
  );
}

export default function BlogPageMain() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl xl:text-3xl font-medium text-[#747474]">
          Blog, Image Gallery & News
        </h2>
        <h1 className="text-4xl xl:text-5xl font-bold my-5">
          Committed to Excellence in Construction
        </h1>
        <p className="text-xl xl:text-2xl text-[#747474] mt-3">
          For over 15 years, we have been delivering top-notch construction
          services that transform dreams into reality. With a commitment to
          innovation, precision, and sustainability, we’ve completed 300+
          projects globally.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((item, idx) => (
          <div
            key={idx}
            className="rounded-lg overflow-hidden shadow-lg aspect-[4/3]" // Sabit bir oran verdik
          >
            <ImageSlider images={item.images} title={item.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
