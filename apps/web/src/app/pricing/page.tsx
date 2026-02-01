"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="mx-auto max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-semibold text-zinc-900">
          {t.app.pricing.title}
        </h1>
        <p className="mt-2 text-sm text-zinc-600">
          {t.app.pricing.subtitle}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              {t.app.pricing.starterTitle}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {t.app.pricing.starterPrice}
            </p>
            <p className="mt-4 text-sm text-zinc-600">
              {t.app.pricing.starterDesc}
            </p>
          </div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-zinc-900">
              {t.app.pricing.proTitle}
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              {t.app.pricing.proPrice}
            </p>
            <p className="mt-4 text-sm text-zinc-600">
              {t.app.pricing.proDesc}
            </p>
          </div>
        </div>
        <Link href="/signup" className="mt-8 inline-block text-sm font-semibold">
          {t.app.pricing.cta}
        </Link>
      </div>
    </div>
  );
}
