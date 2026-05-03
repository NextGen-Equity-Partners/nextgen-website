"use client";

import { useEffect, useRef } from "react";

const personas = [
  {
    id: "inhaber",
    label: "Inhaber",
    sub: "Nachfolge & Wachstum",
    desc: "Wer ein Unternehmen aufgebaut hat und über das nächste Kapitel nachdenkt.",
    href: "/inhaber",
  },
  {
    id: "nachfolgeunternehmer",
    label: "Nachfolgeunternehmer",
    sub: "Unternehmen übernehmen",
    desc: "Führungspersönlichkeiten, die bereit sind, Verantwortung als Mitgesellschafter zu übernehmen.",
    href: "/nachfolgeunternehmer",
  },
  {
    id: "berater",
    label: "M&A Berater",
    sub: "Mandate & Zusammenarbeit",
    desc: "Berater und Intermediäre, die passende Mandate an einen verlässlichen Partner vermitteln.",
    href: "/berater",
  },
  {
    id: "investor",
    label: "Investor",
    sub: "Wachstumskapital",
    desc: "Investoren und Family Offices, die den DACH-Mittelstand als Assetklasse verstehen.",
    href: "/investor",
  },
];

export default function EntryPage() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    import("gsap").then(({ gsap }) => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".word");
        tl.fromTo(words,
          { y: 60, opacity: 0, rotateX: -20 },
          { y: 0, opacity: 1, rotateX: 0, duration: 1.1, stagger: 0.08 }
        );
      }
      if (subRef.current) {
        tl.fromTo(subRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.5"
        );
      }
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll(".entry-card");
        tl.fromTo(cards,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.1 },
          "-=0.3"
        );
      }
    });
  }, []);

  const words = "Wir bauen Unternehmen, die neu definieren wie Menschen arbeiten.".split(" ");

  return (
    <main className="entry-page">
      <section className="entry-hero">
        <h1 className="entry-headline" ref={headlineRef}>
          {words.map((word, i) => (
            <span key={i} className="word-wrap">
              <span className="word">{word}</span>
              {i < words.length - 1 && <span className="word-space">&nbsp;</span>}
            </span>
          ))}
        </h1>
        <p className="entry-sub" ref={subRef}>
          Wachstumskapital und digitale Transformation für den Mittelstand.
        </p>
      </section>

      <section className="entry-cards-section">
        <div className="entry-cards" ref={cardsRef}>
          {personas.map((p) => (
            <a key={p.id} href={p.href} className="entry-card">
              <div className="entry-card-inner">
                <div className="entry-card-top">
                  <span className="entry-card-label">{p.label}</span>
                  <span className="entry-card-sub">{p.sub}</span>
                </div>
                <p className="entry-card-desc">{p.desc}</p>
                <div className="entry-card-arrow">→</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <style>{`
        .entry-page {
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: clamp(80px, 10vw, 120px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px);
          position: relative;
          z-index: 1;
        }
        .entry-hero { max-width: 1100px; margin-bottom: clamp(48px, 6vw, 80px); }
        .entry-headline {
          font-family: 'Outfit', sans-serif;
          font-weight: 300;
          font-size: clamp(2rem, 4.8vw, 4.2rem);
          line-height: 1.18;
          letter-spacing: -0.02em;
          color: var(--w);
          perspective: 800px;
        }
        .word-wrap { display: inline-block; overflow: hidden; vertical-align: bottom; }
        .word { display: inline-block; }
        .word-space { display: inline-block; width: 0.28em; }
        .entry-sub {
          margin-top: clamp(20px, 2.5vw, 28px);
          font-size: clamp(0.9rem, 1.4vw, 1.1rem);
          font-weight: 300;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--mute);
          opacity: 0;
        }
        .entry-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1400px;
        }
        .entry-card {
          display: block;
          opacity: 0;
          border-radius: 20px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(32px) saturate(1.4);
          -webkit-backdrop-filter: blur(32px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.10);
          box-shadow: 0 16px 48px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.12);
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease), transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
          position: relative;
          overflow: hidden;
        }
        .entry-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: linear-gradient(180deg, rgba(255,255,255,0.06) 0%, transparent 50%);
          pointer-events: none;
        }
        .entry-card:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.20);
          transform: translateY(-4px);
          box-shadow: 0 24px 64px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.18);
        }
        .entry-card-inner {
          padding: clamp(24px, 2.8vw, 36px);
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 200px;
        }
        .entry-card-top { display: flex; flex-direction: column; gap: 6px; margin-bottom: auto; }
        .entry-card-label { font-size: clamp(1.1rem, 1.6vw, 1.35rem); font-weight: 500; color: var(--w); letter-spacing: -0.01em; }
        .entry-card-sub { font-size: 0.72rem; font-weight: 400; letter-spacing: 0.14em; text-transform: uppercase; color: var(--mute); }
        .entry-card-desc { margin-top: 20px; font-size: 0.88rem; font-weight: 300; line-height: 1.65; color: var(--mute); }
        .entry-card-arrow { margin-top: 24px; font-size: 1.1rem; color: var(--w-soft); transition: transform 0.25s var(--ease); }
        .entry-card:hover .entry-card-arrow { transform: translateX(5px); }
        @media (max-width: 900px) { .entry-cards { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
        @media (max-width: 540px) {
          .entry-page { padding-top: 100px; padding-bottom: 40px; }
          .entry-cards { grid-template-columns: 1fr; gap: 10px; }
          .entry-card-inner { min-height: unset; }
          .entry-card-desc { display: none; }
        }
      `}</style>
    </main>
  );
}
