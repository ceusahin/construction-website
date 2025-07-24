import React, { useState } from "react";
import axios from "axios";

const UploadImageForm = ({ onUploadSuccess }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file || !title) {
      setError("Başlık ve görsel seçilmeli.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/construction/gallery",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadedUrl(response.data.imageUrl);
      setError("");
      if (onUploadSuccess) {
        onUploadSuccess(response.data.imageUrl);
      }
    } catch (err) {
      console.error(err);
      setError("Yükleme başarısız: " + err.message);
    }
  };

  return (
    <div className="p-5">
      <h2>Resim Yükle</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-50"
        />
        <br />
        <br />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded w-80"
        />
        <br />
        <br />
        <button type="submit" className="border p-2 rounded w-50">
          Yükle
        </button>
      </form>

      {uploadedUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Yüklenen Görsel:</p>
          <img src={uploadedUrl} alt="Yüklenen" style={{ maxWidth: "400px" }} />
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default UploadImageForm;
