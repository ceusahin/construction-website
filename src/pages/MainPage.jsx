import AboutUsMainPage from "../components/site/AboutUsMainPage";
import ContactUs from "../components/site/ContactUs";
import Experience from "../components/site/Experience";
import OurServices from "../components/site/OurServices";
import ProjectsMainPage from "../components/site/ProjectsMainPage";
import SliderComponent from "../components/site/SliderComponent";
import ContactForm from "../components/site/ContactForm";
import CompanyInfo from "../components/site/CompanyInfo";
import PageContent from "../layouts/PageContent";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

function MainPage() {
  return (
    <PageContent>
      <Header />
      <div className="relative z-0">
        <SliderComponent />
        <div className="-mt-34 sm:-mt-24 md:-mt-20">
          <Experience />
        </div>
      </div>
      <AboutUsMainPage />
      <OurServices />
      <ProjectsMainPage />
      <ContactForm />
      <CompanyInfo />
      <ContactUs />
      <Footer />
    </PageContent>
  );
}

export default MainPage;
