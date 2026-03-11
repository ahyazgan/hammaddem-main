import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const sorular = [
  {
    soru: "Hammaddem nedir ve nasıl çalışır?",
    cevap: "Hammaddem, hammadde tedarik ve lojistik süreçlerini dijitalleştiren bir B2B platformdur. Ücretsiz hesap oluşturup talep formunu doldurursunuz, dakikalar içinde size özel fiyat teklifi alırsınız. Teklifi onayladığınızda taşıma süreci başlar ve teslimatınızı dijital panelden takip edebilirsiniz.",
  },
  {
    soru: "Hangi malzemelerin taşımacılığını yapıyorsunuz?",
    cevap: "Silobas hizmetimizle çimento (CEM I, CEM II, portland), kalsit, uçucu kül, kireç (sönmüş ve sönmemiş), mermer tozu, alçı ve benzeri toz/granül malzemeleri taşıyoruz. Hafriyat hizmetimizle ise kum, çakıl, mıcır, stabilize ve moloz gibi inşaat malzemelerini naklediyoruz.",
  },
  {
    soru: "Teklif almak ücretli mi?",
    cevap: "Hayır, teklif almak tamamen ücretsizdir. Hesap oluşturup talebinizi iletmeniz yeterlidir. Size en uygun fiyatı sunmak için çalışıyoruz.",
  },
  {
    soru: "Hangi illerde hizmet veriyorsunuz?",
    cevap: "İstanbul, Ankara, İzmir, Bursa ve Kocaeli başta olmak üzere Türkiye genelinde aktif olarak hizmet vermekteyiz. Hizmet alanımız sürekli genişlemektedir. Listelenmemiş bir şehir için bizimle iletişime geçebilirsiniz.",
  },
  {
    soru: "Silobas araçları nedir ve ne işe yarar?",
    cevap: "Silobas, toz ve granül malzemelerin (çimento, kalsit, uçucu kül, kireç, alçı vb.) kapalı sistem ve pnömatik basınçla taşınmasını sağlayan özel tanker araçlarıdır. Tozlanma ve fire minimuma iner, malzeme kalitesi korunur. Boşaltma silo, depo veya fabrikalara hava basıncıyla aktarılır.",
  },
  {
    soru: "Minimum sipariş miktarı nedir?",
    cevap: "Genellikle 10 ton ve üzeri siparişleri kabul ediyoruz. Silobas araçları 20-28 ton kapasitelidir. Düzenli ve büyük hacimli alımlar için özel fiyat ve sözleşme koşulları oluşturulabilir.",
  },
  {
    soru: "Çimento fiyatları nasıl belirleniyor?",
    cevap: "Çimento ve diğer hammadde fiyatları; malzeme türü (CEM I, CEM II vb.), miktar (ton), teslimat mesafesi ve tarihi ile piyasa koşullarına göre belirlenir. En güncel ve rekabetçi fiyat için platformdan online teklif almanızı öneririz.",
  },
  {
    soru: "Beton santraline çimento teslimatı yapıyor musunuz?",
    cevap: "Evet. Beton santralleri, hazır beton tesisleri ve inşaat sahalarına İstanbul, Ankara, İzmir, Bursa ve Kocaeli başta olmak üzere hizmet bölgelerimizde çimento teslimatı yapıyoruz. Aynı gün ve ertesi gün teslimat seçenekleri mevcuttur.",
  },
  {
    soru: "Hafriyat malzemesi tedariği nasıl işliyor?",
    cevap: "Kum, çakıl, mıcır, stabilize ve benzeri hafriyat malzemeleri için Hammaddem platformunda talep oluşturun. Damperli araçlarla şantiye veya teslimat adresinize nakliye sağlıyoruz. Miktar ve malzeme türüne göre en uygun araç boyutu planlanır.",
  },
  {
    soru: "Taşıyıcı olarak platforma nasıl katılabilirim?",
    cevap: "Kamyon, tır veya silobas aracınız varsa 'Taşıyıcı Olun' sayfamızdaki başvuru formunu doldurarak platforma katılabilirsiniz. Araç tipi, kapasite ve çalıştığınız bölgeyi belirtin. Başvurunuz değerlendirildikten sonra sizinle iletişime geçilecektir.",
  },
  {
    soru: "Teslimatı anlık takip edebilir miyim?",
    cevap: "Evet. Kayıtlı kullanıcılar, hesap paneli üzerinden siparişlerini anlık olarak takip edebilir. Araç konumu, teslimat durumu ve tahmini varış saati gibi bilgilere dijital panelden ulaşabilirsiniz.",
  },
  {
    soru: "OSB ve sanayi bölgelerine teslimat yapıyor musunuz?",
    cevap: "Evet. Tuzla OSB, İkitelli OSB, Ostim (Ankara), Gebze OSB, DOSAB (Bursa) ve diğer organize sanayi bölgelerine düzenli teslimat yapıyoruz. Teslimat adresinizi talep formunda belirtmeniz yeterlidir.",
  },
  {
    soru: "Düzenli alım için anlaşma yapabilir miyim?",
    cevap: "Evet. Aylık veya yıllık düzenli alım yapan firmalar için özel fiyat anlaşmaları oluşturabiliyoruz. Büyük hacimli ve sürekli tedarik ihtiyaçları için satış ekibimizle iletişime geçin.",
  },
  {
    soru: "Uçucu kül nedir ve nerede kullanılır?",
    cevap: "Uçucu kül (fly ash), termik santrallerde kömür yakılmasıyla elde edilen bir endüstriyel yan üründür. Çimento ve beton üretiminde katkı maddesi, zemin iyileştirme ve yol stabilizasyonu gibi alanlarda kullanılır. Hammaddem ile silobas taşımacılığı yaptırabilirsiniz.",
  },
  {
    soru: "Kalsit ve mermer tozu arasındaki fark nedir?",
    cevap: "Kalsit (kalsiyum karbonat), doğal kayaçların öğütülmesiyle elde edilen beyaz toz malzemedir; plastik, boya, kağıt ve kimya sektöründe kullanılır. Mermer tozu ise mermer işleme artığı olup inşaat, seramik ve tarım sektöründe kullanılır. Her ikisi de silobas ile taşınır.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: sorular.map((s) => ({
    "@type": "Question",
    name: s.soru,
    acceptedAnswer: {
      "@type": "Answer",
      text: s.cevap,
    },
  })),
};

const SSS = () => (
  <>
    <Helmet>
      <title>Sıkça Sorulan Sorular – Silobas, Hafriyat, Hammadde | Hammaddem</title>
      <meta name="description" content="Silobas taşımacılığı, hafriyat malzeme tedariği, çimento kum çakıl mıcır kalsit fiyatları hakkında sık sorulan sorular. Hammaddem nasıl çalışır, hangi iller?" />
      <meta name="keywords" content="silobas nedir, hafriyat nedir, çimento fiyatı, kum çakıl fiyat, kalsit taşıma, hammaddem sss" />
      <link rel="canonical" href="https://hammaddem.co/sss" />
      <meta property="og:title" content="Sıkça Sorulan Sorular – Silobas, Hafriyat, Hammadde | Hammaddem" />
      <meta property="og:description" content="Silobas taşımacılığı, hafriyat malzeme tedariği, çimento kum çakıl kalsit fiyatları hakkında sık sorulan sorular." />
      <meta property="og:url" content="https://hammaddem.co/sss" />
      <meta property="og:type" content="website" />
      <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
    </Helmet>

    <div className="min-h-screen bg-dot-pattern">
      <Navbar />

      <section className="pt-[120px] pb-16 md:pb-24 px-4 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-accent-light text-primary border border-accent-border mb-4">
            S.S.S
          </span>
          <h1 className="text-[clamp(30px,4vw,48px)] font-extrabold tracking-tight leading-[1.1] mb-5">
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-base text-txt-2 leading-[1.7] mb-10 max-w-[540px]">
            Silobas taşımacılığı, hafriyat malzeme tedariği, çimento, kum, çakıl, kalsit ve diğer hammaddeler hakkında en çok sorulan soruların yanıtları.
          </p>

          <Accordion type="single" collapsible className="space-y-3">
            {sorular.map((s, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border border-border rounded-2xl px-6 bg-background data-[state=open]:border-accent-border transition-colors">
                <AccordionTrigger className="text-sm md:text-base font-semibold text-left hover:no-underline py-5">
                  {s.soru}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-txt-2 leading-relaxed pb-5">
                  {s.cevap}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center">
            <p className="text-sm text-txt-2 mb-4">Sorunuzun cevabını bulamadınız mı?</p>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-primary-foreground bg-primary no-underline shadow-[0_2px_12px_rgba(232,98,10,.25)] hover:bg-accent-hover hover:-translate-y-px transition-all"
            >
              Bize Yazın <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  </>
);

export default SSS;
