import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const pages = ["/", "/profil", "/ansatz", "/ki-wertsteigerung", "/team", "/beteiligungen", "/kontakt"];
for (const p of pages) {
  const name = p === "/" ? "home" : p.slice(1);
  await page.goto("http://127.0.0.1:3060" + p, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  await page.waitForTimeout(1200);
  await page.addStyleTag({ content: ".rv{opacity:1!important;transform:none!important}" });
  await page.waitForTimeout(400);
  await page.screenshot({ path: `compare-out/page-${name}.png`, fullPage: true });
  console.log(name, "ok");
}
await browser.close();
