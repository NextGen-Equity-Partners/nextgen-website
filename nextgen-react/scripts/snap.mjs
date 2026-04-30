// Quick snapshot of the new home page (with shader + 3D shards)
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";

const OUT = path.resolve(process.cwd(), "compare-out");
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();

// V6 home (with shader + 3D)
await page.goto("http://127.0.0.1:3030/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(1500); // let WebGL initialize
await page.addStyleTag({ content: ".rv{opacity:1!important;transform:none!important}" });
await page.waitForTimeout(400);
await page.screenshot({ path: path.join(OUT, "v6-home-full.png"), fullPage: true });

// Just the hero (top viewport)
await page.screenshot({ path: path.join(OUT, "v6-home-hero.png"), fullPage: false });

// Scroll to story-break to capture 3D shards
await page.evaluate(() => {
  const el = document.querySelector(".story-break");
  el?.scrollIntoView({ behavior: "instant", block: "center" });
});
await page.waitForTimeout(1500);
await page.screenshot({ path: path.join(OUT, "v6-home-shards.png"), fullPage: false });

await browser.close();
console.log("v6 snapshots saved to", OUT);
