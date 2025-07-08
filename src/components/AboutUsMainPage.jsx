function AboutUsMainPage() {
  return (
    <div className="mt-70 px-4">
      <h1 className="text-[20px] font-medium text-[#747474]">About Us</h1>
      <div>
        <h1 className="text-[30px] font-bold mt-2">
          Committed to Excellence in Construction
        </h1>
        <p className="text-[16px] text-[#747474] mt-2">
          For over 15 years, we have been delivering top-notch construction
          services that transform dreams into reality. With a commitment to
          innovation, precision, and sustainability, we’ve completed 300+
          projects globally.
        </p>
      </div>
      <button className="border-2 border-[#747474] rounded-md px-4 py-2 mt-4">
        <a href="/contact" className="text-[#747474] px-4 py-2 rounded-md mt-4">
          Contact Us
        </a>
      </button>
    </div>
  );
}

export default AboutUsMainPage;
