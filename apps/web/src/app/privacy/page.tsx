"use client";

import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-[0_30px_80px_-40px_rgba(56,189,248,0.5)] backdrop-blur">
          <h1 className="text-3xl font-semibold text-white">
          {t.app.privacy.title}
        </h1>
        <p className="mt-4 text-sm text-slate-300">
          {t.app.privacy.body}
        </p>
        </div>
      </div>
    </div>
  );
}
