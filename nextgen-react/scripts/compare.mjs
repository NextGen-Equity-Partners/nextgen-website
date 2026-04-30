#!/usr/bin/env node
// Side-by-side visual comparison of Original (4173) vs Next (3030).
// Produces full-page screenshots and a small HTML index for inspection.

import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const ORIG_BASE = "http://127.0.0.1:4173";
const NEXT_BASE = "http://127.0.0.1:3030";

const PAGES = [
  ["home",            "/index.html",                    "/"],
  ["profil",          "/profil.html",                   "/profil"],
  ["ansatz",          "/ansatz.html",                   "/ansatz"],
  ["ki",              "/ki-wertsteigerung.html",        "/ki-wertsteigerung"],
  ["team",            "/team.html",                     "/team"],
  ["beteiligungen",   "/beteiligungen.html",            "/beteiligungen"],
  ["kontakt",         "/kontakt.html",                  "/kontakt"],
  ["en-home",         "/en/index.html",                 "/en"],
  ["en-profil",       "/en/profil.html",                "/en/profil"],
  ["en-ansatz",       "/en/ansatz.html",                "/en/ansatz"],
  ["en-ki",           "/en/ki-wertsteigerung.html",     "/en/ki-wertsteigerung"],
  ["en-team",         "/en/team.html",                  "/en/team"],
  ["en-beteiligungen","/en/beteiligungen.html",         "/en/beteiligungen"],
  ["en-kontakt",      "/en/kontakt.html",               "/en/kontakt"],
];

const OUT = path.resolve(process.cwd(), "compare-out");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

async function captureFullPage(page, url, file) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 30000 });
  // Wait for fonts
  await page.evaluate(() => document.fonts && document.fonts.ready);
  // Force all reveal-on-scroll elements to "on" so we don't depend on scroll position
  await page.addStyleTag({
    content: `
      .rv { opacity: 1 !important; transform: none !important; }
      .rv.on { opacity: 1 !important; }
      /* Pause hero video at frame 0 for deterministic screenshots */
      video.hero-image-bg { visibility: hidden; }
    `,
  });
  // Tiny settle
  await page.waitForTimeout(400);
  await page.screenshot({ path: file, fullPage: true });
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();

  const rows = [];
  for (const [name, origPath, nextPath] of PAGES) {
    const origFile = path.join(OUT, `${name}-orig.png`);
    const nextFile = path.join(OUT, `${name}-next.png`);
    let origErr = null, nextErr = null;
    try { await captureFullPage(page, ORIG_BASE + origPath, origFile); }
    catch (e) { origErr = e.message; }
    try { await captureFullPage(page, NEXT_BASE + nextPath, nextFile); }
    catch (e) { nextErr = e.message; }
    rows.push({ name, origPath, nextPath, origErr, nextErr });
    console.log(`${name}: orig=${origErr ? "ERR" : "ok"} next=${nextErr ? "ERR" : "ok"}`);
  }
  await browser.close();

  // Write a simple HTML index for browsing
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>Compare</title>
<style>
body{margin:0;padding:24px;background:#111;color:#eee;font-family:system-ui,sans-serif}
h2{margin:32px 0 12px;font-size:18px}
.row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:32px}
.col{border:1px solid #333;background:#000}
.col h3{margin:0;padding:8px;background:#222;font-size:13px}
.col img{display:block;width:100%;height:auto}
.err{color:#f88;padding:8px}
.legend{display:flex;gap:24px;margin-bottom:24px;font-size:14px}
.legend span{padding:6px 10px;background:#222;border-radius:4px}
</style></head><body>
<h1>NextGen Equity – Side-by-Side</h1>
<div class="legend">
<span>Links: Original (4173)</span>
<span>Rechts: Next.js (3030)</span>
</div>
${rows.map(r => `
<h2>${r.name} <span style="color:#888;font-weight:400">${r.origPath} ↔ ${r.nextPath}</span></h2>
<div class="row">
  <div class="col"><h3>Original</h3>${r.origErr ? `<div class="err">${r.origErr}</div>` : `<img src="${r.name}-orig.png">`}</div>
  <div class="col"><h3>Next.js</h3>${r.nextErr ? `<div class="err">${r.nextErr}</div>` : `<img src="${r.name}-next.png">`}</div>
</div>`).join("\n")}
</body></html>`;
  fs.writeFileSync(path.join(OUT, "index.html"), html);
  console.log(`\nDone. Open: ${path.join(OUT, "index.html")}`);
})();
