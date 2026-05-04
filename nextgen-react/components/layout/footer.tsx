"use client";

function openLegal(kind: "impressum" | "datenschutz") {
  document.dispatchEvent(
    new CustomEvent("legal-modal-open", { detail: kind }),
  );
}

export function Footer() {
  return (
    <footer>
      <div className="fl">NextGen Equity Partners · München · © 2026</div>
      <div className="fr">
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
