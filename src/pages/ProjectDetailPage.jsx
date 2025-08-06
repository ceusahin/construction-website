import CompanyInfo from "../components/site/CompanyInfo";
import ContactForm from "../components/site/ContactForm";
import ProjectDetails from "../components/site/ProjectDetails";
import References from "../components/site/ReferencesAboutPage";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";

function ProjectDetailPage() {
  return (
    <PageContent>
      <Header />

      <ProjectDetails />
      <div className="flex flex-col mt-10 pb-10 px-20 lg:flex-row justify-between items-center bg-blue-300">
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
        <div className="w-full lg:w-1/2">
          <CompanyInfo />
        </div>
      </div>
      <Footer />
    </PageContent>
  );
}

export default ProjectDetailPage;
