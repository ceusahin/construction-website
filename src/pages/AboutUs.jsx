import AboutUsAboutPage from "../components/site/AboutUsAboutPage";
import OurHistory from "../components/site/OurHistory";
import References from "../components/site/ReferencesAboutPage";
import YouTubeEmbed from "../components/site/YoutubeEmbed";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import ContactForm from "../components/site/ContactForm";
import CompanyInfo from "../components/site/CompanyInfo";
import PageContent from "../layouts/PageContent";

function AboutUs() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-2.png"
        alt=""
      />
      <AboutUsAboutPage />
      <YouTubeEmbed videoId="zE8r0U2kFYA" />
      <OurHistory />
      <References />
      <div className="flex flex-col mt-10 pb-10 lg:flex-row justify-between items-center bg-blue-300">
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

export default AboutUs;
