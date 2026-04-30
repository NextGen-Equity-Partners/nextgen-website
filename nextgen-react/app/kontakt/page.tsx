import { ContactForm } from "@/components/forms/contact-form";

export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Kontakt aufnehmen</div>
        <h1 className="display hero-title">
          <span className="hero-line">Schreiben Sie uns –</span>
          <span className="hero-line"><span className="bold">vertraulich.</span></span>
        </h1>
        <p className="hero-sub">Ob Unternehmer, Geschäftsführer, Manager oder M&amp;A-Berater – wir freuen uns über ein erstes Gespräch. Diskretion und Verlässlichkeit sind selbstverständlich.</p>
      </section>
      
      {/* KONTAKT-FORMULAR */}
      <section className="pane" style={{ paddingTop: "48px", paddingBottom: "clamp(120px,12vw,180px)" }}>
        <div className="pane-inner">
          <div className="cf-wrap" style={{ marginTop: "0" }}>
            <ContactForm />
      
            <div className="cf-side rv rv-d1">
              <div className="cf-block cf-greeting">
                <img className="cf-portrait" src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
                <div className="cf-eyebrow">Wir freuen uns</div>
                <h4>Auf Ihre Nachricht.</h4>
                <p>Schreiben Sie uns kurz, was Sie beschäftigt – wir melden uns persönlich zurück. Diskret und ohne Verpflichtung.</p>
                <p className="cf-signature">– Maximilian Göppert<br /><span>Partner, NextGen Equity</span></p>
              </div>
            </div>
          </div>
      
          {/* Kontakt-Info: zwei Bubbles unter Form + Max */}
          <div className="cf-bottom">
            <div className="cf-bottom-block rv rv-d2">
              <div className="cf-eyebrow">Direkter Kontakt</div>
              <p>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
            </div>
            <div className="cf-bottom-block rv rv-d3">
              <div className="cf-eyebrow">Standort</div>
              <p>München, Deutschland<br />Für den gesamten DACH-Raum: Deutschland · Österreich · Schweiz</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
