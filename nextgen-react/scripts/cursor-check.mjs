import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);
// Move mouse to trigger any cursor logic
await page.mouse.move(640, 400);
await page.waitForTimeout(500);
const data = await page.evaluate(() => {
  const result = {};
  const samples = {
    body: document.body,
    p: document.querySelector(".hero-sub"),
    a: document.querySelector(".hero-ctas a"),
    h1: document.querySelector(".hero-title"),
    button: document.querySelector(".nav-cta"),
  };
  for (const [k, el] of Object.entries(samples)) {
    if (el) result[k] = getComputedStyle(el).cursor;
  }
  result.bodyClasses = document.body.className;
  return result;
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
