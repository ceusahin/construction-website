import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectCardProjectsPage = ({
  id,
  imageUrl,
  location,
  title,
  constructionType,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projelerimiz/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="w-full md:w-1/2 xl:w-1/3 p-4 cursor-pointer"
    >
      <div className="bg-white shadow hover:shadow-lg transition rounded overflow-hidden h-full flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <p className="text-xs text-gray-400 uppercase mb-1">{location}</p>
            <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          </div>
          <p className="text-sm text-gray-600 mt-4">{constructionType}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCardProjectsPage;
