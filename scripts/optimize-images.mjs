// Image optimization pass for Rangel Oviedo Group.
// 1) Convert scrolly PNGs -> WebP (+AVIF) sources.
// 2) Recompress sequence WebP frames in place (no resize, no count change),
//    keeping each file only if the re-encode is actually smaller.
//
// Run: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = path.resolve(process.cwd(), 'public');
sharp.cache(false);
sharp.concurrency(Math.max(1, (await import('os')).cpus().length - 1));

let savedBytes = 0;

async function fileSize(p) {
  try { return (await fs.stat(p)).size; } catch { return 0; }
}

// ── 1. Scrolly PNGs -> WebP + AVIF ──
async function convertScrolly() {
  const dir = path.join(ROOT, 'rog');
  const files = (await fs.readdir(dir)).filter((f) => /^scrolly_.*\.png$/i.test(f));
  for (const f of files) {
    const src = path.join(dir, f);
    const base = f.replace(/\.png$/i, '');
    const webp = path.join(dir, `${base}.webp`);
    const avif = path.join(dir, `${base}.avif`);
    const pngSize = await fileSize(src);
    await sharp(src).webp({ quality: 82, effort: 6 }).toFile(webp);
    await sharp(src).avif({ quality: 60, effort: 5 }).toFile(avif);
    const w = await fileSize(webp);
    const a = await fileSize(avif);
    savedBytes += pngSize - Math.min(w, a);
    console.log(`scrolly ${f}: png ${(pngSize/1024|0)}KB -> webp ${(w/1024|0)}KB / avif ${(a/1024|0)}KB`);
  }
}

// ── 2. Recompress sequence frames in place (keep if smaller) ──
async function recompressSequences() {
  const seqRoot = path.join(ROOT, 'assets');
  const seqs = ['seq01', 'seq02'];
  const variants = ['desktop', 'mobile'];
  for (const seq of seqs) {
    for (const variant of variants) {
      const dir = path.join(seqRoot, seq, variant);
      let files;
      try { files = (await fs.readdir(dir)).filter((f) => /\.webp$/i.test(f)); }
      catch { continue; }
      let before = 0, after = 0, replaced = 0;
      for (const f of files) {
        const src = path.join(dir, f);
        const orig = await fileSize(src);
        before += orig;
        const tmp = src + '.tmp';
        // Re-encode at higher effort + tuned quality. No resize: dimensions preserved.
        await sharp(src)
          .webp({ quality: variant === 'mobile' ? 70 : 74, effort: 6, smartSubsample: true })
          .toFile(tmp);
        const newSize = await fileSize(tmp);
        if (newSize > 0 && newSize < orig) {
          await fs.rename(tmp, src);
          after += newSize;
          replaced++;
        } else {
          await fs.unlink(tmp);
          after += orig;
        }
      }
      savedBytes += before - after;
      console.log(`${seq}/${variant}: ${files.length} frames, ${replaced} recompressed, ${(before/1048576).toFixed(1)}MB -> ${(after/1048576).toFixed(1)}MB`);
    }
  }
}

await convertScrolly();
await recompressSequences();
console.log(`\nTotal saved: ${(savedBytes/1048576).toFixed(2)} MB`);
