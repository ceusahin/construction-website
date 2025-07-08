import { projects } from "../data/projects.js";

function ProjectsMainPageCard() {
  return (
    <div className="mt-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex relative flex-col gap-4 2xl:gap-0 items-center border-2 border-blue-300 my-6 text-center rounded-tr-4xl rounded-bl-4xl lg:h-[550px] 2xl:h-[700px] lg:justify-between lg:overflow-hidden"
          >
            <img
              src={project.img}
              className="w-full rounded-tr-4xl rounded-bl-4xl object-cover pb-4 lg:h-[250px] lg:pb-0 2xl:h-[400px]"
            />
            <h2 className="text-2xl font-bold px-4 lg:px-6 2xl:text-[35px]">
              {project.name}
            </h2>
            <p className="mb-4 px-4 text-[#747474] lg:px-6 2xl:text-[25px]">
              {project.description}
            </p>
            <button className="mb-8 2xl:mb-8">
              <a
                href="/contact"
                className="bg-blue-500 text-white px-6 py-3 2xl:px-16 2xl:py-4 rounded-md hover:bg-blue-600 transition-colors"
              >
                Detaylar
              </a>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsMainPageCard;
