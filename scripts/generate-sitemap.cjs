/**
 * Sitemap Generator Script
 * Dinamik olarak sitemap.xml dosyası oluşturur.
 *
 * ROUTES listesi aynı zamanda prerender.mjs'in kaynağıdır (module.exports).
 * `sitemap: false` işaretli rotalar prerender EDİLİR ama sitemap'e YAZILMAZ —
 * noindex sayfalar için: sitemap ile robots etiketi çelişmesin, ama sayfa yine
 * de kendi statik HTML'ini alsın (aksi halde ana sayfa kabuğuna düşerdi).
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://hammaddem.co';
const ROUTES = [
  // Ana sayfalar
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/hammadde', priority: '0.9', changefreq: 'monthly' },
  { path: '/fiyatlar', priority: '0.9', changefreq: 'weekly', lastmod: '2026-08-17' },

  // Teklif ve hafriyat sayfaları
  { path: '/teklif-al', priority: '0.9', changefreq: 'weekly' },
  { path: '/hafriyat', priority: '0.9', changefreq: 'weekly' },
  { path: '/hafriyat/fiyatlar', priority: '0.9', changefreq: 'weekly', lastmod: '2026-08-25' },
  { path: '/hafriyat/hesaplama', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-25' },
  { path: '/hafriyat/temel-kazisi', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/hafriyat/moloz-tasima', priority: '0.9', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/hafriyat/dolgu-malzemesi', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/hafriyat/yikim-sonrasi-hafriyat', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-26' },

  // Hafriyat rehberleri (bilgi niyetli sorgular → hizmet sayfalarına köprü)
  { path: '/rehber/hafriyat-dokum-ucretleri', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-25' },
  { path: '/rehber/hafriyat-kamyonu-kac-m3', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-25' },
  { path: '/rehber/moloz-nereye-dokulur', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/rehber/hafriyat-tasima-izin-belgesi', priority: '0.8', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/rehber/hafriyat-fiyat-teklifi-ornegi', priority: '0.7', changefreq: 'monthly', lastmod: '2026-08-26' },
  { path: '/rehber/hafriyat-topragi-yonetmeligi', priority: '0.6', changefreq: 'yearly', lastmod: '2026-08-26' },
  { path: '/rehber/hafriyat-nedir', priority: '0.6', changefreq: 'yearly', lastmod: '2026-08-26' },

  // Hizmet sayfaları
  { path: '/hizmetler/silobas', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmetler/hafriyat-nakliyesi', priority: '0.8', changefreq: 'monthly' },

  // Kurumsal sayfalar
  { path: '/hakkimizda', priority: '0.7', changefreq: 'monthly' },
  { path: '/iletisim', priority: '0.7', changefreq: 'monthly' },
  { path: '/tasiyici-olun', priority: '0.7', changefreq: 'monthly' },
  { path: '/sss', priority: '0.6', changefreq: 'monthly' },
  // noindex: kullanıcının kendi talebini sorguladığı araç sayfası, arama sonucu değeri yok
  { path: '/talep-takip', priority: '0.6', changefreq: 'monthly', sitemap: false },

  // Yasal sayfalar
  { path: '/kullanim-kosullari', priority: '0.3', changefreq: 'yearly' },
  { path: '/gizlilik-politikasi', priority: '0.3', changefreq: 'yearly' },
  { path: '/kvkk', priority: '0.3', changefreq: 'yearly' },
  { path: '/cerez-politikasi', priority: '0.3', changefreq: 'yearly' },
  
  // Malzeme sayfaları
  { path: '/malzeme/cimento', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/kalsit', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/kirec', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/alci', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/mermer-tozu', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/ucucu-kul', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/kum', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/cakil', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/micir', priority: '0.9', changefreq: 'monthly' },
  { path: '/malzeme/stabilize', priority: '0.9', changefreq: 'monthly' },
  
  // Bölge sayfaları
  { path: '/hizmet-bolgeleri/istanbul', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/ankara', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/izmir', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/bursa', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/kocaeli', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/tekirdag', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/sakarya', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/yalova', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/balikesir', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/canakkale', priority: '0.8', changefreq: 'monthly' },
  { path: '/hizmet-bolgeleri/edirne', priority: '0.8', changefreq: 'monthly' },
];

// Hafriyat il sayfaları (src/data/hafriyatData.ts ile eşleşmeli)
const HAFRIYAT_ILLER = ['istanbul', 'kocaeli', 'bursa', 'tekirdag', 'sakarya', 'yalova', 'balikesir', 'canakkale', 'edirne', 'ankara', 'izmir'];
// Hafriyat İstanbul ilçe sayfaları
const HAFRIYAT_ISTANBUL_ILCELER = [
  'esenyurt', 'basaksehir', 'arnavutkoy', 'tuzla', 'pendik', 'sancaktepe', 'beylikduzu', 'umraniye',
  // 1. dalga (2026-08-26): "{ilçe} hafriyat firmaları" sorgularında talep doğrulandı
  'kartal', 'maltepe', 'atasehir', 'avcilar', 'kucukcekmece', 'silivri', 'catalca', 'buyukcekmece',
  // 2. dalga (2026-08-26)
  'eyupsultan', 'sultanbeyli', 'cekmekoy', 'beykoz', 'sariyer', 'sultangazi', 'bagcilar', 'kagithane',
  // 3. dalga (2026-08-26): merkez ilçeler — moloz/tadilat ağırlıklı
  'kadikoy', 'uskudar', 'sisli', 'besiktas', 'zeytinburnu', 'bayrampasa', 'gaziosmanpasa', 'esenler',
  'bahcelievler', 'sile',
];

HAFRIYAT_ILLER.forEach(il => {
  ROUTES.push({ path: `/hafriyat/${il}`, priority: '0.8', changefreq: 'weekly' });
});
HAFRIYAT_ISTANBUL_ILCELER.forEach(ilce => {
  ROUTES.push({ path: `/hafriyat/istanbul/${ilce}`, priority: '0.7', changefreq: 'weekly' });
});

// Malzeme ve şehir kombinasyonları
const MALZEMELER = ['cimento', 'kalsit', 'kirec', 'alci', 'mermer-tozu', 'ucucu-kul', 'kum', 'cakil', 'micir', 'stabilize'];
const SEHIRLER = ['istanbul', 'ankara', 'izmir', 'bursa', 'kocaeli'];

// Kombinasyon sayfalarını ekle
MALZEMELER.forEach(malzeme => {
  SEHIRLER.forEach(sehir => {
    ROUTES.push({
      path: `/malzeme/${malzeme}/${sehir}`,
      priority: '0.7',
      changefreq: 'monthly',
    });
  });
});

// Sitemap'e girecek rotalar (prerender listesi ROUTES'un tamamıdır)
const SITEMAP_ROUTES = ROUTES.filter(route => route.sitemap !== false);

// Sayfa hero görseli → Google Görseller için <image:image> (yalnızca loc; title/caption Google tarafında kullanılmıyor).
// Şablon sayfalar (malzeme/il, hafriyat/il/ilçe) sayfadaki görselle aynı kuralı izler.
const STATIK_GORSEL = {
  '/': ['hizmet-silobas', 'hizmet-hafriyat'],
  '/hakkimizda': ['hakkimizda-filo'],
  '/fiyatlar': ['fiyatlar-silobas'],
  '/hafriyat': ['hafriyat-hub'],
  '/hafriyat/fiyatlar': ['hafriyat-fiyatlar'],
  '/hafriyat/hesaplama': ['hafriyat-hesaplama'],
  '/hafriyat/temel-kazisi': ['hafriyat-temel-kazisi'],
  '/hafriyat/moloz-tasima': ['hafriyat-moloz-tasima'],
  '/hafriyat/dolgu-malzemesi': ['hafriyat-dolgu-malzemesi'],
  '/hafriyat/yikim-sonrasi-hafriyat': ['hafriyat-yikim-sonrasi'],
  '/rehber/hafriyat-dokum-ucretleri': ['rehber-dokum-ucretleri'],
  '/rehber/hafriyat-kamyonu-kac-m3': ['rehber-kamyon-kac-m3'],
  '/rehber/moloz-nereye-dokulur': ['rehber-moloz-nereye-dokulur'],
  '/rehber/hafriyat-tasima-izin-belgesi': ['rehber-tasima-izin-belgesi'],
  '/rehber/hafriyat-fiyat-teklifi-ornegi': ['rehber-teklif-ornegi'],
  '/rehber/hafriyat-topragi-yonetmeligi': ['rehber-yonetmelik'],
  '/rehber/hafriyat-nedir': ['rehber-hafriyat-nedir'],
  '/hizmetler/silobas': ['hizmet-silobas-yol'],
  '/hizmetler/hafriyat-nakliyesi': ['hizmet-kamyon-kiralama'],
};
function sayfaGorselleri(routePath) {
  if (STATIK_GORSEL[routePath]) return STATIK_GORSEL[routePath];
  let m;
  if ((m = routePath.match(/^\/malzeme\/([a-z-]+)(?:\/[a-z]+)?$/))) return ['malzeme-' + m[1]];
  if ((m = routePath.match(/^\/hizmet-bolgeleri\/([a-z]+)$/))) return ['il-' + m[1]];
  if ((m = routePath.match(/^\/hafriyat\/([a-z]+)(?:\/[a-z]+)?$/))) return ['il-' + m[1]];
  return [];
}

function generateSitemap() {
  // lastmod her build'de "bugün" yazılırsa Google sinyale güvenmeyi bırakır;
  // yalnızca rotada açıkça lastmod tanımlıysa yazılır (örn. fiyat güncellemesi).
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  SITEMAP_ROUTES.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    if (route.lastmod) xml += `    <lastmod>${route.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    sayfaGorselleri(route.path).forEach(g => {
      xml += `    <image:image><image:loc>${BASE_URL}/images/${g}.webp</image:loc></image:image>\n`;
    });
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

// prerender.mjs bu listeyi doğrudan okur — sitemap ile prerender kapsamı ayrışabilsin diye
module.exports = { ROUTES, SITEMAP_ROUTES };

// Doğrudan çalıştırıldığında sitemap dosyasını yaz
if (require.main === module) {
  const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(sitemapPath, generateSitemap(), 'utf-8');
  console.log(`✓ Sitemap başarıyla oluşturuldu: ${sitemapPath}`);
  console.log(`✓ Sitemap URL sayısı: ${SITEMAP_ROUTES.length} (prerender: ${ROUTES.length})`);
}
