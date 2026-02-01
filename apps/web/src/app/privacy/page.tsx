"use client";

import { useI18n } from "@/lib/i18n";

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-zinc-900">
          {t.app.privacy.title}
        </h1>
        <p className="mt-4 text-sm text-zinc-600">
          {t.app.privacy.body}
        </p>
      </div>
    </div>
  );
}
