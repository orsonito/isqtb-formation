import sharp from "sharp";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, "..", "public");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#000"/>
  <text x="256" y="340" font-size="280" fill="#fafafa" text-anchor="middle" font-family="system-ui,sans-serif" font-weight="700">N</text>
</svg>`;

const buf = Buffer.from(svg);

await sharp(buf).resize(192, 192).png().toFile(join(publicDir, "icon-192.png"));
await sharp(buf).resize(512, 512).png().toFile(join(publicDir, "icon-512.png"));
