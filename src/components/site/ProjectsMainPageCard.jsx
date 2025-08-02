import React, { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance"; // axios instance'ını import et

function ProjectsMainPageCard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/projects/") // backend'deki projeler endpoint'i
      .then((res) => {
        console.log("Projeler başarıyla alındı:", res.data);
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Projeler alınırken hata oluştu:", err);
        setError("Projeler alınamadı.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
        {projects.map((project) => (
          <a
            key={project.id}
            href="/contact"
            className="group relative block h-[450px] rounded-3xl overflow-hidden shadow-lg"
          >
            {/* Arkaplan görseli */}
            <img
              alt={project.constructionType}
              src={project.imageUrl}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-300 group-hover:blur-[4px] group-hover:opacity-50"
            />

            {/* Karanlık overlay */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 z-10" />

            {/* İçerik */}
            <div className="relative h-full px-6 pb-6 flex flex-col justify-end z-10 overflow-hidden">
              {/* Proje başlığı */}
              <div
                className="absolute xl:w-[500px] text-center z-20 transition-all duration-500
                  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  group-hover:top-20 group-hover:left-95 group-hover:transform-none"
              >
                <p className="text-2xl font-bold tracking-widest text-blue-300 group-hover:text-blue-700 uppercase drop-shadow-md transition-colors">
                  Proje
                </p>
                <h3 className="text-3xl font-bold text-white group-hover:text-black drop-shadow-lg transition-colors">
                  {project.constructionType}
                </h3>
              </div>

              {/* Açıklama ve Buton */}
              <div className="mt-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 z-10">
                <p className="text-xl text-black font-bold mb-6 line-clamp-4 drop-shadow-md">
                  {project.description}
                </p>
                <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors shadow-lg">
                  Detaylar
                </button>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default ProjectsMainPageCard;
