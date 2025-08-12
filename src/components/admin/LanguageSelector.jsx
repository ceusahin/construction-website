import React from "react";
import useLanguage from "../../contexts/useLanguage";

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const handleChange = (lang) => {
    if (lang !== language) {
      setLanguage(lang);
    }
  };

  return (
    <div className="flex flex-row justify-center select-none gap-2">
      <button
        onClick={() => handleChange("en")}
        className={`px-10 py-2 cursor-pointer flex flex-row items-center border w-11 justify-center text-sm font-medium ${
          language === "en"
            ? "border-red-500 text-white bg-red-500"
            : "border-red-500 text-white hover:bg-red-500"
        } focus:outline-none rounded`}
      >
        <span className="text-md">English</span>
        <span className="ml-1">
          {/* <img
            src="https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png"
            className="w-5 h-5"
            alt="English"
          /> */}
        </span>
      </button>

      <button
        onClick={() => handleChange("tr")}
        className={`cursor-pointer px-10 flex flex-row items-center border w-11 justify-center text-sm font-medium ${
          language === "tr"
            ? "border-red-500 text-white bg-red-500"
            : "border-red-500 text-white hover:bg-red-500"
        } focus:outline-none rounded`}
      >
        <span className="text-md">Türkçe</span>
        <span className="ml-1">
          {/* <img
            src="https://img.icons8.com/?size=512&id=7PhX5XSLeDb9&format=png"
            className="w-5 h-5 border rounded-full "
            alt="Turkish"
          /> */}
        </span>
      </button>
    </div>
  );
};

export default LanguageSelector;
