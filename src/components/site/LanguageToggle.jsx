const LanguageToggle = ({ language, setLanguage }) => {
  return (
    <div>
      <button
        className={`px-4 py-2 mr-2 rounded ${
          language === "tr" ? "bg-blue-600 text-white" : "bg-gray-300"
        }`}
        onClick={() => setLanguage("tr")}
      >
        Türkçe
      </button>
      <button
        className={`px-4 py-2 rounded ${
          language === "en" ? "bg-blue-600 text-white" : "bg-gray-300"
        }`}
        onClick={() => setLanguage("en")}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
