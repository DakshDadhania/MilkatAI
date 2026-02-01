"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { landingCopy } from "@/data/landing";

export type Language = "en" | "gu";

type I18nContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof landingCopy.en;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("milkatai_lang") as Language;
    if (stored === "en" || stored === "gu") {
      setLanguage(stored);
    }
  }, []);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (lang: Language) => {
        window.localStorage.setItem("milkatai_lang", lang);
        setLanguage(lang);
      },
      t: landingCopy[language],
    }),
    [language]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider.");
  }
  return context;
}
