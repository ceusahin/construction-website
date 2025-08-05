import React, { useEffect, useState } from "react";
import AboutSectionForm from "./AboutSectionForm";
import axios from "axios";

export default function AboutSectionSettings() {
  const [language, setLanguage] = useState("tr");
  const [videoId, setVideoId] = useState("");
  const [message, setMessage] = useState("");

  const VIDEO_API_URL = `http://localhost:8080/api/construction/about/video`;

  useEffect(() => {
    fetchVideoId();
  }, []);

  const fetchVideoId = async () => {
    try {
      const res = await axios.get(VIDEO_API_URL);
      //   console.log("Video ID fetched:", res.data.videoId);
      setVideoId(res.data.videoId || "");
    } catch (err) {
      console.warn("Video ID alınamadı", err);
    }
  };

  const handleVideoChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(VIDEO_API_URL, { youtubeVideoId: videoId });
      //   console.log("Video ID updated:", videoId);
      setMessage("Video ID güncellendi");
    } catch (err) {
      console.error(err);
      setMessage("Video ID güncellenemedi");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <label className="font-semibold">Dil Seç:</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="select select-bordered border px-2 py-1"
        >
          <option value="tr">Türkçe</option>
          <option value="en">İngilizce</option>
        </select>
      </div>

      <form
        onSubmit={handleVideoSubmit}
        className="flex flex-row items-center gap-4"
      >
        <label className="font-semibold border-b">
          YouTube Video ID ( youtube.com/watch?v=
          <span className="text-red-500">zE8r0U2kFYA</span> ) :
        </label>
        <input
          type="text"
          value={videoId}
          onChange={handleVideoChange}
          placeholder="örnek: zE8r0U2kFYA"
          className="input input-bordered border px-2 py-1 w-full max-w-xs"
        />
        <button
          type="submit"
          className="btn btn-primary w-fit border px-3 py-2 rounded-l"
        >
          Video ID'yi Kaydet
        </button>
        {message && <p>{message}</p>}
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-4 border rounded shadow">
          <AboutSectionForm language={language} section="top" />
        </div>
        <div className="p-4 border rounded shadow">
          <AboutSectionForm language={language} section="bottom" />
        </div>
      </div>
    </div>
  );
}
