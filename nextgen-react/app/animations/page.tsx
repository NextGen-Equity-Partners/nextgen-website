import { DEMO_ANIMATIONS } from "@/components/animations-lab";

export default function AnimationsPage() {
  return (
    <>
      <section className="alab-hero">
        <div className="s-tag rv">Animations Lab</div>
        <h1 className="display rv">Animationen für <span className="bold">NextGen.</span></h1>
        <p className="body-text rv rv-d1 alab-intro">
          Sechs WebGL-Szenen — jede inhaltlich verankert: Plattform-Aufbau, KI-Vernetzung, langfristige Gruppen, Konvergenz, DACH-Netz, organisches Wachstum.
        </p>
      </section>

      <section className="pane">
        <div className="pane-inner">
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
