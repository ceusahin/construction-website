import FadeContent from "./FadeContent";

function OurHistory() {
  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="my-12 md:my-20 px-4 md:px-8 xl:mx-36 flex flex-col lg:flex-row gap-12">
        {/* Sol taraf: Metinler ve ikonlu maddeler */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-start gap-6">
          <h1 className="text-base md:text-lg font-medium text-[#747474]">
            Our History
          </h1>
          <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mt-2">
            Our Journey From Foundations to Milestones
          </h2>
          <p className="text-sm md:text-base text-black mt-3">
            The journey started with a simple mission: to create spaces that
            blend functionality with aesthetics. Over the years, experience,
            innovation, and a client-focused approach have fueled growth,
            enabling the completion of projects that leave a lasting impression.
            This journey is built on a foundation of trust, collaboration, and a
            relentless pursuit of excellence.
          </p>
        </div>

        {/* Sağ taraf: Fotoğraf / video kutuları */}
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-4">
          <div className="bg-gray-200 w-full h-40 md:h-56 flex items-center justify-center text-gray-600">
            FOTO / VİDEO
          </div>
        </div>
      </div>
    </FadeContent>
  );
}

export default OurHistory;
