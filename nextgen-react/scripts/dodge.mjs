import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2500);

// 1) hero state — watermark visible
await page.screenshot({ path: "compare-out/dodge-1-hero.png" });

// 2) start of pane — watermark should fold in
await page.evaluate(() => window.scrollTo({ top: 850, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "compare-out/dodge-2-pane.png" });

// 3) story-break (full-width text only — watermark might come back briefly)
await page.evaluate(() => window.scrollTo({ top: 1750, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "compare-out/dodge-3-storybreak.png" });

await browser.close();
console.log("ok");
