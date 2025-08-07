import CountUp from "./CountUp";

function Experience() {
  return (
    <div className="bg-[#101270] w-[73%] mx-auto rounded-lg shadow-lg px-4 py-6 md:px-8 md:py-14 flex flex-col gap-6 md:flex-row md:justify-around md:items-center text-white z-10 relative">
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-2xl md:text-5xl font-semibold">
          <CountUp
            className="text-2xl md:text-5xl font-semibold count-up-text"
            from={0}
            to={500}
            separator=","
            direction="up"
            duration={1}
          />
          <h1>+</h1>
        </div>
        <p className="text-sm md:text-xl">Tamamlanan Projeler</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-2xl md:text-5xl font-semibold">
          <CountUp
            className="text-2xl md:text-5xl font-semibold count-up-text"
            from={0}
            to={15}
            separator=","
            direction="up"
            duration={1}
          />
        </div>
        <p className="text-sm md:text-xl">Yılların Tecrübesi</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-2xl md:text-5xl font-semibold">
          <CountUp
            className="text-2xl md:text-5xl font-semibold count-up-text"
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1}
          />
          <h1>+</h1>
        </div>
        <p className="text-sm md:text-xl">Memnun Müşteriler</p>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-2 text-2xl md:text-5xl font-semibold">
          <CountUp
            className="text-2xl md:text-5xl font-semibold count-up-text"
            from={0}
            to={12}
            separator=","
            direction="up"
            duration={1}
          />
        </div>
        <p className="text-sm md:text-xl">Hizmet Edilen Şehir</p>
      </div>
    </div>
  );
}
export default Experience;
