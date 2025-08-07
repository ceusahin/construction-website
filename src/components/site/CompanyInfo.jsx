import { Phone, Clock, Mail, MapPin } from "lucide-react";

function CompanyInfo() {
  return (
    <div className="text-[#343434] w-full mx-auto rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center">
          <Phone size={50} className="mb-4" />
          <h1 className="text-[20px] font-extrabold text-[#343434] mb-2">
            Bizi Arayın
          </h1>
          <p className="text-[18px]">+90 123 456 7890</p>
          <p className="text-[18px]">+90 123 456 7890</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Clock size={50} className="mb-4" />
          <h1 className="text-[20px] font-extrabold text-[#343434] mb-2">
            Çalışma Saatleri
          </h1>
          <p className="text-[18px]">Pzt-Cmt: 09:00 - 17:00</p>
          <p className="text-[18px]">Pzt-Cmt: 09:00 - 17:00</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Mail size={50} className="mb-4" />
          <h1 className="text-[20px] font-extrabold text-[#343434] mb-2">
            Destek Hattı
          </h1>
          <p className="text-[18px]">support@elever.com</p>
          <p className="text-[18px]">help-elver@gmail.com</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <MapPin size={50} className="mb-4" />
          <h1 className="text-[20px] font-extrabold text-[#343434] mb-2">
            Adresimiz
          </h1>
          <p className="text-[18px]">456 Elm Avenue, Floor 2,</p>
          <p className="text-[18px]">San Francisco, CA 94103</p>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
