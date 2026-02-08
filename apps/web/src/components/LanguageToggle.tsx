"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  const getButtonClass = (isActive: boolean) => {
    if (isActive) {
      return "rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white";
    }
    return "rounded-full px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white";
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-1 py-1">
      <button
        type="button"
        onClick={() => setLanguage("gu")}
        className={getButtonClass(language === "gu")}
        aria-label="Switch language to Gujarati"
      >
        ગુજરાતી
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={getButtonClass(language === "en")}
        aria-label="Switch language to English"
      >
        EN
      </button>
    </div>
  );
}
