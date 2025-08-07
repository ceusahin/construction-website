import { Phone, Clock, Mail, MapPin } from "lucide-react";
import ContactPageContactForm from "./ContactPageContactForm";
import FadeContent from "./FadeContent";

function ContactPageCompanyInfo() {
  return (
    <FadeContent
      blur={false}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div className="text-[#343434] xl:mx-36 pt-8 px-4">
        <div className="flex justify-center my-4 items-center">
          <h2 className="text-5xl font-bold mb-2 pb-2 pt-4 border-b-2 border-black">
            İLETİŞİM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <div className="w-full">
            <ContactPageContactForm />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col text-center items-center gap-4 justify-center">
              <Phone size={60} />
              <div>
                <h1 className="text-[32px] font-extrabold">Bizi Arayın</h1>
                <p className="text-[24px]">+90 123 456 7890</p>
              </div>
            </div>
            <div className="flex flex-col text-center items-center gap-4 justify-center">
              <Clock size={60} />
              <div>
                <h1 className="text-[32px] font-extrabold">Çalışma Saatleri</h1>
                <p className="text-[24px]">Pzt-Cmt: 09:00 - 17:00</p>
              </div>
            </div>
            <div className="flex flex-col text-center items-center gap-4 justify-center">
              <Mail size={60} />
              <div>
                <h1 className="text-[32px] font-extrabold">Destek Hattı</h1>
                <p className="text-[24px]">support@elever.com</p>
              </div>
            </div>
            <div className="flex flex-col text-center items-center gap-4 justify-center">
              <MapPin size={60} />
              <div>
                <h1 className="text-[32px] font-extrabold">Adresimiz</h1>
                <p className="text-[24px]">456 Elm Avenue, San Francisco</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-[-160px]">
          <iframe
            className="mt-10 w-full h-[450px]"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1402.9922504508504!2d26.67062073556533!3d40.420261727427246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b16fd8f1be96fd%3A0x7b8b7b5dacfa097d!2sAcaro%C4%9Flu%20Et%20Kasap%26Steakhouse!5e1!3m2!1sen!2str!4v1754519280690!5m2!1sen!2str"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </FadeContent>
  );
}

export default ContactPageCompanyInfo;
