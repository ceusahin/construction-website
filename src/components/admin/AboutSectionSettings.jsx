import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import useLanguage from "../../contexts/useLanguage";

const AboutSectionSettings = () => {
  const { language } = useLanguage();

  const [topData, setTopData] = useState({
    id: null,
    title: "",
    subtitle: "",
    paragraph: "",
    smallTitle1: "",
    smallParagraph1: "",
    smallTitle2: "",
    smallParagraph2: "",
    smallTitle3: "",
    smallParagraph3: "",
    mediaType: "IMAGE",
    mediaUrl: "",
    mediaFile: null,
  });

  const [bottomData, setBottomData] = useState({
    id: null,
    title: "",
    subtitle: "",
    paragraph: "",
    mediaType: "IMAGE",
    mediaUrl: "",
    mediaFile: null,
  });

  const [youtubeVideoId, setYoutubeVideoId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | error

  useEffect(() => {
    if (!language) return; // Dil yoksa istek yapma
    fetchSectionData("TOP", setTopData, language);
    fetchSectionData("BOTTOM", setBottomData, language);
  }, [language]);

  const fetchSectionData = async (section, setData, lang) => {
    try {
      const res = await axiosInstance.get("/about-section", {
        params: { section, language: lang },
      });
      if (res.data) {
        setData((prev) => ({
          ...prev,
          id: res.data.id || null,
          title: res.data.title || "",
          subtitle: res.data.subtitle || "",
          paragraph: res.data.paragraph || "",
          smallTitle1: res.data.smallTitle1 || "",
          smallParagraph1: res.data.smallParagraph1 || "",
          smallTitle2: res.data.smallTitle2 || "",
          smallParagraph2: res.data.smallParagraph2 || "",
          smallTitle3: res.data.smallTitle3 || "",
          smallParagraph3: res.data.smallParagraph3 || "",
          mediaType: res.data.mediaType || "IMAGE",
          mediaUrl: res.data.mediaUrl || "",
          mediaFile: null,
        }));

        if (section === "TOP") {
          setYoutubeVideoId(res.data.youtubeVideoId || "");
        }
      } else {
        // reset
        if (section === "TOP") {
          setTopData({
            id: null,
            title: "",
            subtitle: "",
            paragraph: "",
            smallTitle1: "",
            smallParagraph1: "",
            smallTitle2: "",
            smallParagraph2: "",
            smallTitle3: "",
            smallParagraph3: "",
            mediaType: "IMAGE",
            mediaUrl: "",
            mediaFile: null,
          });
          setYoutubeVideoId("");
        } else {
          setBottomData({
            id: null,
            title: "",
            subtitle: "",
            paragraph: "",
            mediaType: "IMAGE",
            mediaUrl: "",
            mediaFile: null,
          });
        }
      }
    } catch (error) {
      setMessage({ text: "Veri alınırken hata oluştu.", type: "error" });
      console.error("Veri alınamadı", error);
    }
  };

  const handleInputChange = (section, e) => {
    const { name, value } = e.target;
    if (section === "TOP") {
      setTopData((prev) => ({ ...prev, [name]: value }));
    } else {
      setBottomData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleMediaTypeChange = (section, e) => {
    const mediaType = e.target.value;
    if (section === "TOP") {
      setTopData((prev) => ({
        ...prev,
        mediaType,
        mediaUrl: "",
        mediaFile: null,
      }));
    } else {
      setBottomData((prev) => ({
        ...prev,
        mediaType,
        mediaUrl: "",
        mediaFile: null,
      }));
    }
  };

  const handleFileChange = (section, e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (section === "TOP") {
        setTopData((prev) => ({
          ...prev,
          mediaFile: file,
          mediaUrl: URL.createObjectURL(file),
        }));
      } else {
        setBottomData((prev) => ({
          ...prev,
          mediaFile: file,
          mediaUrl: URL.createObjectURL(file),
        }));
      }
    }
  };

  const handleYoutubeChange = (e) => {
    setYoutubeVideoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await submitSection("TOP", topData, youtubeVideoId, language);
      await submitSection("BOTTOM", bottomData, "", language);
      setMessage({ text: "Başarıyla kaydedildi.", type: "success" });
    } catch (error) {
      setMessage({ text: "Kaydetme sırasında hata oluştu.", type: "error" });
      console.error("Kaydetme hatası", error);
    }
    setLoading(false);
  };

  const submitSection = async (section, data, youtubeId, lang) => {
    const formData = new FormData();

    const dto = {
      ...data,
      section,
      youtubeVideoId: youtubeId,
      language: lang,
    };
    delete dto.mediaFile;

    if (data.mediaFile) {
      formData.append("mediaFile", data.mediaFile);
    }

    formData.append(
      "data",
      new Blob([JSON.stringify(dto)], { type: "application/json" })
    );

    await axiosInstance.post("/about-section", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto dark:text-white space-y-8"
    >
      {/* Başlık */}
      <h1 className="text-2xl font-bold mb-6">Hakkımızda Bölümü Yönetimi</h1>

      {/* Bölümler */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Üst Bölüm */}
        <section className="w-full md:w-1/2 p-10 border border-gray-300 dark:border-gray-800 rounded-lg shadow-sm text-black">
          <h2 className="text-xl font-semibold dark:text-white border-b border-gray-300 text-gray-500 pb-2 mb-10">
            Üst Bölüm
          </h2>

          {/* Form alanları */}
          <Input
            label="Başlık"
            name="title"
            value={topData.title}
            onChange={(e) => handleInputChange("TOP", e)}
          />
          <Input
            label="Alt Başlık"
            name="subtitle"
            value={topData.subtitle}
            onChange={(e) => handleInputChange("TOP", e)}
          />
          <Textarea
            label="Paragraf"
            name="paragraph"
            value={topData.paragraph}
            onChange={(e) => handleInputChange("TOP", e)}
            rows={5}
          />

          {[1, 2, 3].map((num) => (
            <div key={num} className="mt-4">
              <Input
                label={`Küçük Başlık ${num}`}
                name={`smallTitle${num}`}
                value={topData[`smallTitle${num}`]}
                onChange={(e) => handleInputChange("TOP", e)}
              />
              <Textarea
                label={`Küçük Paragraf ${num}`}
                name={`smallParagraph${num}`}
                value={topData[`smallParagraph${num}`]}
                onChange={(e) => handleInputChange("TOP", e)}
                rows={3}
              />
            </div>
          ))}

          <MediaSelector
            mediaType={topData.mediaType}
            onMediaTypeChange={(e) => handleMediaTypeChange("TOP", e)}
            mediaUrl={topData.mediaUrl}
            onFileChange={(e) => handleFileChange("TOP", e)}
          />
        </section>

        {/* Alt Bölüm */}
        <section className="w-full md:w-1/2 p-10 border dark:border-gray-800 border-gray-300 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold dark:text-white border-b border-gray-300 text-gray-500 pb-2 mb-10">
            Alt Bölüm
          </h2>

          <Input
            label="Başlık"
            name="title"
            value={bottomData.title}
            onChange={(e) => handleInputChange("BOTTOM", e)}
          />
          <Input
            label="Alt Başlık"
            name="subtitle"
            value={bottomData.subtitle}
            onChange={(e) => handleInputChange("BOTTOM", e)}
          />
          <Textarea
            label="Paragraf"
            name="paragraph"
            value={bottomData.paragraph}
            onChange={(e) => handleInputChange("BOTTOM", e)}
            rows={5}
          />

          <MediaSelector
            mediaType={bottomData.mediaType}
            onMediaTypeChange={(e) => handleMediaTypeChange("BOTTOM", e)}
            mediaUrl={bottomData.mediaUrl}
            onFileChange={(e) => handleFileChange("BOTTOM", e)}
          />
        </section>
      </div>

      {/* YouTube Video ID Bölümü */}
      <section className="w-full mx-auto p-6 dark:text-white border border-gray-300 dark:border-gray-800 rounded-lg">
        <h2 className="text-xl font-semibold mb-10 border-b border-gray-300 dark:text-white text-gray-500 pb-2">
          Üst ve Alt Bölüm Arasındaki YouTube Video ID
        </h2>
        <Input
          type="text"
          value={youtubeVideoId}
          onChange={handleYoutubeChange}
          placeholder="YouTube video ID girin (ör: zE8r0U2kFYA)"
        />
        {youtubeVideoId && (
          <div className="mt-4 aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-150 rounded-lg shadow-lg"
            />
          </div>
        )}
      </section>

      {/* Kaydet Butonu */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-800 cursor-pointer text-white font-semibold py-3 px-8 rounded-lg shadow-md transition disabled:opacity-60"
        >
          {loading ? "Kaydediliyor..." : "Kaydet"}
        </button>
      </div>

      {/* Mesaj */}
      {message.text && (
        <p
          className={`mt-6 text-center font-semibold ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </form>
  );
};

const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
}) => (
  <label className="block mb-3">
    <span className="font-semibold dark:text-white">{label}</span>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="mt-1 w-full border border-gray-300 dark:border-gray-700 dark:text-white dark:bg-gray-800 text-black rounded-md px-3 py-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </label>
);

const Textarea = ({ label, name, value, onChange, rows }) => (
  <label className="block mb-3">
    <span className="font-semibold dark:text-white">{label}</span>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={rows}
      className="mt-1 w-full border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-md px-3 py-2 resize-y bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-red-500"
    />
  </label>
);

const MediaSelector = ({
  mediaType,
  onMediaTypeChange,
  mediaUrl,
  onFileChange,
}) => {
  const inputRef = React.useRef(null);

  return (
    <>
      <label className="block font-semibold mt-6 mb-2 dark:text-white">
        Medya Tipi
      </label>
      <select
        value={mediaType}
        onChange={onMediaTypeChange}
        className="select select-bordered w-full max-w-xs border dark:border-gray-700 dark:bg-gray-800 dark:text-white px-2 py-2 rounded-xl border-red-500 text-black bg-gray-50"
      >
        <option value="IMAGE">Resim</option>
        <option value="VIDEO">Video</option>
      </select>

      {mediaType === "IMAGE" ? (
        <>
          <label className="block font-semibold mt-4 mb-2 dark:text-white">
            Resim Seç
          </label>
          <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={onFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current && inputRef.current.click()}
            className="btn btn-primary px-4 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:bg-[#c62121]"
          >
            Dosya Seç
          </button>
          {mediaUrl && (
            <img
              src={mediaUrl}
              alt="Medya Önizleme"
              className="mt-3 max-h-48 rounded-md shadow-md object-contain"
            />
          )}
        </>
      ) : (
        <>
          <label className="block font-semibold mt-4 mb-2 dark:text-white">
            Video Seç
          </label>
          <input
            type="file"
            accept="video/*"
            ref={inputRef}
            onChange={onFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current && inputRef.current.click()}
            className="btn btn-primary px-4 py-2 rounded-md bg-red-500 text-white cursor-pointer hover:bg-[#c62121]"
          >
            Dosya Seç
          </button>
          {mediaUrl && (
            <video
              src={mediaUrl}
              controls
              className="mt-3 max-h-48 rounded-md shadow-md"
            />
          )}
        </>
      )}
    </>
  );
};

export default AboutSectionSettings;
