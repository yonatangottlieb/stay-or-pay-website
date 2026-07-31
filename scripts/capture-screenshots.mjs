import puppeteer from "puppeteer";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, "..", "preview");
const baseUrl = "http://localhost:4173";

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });

async function capture(name, width, height, locale) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 });
  const url =
    locale === "he"
      ? `${baseUrl}/?lang=he`
      : `${baseUrl}/?lang=en`;
  await page.goto(url, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts?.ready);
  await page.screenshot({
    path: path.join(outDir, `${name}.png`),
    fullPage: true,
  });
  const errors = await page.evaluate(() => {
    return window.__consoleErrors || [];
  });
  await page.close();
  return errors;
}

const shots = [
  ["desktop-en", 1440, 900, "en"],
  ["mobile-en", 390, 844, "en"],
  ["desktop-he", 1440, 900, "he"],
  ["mobile-he", 390, 844, "he"],
  ["product-visual-en", 1440, 900, "en"],
  ["cta-en", 1440, 900, "en"],
];

for (const [name, w, h, locale] of shots) {
  if (name === "product-visual-en") {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto(`${baseUrl}/?lang=en`, { waitUntil: "networkidle0" });
    const el = await page.$("#product");
    if (el) {
      await el.screenshot({ path: path.join(outDir, `${name}.png`) });
    }
    await page.close();
    console.log(`Saved ${name}.png`);
    continue;
  }

  if (name === "cta-en") {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 2 });
    await page.goto(`${baseUrl}/?lang=en`, { waitUntil: "networkidle0" });
    const el = await page.$("#coming-soon");
    if (el) {
      await el.screenshot({ path: path.join(outDir, `${name}.png`) });
    }
    await page.close();
    console.log(`Saved ${name}.png`);
    continue;
  }

  await capture(name, w, h, locale);
  console.log(`Saved ${name}.png`);
}

await browser.close();
console.log(`Screenshots saved to ${outDir}`);
