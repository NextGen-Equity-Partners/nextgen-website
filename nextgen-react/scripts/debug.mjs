import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
page.on("console", msg => console.log("[" + msg.type() + "]", msg.text()));
page.on("pageerror", err => console.log("[pageerror]", err.message));
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
const result = await page.evaluate(() => {
  const sharedLoaded = !!window.openLegalModal || typeof window.LEGAL_CONTENT !== "undefined";
  const rvCount = document.querySelectorAll(".rv").length;
  const onCount = document.querySelectorAll(".rv.on").length;
  return { sharedLoaded, rvCount, onCount, scriptsInPage: Array.from(document.scripts).map(s => s.src).filter(s => s.includes("shared")) };
});
console.log("RESULT:", JSON.stringify(result, null, 2));
// Now scroll
await page.evaluate(() => window.scrollTo({ top: 600, behavior: "instant" }));
await page.waitForTimeout(800);
const after = await page.evaluate(() => ({
  rvCount: document.querySelectorAll(".rv").length,
  onCount: document.querySelectorAll(".rv.on").length,
}));
console.log("AFTER SCROLL:", JSON.stringify(after));
await browser.close();
