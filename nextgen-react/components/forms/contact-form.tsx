"use client";

import { useState } from "react";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  return (
    <form
      className="cf rv"
      id="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
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
            <option>Unternehmensverkauf</option>
            <option>Co-Investment</option>
            <option>Beratung / Netzwerk</option>
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
