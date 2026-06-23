import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const iconSvg = readFileSync(join(publicDir, "icon.svg"));
const maskableSvg = readFileSync(join(publicDir, "icon-maskable.svg"));

async function generate() {
  await sharp(iconSvg).resize(32, 32).png().toFile(join(publicDir, "favicon-32.png"));
  await sharp(iconSvg).resize(180, 180).png().toFile(join(publicDir, "apple-touch-icon.png"));
  await sharp(iconSvg).resize(192, 192).png().toFile(join(publicDir, "icon-192.png"));
  await sharp(iconSvg).resize(512, 512).png().toFile(join(publicDir, "icon-512.png"));
  await sharp(maskableSvg).resize(512, 512).png().toFile(join(publicDir, "icon-maskable-512.png"));

  console.log("Icônes PWA générées :");
  console.log("  - favicon-32.png");
  console.log("  - apple-touch-icon.png");
  console.log("  - icon-192.png");
  console.log("  - icon-512.png");
  console.log("  - icon-maskable-512.png");
}

generate().catch((err) => {
  console.error(err);
  process.exit(1);
});
