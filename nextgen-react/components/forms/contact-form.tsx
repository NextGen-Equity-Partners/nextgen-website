"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

const RECIPIENT = "contact@nextgen-equity.com";
const ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLocked = status === "sending" || status === "sent";

  return (
    <form
      className="cf rv"
      id="contact-form"
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        const name = String(data.get("name") || "").trim();
        const company = String(data.get("company") || "").trim();
        const email = String(data.get("email") || "").trim();
        const topic = String(data.get("topic") || "").trim();
        const message = String(data.get("message") || "").trim();

        const subject = topic && topic !== "Bitte wählen"
          ? `NextGen Equity – Anfrage von ${name} (${topic})`
          : `NextGen Equity – Anfrage von ${name}`;

        const payload = {
          name,
          company,
          email,
          topic,
          message,
          _subject: subject,
          _replyto: email,
          _template: "table",
          _captcha: "false",
        };

        setStatus("sending");
        setErrorMsg(null);
        try {
          const res = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
          const data = (await res.json().catch(() => ({}))) as {
            success?: string | boolean;
            message?: string;
          };
          if (
            !res.ok ||
            (data.success !== true &&
              String(data.success).toLowerCase() !== "true")
          ) {
            throw new Error(
              data.message ||
                "Es gab ein Problem beim Versand. Bitte später erneut versuchen.",
            );
          }
          setStatus("sent");
        } catch (err) {
          const msg =
            err instanceof Error
              ? err.message
              : "Es gab ein Problem beim Versand.";
          setErrorMsg(msg);
          setStatus("error");
        }
      }}
    >
      <div className="cf-row">
        <div>
          <label htmlFor="cf-name">Name *</label>
          <input id="cf-name" name="name" type="text" placeholder="Maximilian Mustermann" required disabled={isLocked} />
        </div>
        <div>
          <label htmlFor="cf-company">Unternehmen</label>
          <input id="cf-company" name="company" type="text" placeholder="Mustermann GmbH" disabled={isLocked} />
        </div>
      </div>
      <div className="cf-row">
        <div>
          <label htmlFor="cf-email">E-Mail *</label>
          <input id="cf-email" name="email" type="email" placeholder="max@mustermann.de" required disabled={isLocked} />
        </div>
        <div>
          <label htmlFor="cf-topic">Anliegen</label>
          <select id="cf-topic" name="topic" disabled={isLocked} defaultValue="Bitte wählen">
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
          <textarea id="cf-msg" name="message" placeholder="Womit können wir helfen?" disabled={isLocked}></textarea>
        </div>
      </div>
      <button
        type="submit"
        className={`cf-submit${status === "sent" ? " sent" : ""}`}
        disabled={isLocked}
      >
        {status === "sent"
          ? "Vielen Dank – wir melden uns bald ✓"
          : status === "sending"
            ? "Wird gesendet …"
            : "Unverbindliches Gespräch vereinbaren →"}
      </button>
      {status === "error" && errorMsg && (
        <p className="cf-error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
