import CompanyInfo from "../components/site/CompanyInfo";
import ContactForm from "../components/site/ContactForm";
import FadeContent from "../components/site/FadeContent";
import ProjectsPageMain from "../components/site/ProjectsPageMain";
import References from "../components/site/ReferencesAboutPage";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";
import BottomContact from "../components/site/BottomContact";

function ProjectsPage() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-1.webp"
        alt=""
      />
      <ProjectsPageMain />
      <BottomContact />
      <Footer />
    </PageContent>
  );
}

export default ProjectsPage;
