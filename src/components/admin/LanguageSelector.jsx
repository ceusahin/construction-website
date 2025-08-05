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
        className={`p-2 cursor-pointer flex flex-row items-center border text-sm font-medium ${
          language === "en"
            ? "border-blue-500 text-white bg-blue-800"
            : "border-gray-300 text-white hover:bg-blue-500"
        } focus:outline-none rounded`}
      >
        <span className="text-md">EN</span>
        <span className="ml-1">
          <img
            src="https://img.icons8.com/?size=512&id=t3NE3BsOAQwq&format=png"
            className="w-5 h-5"
            alt="English"
          />
        </span>
      </button>

      <button
        onClick={() => handleChange("tr")}
        className={`cursor-pointer p-2 flex flex-row items-center border text-sm font-medium ${
          language === "tr"
            ? "border-blue-500 text-white bg-blue-800"
            : "border-gray-300 text-white hover:bg-blue-500"
        } focus:outline-none rounded`}
      >
        <span className="text-md">TR</span>
        <span className="ml-1">
          <img
            src="https://img.icons8.com/?size=512&id=7PhX5XSLeDb9&format=png"
            className="w-5 h-5"
            alt="Turkish"
          />
        </span>
      </button>
    </div>
  );
};

export default LanguageSelector;
