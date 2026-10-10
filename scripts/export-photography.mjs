import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createRequire } from 'node:module';

// Use the local image runtime; override SHARP_MODULE for another workstation.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE || path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp'));
const root = process.cwd();
const output = path.join(root, 'output/imagegen/2026-10-10');
const manifestPath = path.join(output, 'manifest.json');
const manifest = JSON.parse((await fs.readFile(manifestPath, 'utf8')).replace(/^\uFEFF/, ''));
const selectedIds = new Set(process.argv.slice(2));
for (const asset of manifest.assets) {
  try { Object.assign(asset, JSON.parse(await fs.readFile(path.join(output, 'generated', `${asset.id}.json`), 'utf8'))); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
for (const directory of ['sources', '4k-upscaled', 'previews']) await fs.mkdir(path.join(output, directory), { recursive: true });
await fs.mkdir(path.join(root, 'public/images/responsive'), { recursive: true });
for (const asset of manifest.assets) {
  if (asset.status !== 'generated') continue;
  if (selectedIds.size && !selectedIds.has(asset.id)) continue;
  const original = path.join(output, 'sources', `${asset.id}.png`);
  await fs.copyFile(asset.source, original);
  const meta = await sharp(original).metadata();
  const mobile = asset.id === 'hero-filo-mobil';
  const portrait = asset.id === 'hakkimizda-filo';
  const width = mobile ? 2160 : portrait ? 3072 : 3840;
  const height = mobile ? 3840 : portrait ? 3840 : 2160;
  await sharp(original).resize(width, height, { fit: 'cover', position: portrait ? 'bottom' : 'centre' }).jpeg({ quality: 95, chromaSubsampling: '4:4:4' }).toFile(path.join(output, '4k-upscaled', `${asset.id}.jpg`));
  const webWidth = Math.min(meta.width, mobile ? 960 : 1600);
  await sharp(original).resize({ width: webWidth }).webp({ quality: 88, effort: 5 }).toFile(path.join(root, 'public/images', `${asset.id}.webp`));
  await sharp(original).resize({ width: Math.min(meta.width, 800) }).webp({ quality: 84, effort: 5 }).toFile(path.join(root, 'public/images/responsive', `${asset.id}-800.webp`));
  await sharp(original).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 88 }).toFile(path.join(root, 'public/og', `${asset.id}.jpg`));
  await sharp(original).resize({ width: 480 }).webp({ quality: 78 }).toFile(path.join(output, 'previews', `${asset.id}.webp`));
  asset.sourceDimensions = { width: meta.width, height: meta.height };
  asset.deliveryDimensions = { width, height, method: 'Lanczos resize; not native 4K' };
  asset.original = `sources/${asset.id}.png`;
  asset.delivery = `4k-upscaled/${asset.id}.jpg`;
  asset.webWidth = webWidth;
  asset.webHeight = Math.round(meta.height * webWidth / meta.width);
  console.log(`${asset.id}: source ${meta.width}x${meta.height}; web ${webWidth}px; delivery ${width}x${height} (upscaled)`);
}
await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
