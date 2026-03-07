import { existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { create } from "tar";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = dirname(__dirname);

const chromiumBinDir = join(projectRoot, "node_modules", "@sparticuz", "chromium", "bin");
const publicDir = join(projectRoot, "public");
const outputFile = join(publicDir, "chromium-pack.tar");
const chromiumPackFiles = [
  "al2023.tar.br",
  "chromium.br",
  "fonts.tar.br",
  "swiftshader.tar.br",
];

if (!existsSync(chromiumBinDir)) {
  console.warn("Skipping Chromium pack build because @sparticuz/chromium is not installed.");
  process.exit(0);
}

mkdirSync(publicDir, { recursive: true });
rmSync(outputFile, { force: true });

await create(
  {
    cwd: chromiumBinDir,
    file: outputFile,
    portable: true,
  },
  chromiumPackFiles
);

console.log(`Chromium pack created at ${outputFile}`);
