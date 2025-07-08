import AboutUsMainPage from "../components/AboutUsMainPage";
import ContactUs from "../components/ContactUs";
import Experience from "../components/Experience";
import OurServices from "../components/OurServices";
import ProjectsMainPage from "../components/ProjectsMainPage";
import SliderComponent from "../components/SliderComponent";
import ContactForm from "../components/ContactForm";
import CompanyInfo from "../components/CompanyInfo";
import PageContent from "../layouts/PageContent";

function MainPage() {
  return (
    <PageContent>
      <SliderComponent />
      <Experience />
      <AboutUsMainPage />
      <OurServices />
      <ProjectsMainPage />
      <ContactForm />
      <CompanyInfo />
      <ContactUs />
    </PageContent>
  );
}

export default MainPage;
