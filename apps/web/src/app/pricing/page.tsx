"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export default function PricingPage() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-10 shadow-[0_30px_80px_-40px_rgba(139,92,246,0.5)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-200/80">
            Premium plans
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">
          {t.app.pricing.title}
        </h1>
        <p className="mt-2 text-sm text-slate-300">
          {t.app.pricing.subtitle}
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-[0_20px_60px_-40px_rgba(14,165,233,0.5)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-200/80">
              Starter
            </p>
            <h2 className="mt-3 text-lg font-semibold text-white">
              {t.app.pricing.starterTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              {t.app.pricing.starterPrice}
            </p>
            <p className="mt-4 text-sm text-slate-300">
              {t.app.pricing.starterDesc}
            </p>
            <div className="mt-6 space-y-2 text-xs text-slate-300">
              <p>• Essential document checks</p>
              <p>• Standard turnaround time</p>
              <p>• Email support</p>
            </div>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
            >
              Choose Starter
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-r from-fuchsia-500/20 via-purple-500/20 to-indigo-500/20 p-6 shadow-[0_30px_80px_-40px_rgba(139,92,246,0.6)]">
            <span className="absolute right-4 top-4 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white">
              Most popular
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200/80">
              Pro
            </p>
            <h2 className="mt-3 text-lg font-semibold text-white">
              {t.app.pricing.proTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-200">
              {t.app.pricing.proPrice}
            </p>
            <p className="mt-4 text-sm text-slate-200">
              {t.app.pricing.proDesc}
            </p>
            <div className="mt-6 space-y-2 text-xs text-slate-200">
              <p>• Priority AI processing</p>
              <p>• Risk flags + summaries</p>
              <p>• Dedicated onboarding</p>
            </div>
            <Link
              href="/signup"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg shadow-white/30"
            >
              Choose Pro
            </Link>
          </div>
        </div>
        <Link
          href="/signup"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-200 hover:text-white"
        >
          {t.app.pricing.cta}
        </Link>
        </div>
      </div>
    </div>
  );
}
