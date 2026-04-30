// Visual verification across desktop / tablet / mobile after V6 changes.
// Captures: top-of-page (hero with watermark), mid-scroll (header glass), and full-page.

import { chromium, devices } from "playwright";
import path from "node:path";
import fs from "node:fs";

const BASE = "http://127.0.0.1:3060";
const OUT = path.resolve(process.cwd(), "compare-out");
fs.mkdirSync(OUT, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", ctx: { viewport: { width: 1280, height: 800 } } },
  { name: "ipad",    ctx: devices["iPad Pro 11"] },
  { name: "iphone",  ctx: devices["iPhone 14 Pro"] },
];

const PAGES = [
  ["home",    "/"],
  ["profil",  "/profil"],
  ["team",    "/team"],
  ["kontakt", "/kontakt"],
];

const browser = await chromium.launch();

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext(vp.ctx);
  const page = await ctx.newPage();
  for (const [name, url] of PAGES) {
    await page.goto(BASE + url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(1000);

    // 1) Top of page (hero, watermark visible, header transparent)
    await page.screenshot({ path: path.join(OUT, `${vp.name}-${name}-top.png`) });

    // 2) After scroll: header should be glassy, watermark gone
    await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, `${vp.name}-${name}-scrolled.png`) });
  }
  await ctx.close();
  console.log(vp.name, "done");
}

// Index page
const html = `<!doctype html><html><head><meta charset="utf-8"><title>V6 verify</title>
<style>body{margin:0;padding:24px;background:#111;color:#eee;font-family:system-ui;}
h2{margin:24px 0 8px;font-size:16px} h3{margin:12px 0 4px;font-size:13px;color:#aaa}
.row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.col{border:1px solid #333} .col img{width:100%;display:block}
</style></head><body>
<h1>V6 Visual Check — Header Glass + Watermark Animation + Mobile</h1>
${VIEWPORTS.map(vp =>
  PAGES.map(([n]) => `
    <h2>${vp.name} · ${n}</h2>
    <div class="row">
      <div class="col"><h3>top (hero, watermark)</h3><img src="${vp.name}-${n}-top.png"></div>
      <div class="col"><h3>scrolled 600px (header glass)</h3><img src="${vp.name}-${n}-scrolled.png"></div>
    </div>
  `).join("")
).join("")}
</body></html>`;
fs.writeFileSync(path.join(OUT, "v6-check.html"), html);

await browser.close();
console.log(`\nReport: ${path.join(OUT, "v6-check.html")}`);
