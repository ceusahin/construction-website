import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 500,
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
    // {
    //   id: 3,
    //   img: "/images/main-slider-3.png",
    //   title: "Hemen İncele",
    //   desc: "Yeni villalarımızı keşfedin",
    // },
    // {
    //   id: 4,
    //   img: "/images/main-slider-4.png",
    //   title: "Yeni Ürünler",
    //   desc: "En yeni projelerimiz burada!",
    // },
  ];

  return (
    <div className="overflow-x-hidden relative">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <img
              src={slide.img}
              alt={slide.title}
              className="w-full h-[60vh] object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50 z-5"></div>
            <div className="absolute top-1/3 -translate-x-1/2 left-1/2 transform -translate-y-1/2 text-white text-center z-6 w-10/12">
              <h1 className="text-[30px] font-bold mb-3">{slide.title}</h1>
              <p className="text-[16px]">{slide.desc}</p>
              <div className="flex justify-center mt-8 space-x-4">
                <button className="text-[16px] font-semibold text-white border-2 border-white px-4 py-2rounded hover:bg-blue-600 transition">
                  Teklif Al
                </button>
                <button className="text-[16px] font-semibold text-white border-2 border-white px-4 py-2 rounded hover:bg-blue-600 transition">
                  Projelerimiz
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
