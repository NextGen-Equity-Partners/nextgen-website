import { chromium, devices } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(process.cwd(), "compare-out");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

// iPhone 14 Pro
const ctx = await browser.newContext({ ...devices["iPhone 14 Pro"] });
const page = await ctx.newPage();

const URLS = [
  ["mobile-home",     "/"],
  ["mobile-profil",   "/profil"],
  ["mobile-team",     "/team"],
  ["mobile-kontakt",  "/kontakt"],
];

for (const [name, url] of URLS) {
  await page.goto("http://127.0.0.1:3060" + url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(800);
  await page.addStyleTag({ content: ".rv{opacity:1!important;transform:none!important}" });
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
  console.log(name, "ok");
}

// Also iPad
const ctx2 = await browser.newContext({ ...devices["iPad Pro 11"] });
const page2 = await ctx2.newPage();
await page2.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page2.evaluate(() => document.fonts && document.fonts.ready);
await page2.waitForTimeout(800);
await page2.addStyleTag({ content: ".rv{opacity:1!important;transform:none!important}" });
await page2.waitForTimeout(300);
await page2.screenshot({ path: path.join(OUT, "ipad-home.png"), fullPage: true });
console.log("ipad ok");

await browser.close();
