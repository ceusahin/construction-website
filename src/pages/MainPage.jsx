import AboutUsMainPage from "../components/AboutUsMainPage";
import ContactUs from "../components/ContactUs";
import Experience from "../components/Experience";
import OurServices from "../components/OurServices";
import SliderComponent from "../components/SliderComponent";

function MainPage() {
  return (
    <div>
      <SliderComponent />
      <Experience />
      <AboutUsMainPage />
      <OurServices />
      <ContactUs />
    </div>
  );
}

export default MainPage;
