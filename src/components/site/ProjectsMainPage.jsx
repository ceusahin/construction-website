import ProjectsMainPageCard from "./ProjectsMainPageCard";

function ProjectsMainPage() {
  return (
    <div className="px-4 mt-14 2xl:px-60 flex flex-col items-center justify-center text-center">
      <h1 className="text-[20px] font-medium text-[#747474] 2xl:text-[35px]">
        Projelerimiz
      </h1>
      <div>
        <h1 className="text-[30px] font-bold mt-2 2xl:text-[35px]">
          Mükemmelliğe Adanmış İnşaat Projeleri
        </h1>
        <p className="text-[16px] text-[#747474] mt-2 2xl:text-[25px]">
          15 yılı aşkın süredir, hayalleri gerçeğe dönüştüren üst düzey inşaat
          hizmetleri sunuyoruz. Yenilik, hassasiyet ve sürdürülebilirliğe olan
          bağlılığımızla, dünya genelinde 300'den fazla projeyi başarıyla
          tamamladık.
        </p>
      </div>
      <ProjectsMainPageCard />
    </div>
  );
}

export default ProjectsMainPage;
