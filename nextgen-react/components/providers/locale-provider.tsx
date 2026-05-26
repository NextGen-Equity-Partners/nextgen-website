"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Locale } from "@/lib/content/i18n";

const STORAGE_KEY = "nge-locale";

type Ctx = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
};

const LocaleCtx = createContext<Ctx | null>(null);

/**
 * Top-level provider for the active language. Initial value is read
 * once from localStorage (client-only) so the page renders in the
 * user's previously chosen locale without a flash. Falls back to "de"
 * when there's no stored preference.
 */
export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("de");

  // Read stored preference on mount.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "de" || stored === "en") {
        setLocaleState(stored);
        document.documentElement.lang = stored;
      }
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "de" ? "en" : "de");
  }, [locale, setLocale]);

  const value = useMemo<Ctx>(
    () => ({ locale, setLocale, toggle }),
    [locale, setLocale, toggle],
  );

  return <LocaleCtx.Provider value={value}>{children}</LocaleCtx.Provider>;
}

export function useLocale(): Ctx {
  const ctx = useContext(LocaleCtx);
  if (!ctx) {
    // Safe default — return "de" if used outside the provider (e.g.
    // during hydration of a server-rendered subtree).
    return {
      locale: "de",
      setLocale: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}

/** Pick the variant for the active locale. */
export function useT<T extends { de: unknown; en: unknown }>(entry: T): T["de"] {
  const { locale } = useLocale();
  return entry[locale] as T["de"];
}
