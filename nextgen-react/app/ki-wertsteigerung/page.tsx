"use client";

import { Hero } from "@/components/ui/hero";
import { ki as content } from "@/lib/content/ki-wertsteigerung";
import { useLocale } from "@/components/providers/locale-provider";

export default function Page() {
  const { locale } = useLocale();
  const c = content[locale];
  return (
    <>
      <Hero variant="subpage" eyebrow={c.hero.eyebrow} title={c.hero.title} sub={c.hero.sub} />

      <section className="pane">
        <div className="pane-inner">
          <div className="twocol">
            <div className="sticky-col">
              <div className="s-tag rv">{c.approach.eyebrow}</div>
              <h2 className="display rv">{c.approach.title}</h2>
              {c.approach.paragraphs.map((p, i) => (
                <p key={i} className={`body-text rv${i > 0 ? ` rv-d${i + 1}` : " rv-d1 intro-narrow"}`}>{p}</p>
              ))}
            </div>
            <div className="cmp-grid stacked">
              {c.approach.cards.map((card, i) => (
                <article key={card.num} className={`cmp-card rv rv-d${i + 1}`}>
                  <div className="cmp-num">{card.num}</div>
                  <h3 className="cmp-headline">{card.headline}</h3>
                  <p className="cmp-counter">{card.counter}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane">
        <div className="pane-inner">
          <div className="s-tag rv">{c.diagram.eyebrow}</div>
          <h2 className="display rv">{c.diagram.title}</h2>
          <p className="body-text rv rv-d1 intro-narrow">{c.diagram.intro}</p>

          <div className="aaa-diagram">
            {c.diagram.rows.map((row, i) => (
              <div key={row.level} className={`aaa-row ${row.level} rv rv-d${i + 1}`}>
                <div className="aaa-label">
                  <div className="num">{row.num}</div>
                  <h3>{row.title}</h3>
                  <p>{row.intro}</p>
                </div>
                <div className="aaa-tools">
                  {row.tools.map((t) => (
                    <div key={t.name} className="aaa-tool">
                      <div className="tool-name">{t.name}</div>
                      <div className="tool-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="aaa-outcomes">
                  <div className="aaa-outcomes-label">{c.diagram.outcomeLabel}</div>
                  <ul>
                    {row.outcomes.map((o) => <li key={o}>{o}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sec-divider"></div>

      <section className="pane kontakt-teaser-pane">
        <div className="pane-inner amon-quote-grid">
          <div className="amon-portrait-block rv">
            <img className="kontakt-portrait" src={c.quote.portrait} alt={c.quote.portraitAlt} />
            <div className="amon-name">{c.quote.name}</div>
            <div className="amon-role">{c.quote.role}</div>
          </div>
          <div className="quote bare rv rv-d1">{c.quote.body}</div>
        </div>
        <div className="rv rv-d2 cta-row center">
          <a href={c.quote.cta.href} className="btn btn-light">{c.quote.cta.label}</a>
        </div>
      </section>
    </>
  );
}
