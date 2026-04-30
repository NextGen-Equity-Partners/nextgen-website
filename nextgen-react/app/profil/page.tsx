import { Hero } from "@/components/ui/hero";
import { GlassCard } from "@/components/ui/glass-card";
import { profil as c } from "@/lib/content/profil";

export default function Page() {
  return (
    <>
      <Hero
        variant="subpage"
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        sub={c.hero.sub}
        ctas={
          <>
            <a href={c.hero.ctaPrimary.href} className="btn btn-light">{c.hero.ctaPrimary.label}</a>
            <a href={c.hero.ctaSecondary.href} className="btn btn-ghost">{c.hero.ctaSecondary.label}</a>
          </>
        }
      />

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.pillars.eyebrow}</div>
              <h2 className="display rv">{c.pillars.title}</h2>
            </div>
            <div>
              <p className="body-text rv">{c.pillars.intro}</p>
            </div>
          </div>
          <div className="glass-grid cols-2">
            {c.pillars.cards.map((card, i) => (
              <GlassCard key={i} {...card} delay={((i % 2) + 1) as 1 | 2} />
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.origin.eyebrow}</div>
              <h2 className="display rv">{c.origin.title}</h2>
            </div>
            <div>
              {c.origin.paragraphs.map((p, i) => (
                <p key={i} className={`body-text rv${i > 0 ? ` rv-d${i}` : ""}`}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.values.eyebrow}</div>
          <h2 className="display rv">{c.values.title}</h2>
          <div className="glass-grid cols-3">
            {c.values.cards.map((card, i) => (
              <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2 | 3} />
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol center">
            <div>
              <div className="s-tag rv">{c.esg.eyebrow}</div>
              <h2 className="display rv">{c.esg.title}</h2>
              <div className="tag-list rv rv-d2">
                {c.esg.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="body-text rv rv-d1">{c.esg.body}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.vision.eyebrow}</div>
          <h2 className="display rv">{c.vision.title}</h2>
          <div className="glass-grid cols-2">
            {c.vision.cards.map((card, i) => (
              <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2} />
            ))}
          </div>
          <div className="rv rv-d3 cta-row">
            <a href={c.vision.cta.href} className="btn btn-light">{c.vision.cta.label}</a>
          </div>
        </div>
      </section>
    </>
  );
}
