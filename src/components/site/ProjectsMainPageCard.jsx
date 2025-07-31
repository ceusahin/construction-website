import { projects } from "../../data/projects.js";

function ProjectsMainPageCard() {
  return (
    <div className="mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <a
            key={project.id}
            href="/contact"
            className="group relative block h-[450px] rounded-3xl overflow-hidden shadow-lg"
          >
            {/* Arkaplan görseli */}
            <img
              alt={project.name}
              src={project.img}
              className="absolute inset-0 h-full w-full object-cover opacity-100 transition-opacity duration-300 group-hover:opacity-50"
            />

            {/* Overlay kaldırıldı veya tamamen şeffaf */}
            <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-0 transition-opacity duration-300 z-10" />

            {/* İçerik */}
            <div className="relative h-full p-6 flex flex-col justify-between z-20">
              <div>
                <p className="text-2xl font-bold tracking-widest text-blue-300 group-hover:text-blue-700 uppercase drop-shadow-md opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  Proje
                </p>
                <h3 className="text-3xl font-bold text-white group-hover:text-black drop-shadow-lg opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                  {project.name}
                </h3>
              </div>

              <div className="mt-4 opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <p className="text-sm text-black font-bold mb-6 line-clamp-4 drop-shadow-md">
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
