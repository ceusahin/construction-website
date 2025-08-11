import AboutUsAboutPage from "../components/site/AboutUsAboutPage";
import OurHistory from "../components/site/OurHistory";
import YouTubeEmbed from "../components/site/YoutubeEmbed";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";
import BottomContact from "../components/site/BottomContact";

function AboutUs() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-2.webp"
        alt=""
      />
      <AboutUsAboutPage />
      <YouTubeEmbed videoId="zE8r0U2kFYA" />
      <OurHistory />
      <BottomContact />
      <Footer />
    </PageContent>
  );
}

export default AboutUs;
