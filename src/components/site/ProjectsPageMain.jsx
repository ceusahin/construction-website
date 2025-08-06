import { useState } from "react";
import ProjectCardProjectsPage from "./ProjectCardProjectsPage";
import projects from "../../data/projects";

const ProjectsPageMain = () => {
  const [selectedType, setSelectedType] = useState("Tümü");

  const constructionTypes = [
    "Tümü",
    ...new Set(projects.map((p) => p.constructionType)),
  ];

  const filteredProjects =
    selectedType === "Tümü"
      ? projects
      : projects.filter((p) => p.constructionType === selectedType);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Projelerimiz</h2>

      {/* Filtre */}
      <div className="mb-6">
        <label className="mr-2 font-medium text-gray-700">
          Hizmete Göre Filtrele:
        </label>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border px-2 py-2"
        >
          {constructionTypes.map((type, i) => (
            <option key={i} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Proje Kartları */}
      <div className="flex flex-wrap -mx-4">
        {filteredProjects.map((project) => (
          <ProjectCardProjectsPage key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectsPageMain;
