import { chromium, devices } from "playwright";
const browser = await chromium.launch();

// Desktop audit
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);

// 1) hero (initial state, watermark visible, animations done)
await page.screenshot({ path: "compare-out/audit-1-hero.png" });

// 2) scroll-mid: header glassed, watermark dodged but visible (faded)
await page.evaluate(() => window.scrollTo({ top: 950, behavior: "instant" }));
await page.waitForTimeout(900);
await page.screenshot({ path: "compare-out/audit-2-mid.png" });

// 3) Animations playground page
await page.goto("http://127.0.0.1:3060/animations", { waitUntil: "networkidle" });
await page.waitForTimeout(3000);
await page.screenshot({ path: "compare-out/audit-3-anim-top.png", fullPage: false });
await page.screenshot({ path: "compare-out/audit-4-anim-full.png", fullPage: true });

// Check ".rv.on" count (shared.js sanity)
await page.goto("http://127.0.0.1:3060/", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);
await page.evaluate(() => window.scrollTo({ top: 1500, behavior: "instant" }));
await page.waitForTimeout(1500);
const r = await page.evaluate(() => ({
  rvTotal: document.querySelectorAll(".rv").length,
  rvOn: document.querySelectorAll(".rv.on").length,
  hmClasses: document.querySelector(".hero-mark")?.className,
}));
console.log(JSON.stringify(r));

await browser.close();
