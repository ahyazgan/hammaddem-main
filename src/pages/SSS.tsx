import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

const sorular = [
  {
    soru: "Hammaddem nedir ve nasıl çalışır?",
    cevap: "Hammaddem, hammadde tedarik ve lojistik süreçlerini dijitalleştiren bir platformdur. Ücretsiz hesap oluşturup talep formunu doldurursunuz, dakikalar içinde size özel fiyat teklifi alırsınız. Teklifi onayladığınızda taşıma süreci başlar ve teslimatınızı dijital panelden takip edebilirsiniz.",
  },
  {
    soru: "Hangi malzemelerin taşımacılığını yapıyorsunuz?",
    cevap: "Silobas hizmetimizle çimento, kalsit, uçucu kül, kireç, mermer tozu, alçı ve benzeri toz/granül malzemeleri taşıyoruz. Hafriyat hizmetimizle ise kum, çakıl, mıcır, toprak ve moloz gibi inşaat malzemelerini naklediyoruz.",
  },
  {
    soru: "Teklif almak ücretli mi?",
    cevap: "Hayır, teklif almak tamamen ücretsizdir. Hesap oluşturup talebinizi iletmeniz yeterlidir. Size en uygun fiyatı sunmak için çalışıyoruz.",
  },
  {
    soru: "Hangi illerde hizmet veriyorsunuz?",
    cevap: "Şu anda Türkiye genelinde 11 ilde aktif olarak hizmet vermekteyiz. Hizmet alanımız sürekli genişlemektedir. Detaylı bilgi için bizimle iletişime geçebilirsiniz.",
  },
  {
    soru: "Taşıyıcı olarak platforma nasıl katılabilirim?",
    cevap: "Kamyon, tır veya silobas aracınız varsa 'Taşıyıcı Olun' sayfamızdaki başvuru formunu doldurarak platforma katılabilirsiniz. Başvurunuz değerlendirildikten sonra sizinle iletişime geçilecektir.",
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
      <title>Sıkça Sorulan Sorular – Hammaddem</title>
      <meta name="description" content="Hammaddem hakkında merak edilen sorular ve yanıtları. Nasıl çalışır, hangi malzemeler taşınır, teklif alma süreci ve daha fazlası." />
      <link rel="canonical" href="https://hammaddem.co/sss" />
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
            Hammaddem hakkında en çok merak edilen soruların yanıtlarını burada bulabilirsiniz.
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
