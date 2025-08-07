import CompanyInfo from "./CompanyInfo";
import ContactForm from "./ContactForm";
import FadeContent from "./FadeContent";

function BottomContact() {
  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="flex flex-col mt-22 mx-40 pb-10 lg:flex-row justify-between items-center border-t-1">
        <div className="w-full lg:w-1/2">
          <ContactForm />
        </div>
        <div className="w-full lg:w-1/2">
          <CompanyInfo />
        </div>
      </div>
    </FadeContent>
  );
}

export default BottomContact;
