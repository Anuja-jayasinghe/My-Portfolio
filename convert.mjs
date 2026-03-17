import fs from 'fs';
import { execSync } from 'child_process';
const files = fs.readdirSync('public/projects').filter(f => f.endsWith('.png'));
for (const f of files) {
  console.log(`Converting ${f}...`);
  execSync(`npx -y cwebp-bin public/projects/${f} -o public/projects/${f.replace('.png', '.webp')}`);
  fs.unlinkSync(`public/projects/${f}`);
}
console.log("Done!");
