/**
 * IndexNow gönderimi — Bing, Yandex ve Seznam'a "bu URL'ler değişti" bildirir.
 *
 * Kullanım:
 *   npm run indexnow            → sitemap'teki TÜM URL'leri gönderir
 *   npm run indexnow -- /hafriyat/fiyatlar /rehber/moloz-nereye-dokulur
 *                               → yalnızca verilen rotaları gönderir
 *
 * Kimlik doğrulama gerekmez; doğrulama, anahtarın
 * https://hammaddem.co/<KEY>.txt adresinde yayında olmasıyla yapılır.
 * Bu yüzden DEPLOY SONRASI çalıştırılmalıdır — anahtar dosyası canlıda değilse
 * servis 403 döner.
 *
 * Not: Google IndexNow'ı kullanmaz; Google için Search Console'a sitemap gönderimi
 * ve "URL denetimi → dizine ekleme isteği" akışı geçerlidir.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const HOST = "hammaddem.co";
const KEY = "8f3c1a7d94b24e0fa6d5c218b7e930af";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";
/** Tek istekte gönderilebilecek üst sınır (IndexNow: 10.000) */
const CHUNK = 500;

function sitemapUrls() {
  const xml = fs.readFileSync(path.join(ROOT, "public", "sitemap.xml"), "utf-8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function argUrls(args) {
  return args.map((a) => (a.startsWith("http") ? a : `https://${HOST}${a.startsWith("/") ? a : `/${a}`}`));
}

async function gonder(urlList) {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  return { status: res.status, text: (await res.text()).slice(0, 300) };
}

async function main() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("-"));
  const urls = args.length ? argUrls(args) : sitemapUrls();

  if (!urls.length) {
    console.error("✗ Gönderilecek URL bulunamadı.");
    process.exit(1);
  }

  // Anahtar dosyası canlıda mı?
  try {
    const kontrol = await fetch(KEY_LOCATION);
    const govde = (await kontrol.text()).trim();
    if (!kontrol.ok || govde !== KEY) {
      console.error(`✗ Anahtar dosyası doğrulanamadı: ${KEY_LOCATION} (HTTP ${kontrol.status})`);
      console.error("  Deploy tamamlandıktan sonra tekrar deneyin.");
      process.exit(1);
    }
    console.log(`✓ Anahtar doğrulandı: ${KEY_LOCATION}`);
  } catch (err) {
    console.error(`✗ Anahtar dosyasına ulaşılamadı: ${err.message}`);
    process.exit(1);
  }

  let hata = 0;
  for (let i = 0; i < urls.length; i += CHUNK) {
    const parca = urls.slice(i, i + CHUNK);
    const { status, text } = await gonder(parca);
    // 200 = kabul, 202 = kabul (anahtar doğrulaması sırada)
    const ok = status === 200 || status === 202;
    if (!ok) hata++;
    console.log(`${ok ? "✓" : "✗"} ${parca.length} URL → HTTP ${status}${text ? ` ${text}` : ""}`);
  }

  console.log(`\nToplam ${urls.length} URL gönderildi${hata ? `, ${hata} istek başarısız` : ""}.`);
  process.exit(hata ? 1 : 0);
}

main();
