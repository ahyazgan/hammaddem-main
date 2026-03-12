const DestekView = () => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="px-4 lg:px-6 py-4 border-b border-border">
        <h2 className="text-[15px] font-semibold flex items-center gap-2">
          <span className="text-[18px]">💬</span> Destek & İletişim
        </h2>
      </div>

      <div className="px-4 lg:px-6 py-6 max-w-[560px]">
        <div className="space-y-4">
          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-border rounded-xl p-4 bg-muted/30">
              <div className="text-lg mb-2">📞</div>
              <h3 className="text-[13px] font-semibold mb-1 text-foreground">Telefon</h3>
              <p className="text-[12px] text-muted-foreground mb-2">Hafta içi 08:00 – 18:00</p>
              <a href="tel:+905393308617" className="text-[13px] font-semibold text-primary hover:underline">
                0539 330 86 17
              </a>
            </div>

            <div className="border border-border rounded-xl p-4 bg-muted/30">
              <div className="text-lg mb-2">📧</div>
              <h3 className="text-[13px] font-semibold mb-1 text-foreground">E-posta</h3>
              <p className="text-[12px] text-muted-foreground mb-2">24 saat içinde yanıt</p>
              <a href="mailto:hammaddem@outlook.com" className="text-[13px] font-semibold text-primary hover:underline">
                hammaddem@outlook.com
              </a>
            </div>
          </div>

          <div className="border border-border rounded-xl p-4 bg-muted/30">
            <div className="text-lg mb-2">💬</div>
            <h3 className="text-[13px] font-semibold mb-1 text-foreground">WhatsApp Destek</h3>
            <p className="text-[12px] text-muted-foreground mb-3">Hızlı yanıt için WhatsApp üzerinden ulaşın.</p>
            <a
              href="https://wa.me/905393308617"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#25D366] text-white text-[12px] font-semibold hover:opacity-90 transition-opacity"
            >
              WhatsApp'tan Yaz →
            </a>
          </div>

          <div className="border border-border rounded-xl p-4 bg-muted/30">
            <div className="text-lg mb-2">❓</div>
            <h3 className="text-[13px] font-semibold mb-2 text-foreground">Sık Sorulan Sorular</h3>
            <div className="space-y-2.5">
              {[
                { q: "Teklif almak ücretsiz mi?", a: "Evet, tüm teklif talepleri tamamen ücretsizdir." },
                { q: "Teslimat süresi ne kadar?", a: "Bölgenize ve malzemeye göre 1-3 iş günü içinde teslimat yapılır." },
                { q: "Minimum sipariş miktarı var mı?", a: "Malzemeye göre değişir, genellikle 10 ton üzeri siparişler kabul edilir." },
              ].map((faq) => (
                <div key={faq.q} className="border-b border-border pb-2.5 last:border-b-0 last:pb-0">
                  <div className="text-[12px] font-semibold text-foreground mb-0.5">{faq.q}</div>
                  <div className="text-[11px] text-muted-foreground">{faq.a}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestekView;
