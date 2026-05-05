"use client";

import { useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { tr } from "@/lib/content/i18n";

type Status = "idle" | "sending" | "sent" | "error";

const RECIPIENT = "contact@nextgen-equity.com";
const ENDPOINT = `https://formsubmit.co/ajax/${RECIPIENT}`;

export function ContactForm() {
  const { locale } = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isLocked = status === "sending";

  if (status === "sent") {
    return (
      <div className="cf cf-sent rv" role="status" aria-live="polite">
        <div className="cf-sent-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="44" height="44" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12.5l4.5 4.5L19 7" />
          </svg>
        </div>
        <h3 className="cf-sent-title">{tr.kontakt.sentTitle[locale]}</h3>
        <p className="cf-sent-body">{tr.kontakt.sentBody[locale]}</p>
      </div>
    );
  }

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

        const subject = topic && topic !== tr.kontakt.topicChoose[locale]
          ? `NextGen Equity — ${name} (${topic})`
          : `NextGen Equity — ${name}`;

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
            throw new Error(data.message || tr.kontakt.errorFallback[locale]);
          }
          setStatus("sent");
        } catch (err) {
          const msg = err instanceof Error ? err.message : tr.kontakt.errorFallback[locale];
          setErrorMsg(msg);
          setStatus("error");
        }
      }}
    >
      <div className="cf-row">
        <div>
          <label htmlFor="cf-name">{tr.kontakt.formLabelName[locale]}</label>
          <input id="cf-name" name="name" type="text" placeholder={tr.kontakt.formPlaceholderName[locale]} required disabled={isLocked} />
        </div>
        <div>
          <label htmlFor="cf-company">{tr.kontakt.formLabelCompany[locale]}</label>
          <input id="cf-company" name="company" type="text" placeholder={tr.kontakt.formPlaceholderCompany[locale]} disabled={isLocked} />
        </div>
      </div>
      <div className="cf-row">
        <div>
          <label htmlFor="cf-email">{tr.kontakt.formLabelEmail[locale]}</label>
          <input id="cf-email" name="email" type="email" placeholder={tr.kontakt.formPlaceholderEmail[locale]} required disabled={isLocked} />
        </div>
        <div>
          <label htmlFor="cf-topic">{tr.kontakt.formLabelTopic[locale]}</label>
          <select id="cf-topic" name="topic" disabled={isLocked} defaultValue={tr.kontakt.topicChoose[locale]}>
            <option>{tr.kontakt.topicChoose[locale]}</option>
            <option>{tr.kontakt.topicSale[locale]}</option>
            <option>{tr.kontakt.topicAddon[locale]}</option>
            <option>{tr.kontakt.topicOperator[locale]}</option>
            <option>{tr.kontakt.topicCoinvest[locale]}</option>
            <option>{tr.kontakt.topicOther[locale]}</option>
          </select>
        </div>
      </div>
      <div className="cf-row full">
        <div>
          <label htmlFor="cf-msg">{tr.kontakt.formLabelMessage[locale]}</label>
          <textarea id="cf-msg" name="message" placeholder={tr.kontakt.formPlaceholderMessage[locale]} disabled={isLocked}></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="cf-submit"
        disabled={isLocked}
      >
        {status === "sending" ? tr.kontakt.submitSending[locale] : tr.kontakt.submitDefault[locale]}
      </button>
      {status === "error" && errorMsg && (
        <p className="cf-error" role="alert">
          {errorMsg}
        </p>
      )}
    </form>
  );
}
