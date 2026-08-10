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
  { path: '/fiyatlar', priority: '0.9', changefreq: 'weekly' },

  // Teklif ve hafriyat sayfaları
  { path: '/teklif-al', priority: '0.9', changefreq: 'weekly' },
  { path: '/hafriyat', priority: '0.9', changefreq: 'weekly' },

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
const HAFRIYAT_ISTANBUL_ILCELER = ['esenyurt', 'basaksehir', 'arnavutkoy', 'tuzla', 'pendik', 'sancaktepe', 'beylikduzu', 'umraniye'];

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

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  SITEMAP_ROUTES.forEach(route => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
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
