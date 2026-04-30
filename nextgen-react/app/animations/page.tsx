import { DEMO_ANIMATIONS } from "@/components/animations-lab";
import { TWO_D_ANIMATIONS } from "@/components/animations-2d";

export default function AnimationsPage() {
  return (
    <>
      <section className="alab-hero">
        <div className="s-tag rv">Animations Lab</div>
        <h1 className="display rv">Animationen für <span className="bold">NextGen.</span></h1>
        <p className="body-text rv rv-d1 alab-intro">
          Leichte 2D-Begleiter fuer Textbereiche plus WebGL-Experimente fuer groessere Inszenierungen.
        </p>
      </section>

      <section className="pane alab-2d-pane">
        <div className="pane-inner">
          <div className="s-tag rv">2D Text Companions</div>
          <h2 className="display rv">Ruhige Animationen <span className="bold">neben Content.</span></h2>
          <div className="alab-2d-list">
            {TWO_D_ANIMATIONS.map(({ id, kicker, title, body, Component }) => (
              <article key={id} className="alab-2d-card rv">
                <div className="alab-2d-copy">
                  <span className="alab-2d-kicker">{kicker}</span>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
                <Component />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">WebGL Lab</div>
          <h2 className="display rv">Groessere Szenen <span className="bold">zum Aussortieren.</span></h2>
          <div className="alab-grid">
            {DEMO_ANIMATIONS.map(({ id, label, tech, Component }) => (
              <article key={id} className="alab-card">
                <div className="alab-canvas">
                  <Component />
                </div>
                <div className="alab-meta">
                  <span className="alab-name">{label}</span>
                  <span className="alab-tech">{tech}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
