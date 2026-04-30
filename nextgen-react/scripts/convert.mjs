#!/usr/bin/env node
// Mechanical HTML → JSX page converter for NextGen Equity migration.
// Reads an HTML file, extracts the page content (everything between </nav> region
// and <footer>), and writes a Next.js page.tsx file.

import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.cwd(), "..");
const SRC_DIR = ROOT; // "NG Equity Website" folder is parent of nextgen-react
const OUT_BASE = path.resolve(process.cwd(), "app");

// [srcRelative, outRelative]
const PAGES = [
  ["profil.html",            "profil/page.tsx"],
  ["ansatz.html",            "ansatz/page.tsx"],
  ["ki-wertsteigerung.html", "ki-wertsteigerung/page.tsx"],
  ["team.html",              "team/page.tsx"],
  ["beteiligungen.html",     "beteiligungen/page.tsx"],
  ["kontakt.html",           "kontakt/page.tsx"],
  ["en/index.html",          "en/page.tsx"],
  ["en/profil.html",         "en/profil/page.tsx"],
  ["en/ansatz.html",         "en/ansatz/page.tsx"],
  ["en/ki-wertsteigerung.html", "en/ki-wertsteigerung/page.tsx"],
  ["en/team.html",           "en/team/page.tsx"],
  ["en/beteiligungen.html",  "en/beteiligungen/page.tsx"],
  ["en/kontakt.html",        "en/kontakt/page.tsx"],
];

function styleStringToObject(s) {
  // s like "max-width:1100px;text-align:center;padding:16px 36px"
  const decls = s.split(";").map(x => x.trim()).filter(Boolean);
  const out = [];
  for (const d of decls) {
    const i = d.indexOf(":");
    if (i < 0) continue;
    let key = d.slice(0, i).trim();
    let val = d.slice(i + 1).trim();
    // kebab → camel (skip --vars)
    if (!key.startsWith("--")) {
      key = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    } else {
      key = `"${key}"`;
    }
    // numeric values without units stay numbers; otherwise string. Keep simple: always string.
    val = val.replace(/"/g, '\\"');
    out.push(`${key}: "${val}"`);
  }
  return `{{ ${out.join(", ")} }}`;
}

function convert(html, isEN) {
  // 1. Extract body between </nav-mobile> closing and <footer>
  // The original structure has: video, tint, grain, nav, nav-mobile, [page content], footer, modal
  // We strip: <video>, .hero-image-tint, .grain, <nav>, .nav-mobile, <footer>, .imp-backdrop, <script>
  // Easiest: take everything inside <body>, then remove those known blocks.

  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";

  // Remove known global blocks
  body = body.replace(/<video[^>]*id="scroll-video"[^>]*>[\s\S]*?<\/video>/gi, "");
  body = body.replace(/<div\s+class="hero-image-tint"[^>]*>[\s\S]*?<\/div>\s*/gi, "");
  body = body.replace(/<div\s+class="grain"[^>]*>[\s\S]*?<\/div>\s*/gi, "");
  body = body.replace(/<nav\s+class="nav"[\s\S]*?<\/nav>\s*/gi, "");
  body = body.replace(/<div\s+class="nav-mobile"[\s\S]*?<\/div>\s*(?=<!--|<section|<main|<div\s+class="hero|<header)/gi, "");
  // Fallback for nav-mobile: explicit close
  body = body.replace(/<div\s+class="nav-mobile"\s+id="nav-mobile">[\s\S]*?<\/div>\s*/gi, "");
  body = body.replace(/<footer[\s\S]*?<\/footer>\s*/gi, "");
  body = body.replace(/<div\s+class="imp-backdrop"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*/gi, "");
  // Just in case the modal regex above fails, use a tighter one
  body = body.replace(/<!--\s*IMPRESSUM MODAL[\s\S]*$/i, "");
  body = body.replace(/<script[\s\S]*?<\/script>\s*/gi, "");

  // 2. Fix asset paths
  if (isEN) {
    body = body.replace(/\.\.\/assets\//g, "/assets/");
  } else {
    body = body.replace(/(?<!\/)assets\//g, "/assets/");
  }

  // 3. Fix internal links
  // For DE: x.html → /x ; index.html → /
  // For EN: x.html → /en/x ; index.html → /en
  // Be careful not to touch external https links
  if (isEN) {
    body = body.replace(/href="index\.html"/g, 'href="/en"');
    body = body.replace(/href="(\w[\w-]*)\.html"/g, 'href="/en/$1"');
  } else {
    body = body.replace(/href="index\.html"/g, 'href="/"');
    body = body.replace(/href="(\w[\w-]*)\.html"/g, 'href="/$1"');
    // DE pages may also link to EN: en/index.html → /en, en/x.html → /en/x
    body = body.replace(/href="en\/index\.html"/g, 'href="/en"');
    body = body.replace(/href="en\/(\w[\w-]*)\.html"/g, 'href="/en/$1"');
  }

  // 4. class → className
  body = body.replace(/\bclass=/g, "className=");

  // 5. for=  → htmlFor= (forms)
  body = body.replace(/\sfor=/g, " htmlFor=");

  // 6. Self-close void elements: br, hr, img, input, meta, link
  body = body.replace(/<(br|hr)\s*>/gi, "<$1 />");
  body = body.replace(/<(img|input|meta|link)([^>]*?)(?<!\/)>/gi, "<$1$2 />");

  // 7. Inline style="..." → style={{...}}
  body = body.replace(/style="([^"]*)"/g, (_, s) => `style=${styleStringToObject(s)}`);

  // 7b. HTML comments <!-- x --> → JSX {/* x */}
  body = body.replace(/<!--([\s\S]*?)-->/g, (_, c) => `{/*${c.replace(/\*\//g, "* /")}*/}`);

  // 8. HTML entities → JSX equivalents (only those that need it)
  body = body.replace(/&nbsp;/g, "{'\\u00A0'}");
  // Keep &amp; &uuml; etc. as-is — JSX renders them.

  // 9. Boolean attrs need to be JSX-safe: e.g. <video muted playsinline> stays mostly OK
  // playsinline → playsInline (camelCase JSX)
  body = body.replace(/\bplaysinline\b/g, "playsInline");
  body = body.replace(/\bcrossorigin\b/g, "crossOrigin");
  body = body.replace(/\btabindex\b/g, "tabIndex");
  body = body.replace(/\baria-labelledby\b/g, "aria-labelledby"); // already valid
  body = body.replace(/\breadonly\b/g, "readOnly");
  body = body.replace(/\bautocomplete\b/g, "autoComplete");
  body = body.replace(/\bnovalidate\b/g, "noValidate");
  body = body.replace(/\bautofocus\b/g, "autoFocus");
  body = body.replace(/\bmaxlength\b/g, "maxLength");
  body = body.replace(/\bminlength\b/g, "minLength");
  body = body.replace(/\bcolspan\b/g, "colSpan");
  body = body.replace(/\browspan\b/g, "rowSpan");

  // Trim leading/trailing whitespace
  body = body.trim();

  return body;
}

function wrapPage(jsx) {
  return `export default function Page() {
  return (
    <>
${jsx
  .split("\n")
  .map(l => "      " + l)
  .join("\n")}
    </>
  );
}
`;
}

let okCount = 0;
let errCount = 0;
for (const [src, out] of PAGES) {
  const srcPath = path.join(SRC_DIR, src);
  const outPath = path.join(OUT_BASE, out);
  if (!fs.existsSync(srcPath)) {
    console.warn("SKIP (missing):", srcPath);
    errCount++;
    continue;
  }
  try {
    const html = fs.readFileSync(srcPath, "utf8");
    const isEN = src.startsWith("en/");
    const jsx = convert(html, isEN);
    const tsx = wrapPage(jsx);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, tsx);
    console.log("OK:", src, "→", out);
    okCount++;
  } catch (e) {
    console.error("ERR:", src, e.message);
    errCount++;
  }
}
console.log(`\nDone. ${okCount} ok, ${errCount} errors.`);
