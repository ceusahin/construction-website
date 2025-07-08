function AboutUsMainPage() {
  return (
    <div className="mt-70 lg:mt-45 px-4 2xl:px-60 flex flex-col items-center justify-center text-center">
      <h1 className="text-[20px] font-medium text-[#747474] 2xl:text-[35px]">
        About Us
      </h1>
      <div>
        <h1 className="text-[30px] font-bold mt-2 2xl:text-[35px]">
          Committed to Excellence in Construction
        </h1>
        <p className="text-[16px] text-[#747474] mt-2 2xl:text-[25px]">
          For over 15 years, we have been delivering top-notch construction
          services that transform dreams into reality. With a commitment to
          innovation, precision, and sustainability, we’ve completed 300+
          projects globally.
        </p>
      </div>
      <button className="border-2 border-[#747474] text-[#747474] cursor-pointer rounded-md px-4 py-2 mt-4 2xl:px-14 2xl:py-6 2xl:text-[25px] 2xl:mt-8 2xl:rounded-lg hover:bg-blue-500 transition-colors 2xl:hover:text-white">
        <a href="/" className="px-4 py-2 rounded-md mt-4">
          Contact Us
        </a>
      </button>
    </div>
  );
}

export default AboutUsMainPage;
