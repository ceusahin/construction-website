import { Construction, Hammer, HardHat } from "lucide-react";

function AboutUsMainPage() {
  return (
    <div className="mt-12 md:mt-20 px-4 md:px-8 xl:mx-36 flex flex-col lg:flex-row gap-12">
      {/* Sol taraf: Metinler ve ikonlu maddeler */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-start">
        <h1 className="text-base md:text-lg font-medium text-[#747474]">
          About Us
        </h1>
        <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold mt-2">
          Committed to Excellence in Construction
        </h2>
        <p className="text-sm md:text-base text-[#747474] mt-3">
          For over 15 years, we have been delivering top-notch construction
          services that transform dreams into reality. With a commitment to
          innovation, precision, and sustainability, we’ve completed 300+
          projects globally.
        </p>

        <ul className="flex flex-col gap-8 mt-10">
          {[
            {
              icon: (
                <Construction
                  size={60}
                  className="rounded-xl p-3 bg-blue-500 text-white"
                />
              ),
              title: "Expert Team of Professionals",
              desc: "Our team consists of skilled architects, engineers, and builders with decades of experience.",
            },
            {
              icon: (
                <Hammer
                  size={60}
                  className="rounded-xl p-3 bg-blue-500 text-white"
                />
              ),
              title: "Quality Tools & Equipment",
              desc: "We invest in the latest tools and machinery to ensure safety and precision on every site.",
            },
            {
              icon: (
                <HardHat
                  size={60}
                  className="rounded-xl p-3 bg-blue-500 text-white"
                />
              ),
              title: "Safety First",
              desc: "Safety is our top priority — for our workers, clients, and communities.",
            },
          ].map((item, index) => (
            <li key={index} className="flex gap-6 items-start">
              {item.icon}
              <div>
                <h3 className="text-lg md:text-xl font-semibold">
                  {item.title}
                </h3>
                <p className="text-sm md:text-base text-[#747474]">
                  {item.desc}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Sağ taraf: Fotoğraf / video kutuları */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center gap-4">
        <div className="bg-gray-200 w-full h-40 md:h-56 flex items-center justify-center text-gray-600">
          FOTO / VİDEO
        </div>
        <div className="bg-gray-300 w-full h-20 md:h-32 flex items-center justify-center text-gray-600">
          x2
        </div>
      </div>
    </div>
  );
}

export default AboutUsMainPage;
