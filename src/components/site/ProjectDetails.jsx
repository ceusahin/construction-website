import React from "react";
import { useParams } from "react-router-dom";

import projects from "../../data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <div>Proje bulunamadı.</div>;

  return (
    <div>
      <div className="container flex flex-row justify-between gap-12 text-left mx-auto 2xl:pt-40">
        <div className="w-4/7">
          <img
            src={project.imageUrl}
            alt=""
            className="object-contain rounded-2xl"
          />
        </div>
        <div className="w-3/7 p-4 flex flex-col justify-center gap-4">
          <h2 className="italic text-gray-600 font-light text-[22px] mb-10">
            Tamamlanma Oranı: 90%
          </h2>
          <h1 className="text-5xl font-bold mb-4">{project.title}</h1>
          <p className="text-2xl text-gray-800">{project.description}</p>
        </div>
      </div>
      <div className="container mx-auto py-18">
        <h3 className="text-3xl font-extrabold border-b-2 inline-block border-[#101270] pb-2 mb-6">
          Proje Detayları
        </h3>
        <div className="w-full mt-4 border-gray-400 flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
          <div>
            <p className="text-2xl">
              <strong className=" text-gray-700 border-b-2 border-gray-400">
                Konum
              </strong>
              <p className="mt-6 italic text-3xl">{project.location}</p>
            </p>
          </div>
          <div>
            <p className="text-2xl">
              <strong className=" text-gray-700 border-b-2 border-gray-400">
                İnşaat Türü
              </strong>
              <p className="mt-6 italic text-3xl">{project.constructionType}</p>
            </p>
          </div>
          <div>
            <p className="text-2xl">
              <strong className=" text-gray-700 border-b-2 border-gray-400">
                Başlangıç Tarihi
              </strong>
              <p className="mt-6 italic text-3xl">08.04.2025</p>
            </p>
          </div>
          <div>
            <p className="text-2xl">
              <strong className=" text-gray-700 border-b-2 border-gray-400">
                Bitiş Tarihi
              </strong>
              <p className="mt-6 italic text-3xl">06.06.2026</p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
