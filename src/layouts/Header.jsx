import { Menu } from "lucide-react";

function Header() {
  return (
    <header>
      <div className="header-mobile sm:hidden flex justify-between items-center px-12 py-5">
        <div className="cursor-pointer">SİTE BAŞLIĞI</div>
        <div>
          <Menu className="cursor-pointer" />
        </div>
      </div>
      <div className="header-desktop hidden sm:flex sm:justify-between sm:items-center sm:px-20 sm:py-8">
        <nav>3 tane menü icon</nav>
        <div>SİTE BAŞLIĞI</div>
        <nav>3 tane menü icon</nav>
      </div>
    </header>
  );
}

export default Header;
