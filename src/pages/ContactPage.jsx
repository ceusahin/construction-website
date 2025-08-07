import ContactPageCompanyInfo from "../components/site/ContactPageCompanyInfo";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import PageContent from "../layouts/PageContent";

function ContactPage() {
  return (
    <PageContent>
      <Header />
      <img
        className="mt-22 h-[30rem] w-full object-cover"
        src="/images/main-slider-1.webp"
        alt=""
      />
      <ContactPageCompanyInfo />
      <Footer />
    </PageContent>
  );
}

export default ContactPage;
