export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Portfolio · DACH Mittelstand</div>
        <h1 className="display hero-title">
          <span className="hero-line">Our</span>
          <span className="hero-line"><span className="bold">portfolio.</span></span>
        </h1>
        <p className="hero-sub">We build company groups in Business and Professional Services — with our own capital, technical expertise, and long-term partnership.</p>
      </section>
      
      {/* COMING SOON */}
      <section className="pane">
        <div className="pane-inner" style={{ textAlign: "center" }}>
          <div className="s-tag rv" style={{ justifyContent: "center" }}>Portfolio in the making</div>
          <h2 className="display rv" style={{ maxWidth: "760px", margin: "0 auto" }}>Currently <span className="bold">no portfolio yet.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "620px", margin: "24px auto 0" }}>
            NextGen Equity is a young, self-funded setup. We will communicate concrete investments transparently as soon as they close — with names, people, and an honest picture of the collaboration.
          </p>
          <p className="body-text rv rv-d2" style={{ maxWidth: "620px", margin: "14px auto 0" }}>
            Until then: if you have a company or a mandate that could fit our profile, we look forward to a conversation.
          </p>
          <div className="rv rv-d3" style={{ marginTop: "36px" }}>
            <a href="/en/kontakt" className="btn btn-light">Let's talk →</a>
          </div>
          <img className="media-rounded rv rv-d4" src="/assets/photos/erika-U6GYjO-9jBM-unsplash.jpg" alt="" aria-hidden="true" style={{ margin: "48px auto 0", maxWidth: "680px", height: "280px" }} />
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* INVESTMENT-KRITERIEN */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Investment criteria</div>
          <h2 className="display rv">What we <span className="bold">look for.</span></h2>
          <div className="glass-grid cols-2">
            <div className="glass-card rv rv-d1" style={{ minHeight: "340px" }}>
              <div className="num">Profil</div>
              <div>
                <h3 style={{ marginBottom: "18px" }}>What we look for.</h3>
                <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2", color: "rgba(249,247,244,.78)", fontWeight: "300" }}>
                  <li>· Industries: Business Services and Professional Services</li>
                  <li>· Platform investments: €10–100 M revenue</li>
                  <li>· Add-on acquisitions: €3–10 M revenue</li>
                  <li>· Healthy companies with growth perspective</li>
                  <li>· Fragmented markets where consolidation makes sense</li>
                </ul>
              </div>
            </div>
            <div className="glass-card rv rv-d2" style={{ minHeight: "340px" }}>
              <div className="num">Terms</div>
              <div>
                <h3 style={{ marginBottom: "18px" }}>How we invest.</h3>
                <ul style={{ listStyle: "none", fontSize: "14px", lineHeight: "2", color: "rgba(249,247,244,.78)", fontWeight: "300" }}>
                  <li>· Majority stakes</li>
                  <li>· Succession solutions, corporate carve-outs, growth financing</li>
                  <li>· Region: Germany, Austria, Switzerland</li>
                  <li>· Partnership, long-term, with our own capital</li>
                  <li>· No bidding wars — binding processes</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="rv rv-d3" style={{ marginTop: "48px" }}>
            <a href="/en/kontakt" className="btn btn-light">Briefly describe your company →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
