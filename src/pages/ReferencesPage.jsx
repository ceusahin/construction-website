import CompanyInfo from "../components/site/CompanyInfo";
import ContactForm from "../components/site/ContactForm";
import FadeContent from "../components/site/FadeContent";
import References from "../components/site/ReferencesAboutPage";
import ReferencesPageMain from "../components/site/ReferencesPageMain";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";

function ReferencesPage() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-1.png"
        alt=""
      />
      <ReferencesPageMain />
      <FadeContent
        blur={false}
        duration={1000}
        easing="ease-out"
        initialOpacity={0}
      >
        <div className="flex flex-col mt-10 pb-10 px-20 lg:flex-row justify-between items-center bg-blue-300">
          <div className="w-full lg:w-1/2">
            <ContactForm />
          </div>
          <div className="w-full lg:w-1/2">
            <CompanyInfo />
          </div>
        </div>
      </FadeContent>
      <Footer />
    </PageContent>
  );
}

export default ReferencesPage;
