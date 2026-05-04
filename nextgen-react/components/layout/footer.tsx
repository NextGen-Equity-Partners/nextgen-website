"use client";

function openLegal(kind: "impressum" | "datenschutz") {
  document.dispatchEvent(
    new CustomEvent("legal-modal-open", { detail: kind }),
  );
}

export function Footer() {
  return (
    <footer>
      <div className="fl">NextGen Equity Partners GmbH · München</div>
      <div className="fm">© 2026 · Alle Rechte vorbehalten</div>
      <div className="fr">
        <button type="button" onClick={() => openLegal("impressum")}>
          Impressum
        </button>
        <button type="button" onClick={() => openLegal("datenschutz")}>
          Datenschutz
        </button>
        <a href="/kontakt">Kontakt</a>
      </div>
    </footer>
  );
}
