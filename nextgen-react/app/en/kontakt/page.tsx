export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Get in touch</div>
        <h1 className="display hero-title">
          <span className="hero-line">Write to us —</span>
          <span className="hero-line"><span className="bold">confidentially.</span></span>
        </h1>
        <p className="hero-sub">Whether you are an entrepreneur, managing director, manager, or M&amp;A advisor — we look forward to a first conversation. Discretion and reliability are a given.</p>
      </section>
      
      {/* KONTAKT-FORMULAR */}
      <section className="pane" style={{ paddingTop: "48px", paddingBottom: "clamp(120px,12vw,180px)" }}>
        <div className="pane-inner">
          <div className="cf-wrap" style={{ marginTop: "0" }}>
            <form className="cf rv" id="contact-form">
              <div className="cf-row">
                <div>
                  <label htmlFor="cf-name">Name *</label>
                  <input id="cf-name" name="name" type="text" placeholder="Jane Smith" required />
                </div>
                <div>
                  <label htmlFor="cf-company">Company</label>
                  <input id="cf-company" name="company" type="text" placeholder="Acme Corp" />
                </div>
              </div>
              <div className="cf-row">
                <div>
                  <label htmlFor="cf-email">Email *</label>
                  <input id="cf-email" name="email" type="email" placeholder="jane@acme.com" required />
                </div>
                <div>
                  <label htmlFor="cf-topic">Subject</label>
                  <select id="cf-topic" name="topic">
                    <option>Please select</option>
                    <option>Sale of a company</option>
                    <option>Co-investment</option>
                    <option>Advisory / network</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="cf-row full">
                <div>
                  <label htmlFor="cf-msg">Short message</label>
                  <textarea id="cf-msg" name="message" placeholder="How can we help?"></textarea>
                </div>
              </div>
              <button type="submit" className="cf-submit">Schedule a non-binding conversation →</button>
            </form>
      
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
              <div className="cf-eyebrow">Direct contact</div>
              <p>Email: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
            </div>
            <div className="cf-bottom-block rv rv-d3">
              <div className="cf-eyebrow">Location</div>
              <p>Munich, Germany<br />Serving all of DACH: Germany · Austria · Switzerland</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
