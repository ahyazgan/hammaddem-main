import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.svg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setDropdownOpen((prev) => !prev);
    } else if (e.key === "Escape") {
      setDropdownOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] h-[70px] flex items-center justify-between px-4 md:px-10 bg-background/[.93] backdrop-blur-[20px] border-b border-border" role="navigation" aria-label="Ana navigasyon">
      {/* Logo */}
      <Link to="/" className="flex items-center no-underline">
        <img src={logo} alt="Hammaddem" className="h-[80px] md:h-[80px] w-auto" />
      </Link>

      {/* Spacer */}
      <div className="hidden md:flex flex-1" />

      {/* Desktop Right */}
      <div className="hidden md:flex items-center gap-4">
        {/* Hizmetler dropdown */}
        <div
          className="relative group"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <button
            className="flex items-center gap-1 text-[13px] font-semibold text-foreground bg-transparent border-none cursor-pointer py-2"
            aria-expanded={dropdownOpen}
            aria-haspopup="true"
            onKeyDown={handleDropdownKeyDown}
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Hizmetlerimiz <ChevronDown className={`w-3.5 h-3.5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`absolute top-full right-0 mt-1 w-52 bg-background border border-border rounded-xl shadow-elevated transition-all duration-200 py-1.5 ${dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
            role="menu"
          >
            <Link to="/hafriyat" role="menuitem" className="block px-4 py-2.5 text-[13px] text-foreground no-underline hover:bg-off transition-colors">
              Hafriyat İşleri
            </Link>
            <Link to="/hizmetler/silobas" role="menuitem" className="block px-4 py-2.5 text-[13px] text-foreground no-underline hover:bg-off transition-colors">
              Silobas Taşımacılığı
            </Link>
            <Link to="/hizmetler/hafriyat-nakliyesi" role="menuitem" className="block px-4 py-2.5 text-[13px] text-foreground no-underline hover:bg-off transition-colors">
              Hafriyat Malzemeleri
            </Link>
          </div>
        </div>

        <Link to="/hafriyat" className="text-[13px] font-semibold text-foreground no-underline hover:text-primary transition-colors">
          Hafriyat
        </Link>
        <Link to="/tasiyici-olun" className="text-[13px] font-semibold text-foreground no-underline hover:text-primary transition-colors">
          Taşıyıcı Olun
        </Link>
        <Link to="/talep-takip" className="text-[13px] font-semibold text-foreground no-underline hover:text-primary transition-colors">
          Talep Takip
        </Link>
        <Link to="/iletisim" className="text-[13px] font-semibold text-foreground no-underline hover:text-primary transition-colors">
          İletişim
        </Link>
        <Link
          to="/giris"
          className="px-[18px] py-2 rounded-lg text-[13px] font-semibold text-foreground bg-transparent border-[1.5px] border-border2 no-underline transition-all hover:border-primary hover:text-primary">
          Giriş Yap
        </Link>
        <Link
          to="/teklif-al"
          className="px-5 py-2 rounded-lg text-[13px] font-semibold text-primary-foreground bg-primary border-none no-underline transition-all shadow-[0_2px_8px_rgba(232,98,10,.28)] hover:bg-accent-hover hover:-translate-y-px">
          Üyeliksiz Teklif Al ↗
        </Link>
      </div>

      {/* Mobile toggle */}
      <button onClick={() => setOpen(!open)} aria-label={open ? "Menuyu kapat" : "Menuyu ac"} aria-expanded={open} className="md:hidden text-foreground bg-transparent border-none cursor-pointer">
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-[70px] left-0 right-0 bg-background border-b border-border px-6 pb-5 animate-fade-down">
          <div className="flex flex-col gap-1 pt-3">
            <p className="text-[11px] font-semibold tracking-wider uppercase text-txt-2 mt-2 mb-1 px-1">Hizmetlerimiz</p>
            <Link to="/hafriyat" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              Hafriyat İşleri
            </Link>
            <Link to="/hizmetler/silobas" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              Silobas Taşımacılığı
            </Link>
            <Link to="/hizmetler/hafriyat-nakliyesi" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              Hafriyat Malzemeleri
            </Link>

            <div className="border-t border-border my-2" />

            <Link to="/tasiyici-olun" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              Taşıyıcı Olun
            </Link>
            <Link to="/talep-takip" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              Talep Takip
            </Link>
            <Link to="/iletisim" onClick={() => setOpen(false)} className="text-[14px] text-foreground py-2 px-3 rounded-lg no-underline hover:bg-off transition-colors">
              İletişim
            </Link>

            <div className="border-t border-border my-2" />

            <div className="flex items-center gap-4">
              <Link to="/giris" onClick={() => setOpen(false)} className="text-[13px] text-txt-2 py-2 px-1 no-underline">
                Giriş Yap
              </Link>
              <Link to="/kayit" onClick={() => setOpen(false)} className="text-[13px] text-txt-2 py-2 px-1 no-underline">
                Hesap Oluştur
              </Link>
            </div>
            <Link to="/teklif-al" onClick={() => setOpen(false)} className="bg-primary text-primary-foreground px-5 py-2.5 rounded-lg text-[13px] font-semibold text-center no-underline mt-1">
              Üyeliksiz Teklif Al ↗
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
