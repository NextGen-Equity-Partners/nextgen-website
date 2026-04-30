import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo({ top: 850, behavior: "instant" }));
await page.waitForTimeout(1500);
const cs = await page.evaluate(() => {
  const hm = document.querySelector(".hero-mark");
  if (!hm) return null;
  const cs = getComputedStyle(hm);
  return {
    classes: hm.className,
    opacity: cs.opacity,
    transform: cs.transform,
    visibility: cs.visibility,
    display: cs.display,
    rect: hm.getBoundingClientRect(),
  };
});
console.log(JSON.stringify(cs, null, 2));
await browser.close();
