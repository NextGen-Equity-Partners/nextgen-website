import { NeuralNet } from "@/components/three/neural-net";
import { FloatingShardsLazy } from "@/components/three/floating-shards-lazy";
import { MeshGradient } from "@paper-design/shaders-react";

export const metadata = {
  title: "Animations Playground · NextGen Equity",
  description: "Showcase of motion + 3D experiments for the V6 site.",
};

export default function AnimationsPlayground() {
  return (
    <>
      {/* Header section */}
      <section className="hero subpage" style={{ minHeight: "60vh" }}>
        <div className="hero-eyebrow">Lab</div>
        <h1 className="display hero-title">
          <span className="hero-line">Motion + 3D</span>
          <span className="hero-line"><span className="bold">Playground.</span></span>
        </h1>
        <p className="hero-sub">
          Vier Experimente — drei mit Canvas/WebGL, eins rein CSS-basiert. Alles
          isoliert, einzeln deaktivierbar, dient als Visual-Sandbox für die
          Entscheidung welche Effekte produktiv landen.
        </p>
      </section>

      {/* DEMO 1 — Neural Network */}
      <section className="pane" style={{ position: "relative", minHeight: "70vh" }}>
        <NeuralNet />
        <div className="pane-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="s-tag rv">01 · Neural Network</div>
          <h2 className="display rv" style={{ maxWidth: 900 }}>
            Nodes drift, edges <span className="bold">verbinden sich.</span>
          </h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 720, marginTop: 24 }}>
            Canvas 2D mit ~40-70 Knoten. IntersectionObserver pausiert das raf
            wenn off-screen. ~2 kB Code, läuft auf jedem Mobile sauber. Mix-Blend
            Screen damit es sich in dunkle Hintergründe einbettet.
          </p>
        </div>
      </section>

      {/* DEMO 2 — Paper Shaders Mesh-Gradient */}
      <section className="pane" style={{ position: "relative", minHeight: "70vh", overflow: "hidden" }}>
        <MeshGradient
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
          colors={["#1a0d3a", "#3a1d5e", "#0d1f4a", "#4a2860"]}
          distortion={1}
          swirl={0.45}
          speed={0.32}
        />
        <div className="pane-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="s-tag rv">02 · Mesh-Gradient Shader</div>
          <h2 className="display rv" style={{ maxWidth: 900 }}>
            WebGL-Shader, <span className="bold">aurora-style.</span>
          </h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 720, marginTop: 24 }}>
            Paper Shaders MeshGradient — vier Farben, organische Distortion +
            Swirl. ~80 kB Bundle. GPU-beschleunigt, läuft mit voller Speed auf
            Desktop, gedrosselt auf Mobile.
          </p>
        </div>
      </section>

      {/* DEMO 3 — R3F Floating Shards */}
      <section className="pane" style={{ position: "relative", minHeight: "70vh", overflow: "hidden" }}>
        <FloatingShardsLazy />
        <div className="pane-inner" style={{ position: "relative", zIndex: 1 }}>
          <div className="s-tag rv">03 · R3F · Glass Shards</div>
          <h2 className="display rv" style={{ maxWidth: 900 }}>
            Refraktive <span className="bold">Polyeder.</span>
          </h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 720, marginTop: 24 }}>
            three.js + React-Three-Fiber + drei. MeshTransmissionMaterial mit
            chromatic aberration. Lazy-loaded via next/dynamic, lädt erst wenn
            die Section ins Viewport kommt. ~150 kB on-demand.
          </p>
        </div>
      </section>

      {/* DEMO 4 — Pure CSS Marquee */}
      <section className="pane" style={{ minHeight: "60vh", overflow: "hidden" }}>
        <div className="pane-inner">
          <div className="s-tag rv">04 · CSS-only Marquee</div>
          <h2 className="display rv" style={{ maxWidth: 900 }}>
            Endloser Lauf — <span className="bold">ohne JS.</span>
          </h2>
          <p className="body-text rv rv-d1" style={{ maxWidth: 720, marginTop: 24, marginBottom: 48 }}>
            Pure CSS keyframes. Performant, scrollet smooth, respektiert
            prefers-reduced-motion (pausiert dann komplett).
          </p>
          <div className="marquee">
            <div className="marquee-track">
              <span>Mehrheitsbeteiligungen</span>
              <span>·</span>
              <span>DACH-Mittelstand</span>
              <span>·</span>
              <span>Business Services</span>
              <span>·</span>
              <span>Buy-and-Build</span>
              <span>·</span>
              <span>Eigenes Kapital</span>
              <span>·</span>
              <span>Langfristig</span>
              <span>·</span>
              <span>Mehrheitsbeteiligungen</span>
              <span>·</span>
              <span>DACH-Mittelstand</span>
              <span>·</span>
              <span>Business Services</span>
              <span>·</span>
              <span>Buy-and-Build</span>
              <span>·</span>
              <span>Eigenes Kapital</span>
              <span>·</span>
              <span>Langfristig</span>
              <span>·</span>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />
    </>
  );
}
