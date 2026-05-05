"use client";

function openLegal(kind: "impressum" | "datenschutz") {
  document.dispatchEvent(
    new CustomEvent("legal-modal-open", { detail: kind }),
  );
}

export function Footer() {
  return (
    <footer>
      <div className="fl">
        <span className="footer-meta">NextGen Equity Partners · München · © 2026</span>
        <button type="button" onClick={() => openLegal("impressum")}>
          Impressum
        </button>
        <button type="button" onClick={() => openLegal("datenschutz")}>
          Datenschutz
        </button>
      </div>
    </footer>
  );
}
