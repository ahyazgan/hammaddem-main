const steps = [
  {
    num: "01",
    icon: "📋",
    title: "Talebinizi Gönderin",
    desc: "Malzeme türü, miktar ve teslimat adresini belirtin. Kayıt olmadan bile teklif alabilirsiniz.",
  },
  {
    num: "02",
    icon: "💬",
    title: "Teklif Alın",
    desc: "Ekibimiz talebinizi değerlendirir ve size en uygun fiyat teklifini sunar.",
  },
  {
    num: "03",
    icon: "🚛",
    title: "Teslimatı Takip Edin",
    desc: "Siparişiniz onaylandıktan sonra her aşamayı anlık olarak izleyin.",
  },
];

const HowItWorks = () => {
  return (
    <section id="nasil-calisir" className="relative py-16 md:py-24 px-4 md:px-10 overflow-hidden">
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-off2 text-txt-2 border border-border mb-3.5">
            Adım Adım
          </span>
          <h2 className="text-[clamp(28px,3.5vw,42px)] font-extrabold tracking-tight leading-[1.1] mb-3.5">
            Nasıl Çalışır?
          </h2>
          <p className="text-base text-txt-2 leading-[1.7] max-w-[520px] mx-auto">
            3 basit adımda hammadde siparişinizi oluşturun.
          </p>
        </div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-3">
          {/* Dashed connector line */}
          <div className="hidden md:block absolute top-9 left-[calc(16.6%+20px)] right-[calc(16.6%+20px)] h-0.5"
            style={{
              background: 'repeating-linear-gradient(90deg, hsl(22 92% 47%) 0, hsl(22 92% 47%) 8px, transparent 8px, transparent 16px)'
            }}
          />

          {steps.map((step, i) => (
            <div key={step.num} className="relative z-[1] text-center px-4 md:px-8 py-6 md:py-9">
              {/* Divider */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute right-0 top-[20%] bottom-[20%] w-px bg-border" />
              )}

              <div className="flex items-center justify-center mb-6">
                <div className="group relative w-[72px] h-[72px] rounded-full border-2 border-border bg-background flex items-center justify-center text-[26px] font-extrabold font-mono shadow-card transition-all hover:bg-primary hover:text-primary-foreground hover:border-primary hover:shadow-[0_8px_24px_rgba(232,98,10,.3)] hover:scale-[1.08]">
                  {step.num}
                  <span className="absolute -top-1.5 -right-1.5 w-[26px] h-[26px] rounded-full bg-accent-light border-2 border-background flex items-center justify-center text-xs">
                    {step.icon}
                  </span>
                </div>
              </div>
              <h3 className="text-[17px] font-bold tracking-tight mb-2.5">{step.title}</h3>
              <p className="text-sm text-txt-2 leading-[1.7]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
