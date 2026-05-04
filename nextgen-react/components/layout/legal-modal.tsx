"use client";

import { useEffect, useState } from "react";

type LegalKey = "impressum" | "datenschutz";

const CONTENT: Record<LegalKey, { title: string; html: string }> = {
  impressum: {
    title: "Impressum",
    html: `
      <section>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>NextGen Equity Partners GmbH<br>München, Deutschland</p>
      </section>
      <section>
        <h3>Vertreten durch die Geschäftsführer</h3>
        <p>Maximilian Göppert<br>Leander Heyken<br>Dr. Amon Göppert</p>
      </section>
      <section>
        <h3>Kontakt</h3>
        <p>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
      </section>
      <section>
        <h3>Registereintrag</h3>
        <p>Eingetragen im Handelsregister.<br>Registergericht: Amtsgericht München<br>Registernummer: HRB 312075</p>
      </section>
      <section>
        <h3>Umsatzsteuer-Identifikationsnummer</h3>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE –</p>
      </section>
      <section>
        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
        <p>Maximilian Göppert<br>NextGen Equity Partners GmbH<br>München, Deutschland</p>
      </section>
      <section>
        <h3>EU-Streitschlichtung</h3>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      </section>
      <section>
        <h3>Verbraucherstreitbeilegung</h3>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>
      <section>
        <h3>Haftung für Inhalte</h3>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </section>
      <section>
        <h3>Haftung für Links</h3>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
      </section>
      <section>
        <h3>Urheberrecht</h3>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.</p>
      </section>
      <section>
        <h3>Bildnachweise</h3>
        <p>Hintergrund- und Bildmaterial: Unsplash sowie Pexels (jeweilige Lizenzen der Plattformen).</p>
      </section>
    `,
  },
  datenschutz: {
    title: "Datenschutzerklärung",
    html: `
      <section>
        <h3>1. Datenschutz auf einen Blick</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen finden Sie in den nachfolgenden Abschnitten.</p>
      </section>
      <section>
        <h3>2. Verantwortliche Stelle</h3>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:<br><br>NextGen Equity Partners GmbH<br>München, Deutschland<br>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
        <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
      </section>
      <section>
        <h3>3. Erfassung von Daten beim Besuch der Website (Server-Log-Files)</h3>
        <p>Beim Aufruf dieser Website erhebt unser Hosting-Provider automatisch Informationen, die Ihr Browser an unseren Server übermittelt:<br>· IP-Adresse des anfragenden Rechners<br>· Datum und Uhrzeit des Zugriffs<br>· Name und URL der abgerufenen Datei<br>· Übertragene Datenmenge<br>· Meldung über erfolgreichen Abruf<br>· Browsertyp, Browserversion und Betriebssystem<br>· Referrer-URL</p>
        <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aus unserem berechtigten Interesse an einer technisch fehlerfreien Darstellung und Optimierung unserer Website. Die Daten werden nach spätestens 30 Tagen gelöscht, sofern keine sicherheitsrelevanten Vorfälle eine längere Speicherung erfordern.</p>
      </section>
      <section>
        <h3>4. Kontaktformular und Kontaktaufnahme per E-Mail</h3>
        <p>Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden Ihre Angaben (Name, Unternehmen, E-Mail-Adresse, Anliegen, Nachricht) zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
        <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Durchführung vorvertraglicher Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Bearbeitung). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p>Die Daten werden gelöscht, sobald sie für den Zweck ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
      </section>
      <section>
        <h3>5. Cookies</h3>
        <p>Diese Website verwendet derzeit ausschließlich technisch notwendige Cookies, soweit überhaupt Cookies eingesetzt werden. Diese sind erforderlich, um grundlegende Funktionen der Seite bereitzustellen, und werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Es findet keine Auswertung Ihres Nutzerverhaltens für Marketing- oder Analysezwecke statt.</p>
      </section>
      <section>
        <h3>6. Externe Dienste · Schriftarten</h3>
        <p>Die Schriftart ("Outfit") wird lokal über die Anwendung ausgeliefert. Beim Aufruf der Website wird keine Verbindung zu einem Google-Fonts-CDN hergestellt.</p>
      </section>
      <section>
        <h3>7. SSL-/TLS-Verschlüsselung</h3>
        <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und am Schloss-Symbol in Ihrer Browserzeile.</p>
      </section>
      <section>
        <h3>8. Ihre Rechte als betroffene Person</h3>
        <p>Sie haben jederzeit folgende Rechte:<br>· Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)<br>· Berichtigung unrichtiger Daten (Art. 16 DSGVO)<br>· Löschung Ihrer Daten ("Recht auf Vergessenwerden", Art. 17 DSGVO)<br>· Einschränkung der Verarbeitung (Art. 18 DSGVO)<br>· Datenübertragbarkeit (Art. 20 DSGVO)<br>· Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)<br>· Widerruf einer einmal erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</p>
        <p>Wenden Sie sich für Ihre Anfragen formlos an: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a>. Eine Bearbeitung erfolgt zeitnah.</p>
      </section>
      <section>
        <h3>9. Beschwerderecht bei der Aufsichtsbehörde</h3>
        <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig für uns ist:<br><br>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br>Promenade 18, 91522 Ansbach<br><a href="https://www.lda.bayern.de" target="_blank" rel="noopener">www.lda.bayern.de</a></p>
      </section>
      <section>
        <h3>10. Aktualität und Änderung dieser Datenschutzerklärung</h3>
        <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 2026. Durch die Weiterentwicklung der Website oder geänderte gesetzliche Vorgaben kann es notwendig werden, diese Erklärung anzupassen. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.</p>
      </section>
    `,
  },
};

export function LegalModal() {
  const [active, setActive] = useState<LegalKey | null>(null);

  useEffect(() => {
    // Direct opener — dispatched by the footer's client-side buttons.
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<LegalKey>).detail;
      if (detail && CONTENT[detail]) setActive(detail);
    };
    // Fallback for any legacy [data-modal] markup elsewhere.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("[data-modal]");
      if (!target) return;
      const key = target.getAttribute("data-modal") as LegalKey | null;
      if (key && CONTENT[key]) {
        e.preventDefault();
        setActive(key);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    document.addEventListener("legal-modal-open", onOpen);
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("legal-modal-open", onOpen);
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const open = active !== null;
  const data = active ? CONTENT[active] : null;

  return (
    <div className={`imp-backdrop${open ? " open" : ""}`} onClick={(e) => {
      if (e.target === e.currentTarget) setActive(null);
    }}>
      <div className="imp-panel" data-lenis-prevent>
        <button className="imp-close" aria-label="Schließen" onClick={() => setActive(null)}>✕</button>
        <div className="imp-eyebrow">Rechtliches</div>
        <div className="imp-title">{data?.title ?? "Impressum"}</div>
        <div className="imp-body" dangerouslySetInnerHTML={{ __html: data?.html ?? "" }} />
      </div>
    </div>
  );
}
