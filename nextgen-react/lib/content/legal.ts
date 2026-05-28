import type { Locale } from "@/lib/content/i18n";

export type LegalKey = "impressum" | "datenschutz";

export const LEGAL_CONTENT: Record<Locale, Record<LegalKey, { title: string; html: string }>> = {
  de: {
    impressum: {
      title: "Impressum",
      html: `
        <section>
          <h3>Angaben gemäß § 5 TMG</h3>
          <p>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 München<br>Deutschland</p>
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
          <p>Maximilian Göppert<br>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 München<br>Deutschland</p>
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
      `,
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      html: `
        <section>
          <h3>1. Datenschutz auf einen Blick</h3>
          <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen finden Sie in den nachfolgenden Abschnitten.</p>
        </section>
        <section>
          <h3>2. Verantwortliche Stelle</h3>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne der DSGVO ist:<br><br>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 München<br>Deutschland<br>E-Mail: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
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
          <p>Die Schriftart ("Outfit") wird lokal über die Anwendung ausgeliefert. Beim Aufruf der Website wird keine Verbindung zu einem Google-Fonts-CDN hergestellt.</p>
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
      `,
    },
  },
  en: {
    impressum: {
      title: "Imprint",
      html: `
        <section>
          <h3>Note on the binding language version</h3>
          <p>This page is provided as an English courtesy translation. The legally binding version of the imprint is the German original, in line with § 5 TMG. In case of doubt, the German version takes precedence.</p>
        </section>
        <section>
          <h3>Information pursuant to § 5 TMG</h3>
          <p>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 Munich<br>Germany</p>
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
          <p>Registered with the commercial register.<br>Registry court: Munich Local Court<br>Registration number: HRB 312075</p>
        </section>
        <section>
          <h3>VAT identification number</h3>
          <p>VAT identification number pursuant to § 27 a German VAT Act: DE –</p>
        </section>
        <section>
          <h3>Responsible for content under § 18 (2) MStV</h3>
          <p>Maximilian Göppert<br>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 Munich<br>Germany</p>
        </section>
        <section>
          <h3>EU dispute resolution</h3>
          <p>The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>. You can find our email address above in this imprint.</p>
        </section>
        <section>
          <h3>Consumer dispute resolution</h3>
          <p>We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.</p>
        </section>
        <section>
          <h3>Liability for content</h3>
          <p>As a service provider, we are responsible under § 7 (1) TMG for our own content on these pages in accordance with general law. Under §§ 8 to 10 TMG, however, we are not obliged as a service provider to monitor third-party information transmitted or stored by us, or to investigate circumstances that indicate unlawful activity. Obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point in time at which we become aware of a specific infringement. Upon notification of corresponding infringements, we will remove the content concerned without delay.</p>
        </section>
        <section>
          <h3>Liability for links</h3>
          <p>Our offering contains links to external third-party websites whose content we have no influence over. We therefore cannot assume any liability for this third-party content. The respective provider or operator of the linked pages is always responsible for their content. Linked pages were checked for possible legal infringements at the time of linking. Unlawful content was not recognisable at that time. Permanent monitoring of the content of linked pages without concrete evidence of an infringement is not reasonable. Upon notification of legal infringements, we will remove such links without delay.</p>
        </section>
        <section>
          <h3>Copyright</h3>
          <p>Content and works on these pages created by the site operators are subject to German copyright law. Reproduction, processing, distribution, and any kind of use beyond the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use. Where content on this site has not been created by the operator, the copyrights of third parties are respected.</p>
        </section>
        <section>
          <h3>Image credits</h3>
          <p>Background and image material: Unsplash and Pexels (subject to the respective platform licences).</p>
        </section>
      `,
    },
    datenschutz: {
      title: "Privacy Policy",
      html: `
        <section>
          <h3>Note on the binding language version</h3>
          <p>This page is provided as an English courtesy translation of our German privacy policy. In case of doubt, the German version takes precedence.</p>
        </section>
        <section>
          <h3>1. Privacy at a glance</h3>
          <p>The following notes provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to personally identify you. Detailed information can be found in the following sections.</p>
        </section>
        <section>
          <h3>2. Controller</h3>
          <p>Controller for data processing on this website within the meaning of the GDPR is:<br><br>NextGen Equity Partners GmbH<br>Leopoldstraße 21<br>80802 Munich<br>Germany<br>Email: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a></p>
          <p>The controller is the natural or legal person who, alone or jointly with others, determines the purposes and means of the processing of personal data (e.g. names, email addresses, etc.).</p>
        </section>
        <section>
          <h3>3. Data collection when visiting the website (server log files)</h3>
          <p>When this website is accessed, our hosting provider automatically collects information that your browser transmits to our server:<br>· IP address of the requesting device<br>· Date and time of access<br>· Name and URL of the file accessed<br>· Volume of data transmitted<br>· Notification of successful retrieval<br>· Browser type, browser version and operating system<br>· Referrer URL</p>
          <p>Processing is based on Art. 6 (1) lit. f GDPR, in our legitimate interest of a technically faultless presentation and optimisation of our website. The data is deleted after 30 days at the latest, unless security-relevant incidents require longer storage.</p>
        </section>
        <section>
          <h3>4. Contact form and contact by email</h3>
          <p>If you contact us via the contact form or by email, your details (name, company, email address, subject, message) are stored with us for processing the request and in case of follow-up questions.</p>
          <p>Legal basis is Art. 6 (1) lit. b GDPR (initiation/execution of pre-contractual measures) and Art. 6 (1) lit. f GDPR (legitimate interest in efficient processing). We do not pass this data on without your consent.</p>
          <p>The data will be deleted as soon as it is no longer required for the purpose for which it was collected and there are no statutory retention obligations to the contrary.</p>
        </section>
        <section>
          <h3>5. Cookies</h3>
          <p>This website currently uses only technically necessary cookies, to the extent cookies are used at all. These are necessary to provide basic functions of the site and are stored on the basis of Art. 6 (1) lit. f GDPR. There is no analysis of your user behaviour for marketing or analytics purposes.</p>
        </section>
        <section>
          <h3>6. External services · Fonts</h3>
          <p>The font ("Outfit") is delivered locally by the application. No connection to a Google Fonts CDN is established when the website is accessed.</p>
        </section>
        <section>
          <h3>7. SSL/TLS encryption</h3>
          <p>For security reasons and to protect the transmission of confidential content, this site uses SSL/TLS encryption. You can recognise an encrypted connection by the fact that the browser address bar changes from "http://" to "https://" and by the lock symbol in your browser bar.</p>
        </section>
        <section>
          <h3>8. Your rights as a data subject</h3>
          <p>You have the following rights at any time:<br>· Information about your stored data (Art. 15 GDPR)<br>· Correction of inaccurate data (Art. 16 GDPR)<br>· Deletion of your data ("right to be forgotten", Art. 17 GDPR)<br>· Restriction of processing (Art. 18 GDPR)<br>· Data portability (Art. 20 GDPR)<br>· Objection to processing (Art. 21 GDPR)<br>· Withdrawal of consent once given (Art. 7 (3) GDPR)</p>
          <p>For your requests, please contact us informally at: <a href="mailto:contact@nextgen-equity.com">contact@nextgen-equity.com</a>. Requests are handled promptly.</p>
        </section>
        <section>
          <h3>9. Right to lodge a complaint with the supervisory authority</h3>
          <p>You have the right to lodge a complaint with a data protection supervisory authority about the processing of your personal data. Responsible for us is:<br><br>Bavarian State Office for Data Protection Supervision (BayLDA)<br>Promenade 18, 91522 Ansbach, Germany<br><a href="https://www.lda.bayern.de" target="_blank" rel="noopener">www.lda.bayern.de</a></p>
        </section>
        <section>
          <h3>10. Currency and changes to this privacy policy</h3>
          <p>This privacy policy is currently valid and dated 2026. As the website develops or as legal requirements change, it may become necessary to update this policy. The current privacy policy can be accessed at any time on this page.</p>
        </section>
      `,
    },
  },
};

export const LEGAL_UI: Record<Locale, { eyebrow: string }> = {
  de: { eyebrow: "Rechtliches" },
  en: { eyebrow: "Legal" },
};
