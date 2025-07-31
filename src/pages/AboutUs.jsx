import AboutUsAboutPage from "../components/site/AboutUsAboutPage";
import OurHistory from "../components/site/OurHistory";
import References from "../components/site/ReferencesAboutPage";
import YouTubeEmbed from "../components/site/YoutubeEmbed";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import ContactForm from "../components/site/ContactForm";
import ContactUs from "../components/site/ContactUs";
import CompanyInfo from "../components/site/CompanyInfo";
import PageContent from "../layouts/PageContent";

function AboutUs() {
  return (
    <PageContent>
      <Header />
      <img className="" src="/images/main-slider-2.png" alt="" />
      <AboutUsAboutPage />
      <YouTubeEmbed videoId="zE8r0U2kFYA" />
      <OurHistory />
      <References />
      <ContactForm />
      <CompanyInfo />
      <ContactUs />
      <Footer />
    </PageContent>
  );
}

export default AboutUs;
