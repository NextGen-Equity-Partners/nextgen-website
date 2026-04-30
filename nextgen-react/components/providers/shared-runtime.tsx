"use client";

import { useEffect } from "react";

/**
 * Loads /public/shared.js the old-fashioned way: inject a <script> tag on
 * mount. Next 16's <Script strategy="afterInteractive"> emits a preload <link>
 * but (currently) skips inserting the actual <script>, leaving .rv reveals
 * stuck at opacity 0 across the whole site.
 */
export function SharedRuntime() {
  useEffect(() => {
    if (document.getElementById("ng-shared-runtime")) return;
    const s = document.createElement("script");
    s.id = "ng-shared-runtime";
    s.src = "/shared.js";
    s.async = false;
    document.body.appendChild(s);
  }, []);
  return null;
}
