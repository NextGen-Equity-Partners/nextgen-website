import { Hero } from "@/components/ui/hero";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { home as c } from "@/lib/content/home";

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow={c.hero.eyebrow}
        title={c.hero.title}
        sub={c.hero.sub}
        scrollTo="wer-wir-sind"
        ctas={
          <>
            <a href={c.hero.ctaPrimary.href} className="btn btn-light">{c.hero.ctaPrimary.label}</a>
            <a href={c.hero.ctaSecondary.href} className="btn btn-ghost">{c.hero.ctaSecondary.label}</a>
          </>
        }
      />

      <Section
        id="wer-wir-sind"
        eyebrow={c.werWirSind.eyebrow}
        title={c.werWirSind.title}
        intro={c.werWirSind.intro}
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-2">
          {c.werWirSind.cards.map((card, i) => (
            <GlassCard key={i} {...card} delay={((i % 2) + 1) as 1 | 2} />
          ))}
        </div>
      </Section>

      <div className="sec-divider"></div>

      <section className="slogan-break">
        <div className="slogan-inner">
          <p className="rv">Wir bleiben –<br /><span className="bold">auch nach dem Closing.</span></p>
        </div>
      </section>

      <div className="sec-divider"></div>

      <Section
        eyebrow={c.wasWirSuchen.eyebrow}
        title={c.wasWirSuchen.title}
        intro={c.wasWirSuchen.intro}
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          {c.wasWirSuchen.cards.map((card, i) => (
            <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2 | 3} />
          ))}
        </div>
        <p className="rv section-footnote">{c.wasWirSuchen.footer}</p>
      </Section>

      <section className="story-break">
        <div className="story-break-inner">
          <div className="eyebrow rv">{c.storyBreak.eyebrow}</div>
          <q className="rv rv-d1">{c.storyBreak.quote}</q>
          <div className="signature rv rv-d2">{c.storyBreak.signature}</div>
        </div>
      </section>

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol" style={{ alignItems: "start" }}>
            <div>
              <div className="s-tag rv">{c.ansatz.eyebrow}</div>
              <h2 className="display rv">{c.ansatz.title}</h2>
              <p className="body-text rv rv-d1 section-intro">{c.ansatz.intro}</p>
              <div className="rv rv-d2 ansatz-cta">
                <a href={c.ansatz.cta.href} className="btn btn-ghost">{c.ansatz.cta.label}</a>
              </div>
            </div>
            <div className="glass-grid cols-2 ansatz-grid">
              {c.ansatz.cards.map((card, i) => (
                <GlassCard key={i} {...card} delay={(i + 1) as 1 | 2 | 3 | 4} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane kontakt-teaser-section">
        <div className="pane-inner kontakt-teaser-inner">
          <img className="kontakt-portrait rv" src={c.kontaktTeaser.portrait} alt={c.kontaktTeaser.portraitAlt} />
          <div className="s-tag rv rv-d1">{c.kontaktTeaser.eyebrow}</div>
          <h2 className="display rv rv-d1 kontakt-teaser-title">{c.kontaktTeaser.title}</h2>
          <p className="body-text rv rv-d2 kontakt-teaser-body">{c.kontaktTeaser.body}</p>
          <div className="rv rv-d3 kontakt-teaser-cta">
            <a href={c.kontaktTeaser.cta.href} className="btn btn-light kontakt-teaser-btn">{c.kontaktTeaser.cta.label}</a>
          </div>
        </div>
      </section>
    </>
  );
}
