"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-1 py-1">
      <button
        type="button"
        onClick={() => setLanguage("gu")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          language === "gu"
            ? "bg-black text-white"
            : "text-zinc-600 hover:text-zinc-900"
        }`}
      >
        ગુજરાતી
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold ${
          language === "en"
            ? "bg-black text-white"
            : "text-zinc-600 hover:text-zinc-900"
        }`}
      >
        EN
      </button>
    </div>
  );
}
