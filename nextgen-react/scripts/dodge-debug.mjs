import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
page.on("console", msg => console.log("[" + msg.type() + "]", msg.text()));
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

await page.evaluate(() => window.scrollTo({ top: 850, behavior: "instant" }));
await page.waitForTimeout(900);

const debug = await page.evaluate(() => {
  const hm = document.querySelector(".hero-mark");
  if (!hm) return "no watermark";
  const probeW = 140, probeH = 96, margin = 24;
  const probeR = window.innerWidth - margin;
  const probeL = probeR - probeW;
  const probeB = window.innerHeight - margin;
  const probeT = probeB - probeH;
  const colliders = Array.from(document.querySelectorAll(".pane, .glass-card, .story-break, .slogan-break, footer, .kontakt-teaser-pane"));
  const results = colliders.map(c => {
    const cr = c.getBoundingClientRect();
    const horiz = !(cr.right < probeL || cr.left > probeR);
    const vert = !(cr.bottom < probeT || cr.top > probeB);
    return { cls: c.className.slice(0,40), rect: { l: cr.left|0, r: cr.right|0, t: cr.top|0, b: cr.bottom|0 }, hit: horiz && vert };
  });
  return {
    hasDodgedClass: hm.classList.contains("dodged"),
    probe: { L: probeL, R: probeR, T: probeT, B: probeB },
    visibleHits: results.filter(r => r.hit).slice(0, 5),
    totalColliders: colliders.length,
  };
});
console.log(JSON.stringify(debug, null, 2));
await browser.close();
