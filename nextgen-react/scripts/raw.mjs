import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
page.on("console", msg => {
  if (msg.type() === "error") console.log("CONSOLE ERROR:", msg.text());
});
page.on("pageerror", err => console.log("PAGE ERROR:", err.message));
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts && document.fonts.ready);
await page.waitForTimeout(2500); // let all animations finish
// NO style override — exactly what user sees
await page.screenshot({ path: "compare-out/raw-home-top.png" });
await page.evaluate(() => window.scrollTo({ top: 800, behavior: "instant" }));
await page.waitForTimeout(800);
await page.screenshot({ path: "compare-out/raw-home-mid.png" });
// Check .rv state
const stats = await page.evaluate(() => {
  const all = Array.from(document.querySelectorAll(".rv"));
  const hidden = all.filter(el => {
    const cs = getComputedStyle(el);
    return parseFloat(cs.opacity) < 0.5;
  });
  return { total: all.length, hidden: hidden.length, sampleHidden: hidden.slice(0,5).map(el => el.tagName + "." + el.className.slice(0,50) + " op=" + getComputedStyle(el).opacity) };
});
console.log(JSON.stringify(stats, null, 2));
await browser.close();
