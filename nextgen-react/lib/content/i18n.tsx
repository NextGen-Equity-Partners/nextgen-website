// Centralised translations for all home-page strings. Source: the doc
// 05052026_NextGen-Website-DE-EN.docx — DE first, then matching EN.
//
// Strings are organised by page section. Each entry is { de, en }.
// Use the useLocale() hook from providers/locale-provider to read the
// active locale and pick the right variant at render time.

import type { ReactNode } from "react";

export type Locale = "de" | "en";

type T<TValue = string> = { de: TValue; en: TValue };

export const tr = {
  // Navigation
  nav: {
    team:            { de: "Team",            en: "Team" },
    zielunternehmen: { de: "Zielunternehmen", en: "Target Companies" },
    ansatz:          { de: "Ansatz",          en: "Approach" },
    technologie:     { de: "Technologie",     en: "Technology" },
    esg:             { de: "ESG",             en: "ESG" },
    kontakt:         { de: "Kontakt",         en: "Contact" },
    burgerOpen:      { de: "Menü öffnen",     en: "Open menu" },
    linkedinOf:      { de: "auf LinkedIn",    en: "on LinkedIn" },
  } satisfies Record<string, T>,

  // Hero — DE renders as 4 hero-lines (A / B / C / D + bold), EN as
  // 3 lines (A / B / C + bold). Empty `titleD` for EN drives a ternary
  // in app/page.tsx so "Companies." stays bound to line 3.
  hero: {
    eyebrow: {
      de: "",
      en: "",
    },
    titleA: {
      de: "Wachstumskapital und",
      en: "Growth Capital and",
    },
    titleB: {
      de: "Digitalisierung für",
      en: "Digitalization for",
    },
    titleC: {
      de: "Unternehmensgruppen",
      en: "Mid-Market",
    },
    titleD: {
      de: "im",
      en: "",
    },
    titleBold: {
      de: "Mittelstand.",
      en: "Companies.",
    },
    cta: {
      de: "Lassen Sie uns sprechen →",
      en: "Let's talk →",
    },
  } satisfies Record<string, T>,

  // Mission
  mission: {
    body: {
      de: (
        <>
          Unsere Mission bei NextGen Equity Partners ist die{" "}
          <span className="bold">Entwicklung kleiner und mittlerer Dienstleistungsunternehmen</span>{" "}
          im DACH-Raum zu{" "}
          <span className="bold">technologisch und marktführenden Unternehmensgruppen</span>. Wir setzen{" "}
          <span className="bold">Wachstumskapital</span> ein, um damit die{" "}
          <span className="bold">Substanz des Mittelstands</span> zu stärken und{" "}
          <span className="bold">KI-befähigte Wissensträger</span> in den Mittelpunkt zu stellen.
        </>
      ),
      en: (
        <>
          Our mission at NextGen Equity Partners is to{" "}
          <span className="bold">transform small and mid-sized service companies</span>{" "}
          in the DACH region into{" "}
          <span className="bold">technologically advanced and market-leading groups</span>. We deploy{" "}
          <span className="bold">growth capital</span> to strengthen the{" "}
          <span className="bold">substance of the German Mittelstand</span> and place{" "}
          <span className="bold">AI-empowered human capital</span> at the center of value creation.
        </>
      ),
    },
  } satisfies Record<string, T<ReactNode>>,

  // Team — capabilities (3 cards above the team grid)
  team: {
    titleA:    { de: "Wir sind: Beteiligungspartner,", en: "We are: Investment Partners," },
    titleB:    { de: "Technologie Enthusiasten,",      en: "Technology Enthusiasts," },
    titleBold: { de: "Unternehmer.",                    en: "Entrepreneurs." },
    intro: {
      de: "Wir verstehen den Aufbau führender Unternehmensgruppen, die Integration von Technologien im Mittelstand sowie die operative Führung von Unternehmen.",
      en: "We understand how to build leading groups, integrate technologies in mid-market companies, and lead businesses operationally.",
    },
    cards: {
      cap1Title: { de: "Beteiligungsmanagement", en: "Investment Management" },
      cap1Body:  {
        de: "Zugang zu langfristigem Wachstumskapital. 25+ Jahre kombinierte Erfahrung im erfolgreichen Aufbau und der Betreuung von 20+ Unternehmensgruppen.",
        en: "Access to long-term growth capital. 25+ years of combined experience in successfully building and supporting 20+ corporate groups.",
      },
      cap2Title: { de: "Technologieintegration", en: "Technology Integration" },
      cap2Body:  {
        de: "Wertsteigerung durch KI-Technologie, Automatisierung und Digitalisierung. 30+ durchgeführte Projekte zur Technologieintegration im Mittelstand.",
        en: "Value creation through AI, automation, and digitalization. 30+ completed technology integration projects in mid-market companies.",
      },
      cap3Title: { de: "Unternehmensführung", en: "Corporate Leadership" },
      cap3Body:  {
        de: "Operative Erfahrung als Führungskräfte sowie Erfahrung als Software- und KI-Unternehmer.",
        en: "Operational experience as executives, combined with entrepreneurial experience in software and AI ventures.",
      },
    },
  },

  // Team — grid heading
  teamGrid: {
    titleA:    { de: "Das Team hinter",  en: "The team behind" },
    titleBold: { de: "NextGen Equity.",  en: "NextGen Equity." },
  } satisfies Record<string, T>,

  // Team member roles & body — name stays the same, role/body translate
  teamMembers: {
    max: {
      role: { de: "Partner",                 en: "Partner" },
      body: {
        de: "15 Jahre Erfahrung in Beteiligungsmanagement & Unternehmertum.",
        en: "15 years of experience in investment management and entrepreneurship.",
      },
    },
    leander: {
      role: { de: "Partner",                 en: "Partner" },
      body: {
        de: "20 Jahre Berufserfahrung, davon 12 Jahre in Beteiligungsmanagement.",
        en: "20 years of professional experience, including 12 years in investment management.",
      },
    },
    amon: {
      role: { de: "Partner",                 en: "Partner" },
      body: {
        de: "10 Jahre Erfahrung in der KI-Implementierung, davon 2 Jahre im Beteiligungsmanagement.",
        en: "10 years of experience in AI implementation, including 2 years in investment management.",
      },
    },
    alex: {
      role: { de: "KI & Tech",               en: "AI & Tech" },
      body: {
        de: "8 Jahre Berufserfahrung in Consulting und Strategie.",
        en: "8 years of professional experience in consulting and strategy.",
      },
    },
    gerald: {
      role: { de: "Business Development",    en: "Business Development" },
      body: {
        de: "8 Jahre Erfahrung in Finanzen & Projektmanagement.",
        en: "8 years of experience in finance and project management.",
      },
    },
  },

  // Werte
  werte: {
    titleA:    { de: "Unsere",  en: "Our" },
    titleBold: { de: "Werte.",  en: "Values." },
    quote: {
      de: "„Wir investieren nicht nur in Unternehmen … wir investieren in Menschen, die Unternehmen groß machen.“",
      en: "“We don't just invest in companies … we invest in the people who make companies great.”",
    },
    cards: {
      c1Title: { de: "Partnerschaft", en: "Partnership" },
      c1Body:  {
        de: "Wir bauen keine Portfolios — wir bauen Unternehmen, gemeinsam mit Menschen, die dasselbe wollen. Das bedeutet Augenhöhe, klare Absprachen und echtes Commitment auf beiden Seiten.",
        en: "We don't build portfolios — we build companies, together with people who want the same. That means equal footing, clear agreements, and genuine commitment from both sides.",
      },
      c2Title: { de: "Vertrauen", en: "Trust" },
      c2Body:  {
        de: "Vertrauen entsteht durch Verlässlichkeit, nicht durch Versprechen. Wir sagen, was wir tun — und tun, was wir sagen.",
        en: "Trust is built through reliability, not through promises. We say what we do — and do what we say.",
      },
      c3Title: { de: "Langfristigkeit", en: "Long-Term Thinking" },
      c3Body:  {
        de: "Gute Unternehmen brauchen Zeit. Wir denken in Generationen, nicht in Quartalszahlen — und treffen Entscheidungen entsprechend.",
        en: "Good companies need time. We think in generations, not in quarterly figures — and make decisions accordingly.",
      },
    },
  },

  // Zielunternehmen
  ziel: {
    titleA:    { de: "Unternehmen mit",       en: "Companies with" },
    titleBold: { de: "Wachstumspotenzial.",   en: "Growth Potential." },
    intro: {
      de: "Für unsere Gruppenstrategien suchen wir profitable und wachsende Unternehmen im wissensintensiven Dienstleistungsbereich im DACH-Raum.",
      en: "For our group strategies, we are looking for profitable, growing companies in knowledge-intensive services across the DACH region.",
    },
    cards: {
      c1Title: { de: "Wachstumsfähige Strukturen", en: "Scalable Structures" },
      c1Body:  {
        de: "Klare Strukturen und Prozesse in der Organisation der Unternehmen, die für KI-Integration und anorganisches Wachstum ausgelegt sind.",
        en: "Clear organizational structures and processes designed for AI integration and inorganic growth.",
      },
      c2Title: { de: "Nachfolge oder Mit-Unternehmer", en: "Succession or Co-Entrepreneurship" },
      c2Body:  {
        de: "Wir führen Lebenswerke bei Nachfolgesituationen weiter oder engagieren uns mit ambitionierten Mit-Unternehmern, die mit uns den Weg gemeinsam beschreiten und erfolgreiche Gruppen aufbauen wollen.",
        en: "We continue life's works in succession situations, or we engage alongside ambitious co-entrepreneurs who want to walk this path with us and build successful groups together.",
      },
      c3Title: { de: "Unternehmen als Plattform", en: "Companies as Platforms" },
      c3Body:  {
        de: "Wir suchen vorrangig Unternehmen als Plattform mit einem Umsatz von 10–100 Mio. € sowie ergänzende Zukäufe als Add-ons ab einem Umsatz von 3 Mio. €.",
        en: "We primarily look for platform companies with revenues of €10–100M, complemented by add-on acquisitions starting at €3M in revenue.",
      },
    },
  },

  // Nachfolge & Mit-Unternehmer
  // Nachfolge — title splits across two lines as
  //   "Motivierte Nachfolgeunternehmer"
  //   "und **Operator.**"
  // The connector "und"/"and" lives on its own line together with the
  // bold word so "Operator" never gets pushed onto a third line on
  // narrow viewports where the long DE first line wraps.
  nachfolge: {
    // Mirror the DE line break — connector word stays on the first
    // line, only the noun is bolded on the second line.
    titleA:         { de: "Motivierte Nachfolgeunternehmer", en: "Motivated Successors" },
    titleConnector: { de: "und",                              en: "and" },
    titleBold:      { de: "Operator.",                         en: "Operators." },
    intro: {
      de: "Für unsere Gruppenstrategien suchen wir neben passenden Unternehmen auch die richtigen Unternehmer für die nächste Generation. Dabei sind wir grundsätzlich offen, was man an Erfahrungen mitbringt — für uns zählt vor allem der unternehmerische Geist, gemeinsam etwas Großes und Nachhaltiges aufzubauen. Dafür bieten wir spannende Eigenkapitalbeteiligungen & Incentives.",
      en: "For our group strategies, we look not only for the right companies but also for the right entrepreneurs for the next generation. We are open regarding background and experience — what matters most is the entrepreneurial drive to build something significant and lasting together. In return, we offer compelling equity participation and incentives.",
    },
    cards: {
      c1Title: { de: "Eigenkapitalbeteiligung",          en: "Equity Participation" },
      c1Body:  {
        de: "Wir strukturieren echte Mitunternehmerschaft — der Nachfolger oder Mit-Unternehmer beteiligt sich am Aufbau der Gruppe und profitiert direkt vom gemeinsam geschaffenen Wert.",
        en: "We structure genuine co-entrepreneurship — the successor or operator participates in building the group and benefits directly from the value created together.",
      },
      c2Title: { de: "Bewährtes Playbook",               en: "Proven Playbook" },
      c2Body:  {
        de: "Über 20 aufgebaute Unternehmensgruppen und mehr als 100 Manager — wir wissen, was funktioniert und was nicht, und bringen erprobte Prozesse vom ersten Tag an mit.",
        en: "20+ corporate groups built and more than 100 managers worked with — we know what works and what doesn't, and bring proven processes from day one.",
      },
      c3Title: { de: "KI-gestützte Technologieplattform", en: "AI-Powered Technology Platform" },
      c3Body:  {
        de: "Proprietäre Tools für Sourcing, Integration und operative Steuerung — für einen zügigen Marktzugang und Operational Excellence.",
        en: "Proprietary tools for sourcing, integration, and operational management — enabling rapid market access and operational excellence.",
      },
      c4Title: { de: "Netzwerk & Operator-Community",     en: "Network & Operator Community" },
      c4Body:  {
        de: "Zugang zu einem Netzwerk erfahrener Unternehmer und Manager, die denselben Weg gegangen sind — für Sparring, Führungskräfte und Zukäufe.",
        en: "Access to a network of experienced entrepreneurs and managers who have walked the same path — for sparring, leadership talent, and add-on acquisitions.",
      },
    },
  },

  // Quotes
  quotes: {
    leander: {
      text: {
        de: "„Wir investieren nicht nur in Unternehmen … wir investieren in Menschen, die Unternehmen groß machen.“",
        en: "“We don't just invest in companies … we invest in the people who make companies great.”",
      },
      role: { de: "Partner", en: "Partner" },
    },
    max: {
      text: {
        de: "„Ein Unternehmen zu übergeben ist eine der größten Entscheidungen im Leben eines Unternehmers. Wir wissen, was dabei auf dem Spiel steht.“",
        en: "“Handing over a company is one of the most significant decisions in an entrepreneur's life. We understand what is at stake.”",
      },
      role: { de: "Partner", en: "Partner" },
    },
    amon: {
      text: {
        de: "„Wir verankern KI und Digitalisierung dort, wo sie Wachstum, Geschwindigkeit und Kundennutzen messbar steigern — und schaffen so die Grundlage, aus mittelständischen Dienstleistern eine starke, digital vernetzte Unternehmensgruppe aufzubauen.“",
        en: "“We embed AI and digitalization where they measurably increase growth, speed, and customer value — creating the foundation to build mid-market service providers into a strong, digitally connected corporate group.”",
      },
      role: { de: "Partner · KI & Technologie", en: "Partner · AI & Technology" },
    },
  },

  // Ansatz / Approach
  ansatz: {
    titleA:    { de: "Unsere Strategie zum Aufbau von",  en: "Our Strategy for Building" },
    titleBold: { de: "Unternehmensgruppen.",              en: "Corporate Groups." },
    intro: {
      de: "Unsere Plattformstrategie fokussiert den Aufbau integrierter Gruppen: vom Nukleus bis zur führenden Gruppe. Dabei verfolgen wir ein klares Playbook, das wir selbst über Jahre hinweg erarbeitet und erfolgreich umgesetzt haben. Der Ablauf folgt für jedes Unternehmen einem klaren Schema.",
      en: "Our platform strategy focuses on building integrated groups — from the nucleus to a market-leading group. We follow a clear playbook that we have developed and successfully executed over many years. The process for each company follows a clear pattern.",
    },
    phases: {
      p1Label: { de: "Phase 1",        en: "Phase 1" },
      p1Title: { de: "Kennenlernen",   en: "Getting to Know Each Other" },
      p1Body:  {
        de: "Persönlicher Austausch und gemeinsames Kennenlernen der Gruppenstrategie. Gespräche auf Augenhöhe mit dem Blick für die wichtigen Themen.",
        en: "Personal exchange and joint introduction to the group strategy. Conversations on equal footing, focused on what truly matters.",
      },
      p2Label: { de: "Phase 2",         en: "Phase 2" },
      p2Title: { de: "Strukturierung",  en: "Structuring" },
      p2Body:  {
        de: "Gemeinsame Erarbeitung der Transaktionsstruktur, Beteiligungsverhältnisse und Rollenverteilung. Klare Vereinbarungen als Grundlage für eine langfristige Partnerschaft.",
        en: "Joint development of the transaction structure, equity arrangements, and role distribution. Clear agreements as the foundation for a long-term partnership.",
      },
      p3Label: { de: "Phase 3",                       en: "Phase 3" },
      p3Title: { de: "Beteiligung & Integration",     en: "Investment & Integration" },
      p3Body:  {
        de: "Onboarding in die Gruppe — entweder als Nukleus einer neuen Gruppe oder Einbringung in eine bestehende Plattform. Einführung unserer Technologieplattform und operativer Prozesse.",
        en: "Onboarding into the group — either as the nucleus of a new group or as part of an existing platform. Implementation of our technology platform and operational processes.",
      },
      p4Label: { de: "Phase 4",     en: "Phase 4" },
      p4Title: { de: "Skalierung",  en: "Scaling" },
      p4Body:  {
        de: "Gemeinsamer Aufbau der Gruppe durch gezielte Add-on-Akquisitionen, KI-Integration und Entwicklung zur führenden Plattform im Segment.",
        en: "Building the group together through targeted add-on acquisitions, AI integration, and development into a leading platform within the segment.",
      },
    },
  },

  // Mehrwerte / Strength Through Scale
  mehrwerte: {
    titleA:    { de: "Was eine starke Gruppe", en: "Strength" },
    titleBold: { de: "möglich macht.",          en: "Through Scale." },
    intro: {
      de: "Als Teil einer führenden Unternehmensgruppe erschließen sich Märkte, Talente und Technologien, die für ein Einzelunternehmen schlicht nicht erreichbar wären — bei gleichzeitig geteilten Risiken, gemeinsamer Infrastruktur und der Schlagkraft einer Plattform.",
      en: "As part of a leading group, markets, talents, and technologies become accessible that would simply be out of reach for a stand-alone company — combined with shared risks, common infrastructure, and the strength of a platform.",
    },
    cards: {
      c1Title: { de: "Attraktiver Arbeitgeber",  en: "Attractive Employer" },
      c1Body:  {
        de: "Durch eine attraktive Arbeitgebermarke, moderne Technologien und Entwicklungsperspektiven über Standortgrenzen hinweg.",
        en: "Through a strong employer brand, modern technologies, and development perspectives across multiple locations.",
      },
      c2Title: { de: "Resiliente Strukturen",     en: "Resilient Structures" },
      c2Body:  {
        de: "Höhere Marktdiversifikation und ausgewogene Balance zwischen Endmärkten und Kapazitäten, ergänzt durch den Aufbau organisatorischer Führungsebenen.",
        en: "Greater market diversification and a balanced mix of end markets and capacities, complemented by the development of organizational leadership levels.",
      },
      c3Title: { de: "Neue Technologien",         en: "New Technologies" },
      c3Body:  {
        de: "Gezielte Investitionen in Tools, KI-Innovation und Digitalisierung sowie zentrale Teams, die neue Technologien gruppenweit verfügbar machen.",
        en: "Targeted investments in tools, AI innovation, and digitalization, alongside central teams that make new technologies available group-wide.",
      },
      c4Title: { de: "Marktzugänge",              en: "Market Access" },
      c4Body:  {
        de: "Zugang als Gruppe zu neuen Kunden und Projekten sowie Aufbau gemeinsamer Referenzen und Wissensdaten.",
        en: "Group-level access to new customers and projects, plus shared references and knowledge bases.",
      },
    },
  },

  // Differenzierung — Technologie & KI
  tech: {
    titleA:    { de: "Neue Technologien für",       en: "New Technologies for" },
    titleBold: { de: "Dienstleistungsunternehmen.", en: "Service Companies." },
    intro: {
      de: "KI verändert wissensintensive Dienstleistungen aktuell grundlegend. Wir sehen darin eine Chance: Fachkräfte konzentrieren sich auf das, was echten Wert schafft — Kreativität, Analyse und Kundenverständnis. Die Anwendung findet dabei auf verschiedenen Ebenen der Wertschöpfung statt.",
      en: "AI is fundamentally transforming knowledge-intensive services. We see this as an opportunity: skilled professionals can focus on what truly creates value — creativity, analysis, and customer understanding. Application takes place across multiple levels of the value chain.",
    },
    cards: {
      c1Title: { de: "Management-Ebene", en: "Management Level" },
      c1Body:  {
        de: "Integrierte Reporting- und Forecasting-Lösungen sowie KI-gestützte Sales-Tools schaffen Transparenz, datenbasierte Entscheidungsgrundlagen und entlasten Engpassprozesse in Vertrieb und Kundenmanagement.",
        en: "Integrated reporting and forecasting solutions, along with AI-powered sales tools, create transparency, deliver data-based decision foundations, and relieve bottleneck processes in sales and customer management.",
      },
      c2Title: { de: "Operatives Kerngeschäft", en: "Operational Core Business" },
      c2Body:  {
        de: "Branchenspezifisch zugeschnittene — agentische — Assistenzsysteme unterstützen Fachkräfte in Planung, Prüfung und Dokumentation — für höhere Output-Qualität und beschleunigte Umsetzungszyklen.",
        en: "Industry-specific — agentic — assistance systems support professionals in planning, review, and documentation — for higher output quality and accelerated execution cycles.",
      },
      c3Title: { de: "Supportfunktionen", en: "Support Functions" },
      c3Body:  {
        de: "Wiederkehrende Tätigkeiten in Einkauf, Vertragsmanagement und Marketing werden systematisch automatisiert — für entlastete Prozesse und reduzierte operative Risiken.",
        en: "Recurring tasks in procurement, contract management, and marketing are systematically automated — for streamlined processes and reduced operational risks.",
      },
    },
  },

  // ESG / Sustainability
  esg: {
    // Avoid an "& " hanging at the end of the EN first line — keep the
    // ampersand inside the bold phrase like the DE structure.
    titleA:    { de: "Umsetzung von",      en: "Implementing" },
    titleBold: { de: "Nachhaltigkeit & ESG.", en: "Sustainability & ESG." },
    cards: {
      c1Title: { de: "Arbeitgeberqualität als Wettbewerbsfaktor", en: "Employer Quality as a Competitive Factor" },
      c1Body:  {
        de: "Weiterbildung, Führungskultur und Entwicklungsperspektiven sind keine Zusatzleistungen — sie entscheiden darüber, wer die besten Mitarbeiter gewinnt und hält.",
        en: "Training, leadership culture, and development perspectives are not optional benefits — they determine who wins and retains the best talent.",
      },
      c2Title: { de: "Ressourceneffizienz mit messbarem Ergebnis", en: "Resource Efficiency with Measurable Impact" },
      c2Body:  {
        de: "Energieeffizienz und Dekarbonisierung werden in operative Unternehmensziele übersetzt — mit direkter Wirkung auf Kostenstruktur und Wettbewerbsfähigkeit.",
        en: "Energy efficiency and decarbonization are translated into operational company targets — with direct impact on cost structure and competitiveness.",
      },
      c3Title: { de: "Transparenz als Grundlage", en: "Transparency as the Foundation" },
      c3Body:  {
        de: "Wer seine Wirkung nicht messen kann, kann sie nicht steuern — systematische ESG-Analysen schaffen die Basis für fundierte Entscheidungen auf allen Ebenen.",
        en: "What cannot be measured cannot be managed — systematic ESG analysis provides the basis for informed decisions at every level.",
      },
      c4Title: { de: "Nachhaltigkeit als Chance", en: "Sustainability as Opportunity" },
      c4Body:  {
        de: "Nachhaltig aufgestellte Unternehmen sind resilientere Unternehmen. Wer heute in Strukturen, Menschen und Umwelt investiert, schafft die Voraussetzungen für langfristige Stabilität.",
        en: "Sustainable companies are more resilient companies. Those who invest in structures, people, and the environment today create the conditions for long-term stability.",
      },
    },
  },

  // Kontakt teaser (home page bottom)
  kontaktTeaser: {
    titleA:    { de: "Lassen Sie uns über Ihr",  en: "Let's talk about your" },
    titleBold: { de: "Unternehmen sprechen.",     en: "company." },
    body: {
      de: "Ob Unternehmer, Manager oder M&A-Berater: wir freuen uns über ein erstes Gespräch mit Ihnen.",
      en: "Whether you are an entrepreneur, manager, or M&A advisor — we look forward to a first conversation with you.",
    },
    cta: { de: "Gespräch vereinbaren →", en: "Schedule a conversation →" },
  } satisfies Record<string, T>,

  // /kontakt page
  kontakt: {
    heroEyebrow: { de: "Kontakt aufnehmen", en: "Get in touch" },
    heroTitleA:  { de: "Schreiben Sie uns –", en: "Write to us —" },
    heroTitleBold: { de: "vertraulich.", en: "in confidence." },
    heroSub: {
      de: "Ob Unternehmer, Geschäftsführer, Manager oder M&A-Berater – wir freuen uns über ein erstes Gespräch. Diskretion und Verlässlichkeit sind selbstverständlich.",
      en: "Whether you are an entrepreneur, managing director, manager, or M&A advisor — we look forward to a first conversation. Discretion and reliability go without saying.",
    },
    sideEyebrow: { de: "Wir freuen uns",          en: "We look forward" },
    sideBody: {
      de: "Schreiben Sie uns kurz, was Sie beschäftigt – wir melden uns persönlich zurück. Diskret und ohne Verpflichtung.",
      en: "Tell us briefly what's on your mind — we'll get back to you personally. Discreetly, no obligation.",
    },
    bottomEmailEyebrow: { de: "Direkter Kontakt", en: "Direct contact" },
    bottomLocationEyebrow: { de: "Standort", en: "Location" },
    bottomLocation: {
      de: "Leopoldstraße 21\n80802 München\nFür den gesamten DACH-Raum: Deutschland · Österreich · Schweiz",
      en: "Leopoldstraße 21\n80802 Munich, Germany\nFor the entire DACH region: Germany · Austria · Switzerland",
    },
    // Form
    formLabelName:    { de: "Name *",            en: "Name *" },
    formLabelCompany: { de: "Unternehmen",        en: "Company" },
    formLabelEmail:   { de: "E-Mail *",           en: "Email *" },
    formLabelTopic:   { de: "Anliegen",           en: "Subject" },
    formLabelMessage: { de: "Kurze Nachricht",    en: "Short message" },
    formPlaceholderName:    { de: "Maximilian Mustermann", en: "John Smith" },
    formPlaceholderCompany: { de: "Mustermann GmbH",        en: "Acme Inc." },
    formPlaceholderEmail:   { de: "max@mustermann.de",      en: "john@example.com" },
    formPlaceholderMessage: { de: "Womit können wir helfen?", en: "How can we help?" },
    topicChoose:    { de: "Bitte wählen", en: "Please choose" },
    topicSale:      { de: "Unternehmensverkauf / Nachfolge",            en: "Company sale / Succession" },
    topicAddon:     { de: "Add-on-Empfehlung (M&A-Berater)",             en: "Add-on referral (M&A advisor)" },
    topicOperator:  { de: "Operative Mitarbeit / Management-Rolle",     en: "Operating role / Management position" },
    topicCoinvest:  { de: "Co-Investment",                                en: "Co-investment" },
    topicOther:     { de: "Sonstiges",                                    en: "Other" },
    submitDefault:  { de: "Unverbindliches Gespräch vereinbaren →",     en: "Schedule a conversation →" },
    submitSending:  { de: "Wird gesendet …",                              en: "Sending …" },
    submitSent:     { de: "Vielen Dank – wir melden uns bald ✓",        en: "Thank you — we'll be in touch soon ✓" },
    sentTitle:      { de: "Vielen Dank für Ihre Nachricht.",              en: "Thank you for your message." },
    sentBody: {
      de: "Ihre Anfrage ist bei uns angekommen. Wir melden uns persönlich zurück — diskret und ohne Verpflichtung.",
      en: "Your message has reached us. We'll get back to you personally — discreetly, no obligation.",
    },
    errorFallback: {
      de: "Es gab ein Problem beim Versand. Bitte später erneut versuchen.",
      en: "Something went wrong while sending. Please try again later.",
    },
  } satisfies Record<string, T>,

  // Footer + legal modal
  footer: {
    impressum:  { de: "Impressum",     en: "Imprint" },
    datenschutz:{ de: "Datenschutz",   en: "Privacy" },
    company:    { de: "NextGen Equity Partners · München · © 2026", en: "NextGen Equity Partners · Munich · © 2026" },
  } satisfies Record<string, T>,
} as const;
