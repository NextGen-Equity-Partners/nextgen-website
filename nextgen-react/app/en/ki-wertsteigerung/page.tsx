export default function Page() {
  return (
    <>
      {/* NAV */}
      {/* HERO */}
      <section className="hero subpage">
        <div className="hero-eyebrow">Differentiation · Technology · Value creation</div>
        <h1 className="display hero-title">
          <span className="hero-line">Digitalization that</span>
          <span className="hero-line">lands in <span className="bold">operations.</span></span>
        </h1>
        <p className="hero-sub">Whether and how a Mittelstand company integrates digital tools into its business will make a noticeable difference in the coming years — in margin, speed, and attractiveness as an employer. We have been seriously engaged for years with how to make it work in practice.</p>
      </section>
      
      {/* DIFFERENZIERUNG + TABELLE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">Our approach</div>
              <h2 className="display rv">An in-house team. <span className="bold">Directly inside the business.</span></h2>
              <p className="body-text rv rv-d1" style={{ marginTop: "24px", marginBottom: "18px" }}>We have an in-house team of engineers and developers that works directly inside our group's companies. Not external consultants who deliver a report and leave. The same people who design a solution also implement it — and stay until it works in daily operations.</p>
              <p className="body-text rv rv-d2">We build our technical expertise in-house and deploy it inside the companies. A combination that is rare in the DACH Mittelstand.</p>
            </div>
            <div className="cmp-grid" style={{ gridTemplateColumns: "1fr", gap: "14px", marginTop: "0" }}>
              <article className="cmp-card rv rv-d1">
                <div className="cmp-num">01</div>
                <h3 className="cmp-headline">Technical due diligence<br />with our own tools.</h3>
                <p className="cmp-counter"><span className="cmp-vs">We understand a company from inside too</span> — how the processes run, where digitalization actually takes hold, and where it doesn't make sense.</p>
              </article>
              <article className="cmp-card rv rv-d2">
                <div className="cmp-num">02</div>
                <h3 className="cmp-headline">Anchored in operations.<br />Measurable.</h3>
                <p className="cmp-counter"><span className="cmp-vs">No buzzword</span>, no slide deck on a shelf. Concrete execution, directly in the company's workflows.</p>
              </article>
              <article className="cmp-card rv rv-d3">
                <div className="cmp-num">03</div>
                <h3 className="cmp-headline">Depth over<br />breadth.</h3>
                <p className="cmp-counter"><span className="cmp-vs">We focus on a few industries</span> we genuinely know — instead of staying superficial as a generalist across many.</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* 3 KERNBEREICHE */}
      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">Where digitalization works</div>
          <h2 className="display rv">Three areas where we <span className="bold">work concretely.</span></h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: "700px", marginTop: "24px" }}>Instead of putting digitalization as a buzzword over a company, we work on three clearly separated levels — each with its own focus and measurable outcomes.</p>
      
          <div className="aaa-diagram">
      
            {/* Management Level */}
            <div className="aaa-row management rv rv-d1">
              <div className="aaa-label">
                <div className="num">01 · Management</div>
                <h3>Control and overview</h3>
                <p>Data-driven decisions instead of gut feel — a clear picture of what is really happening in the company.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Reporting</div>
                  <div className="tool-desc">Integrated, automated BI across finance, HR & CRM.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">AI finance forecasting</div>
                  <div className="tool-desc">Forecasts for cash flow, order intake, and capacity.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">CPQ terminal</div>
                  <div className="tool-desc">AI-supported, rapid quote generation.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Outcome</div>
                <ul>
                  <li>More transparency</li>
                  <li>Data-driven decisions</li>
                  <li>Bottleneck processes eased</li>
                </ul>
              </div>
            </div>
      
            {/* Core Operations Level */}
            <div className="aaa-row core rv rv-d2">
              <div className="aaa-label">
                <div className="num">02 · Core Operations</div>
                <h3>In the core business</h3>
                <p>Deep in daily operations — tailored to industry and process. Higher quality, faster cycles.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Generative routing</div>
                  <div className="tool-desc">GenAI routing of technical infrastructure (example: construction planning).</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">NormCheck</div>
                  <div className="tool-desc">Matching against norms and standards in planning documents.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Audit Copilot</div>
                  <div className="tool-desc">AI-supported audit planning and reporting engine.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Outcome</div>
                <ul>
                  <li>Higher output quality</li>
                  <li>Knowledge made accessible</li>
                  <li>Faster planning and execution cycles</li>
                </ul>
              </div>
            </div>
      
            {/* Support Functions Level */}
            <div className="aaa-row support rv rv-d3">
              <div className="aaa-label">
                <div className="num">03 · Support Functions</div>
                <h3>Cross-cutting functions</h3>
                <p>Back office relieved, risk reduced, more time for what truly matters.</p>
              </div>
              <div className="aaa-tools">
                <div className="aaa-tool">
                  <div className="tool-name">Procurement & tendering</div>
                  <div className="tool-desc">Automated screening and evaluation via AI agents.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Contract management</div>
                  <div className="tool-desc">AI-supported drafting, review, and tracking of contracts.</div>
                </div>
                <div className="aaa-tool">
                  <div className="tool-name">Website & marketing</div>
                  <div className="tool-desc">Automated creation of SEO content and outreach.</div>
                </div>
              </div>
              <div className="aaa-outcomes">
                <div className="aaa-outcomes-label">Outcome</div>
                <ul>
                  <li>Back office relieved</li>
                  <li>Risk reduced</li>
                  <li>More time for core tasks</li>
                </ul>
              </div>
            </div>
      
          </div>
        </div>
      </section>
      
      <div className="sec-divider"></div>
      
      {/* QUOTE + CTA */}
      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner" style={{ textAlign: "center" }}>
          <img className="kontakt-portrait rv" src="/assets/team/amon.png" alt="Dr. Amon Göppert" style={{ marginLeft: "auto", marginRight: "auto" }} />
          <div className="quote bare rv rv-d1" style={{ marginTop: "0" }}>
            <p>For us, digitalization isn't a buzzword — it's <strong>craft</strong>. We anchor it where it measurably changes <strong>margin, speed, and customer value</strong> — without damaging the character of a <strong>Mittelstand company</strong>.</p>
            <span className="author">— Dr. Amon Göppert · Technology Partner, NextGen Equity</span>
          </div>
          <div className="rv rv-d2" style={{ marginTop: "40px", textAlign: "center" }}>
            <a href="/en/kontakt" className="btn btn-light">Let's talk →</a>
          </div>
        </div>
      </section>
      
      {/* FOOTER */}
    </>
  );
}
