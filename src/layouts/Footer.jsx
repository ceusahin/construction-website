function Footer() {
  return (
    <footer className="bg-blue-500 px-4 py-12 text-white flex flex-col md:flex-row md:justify-around justify-between items-start gap-10">
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold pb-2 text-[20px]">Biz Kimiz?</h1>
        <a href="" className="hover:text-gray-200">
          Hakkımızda
        </a>
        <a href="">Faaliyet Alanlarımız</a>
        <a href="">Değerlerimiz</a>
        <a href="">Hikayemiz</a>
        <a href="">Yönetim Kurulu</a>
        <a href="">Kariyer</a>
        <a href="">Bize Ulaşın</a>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold pb-2 text-[20px]">Sayfalar</h1>
        <a href="" className="hover:text-gray-200">
          Anasayfa
        </a>
        <a href="">Hakkımızda</a>
        <a href="">Çalışma Alanlarımız</a>
        <a href="">Projelerimiz</a>
        <a href="">İletişim Formu</a>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-extrabold pb-2 text-[20px]">Sosyal Medya</h1>
        <a href="" className="hover:text-gray-200">
          Facebook
        </a>
        <a href="">Instagram</a>
        <a href="">Twitter</a>
        <a href="">Linkedin</a>
        <a href="">Kariyer.net</a>
      </div>
    </footer>
  );
}

export default Footer;
