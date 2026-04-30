/* ============================================================
   NEXTGEN EQUITY · SHARED RUNTIME
============================================================ */

/* NAV */
const nav = document.getElementById('nav');
if (nav && !window.__nextgenNavScrollBound) {
  window.__nextgenNavScrollBound = true;
  const setNavScrolled = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  setNavScrolled();
  window.addEventListener('scroll', setNavScrolled, { passive: true });
}

/* Scroll-driven video scrubbing — top of page = video start, bottom = end */
(function () {
  const video = document.getElementById('scroll-video');
  if (!video) return;

  let duration = 0;
  let pendingTime = 0;
  let raf = 0;

  function applyTime() {
    raf = 0;
    if (duration > 0) {
      try { video.currentTime = pendingTime; } catch (e) { /* ignore early-stage seeks */ }
    }
  }
  function updateScrub() {
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const pct = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    pendingTime = duration * pct;
    if (!raf) raf = requestAnimationFrame(applyTime);
  }
  video.addEventListener('loadedmetadata', () => {
    duration = video.duration || 0;
    video.pause();
    updateScrub();
  });
  video.addEventListener('play', () => video.pause());
  window.addEventListener('scroll', updateScrub, { passive: true });
  window.addEventListener('resize', updateScrub, { passive: true });
})();

/* ACTIVE LINK from current pathname */
(function () {
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* MOBILE NAV */
const burger = document.getElementById('nav-burger');
const mobile = document.getElementById('nav-mobile');
if (burger && mobile && !window.__nextgenNavMobileBound) {
  window.__nextgenNavMobileBound = true;
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    burger.setAttribute('aria-expanded', String(burger.classList.contains('open')));
    mobile.classList.toggle('open');
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      mobile.classList.remove('open');
    });
  });
}

/* REVEAL ON SCROLL */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

/* ============================================================
   3D TILT · per-card direct cursor follow
   - perspective(1000px) rotateX/rotateY set DIRECTLY via inline transform
   - Tilts TOWARD cursor (cursor near top → top edge lifts toward viewer)
   - Max ±15° on both axes
   - During hover: no transform transition (instant follow)
   - On mouseleave: smooth 0.4s ease reset to flat
============================================================ */
function bindTilt(el, max) {
  const TILT_MAX = (typeof max === 'number') ? max : 15;
  let rect = null;
  let raf = 0;
  let pendingX = 0, pendingY = 0, pendingGx = 50, pendingGy = 50;

  function apply() {
    el.style.transform = `perspective(1000px) rotateX(${pendingX.toFixed(2)}deg) rotateY(${pendingY.toFixed(2)}deg)`;
    el.style.setProperty('--gx', pendingGx.toFixed(1) + '%');
    el.style.setProperty('--gy', pendingGy.toFixed(1) + '%');
    raf = 0;
  }

  el.addEventListener('mouseenter', () => {
    rect = el.getBoundingClientRect();
    // Direct cursor follow: no transform transition during hover
    el.style.transition = 'box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease';
  });

  el.addEventListener('mousemove', (e) => {
    if (!rect) rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;   // 0..1
    const py = (e.clientY - rect.top) / rect.height;   // 0..1
    // Tilt TOWARD cursor:
    // - cursor at top (py<0.5) → rotateX < 0 → top edge tilts toward viewer
    // - cursor at right (px>0.5) → rotateY < 0 → right edge tilts toward viewer
    pendingX = (py - 0.5) * 2 * TILT_MAX;
    pendingY = (px - 0.5) * -2 * TILT_MAX;
    pendingGx = px * 100;
    pendingGy = py * 100;
    if (!raf) raf = requestAnimationFrame(apply);
  });

  el.addEventListener('mouseleave', () => {
    rect = null;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
    // Re-enable transform transition for smooth reset
    el.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease, background 0.35s ease, border-color 0.35s ease';
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    el.style.setProperty('--gx', '50%');
    el.style.setProperty('--gy', '50%');
  });

  // Keep rect fresh on scroll while hovering
  window.addEventListener('scroll', () => {
    if (rect) rect = el.getBoundingClientRect();
  }, { passive: true });
}

// Bind to all card types – subtle tilt amplitude
document.querySelectorAll('.glass-card, .j-item, .tm, .aaa-tool, .cmp-card').forEach(el => bindTilt(el, 3));

/* Detect language from URL path (/en/ subfolder = English) */
const NG_LANG = (location.pathname.toLowerCase().includes('/en/')) ? 'en' : 'de';

/* LEGAL MODAL – Impressum + Datenschutz, content-swapped via data-modal attribute */
const LEGAL_CONTENT_DE = {
  impressum: {
    title: 'Impressum',
    html: `
      <section>
        <h3>Angaben gemäß § 5 TMG</h3>
        <p>NextGen Equity Partners GmbH<br>München, Deutschland</p>
      </section>
      <section>
        <h3>Vertreten durch die Geschäftsführer</h3>
        <p>Maximilian Göppert<br>Leander Heyken<br>Dr. Amon Göppert</p>
      </section>
      <section>
        <h3>Kontakt</h3>
        <p>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
      </section>
      <section>
        <h3>Registereintrag</h3>
        <p>Eingetragen im Handelsregister.<br>Registergericht: Amtsgericht München<br>Registernummer: HRB 312075</p>
      </section>
      <section>
        <h3>Umsatzsteuer-Identifikationsnummer</h3>
        <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: DE –</p>
      </section>
      <section>
        <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
        <p>Maximilian Göppert<br>NextGen Equity Partners GmbH<br>München, Deutschland</p>
      </section>
      <section>
        <h3>EU-Streitschlichtung</h3>
        <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
      </section>
      <section>
        <h3>Verbraucherstreitbeilegung</h3>
        <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </section>
      <section>
        <h3>Haftung für Inhalte</h3>
        <p>Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
      </section>
      <section>
        <h3>Haftung für Links</h3>
        <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
      </section>
      <section>
        <h3>Urheberrecht</h3>
        <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet.</p>
      </section>
      <section>
        <h3>Bildnachweise</h3>
        <p>Hintergrund- und Bildmaterial: Unsplash sowie Pexels (jeweilige Lizenzen der Plattformen).</p>
      </section>
    `
  },
  datenschutz: {
    title: 'Datenschutzerklärung',
    html: `
      <section>
        <h3>1. Datenschutz auf einen Blick</h3>
        <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen finden Sie in den nachfolgenden Abschnitten.</p>
      </section>
      <section>
        <h3>2. Verantwortliche Stelle</h3>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:<br><br>NextGen Equity Partners GmbH<br>München, Deutschland<br>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
        <p>Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.</p>
      </section>
      <section>
        <h3>3. Erfassung von Daten beim Besuch der Website (Server-Log-Files)</h3>
        <p>Beim Aufruf dieser Website erhebt unser Hosting-Provider automatisch Informationen, die Ihr Browser an unseren Server übermittelt:<br>· IP-Adresse des anfragenden Rechners<br>· Datum und Uhrzeit des Zugriffs<br>· Name und URL der abgerufenen Datei<br>· Übertragene Datenmenge<br>· Meldung über erfolgreichen Abruf<br>· Browsertyp, Browserversion und Betriebssystem<br>· Referrer-URL</p>
        <p>Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO aus unserem berechtigten Interesse an einer technisch fehlerfreien Darstellung und Optimierung unserer Website. Die Daten werden nach spätestens 30 Tagen gelöscht, sofern keine sicherheitsrelevanten Vorfälle eine längere Speicherung erfordern.</p>
      </section>
      <section>
        <h3>4. Kontaktformular und Kontaktaufnahme per E-Mail</h3>
        <p>Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, werden Ihre Angaben (Name, Unternehmen, E-Mail-Adresse, Anliegen, Nachricht) zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.</p>
        <p>Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Durchführung vorvertraglicher Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Bearbeitung). Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.</p>
        <p>Die Daten werden gelöscht, sobald sie für den Zweck ihrer Erhebung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
      </section>
      <section>
        <h3>5. Cookies</h3>
        <p>Diese Website verwendet derzeit ausschließlich technisch notwendige Cookies, soweit überhaupt Cookies eingesetzt werden. Diese sind erforderlich, um grundlegende Funktionen der Seite bereitzustellen, und werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Es findet keine Auswertung Ihres Nutzerverhaltens für Marketing- oder Analysezwecke statt.</p>
      </section>
      <section>
        <h3>6. Externe Dienste · Schriftarten</h3>
        <p>Diese Website lädt Schriftarten ("Outfit") über das Google-Fonts-CDN. Beim Aufruf der Seite kann hierbei Ihre IP-Adresse an Google Ireland Limited bzw. Google LLC (USA) übermittelt werden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer ansprechenden, einheitlichen Darstellung unserer Website). Weitere Informationen finden Sie in der Datenschutzerklärung von Google: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</p>
      </section>
      <section>
        <h3>7. SSL-/TLS-Verschlüsselung</h3>
        <p>Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von "http://" auf "https://" wechselt und am Schloss-Symbol in Ihrer Browserzeile.</p>
      </section>
      <section>
        <h3>8. Ihre Rechte als betroffene Person</h3>
        <p>Sie haben jederzeit folgende Rechte:<br>· Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)<br>· Berichtigung unrichtiger Daten (Art. 16 DSGVO)<br>· Löschung Ihrer Daten ("Recht auf Vergessenwerden", Art. 17 DSGVO)<br>· Einschränkung der Verarbeitung (Art. 18 DSGVO)<br>· Datenübertragbarkeit (Art. 20 DSGVO)<br>· Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)<br>· Widerruf einer einmal erteilten Einwilligung (Art. 7 Abs. 3 DSGVO)</p>
        <p>Wenden Sie sich für Ihre Anfragen formlos an: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a>. Eine Bearbeitung erfolgt zeitnah.</p>
      </section>
      <section>
        <h3>9. Beschwerderecht bei der Aufsichtsbehörde</h3>
        <p>Sie haben das Recht, sich bei einer Datenschutzaufsichtsbehörde über die Verarbeitung Ihrer personenbezogenen Daten zu beschweren. Zuständig für uns ist:<br><br>Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)<br>Promenade 18, 91522 Ansbach<br><a href="https://www.lda.bayern.de" target="_blank" rel="noopener">www.lda.bayern.de</a></p>
      </section>
      <section>
        <h3>10. Aktualität und Änderung dieser Datenschutzerklärung</h3>
        <p>Diese Datenschutzerklärung ist aktuell gültig und hat den Stand 2026. Durch die Weiterentwicklung der Website oder geänderte gesetzliche Vorgaben kann es notwendig werden, diese Erklärung anzupassen. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Seite abgerufen werden.</p>
      </section>
    `
  }
};

const LEGAL_CONTENT_EN = {
  impressum: {
    title: 'Imprint',
    html: `
      <section>
        <h3>Information according to § 5 TMG</h3>
        <p>NextGen Equity Partners GmbH<br>Munich, Germany</p>
      </section>
      <section>
        <h3>Represented by the managing directors</h3>
        <p>Maximilian Göppert<br>Leander Heyken<br>Dr. Amon Göppert</p>
      </section>
      <section>
        <h3>Contact</h3>
        <p>Email: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
      </section>
      <section>
        <h3>Commercial register</h3>
        <p>Registered in the commercial register.<br>Registration court: Local court (Amtsgericht) Munich<br>Registration number: HRB 312075</p>
      </section>
      <section>
        <h3>VAT identification number</h3>
        <p>VAT identification number according to § 27 a German Value Added Tax Act: DE –</p>
      </section>
      <section>
        <h3>Responsible for content according to § 18 (2) MStV</h3>
        <p>Maximilian Göppert<br>NextGen Equity Partners GmbH<br>Munich, Germany</p>
      </section>
      <section>
        <h3>EU dispute resolution</h3>
        <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. Our email address is listed above in the imprint.</p>
      </section>
      <section>
        <h3>Consumer dispute resolution</h3>
        <p>We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
      </section>
      <section>
        <h3>Liability for content</h3>
        <p>As a service provider, we are responsible for our own content on these pages in accordance with § 7 (1) TMG. According to §§ 8 to 10 TMG, however, we are not obliged as a service provider to monitor transmitted or stored third-party information.</p>
      </section>
      <section>
        <h3>Liability for links</h3>
        <p>Our offer contains links to external third-party websites whose content we have no influence over. The respective provider or operator of the linked pages is solely responsible for their content.</p>
      </section>
      <section>
        <h3>Copyright</h3>
        <p>Content and works on these pages created by the site operator are subject to German copyright law. Reproduction, processing, distribution, and any kind of use require written consent.</p>
      </section>
    `
  },
  datenschutz: {
    title: 'Privacy Policy',
    html: `
      <section>
        <h3>1. Privacy at a glance</h3>
        <p>The following notes provide a simple overview of what happens to your personal data when you visit this website.</p>
      </section>
      <section>
        <h3>2. Data controller</h3>
        <p>NextGen Equity Partners GmbH<br>Munich, Germany<br>Email: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
      </section>
      <section>
        <h3>3. Server log files</h3>
        <p>When you access this website, our hosting provider automatically collects information that your browser transmits: IP address, date and time of access, file requested, browser, OS, referrer URL. Legal basis: Art. 6 (1) (f) GDPR. Data is deleted after 30 days at the latest.</p>
      </section>
      <section>
        <h3>4. Contact form and email</h3>
        <p>Information you provide via the contact form or email is stored to handle your request. Legal basis: Art. 6 (1) (b) and (f) GDPR.</p>
      </section>
      <section>
        <h3>5. Cookies</h3>
        <p>This website currently uses only technically necessary cookies. No tracking or marketing cookies.</p>
      </section>
      <section>
        <h3>6. External services · Fonts</h3>
        <p>This site loads fonts ("Outfit") via Google Fonts CDN. Your IP address may be transmitted to Google. Legal basis: Art. 6 (1) (f) GDPR. Details: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a>.</p>
      </section>
      <section>
        <h3>7. SSL/TLS encryption</h3>
        <p>This site uses SSL/TLS encryption for security reasons.</p>
      </section>
      <section>
        <h3>8. Your rights</h3>
        <p>Information, correction, deletion, restriction, data portability, objection (Art. 15-21 GDPR), withdrawal of consent (Art. 7 (3) GDPR). Inquiries to <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a>.</p>
      </section>
      <section>
        <h3>9. Right to lodge a complaint</h3>
        <p>Bavarian State Office for Data Protection Supervision (BayLDA), Promenade 18, 91522 Ansbach. <a href="https://www.lda.bayern.de" target="_blank" rel="noopener">www.lda.bayern.de</a></p>
      </section>
      <section>
        <h3>10. Validity</h3>
        <p>Status 2026. Updates may be made when needed.</p>
      </section>
    `
  }
};

const LEGAL_CONTENT = (NG_LANG === 'en') ? LEGAL_CONTENT_EN : LEGAL_CONTENT_DE;

const impBackdrop = document.getElementById('imp-backdrop');
const impClose = document.getElementById('imp-close');
const impTitle = document.getElementById('imp-title');
const impBody = document.getElementById('imp-body');

function openLegalModal(key) {
  if (!impBackdrop || !LEGAL_CONTENT[key]) return;
  if (impTitle) impTitle.textContent = LEGAL_CONTENT[key].title;
  if (impBody) impBody.innerHTML = LEGAL_CONTENT[key].html;
  impBackdrop.classList.add('open');
  if (impBody) impBody.scrollTop = 0;
}

if (impBackdrop) {
  document.querySelectorAll('[data-modal]').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal(b.getAttribute('data-modal'));
    });
  });
  // Backwards compat with old data-imp attribute → defaults to impressum
  document.querySelectorAll('[data-imp]').forEach(b => {
    b.addEventListener('click', (e) => {
      e.preventDefault();
      openLegalModal('impressum');
    });
  });
  if (impClose) impClose.addEventListener('click', () => impBackdrop.classList.remove('open'));
  impBackdrop.addEventListener('click', (e) => { if (e.target === impBackdrop) impBackdrop.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') impBackdrop.classList.remove('open'); });
}

/* CONTACT FORM */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.cf-submit');
    btn.classList.add('sent');
    btn.textContent = (NG_LANG === 'en') ? 'Thank you – we will be in touch soon ✓' : 'Vielen Dank – wir melden uns bald ✓';
    form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
  });
}

/* ORB PARALLAX */
const orbs = document.querySelectorAll('.orb');
window.addEventListener('mousemove', (e) => {
  const cx = (e.clientX / window.innerWidth) - 0.5;
  const cy = (e.clientY / window.innerHeight) - 0.5;
  orbs.forEach((o, i) => {
    const f = (i + 1) * 18;
    o.style.transform = `translate(${cx * f}px, ${cy * f}px)`;
  });
});

/* ============================================================
   GLASS CARD ICONS · auto-injected line icons
============================================================ */
(function () {
  const I = {
    coin:      '<circle cx="12" cy="12" r="9"/><path d="M9 9.5h4.5a2 2 0 010 4H10a2 2 0 000 4h5M12 6.5v11"/>',
    cpu:       '<rect x="6" y="6" width="12" height="12" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="0.5"/><path d="M9 6V3M12 6V3M15 6V3M9 21v-3M12 21v-3M15 21v-3M6 9H3M6 12H3M6 15H3M21 9h-3M21 12h-3M21 15h-3"/>',
    target:    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/>',
    users:     '<circle cx="9" cy="9" r="3.5"/><path d="M3 19a6 6 0 0112 0M16.5 11.5a3 3 0 100-6 3 3 0 000 6zM21 19a5 5 0 00-7-4.6"/>',
    user:      '<circle cx="12" cy="9" r="3.5"/><path d="M5 20a7 7 0 0114 0"/>',
    chart:     '<path d="M3 20h18M6 16l3-3 3 2 4-5 5 4"/>',
    globe:     '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18"/>',
    handshake: '<path d="M5 13l4-4 3 3 4-4 3 3M5 13l3 3 4-4M16 11l4 4-3 3-3-3"/>',
    shield:    '<path d="M12 3l8 3v6c0 4.5-3.5 8-8 9-4.5-1-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    leaf:      '<path d="M5 19c0-9 7-15 15-15-1 8-6 15-15 15z"/><path d="M5 19l8-8"/>',
    layers:    '<path d="M12 4l9 5-9 5-9-5 9-5z"/><path d="M3 14l9 5 9-5M3 19l9 5 9-5"/>',
    compass:   '<circle cx="12" cy="12" r="9"/><path d="M15 9l-2 6-6 2 2-6 6-2z"/>',
    plus:      '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
    arrowOut:  '<path d="M5 19l14-14M14 5h5v5"/>',
    flag:      '<path d="M5 4v17M5 4h12l-3 4 3 4H5"/>',
    horizon:   '<path d="M3 17h18"/><circle cx="12" cy="13" r="4"/><path d="M3 12l3-3M21 12l-3-3"/>',
    spark:     '<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 16.5l2 2M5.5 18.5l2-2M16.5 7.5l2-2"/>',
    eye:       '<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  };
  const RULES = [
    [/kapital|unternehmer/i,                                   'coin'],
    [/technologie|^tech|atlas|powerhouse|implementierung/i,    'cpu'],
    [/strategie/i,                                             'target'],
    [/kultur|familie|arbeitgeber|menschen/i,                   'users'],
    [/profil|dienstleistung|wissensintensiv/i,                 'user'],
    [/umsatz|skalierung/i,                                     'chart'],
    [/region|dach|münchen/i,                                   'globe'],
    [/vertrauen|nachfolge/i,                                   'handshake'],
    [/verlässlich/i,                                           'shield'],
    [/verantwortung|nachhaltig/i,                              'leaf'],
    [/plattform|konzern/i,                                     'layers'],
    [/governance|sourcing|origination|deal/i,                  'compass'],
    [/buy[-\s]?in|partnerschaft/i,                             'handshake'],
    [/add[-\s]?on|akquisition/i,                               'plus'],
    [/exit/i,                                                  'arrowOut'],
    [/wettbewerb/i,                                            'flag'],
    [/mittelfristig|kurzfristig/i,                             'compass'],
    [/langfristig|horizon|vision/i,                            'horizon'],
    [/value\s?creation|wachstum|operativ/i,                    'spark'],
    [/portfolio|monitoring|tracking/i,                         'eye'],
    [/^pe$/i,                                                  'shield'],
    [/^ki$/i,                                                  'cpu'],
    [/professional/i,                                          'spark'],
  ];

  document.querySelectorAll('.glass-card').forEach(card => {
    if (card.querySelector('.gc-icon')) return;
    const numEl = card.querySelector('.num, .label');
    if (!numEl) return;
    const text = numEl.textContent || '';
    let key = null;
    for (const [rx, k] of RULES) {
      if (rx.test(text)) { key = k; break; }
    }
    if (!key) return;
    // Wrap icon + .num together as a flex row so the icon sits next to the label
    const row = document.createElement('div');
    row.className = 'gc-num-row';
    const iconWrap = document.createElement('span');
    iconWrap.className = 'gc-icon';
    iconWrap.innerHTML = `<svg viewBox="0 0 24 24">${I[key]}</svg>`;
    numEl.parentElement.insertBefore(row, numEl);
    row.appendChild(iconWrap);
    row.appendChild(numEl);
  });
})();
