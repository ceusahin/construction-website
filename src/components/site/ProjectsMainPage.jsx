import ProjectsMainPageCard from "./ProjectsMainPageCard";
import MoreButton from "./MoreButton";

function ProjectsMainPage() {
  const moreButtonText = "Tüm Projelerimiz";

  return (
    <div>
      <div className="px-4 mt-14 2xl:px-44 flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-10">
          <div className="w-full md:w-auto">
            <h1 className="text-lg md:text-3xl text-gray-500 font-medium">
              Projelerimiz
            </h1>
            <h2 className="text-2xl md:text-6xl font-bold mt-2">
              Mükemmelliğe Adanmış
              <br />
              İnşaat Projeleri
            </h2>
          </div>
          <div className="flex flex-col items-start md:items-end gap-4 md:gap-10 md:w-auto md:pt-20 ">
            <p className="text-xs md:text-base text-[#747474] max-w-md">
              Take a look at some of the outstanding work we’ve completed for
              our clients.
            </p>
            <MoreButton text={moreButtonText} />
          </div>
        </div>

        <ProjectsMainPageCard />
      </div>
    </div>
  );
}

export default ProjectsMainPage;
