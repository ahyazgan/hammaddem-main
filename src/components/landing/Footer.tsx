import { Link } from "react-router-dom";
import { Instagram, Linkedin, Twitter } from "lucide-react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer id="footer" className="border-t border-border pt-16">
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr] gap-8 md:gap-10 pb-12">
        {/* Brand */}
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center mb-3.5 no-underline">
            <img src={logo} alt="Hammaddem" className="h-[50px] w-auto" />
          </Link>
          <p className="text-[13px] text-txt-2 leading-[1.75] mb-5">
            Türkiye genelinde hammadde tedarik ve lojistik çözümleri sunan dijital platform.
          </p>
          <div className="flex flex-col gap-2">
            <a href="tel:+905393308617" className="flex items-center gap-2 text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">
              📞 +90 (539) 330 8617
            </a>
            <a href="mailto:info@hammaddem.com" className="flex items-center gap-2 text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">
              ✉️ info@hammaddem.com
            </a>
            <span className="flex items-center gap-2 text-[13px] text-txt-2">
              📍 İstanbul, Türkiye
            </span>
          </div>
          <div className="flex items-center gap-3 mt-4">
            <a href="https://instagram.com/hammaddem" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted/60 border border-border flex items-center justify-center text-txt-3 hover:text-primary hover:border-primary transition-colors">
              <Instagram size={15} />
            </a>
            <a href="https://linkedin.com/company/hammaddem" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted/60 border border-border flex items-center justify-center text-txt-3 hover:text-primary hover:border-primary transition-colors">
              <Linkedin size={15} />
            </a>
            <a href="https://x.com/hammaddem" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-muted/60 border border-border flex items-center justify-center text-txt-3 hover:text-primary hover:border-primary transition-colors">
              <Twitter size={15} />
            </a>
          </div>
        </div>

        {/* Hizmetlerimiz */}
        <div>
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-txt-3 mb-4">Hizmetlerimiz</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link to="/hizmetler/silobas" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Silobas Yükü</Link></li>
            <li><Link to="/hizmetler/hafriyat-nakliyesi" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Hafriyat &amp; İnşaat</Link></li>
          </ul>
        </div>

        {/* Malzemeler */}
        <div>
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-txt-3 mb-4">Malzemeler</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link to="/malzeme/cimento" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Çimento</Link></li>
            <li><Link to="/malzeme/kum" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Kum</Link></li>
            <li><Link to="/malzeme/cakil" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Çakıl</Link></li>
            <li><Link to="/malzeme/micir" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Mıcır</Link></li>
            <li><Link to="/malzeme/kalsit" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Kalsit</Link></li>
            <li><Link to="/malzeme/kirec" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Kireç</Link></li>
            <li><Link to="/malzeme/stabilize" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Stabilize</Link></li>
            <li><Link to="/malzeme/mermer-tozu" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Mermer Tozu</Link></li>
            <li><Link to="/malzeme/alci" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Alçı</Link></li>
            <li><Link to="/malzeme/ucucu-kul" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Uçucu Kül</Link></li>
          </ul>
        </div>

        {/* Hizmet Bölgeleri */}
        <div>
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-txt-3 mb-4">Hizmet Bölgeleri</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link to="/hizmet-bolgeleri/istanbul" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">İstanbul</Link></li>
            <li><Link to="/hizmet-bolgeleri/ankara" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Ankara</Link></li>
            <li><Link to="/hizmet-bolgeleri/izmir" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">İzmir</Link></li>
            <li><Link to="/hizmet-bolgeleri/bursa" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Bursa</Link></li>
            <li><Link to="/hizmet-bolgeleri/kocaeli" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Kocaeli</Link></li>
          </ul>
        </div>

        {/* Kurumsal */}
        <div>
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-txt-3 mb-4">Kurumsal</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link to="/hakkimizda" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link to="/tasiyici-olun" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Taşıyıcı Olun</Link></li>
            <li><Link to="/iletisim" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">İletişim</Link></li>
            <li><Link to="/sss" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">S.S.S</Link></li>
          </ul>
        </div>

        {/* Yasal */}
        <div>
          <h4 className="text-[11px] font-bold tracking-wider uppercase text-txt-3 mb-4">Yasal</h4>
          <ul className="list-none flex flex-col gap-2.5">
            <li><Link to="/kullanim-kosullari" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Kullanım Koşulları</Link></li>
            <li><Link to="/gizlilik-politikasi" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
            <li><Link to="/kvkk" className="text-[13px] text-txt-2 no-underline hover:text-primary transition-colors">KVKK</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-10 border-t border-border py-5 flex items-center justify-between flex-wrap gap-3">
        <span className="text-xs text-txt-3">© 2026 Hammaddem. Tüm hakları saklıdır.</span>
        <div className="flex items-center gap-4">
          <Link to="/cerez-politikasi" className="text-xs text-txt-3 no-underline hover:text-txt-2 transition-colors">Çerez Politikası</Link>
          <span className="inline-flex items-center gap-[5px] px-2.5 py-[3px] rounded-full bg-success-light border border-success-border text-[10px] font-semibold text-success font-mono">
            <span className="w-[5px] h-[5px] rounded-full bg-success" />
            Sistem Aktif
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
