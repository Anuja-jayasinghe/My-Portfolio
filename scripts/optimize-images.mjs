import sharp from "sharp";
import { readdir } from "node:fs/promises";
import path from "node:path";

const PROJECTS_DIR = path.join(process.cwd(), "public", "projects");
const MAX_WIDTH = 1600;

async function main() {
  const files = (await readdir(PROJECTS_DIR)).filter((f) =>
    /\.(png|jpe?g)$/i.test(f)
  );

  for (const file of files) {
    const filePath = path.join(PROJECTS_DIR, file);
    const buffer = await sharp(filePath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9 })
      .toBuffer();
    await sharp(buffer).toFile(filePath);
    console.log(`optimized ${file}`);
  }
}

main();
