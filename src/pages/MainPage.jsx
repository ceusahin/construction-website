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
      <SliderComponent />
      <Experience />
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
