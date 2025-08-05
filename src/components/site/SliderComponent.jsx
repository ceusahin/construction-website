import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const slides = [
    {
      id: 1,
      img: "/images/main-slider-1.png",
      title: "We Build the Future with Strength & Precision",
      desc: "Delivering top-notch construction solutions on time and within budget",
    },
    {
      id: 2,
      img: "/images/main-slider-2.png",
      title: "We Build the Future with Strength & Precision",
      desc: "Delivering top-notch construction solutions on time and within budget",
    },
  ];

  return (
    <div className="overflow-x-hidden relative mt-22">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[60vh] md:h-[80vh] xl:h-[91vh] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
            <div className="absolute top-[36%] md:top-1/3 xl:top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center z-20 w-11/12 sm:w-10/12">
              <h1 className="text-lg sm:text-2xl md:text-3xl xl:text-5xl font-bold mb-3">
                {slide.title}
              </h1>
              <p className="text-sm sm:text-base md:text-lg xl:text-2xl">
                {slide.desc}
              </p>
              <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4">
                <button className="relative overflow-hidden group text-sm sm:text-base font-semibold text-white border-2 border-white px-4 py-2 sm:px-6 sm:py-2 xl:px-12 xl:py-3 xl:text-xl rounded cursor-pointer transition">
                  <span className="absolute left-0 top-0 h-full w-0 bg-[#101270cc] transition-[width] duration-500 ease-in-out group-hover:w-full"></span>
                  <span className="relative z-10">Teklif Al</span>
                </button>
                <button className="relative overflow-hidden group text-sm sm:text-base font-semibold text-white border-2 border-white px-4 py-2 sm:px-6 sm:py-2 xl:px-12 xl:py-3 xl:text-xl rounded cursor-pointer transition">
                  <span className="absolute left-0 top-0 h-full w-0 bg-[#101270cc]  transition-[width] duration-500 ease-in-out group-hover:w-full"></span>
                  <span className="relative z-10">Projelerimiz</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
