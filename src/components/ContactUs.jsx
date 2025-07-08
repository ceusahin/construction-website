import { Instagram, Facebook, Twitter } from "lucide-react";

function ContactUs() {
  return (
    <div className="bg-blue-100 text-center pt-4 pb-18 px-4">
      <h1 className="text-[24px] font-medium text-[#747474] mb-10">
        Sosyal Medya
      </h1>
      <nav className="flex justify-center items-center gap-14 mt-4 text-4xl text-blue-400">
        <Instagram size={50} />
        <Facebook size={50} />
        <Twitter size={50} />
      </nav>
    </div>
  );
}

export default ContactUs;
