import CompanyInfo from "../components/site/CompanyInfo";
import ContactForm from "../components/site/ContactForm";
import FadeContent from "../components/site/FadeContent";
import References from "../components/site/ReferencesAboutPage";
import ServicePageMain from "../components/site/ServicePageMain";
import BottomContact from "../components/site/BottomContact";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";

function ServicePage() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-1.webp"
        alt=""
      />
      <ServicePageMain />
      <BottomContact />
      <Footer />
    </PageContent>
  );
}

export default ServicePage;
