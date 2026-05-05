"use client";

import { useState } from "react";

const RECIPIENT = "contact@nextgen-equity.com";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="cf rv"
      id="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const company = String(data.get("company") || "").trim();
        const email = String(data.get("email") || "").trim();
        const topic = String(data.get("topic") || "").trim();
        const message = String(data.get("message") || "").trim();

        const subjectParts = ["NextGen Equity – Anfrage"];
        if (name) subjectParts.push(`von ${name}`);
        if (topic && topic !== "Bitte wählen") subjectParts.push(`(${topic})`);

        const lines = [
          name && `Name: ${name}`,
          company && `Unternehmen: ${company}`,
          email && `E-Mail: ${email}`,
          topic && topic !== "Bitte wählen" && `Anliegen: ${topic}`,
          "",
          message,
        ].filter(Boolean) as string[];

        const subject = subjectParts.join(" ");
        const body = lines.join("\n");
        const href =
          `mailto:${RECIPIENT}` +
          `?subject=${encodeURIComponent(subject)}` +
          `&body=${encodeURIComponent(body)}`;

        // Open the user's mail client with everything pre-filled and
        // addressed to contact@nextgen-equity.com.
        window.location.href = href;
        setSent(true);
      }}
    >
      <div className="cf-row">
        <div>
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" type="text" placeholder="Maximilian Mustermann" required disabled={sent} />
        </div>
        <div>
          <label htmlFor="cf-company">Unternehmen</label>
          <input id="cf-company" name="company" type="text" placeholder="Mustermann GmbH" disabled={sent} />
        </div>
      </div>
      <div className="cf-row">
        <div>
          <label htmlFor="cf-email">E-Mail *</label>
          <input id="cf-email" name="email" type="email" placeholder="max@mustermann.de" required disabled={sent} />
        </div>
        <div>
          <label htmlFor="cf-topic">Anliegen</label>
          <select id="cf-topic" name="topic" disabled={sent}>
            <option>Bitte wählen</option>
            <option>Unternehmensverkauf / Nachfolge</option>
            <option>Add-on-Empfehlung (M&amp;A-Berater)</option>
            <option>Operative Mitarbeit / Management-Rolle</option>
            <option>Co-Investment</option>
            <option>Sonstiges</option>
          </select>
        </div>
      </div>
      <div className="cf-row full">
        <div>
          <label htmlFor="cf-msg">Kurze Nachricht</label>
          <textarea id="cf-msg" name="message" placeholder="Womit können wir helfen?" disabled={sent}></textarea>
        </div>
      </div>
      <button type="submit" className={`cf-submit${sent ? " sent" : ""}`}>
        {sent ? "Vielen Dank – wir melden uns bald ✓" : "Unverbindliches Gespräch vereinbaren →"}
      </button>
    </form>
  );
}
