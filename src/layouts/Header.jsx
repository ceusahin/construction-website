import axios from "axios";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

function Header() {
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/construction/logo")
      .then((res) => setLogo(res.data))
      .catch(() => setLogo(null));
  }, []);

  return (
    <header className="flex items-center justify-around p-6">
      <div className="flex items-center">
        {logo && (
          <img
            src={logo.imageUrl}
            alt="Site Logo"
            className="w-16 h-16 object-cover rounded-full"
          />
        )}
        <h1 className="text-xl font-bold ml-4">Construction Company</h1>
      </div>
      <ul className="flex space-x-6 gap-4 text-gray-700 text-xl">
        <li className="cursor-pointer hover:text-gray-950">Ana Sayfa</li>
        <li className="cursor-pointer hover:text-gray-950">Hakkımızda</li>
        <li className="cursor-pointer hover:text-gray-950">Hizmetlerimiz</li>
        <li className="cursor-pointer hover:text-gray-950">Projelerimiz</li>
        <li className="cursor-pointer hover:text-gray-950">Blog</li>
        <li className="cursor-pointer hover:text-gray-950">Referanslar</li>
        <li className="cursor-pointer hover:text-gray-950">İletişim</li>
      </ul>
    </header>
  );
}

export default Header;
