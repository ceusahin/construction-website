import FadeContent from "./FadeContent";

const ReferencesPageMain = () => {
  const referencesWithLogo = [
    {
      id: 1,
      name: "Company 1",
      logo: "/images/brsm-siyah-logo.webp",
    },
    {
      id: 2,
      name: "Company 2",
      logo: "/images/brsm-p-logo.webp",
    },
    {
      id: 3,
      name: "Company 3",
      logo: "/images/logo-dogu.webp",
    },
    // Add more references
  ];

  const referencesWithoutLogo = [
    { id: 1, name: "Reference Company 1" },
    { id: 2, name: "Reference Company 2" },
    { id: 3, name: "Reference Company 3" },
    { id: 4, name: "Reference Company 4" },
    { id: 5, name: "Reference Company 5" },
    // Add more references
  ];

  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8 items-center">
          <h2 className="text-5xl font-bold mb-10 pb-2 pt-4 border-b-2 border-black">
            REFERANSLARIMIZ
          </h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sol Taraf - Logolu Referanslar */}
          <div className="md:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {referencesWithLogo.map((reference) => (
                <div
                  key={reference.id}
                  className="flex flex-col items-center gap-4 mb-4"
                >
                  <div className="w-48 h-24 relative overflow-hidden">
                    <img
                      src={reference.logo}
                      alt={reference.name}
                      className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-700 text-center">
                    {reference.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Taraf - Logosuz Referanslar */}
          <div className="md:w-1/2 flex flex-col items-center justify-center">
            <div className="space-y-4">
              {referencesWithoutLogo.map((reference) => (
                <div
                  key={reference.id}
                  className="py-4 transition-colors duration-200"
                >
                  <h3 className="text-black hover:text-[#101270] transition-colors duration-200 text-lg xl:text-3xl font-semibold">
                    {reference.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </FadeContent>
  );
};

export default ReferencesPageMain;
