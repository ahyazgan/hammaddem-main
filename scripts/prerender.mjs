/**
 * Prerender script — generate-sitemap.cjs'teki her rota için statik HTML üretir.
 *
 * Akış (package.json "build"):
 *   1. vite build                    → dist/           (istemci)
 *   2. vite build --ssr ...          → dist-server/    (render fonksiyonu)
 *   3. node scripts/prerender.mjs    → dist/<rota>/index.html dosyaları
 *
 * Google botları böylece JavaScript çalıştırmadan tam içeriği görür;
 * kullanıcı tarafında React normal SPA olarak devralır.
 */

import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const SERVER_ENTRY = path.join(ROOT, "dist-server", "entry-server.js");

const SEO_BLOCK_RE = /<!-- SEO:START[\s\S]*?SEO:END -->/;
const ROOT_DIV = '<div id="root"></div>';

// Rota listesi sitemap'ten değil generate-sitemap.cjs'ten gelir: sitemap dışı
// bırakılan (noindex) sayfalar da statik HTML almalı, yoksa SPA kabuğuna düşüp
// ana sayfanın title/canonical/robots etiketleriyle servis edilirler.
function readRoutes() {
  const require = createRequire(import.meta.url);
  const { ROUTES } = require("./generate-sitemap.cjs");
  const routes = ROUTES.map((r) => r.path).map((p) =>
    p !== "/" && p.endsWith("/") ? p.slice(0, -1) : p
  );
  return [...new Set(routes)];
}

function buildHeadBlock(helmet) {
  if (!helmet) return "";
  return [
    "<!-- SEO:START -->",
    helmet.title.toString(),
    helmet.meta.toString(),
    helmet.link.toString(),
    helmet.script.toString(),
    "<!-- SEO:END -->",
  ]
    .filter(Boolean)
    .join("\n    ");
}

// Host konvansiyonları değişir: kimi /rota → rota/index.html, kimi rota.html arar.
// İkisini de üretiyoruz ki hangi CDN olursa olsun bot statik HTML alsın.
function outputPathsFor(route) {
  if (route === "/") return [path.join(DIST, "index.html")];
  const parts = route.split("/").filter(Boolean);
  return [
    path.join(DIST, ...parts, "index.html"),
    path.join(DIST, ...parts.slice(0, -1), `${parts[parts.length - 1]}.html`),
  ];
}

async function main() {
  if (!fs.existsSync(SERVER_ENTRY)) {
    console.error(`✗ SSR bundle bulunamadı: ${SERVER_ENTRY}`);
    console.error("  Önce: vite build --ssr src/entry-server.tsx --outDir dist-server");
    process.exit(1);
  }

  const template = fs.readFileSync(path.join(DIST, "index.html"), "utf-8");
  if (!SEO_BLOCK_RE.test(template) || !template.includes(ROOT_DIV)) {
    console.error("✗ dist/index.html içinde SEO:START/SEO:END işaretleri veya #root bulunamadı.");
    process.exit(1);
  }

  const { render } = await import(pathToFileURL(SERVER_ENTRY).href);
  const routes = readRoutes();

  let ok = 0;
  const failed = [];

  for (const route of routes) {
    try {
      const result = await Promise.race([
        render(route),
        new Promise((_, rej) => setTimeout(() => rej(new Error("timeout (30s)")), 30_000)),
      ]);

      const headBlock = buildHeadBlock(result.helmet);
      let html = template;
      if (headBlock) html = html.replace(SEO_BLOCK_RE, headBlock);
      html = html.replace(ROOT_DIV, `<div id="root">${result.html}</div>`);

      for (const outFile of outputPathsFor(route)) {
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, html, "utf-8");
      }
      ok++;
    } catch (err) {
      failed.push(route);
      console.error(`✗ ${route}: ${err?.message ?? err}`);
    }
  }

  console.log(`✓ Prerender tamamlandı: ${ok}/${routes.length} sayfa`);
  if (failed.length) {
    console.error(`✗ Başarısız rotalar (SPA kabuğuna düşer): ${failed.join(", ")}`);
  }

  // 404.html — Vercel, eşleşmeyen yolları bu dosyayla ve HTTP 404 ile sunar.
  // Olmadığında olmayan her URL ana sayfa içeriğiyle 200 döner (soft 404) ve
  // Google sonsuz sahte URL tarayarak tarama bütçesini harcar.
  try {
    const result = await render("/__404__");
    const headBlock = buildHeadBlock(result.helmet);
    let html = template;
    if (headBlock) html = html.replace(SEO_BLOCK_RE, headBlock);
    html = html.replace(ROOT_DIV, `<div id="root">${result.html}</div>`);
    fs.writeFileSync(path.join(DIST, "404.html"), html, "utf-8");
    console.log("✓ 404.html üretildi");
  } catch (err) {
    console.error(`✗ 404.html üretilemedi: ${err?.message ?? err}`);
    process.exitCode = 1;
  }

  // SSR bundle'ı deploy paketine dahil etme
  fs.rmSync(path.join(ROOT, "dist-server"), { recursive: true, force: true });
}

main().then(() => process.exit(0)).catch((err) => {
  console.error("✗ Prerender hatası:", err);
  process.exit(1);
});
