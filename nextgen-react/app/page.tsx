"use client";

import { Hero } from "@/components/ui/hero";
import { Section } from "@/components/ui/section";
import { GlassCard } from "@/components/ui/glass-card";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

export default function HomePage() {
  const { locale } = useLocale();
  const t = <T extends { de: unknown; en: unknown }>(e: T) => e[locale] as T["de"];
  return (
    <>
      <Hero
        title={
          <>
            <span className="hero-line">{t(tr.hero.titleA)}</span>
            <span className="hero-line">{t(tr.hero.titleB)}</span>
            {t(tr.hero.titleD) ? (
              <>
                <span className="hero-line">{t(tr.hero.titleC)}</span>
                <span className="hero-line">
                  {t(tr.hero.titleD)} <span className="bold">{t(tr.hero.titleBold)}</span>
                </span>
              </>
            ) : (
              <span className="hero-line">
                {t(tr.hero.titleC)} <span className="bold">{t(tr.hero.titleBold)}</span>
              </span>
            )}
          </>
        }
        ctas={
          <>
            <a href="/kontakt" className="btn btn-light">{t(tr.hero.cta)}</a>
          </>
        }
      />

      <section id="mission" className="mission-section">
        <div className="mission-inner">
          <p className="rv rv-d1 mission-body">{t(tr.mission.body)}</p>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="team"
        title={
          <>
            {t(tr.team.titleA)}
            <br />
            {t(tr.team.titleB)} <span className="bold">{t(tr.team.titleBold)}</span>
          </>
        }
        intro={t(tr.team.intro)}
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <article className="glass-card image-card rv rv-d1">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/max-bender-3rNvnnO7avY-unsplash.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.team.cards.cap1Title)}</h3>
                <p>{t(tr.team.cards.cap1Body)}</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d2">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/wertsteigerung-hands.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.team.cards.cap2Title)}</h3>
                <p>{t(tr.team.cards.cap2Body)}</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d3">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/charlesdeluvio-rRWiVQzLm7k-unsplash.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.team.cards.cap3Title)}</h3>
                <p>{t(tr.team.cards.cap3Body)}</p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="bare-section">
        <div className="bare-inner">
          <h2 className="display rv" style={{ maxWidth: 1100 }}>
            {t(tr.teamGrid.titleA)} <span className="bold">{t(tr.teamGrid.titleBold)}</span>
          </h2>
          <div className="team-grid">
            <div className="team-row-3">
              <div className="tm rv rv-d1">
                <div className="portrait">
                  <img src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
                </div>
                <div className="tm-body">
                  <div className="role">{t(tr.teamMembers.max.role)}</div>
                  <h4>Maximilian Göppert</h4>
                  <p>{t(tr.teamMembers.max.body)}</p>
                  <a
                    className="tm-linkedin"
                    href="https://www.linkedin.com/in/maximilian-g%C3%B6ppert/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Maximilian Göppert ${tr.nav.linkedinOf[locale]}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait">
                  <img src="/assets/team/leander.png" alt="Leander Heyken" />
                </div>
                <div className="tm-body">
                  <div className="role">{t(tr.teamMembers.leander.role)}</div>
                  <h4>Leander Heyken</h4>
                  <p>{t(tr.teamMembers.leander.body)}</p>
                  <a
                    className="tm-linkedin"
                    href="https://www.linkedin.com/in/heyken/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Leander Heyken ${tr.nav.linkedinOf[locale]}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="tm rv rv-d3">
                <div className="portrait">
                  <img
                    src="/assets/team/ChatGPT%20Image%204.%20Mai%202026%2C%2014_25_22.png"
                    alt="Dr. Amon Göppert"
                  />
                </div>
                <div className="tm-body">
                  <div className="role">{t(tr.teamMembers.amon.role)}</div>
                  <h4>Dr. Amon Göppert</h4>
                  <p>{t(tr.teamMembers.amon.body)}</p>
                  <a
                    className="tm-linkedin"
                    href="https://www.linkedin.com/in/amon-goeppert/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Dr. Amon Göppert ${tr.nav.linkedinOf[locale]}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="team-row-2">
              <div className="tm rv rv-d1">
                <div className="portrait">
                  <img src="/assets/team/alex.jpeg" alt="Alexander Rien" />
                </div>
                <div className="tm-body">
                  <div className="role">{t(tr.teamMembers.alex.role)}</div>
                  <h4>Alexander Rien</h4>
                  <p>{t(tr.teamMembers.alex.body)}</p>
                  <a
                    className="tm-linkedin"
                    href="https://www.linkedin.com/in/alexander-rien/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Alexander Rien ${tr.nav.linkedinOf[locale]}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div className="tm rv rv-d2">
                <div className="portrait">
                  <img src="/assets/team/gerald.jpeg" alt="Gerald Weitbrecht" />
                </div>
                <div className="tm-body">
                  <div className="role">{t(tr.teamMembers.gerald.role)}</div>
                  <h4>Gerald Weitbrecht</h4>
                  <p>{t(tr.teamMembers.gerald.body)}</p>
                  <a
                    className="tm-linkedin"
                    href="https://www.linkedin.com/in/gkfweitbrecht/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Gerald Weitbrecht ${tr.nav.linkedinOf[locale]}`}
                  >
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.59 0 4.26 2.36 4.26 5.43v6.31zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="werte"
        title={
          <>
            {t(tr.werte.titleA)} <span className="bold">{t(tr.werte.titleBold)}</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="werte-image rv rv-d1">
          <img
            src="/assets/photos/New%20photos/werte-mountain.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="glass-grid cols-3 werte-grid">
          <GlassCard title={t(tr.werte.cards.c1Title)} body={t(tr.werte.cards.c1Body)} delay={1} />
          <GlassCard title={t(tr.werte.cards.c2Title)} body={t(tr.werte.cards.c2Body)} delay={2} />
          <GlassCard title={t(tr.werte.cards.c3Title)} body={t(tr.werte.cards.c3Body)} delay={3} />
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-portrait rv">
            <img src="/assets/team/leander.png" alt="Leander Heyken" />
          </div>
          <p className="testimonial-quote rv rv-d1">{t(tr.quotes.leander.text)}</p>
          <div className="testimonial-attribution rv rv-d2">
            <div className="testimonial-name">Leander Heyken</div>
            <div className="testimonial-role">{t(tr.quotes.leander.role)}</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="zielunternehmen"
        title={
          <>
            {t(tr.ziel.titleA)}
            <br />
            <span className="bold">{t(tr.ziel.titleBold)}</span>
          </>
        }
        intro={t(tr.ziel.intro)}
        contentMaxWidth={1100}
      >
        <div className="glass-grid cols-3">
          <article className="glass-card image-card rv rv-d1">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/wachstumspotential_1.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.ziel.cards.c1Title)}</h3>
                <p>{t(tr.ziel.cards.c1Body)}</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d2">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/Ambitionierte%20Unternehmer.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.ziel.cards.c2Title)}</h3>
                <p>{t(tr.ziel.cards.c2Body)}</p>
              </div>
            </div>
          </article>
          <article className="glass-card image-card rv rv-d3">
            <div
              className="image-card-img"
              style={{ backgroundImage: "url('/assets/photos/New%20photos/Unternehmen%20als%20Plattform.jpg')" }}
            />
            <div className="image-card-body">
              <div>
                <h3>{t(tr.ziel.cards.c3Title)}</h3>
                <p>{t(tr.ziel.cards.c3Body)}</p>
              </div>
            </div>
          </article>
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        id="nachfolge"
        title={
          <>
            {t(tr.nachfolge.titleA)}{" "}
            {t(tr.nachfolge.titleConnector)}
            {" "}
            <span className="bold">{t(tr.nachfolge.titleBold)}</span>
          </>
        }
        intro={t(tr.nachfolge.intro)}
        contentMaxWidth={1100}
      >
        <div className="nachfolge-photo rv">
          <img
            src="/assets/photos/New%20photos/nachfolge-operator.jpg"
            alt="Nachfolgeunternehmer am Laptop"
            loading="lazy"
            decoding="async"
          />
        </div>
        <ol className="phase-list phase-list-4">
          <li className="phase-item rv rv-d1">
            <div className="phase-index">01</div>
            <div className="phase-content">
              <h3 className="phase-title">{t(tr.nachfolge.cards.c1Title)}</h3>
              <p className="phase-body">{t(tr.nachfolge.cards.c1Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d2">
            <div className="phase-index">02</div>
            <div className="phase-content">
              <h3 className="phase-title">{t(tr.nachfolge.cards.c2Title)}</h3>
              <p className="phase-body">{t(tr.nachfolge.cards.c2Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d3">
            <div className="phase-index">03</div>
            <div className="phase-content">
              <h3 className="phase-title">{t(tr.nachfolge.cards.c3Title)}</h3>
              <p className="phase-body">{t(tr.nachfolge.cards.c3Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d4">
            <div className="phase-index">04</div>
            <div className="phase-content">
              <h3 className="phase-title">{t(tr.nachfolge.cards.c4Title)}</h3>
              <p className="phase-body">{t(tr.nachfolge.cards.c4Body)}</p>
            </div>
          </li>
        </ol>
      </Section>

      <div className="sec-divider" />

      <section className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-portrait rv">
            <img src="/assets/team/max.jpeg" alt="Maximilian Göppert" />
          </div>
          <p className="testimonial-quote rv rv-d1">{t(tr.quotes.max.text)}</p>
          <div className="testimonial-attribution rv rv-d2">
            <div className="testimonial-name">Maximilian Göppert</div>
            <div className="testimonial-role">{t(tr.quotes.max.role)}</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="ansatz"
        title={
          <>
            {t(tr.ansatz.titleA)}
            <br />
            <span className="bold">{t(tr.ansatz.titleBold)}</span>
          </>
        }
        intro={t(tr.ansatz.intro)}
        contentMaxWidth={1100}
      >
        <div className="ansatz-photo rv" aria-hidden="true">
          <img
            src="/assets/photos/New%20photos/ansatz-summit.jpg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
        <ol className="phase-list phase-list-4">
          <li className="phase-item rv rv-d1">
            <div className="phase-index">01</div>
            <div className="phase-content">
              <div className="phase-when">{t(tr.ansatz.phases.p1Label)}</div>
              <h3 className="phase-title">{t(tr.ansatz.phases.p1Title)}</h3>
              <p className="phase-body">{t(tr.ansatz.phases.p1Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d2">
            <div className="phase-index">02</div>
            <div className="phase-content">
              <div className="phase-when">{t(tr.ansatz.phases.p2Label)}</div>
              <h3 className="phase-title">{t(tr.ansatz.phases.p2Title)}</h3>
              <p className="phase-body">{t(tr.ansatz.phases.p2Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d3">
            <div className="phase-index">03</div>
            <div className="phase-content">
              <div className="phase-when">{t(tr.ansatz.phases.p3Label)}</div>
              <h3 className="phase-title">{t(tr.ansatz.phases.p3Title)}</h3>
              <p className="phase-body">{t(tr.ansatz.phases.p3Body)}</p>
            </div>
          </li>
          <li className="phase-item rv rv-d4">
            <div className="phase-index">04</div>
            <div className="phase-content">
              <div className="phase-when">{t(tr.ansatz.phases.p4Label)}</div>
              <h3 className="phase-title">{t(tr.ansatz.phases.p4Title)}</h3>
              <p className="phase-body">{t(tr.ansatz.phases.p4Body)}</p>
            </div>
          </li>
        </ol>
      </Section>

      <div className="sec-divider" />

      <Section
        title={
          <>
            {t(tr.mehrwerte.titleA)} <span className="bold">{t(tr.mehrwerte.titleBold)}</span>
          </>
        }
        intro={t(tr.mehrwerte.intro)}
        contentMaxWidth={1100}
      >
        <div className="mehrwerte-layout">
          <div className="mehrwerte-img rv">
            <img
              src="/assets/photos/New%20photos/gruppe-bauwerk.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="mehrwerte-cards">
            <GlassCard title={t(tr.mehrwerte.cards.c1Title)} body={t(tr.mehrwerte.cards.c1Body)} delay={1} />
            <GlassCard title={t(tr.mehrwerte.cards.c2Title)} body={t(tr.mehrwerte.cards.c2Body)} delay={2} />
            <GlassCard title={t(tr.mehrwerte.cards.c3Title)} body={t(tr.mehrwerte.cards.c3Body)} delay={3} />
            <GlassCard title={t(tr.mehrwerte.cards.c4Title)} body={t(tr.mehrwerte.cards.c4Body)} delay={4} />
          </div>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="testimonial-section">
        <div className="testimonial-inner">
          <div className="testimonial-portrait rv">
            <img
              src="/assets/team/ChatGPT%20Image%204.%20Mai%202026%2C%2014_25_22.png"
              alt="Dr. Amon Göppert"
            />
          </div>
          <p className="testimonial-quote rv rv-d1">{t(tr.quotes.amon.text)}</p>
          <div className="testimonial-attribution rv rv-d2">
            <div className="testimonial-name">Dr. Amon Göppert</div>
            <div className="testimonial-role">{t(tr.quotes.amon.role)}</div>
          </div>
        </div>
      </section>

      <div className="sec-divider" />

      <Section
        id="technologie"
        title={
          <>
            {t(tr.tech.titleA)}
            <br />
            <span className="bold">{t(tr.tech.titleBold)}</span>
          </>
        }
        intro={t(tr.tech.intro)}
        contentMaxWidth={1100}
      >
        <div className="tech-layout">
          <div className="tech-image rv">
            <img
              src="/assets/photos/New%20photos/Wertsteigerung%20durch%20KI%20%26%20Digitalisierung.jpg"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="tech-cards">
            <GlassCard title={t(tr.tech.cards.c1Title)} body={t(tr.tech.cards.c1Body)} delay={1} />
            <GlassCard title={t(tr.tech.cards.c2Title)} body={t(tr.tech.cards.c2Body)} delay={2} />
            <GlassCard title={t(tr.tech.cards.c3Title)} body={t(tr.tech.cards.c3Body)} delay={3} />
          </div>
        </div>
      </Section>

      <div className="sec-divider" />

      <Section
        id="esg"
        title={
          <>
            {t(tr.esg.titleA)} <span className="bold">{t(tr.esg.titleBold)}</span>
          </>
        }
        contentMaxWidth={1100}
      >
        <div className="tech-layout">
          <div className="tech-image rv">
            <img src="/assets/photos/New%20photos/esg-fields.jpg" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="tech-cards">
            <GlassCard title={t(tr.esg.cards.c1Title)} body={t(tr.esg.cards.c1Body)} delay={1} />
            <GlassCard title={t(tr.esg.cards.c2Title)} body={t(tr.esg.cards.c2Body)} delay={2} />
            <GlassCard title={t(tr.esg.cards.c3Title)} body={t(tr.esg.cards.c3Body)} delay={3} />
            <GlassCard title={t(tr.esg.cards.c4Title)} body={t(tr.esg.cards.c4Body)} delay={4} />
          </div>
        </div>
      </Section>

      <div className="sec-divider" />

      <section className="kontakt-teaser-section">
        <div className="kontakt-teaser-inner">
          <h2 className="display rv rv-d1 kontakt-teaser-title">
            {t(tr.kontaktTeaser.titleA)}
            <br />
            <span className="bold">{t(tr.kontaktTeaser.titleBold)}</span>
          </h2>
          <p className="body-text rv rv-d2 kontakt-teaser-body">{t(tr.kontaktTeaser.body)}</p>
          <div className="rv rv-d3 kontakt-teaser-cta">
            <a href="/kontakt" className="btn btn-light kontakt-teaser-btn">{t(tr.kontaktTeaser.cta)}</a>
          </div>
        </div>
      </section>
    </>
  );
}
