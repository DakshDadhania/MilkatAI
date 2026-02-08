"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-sky-500/20 blur-[120px]" />
      </div>
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200/80">
            {t.hero.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="text-base text-slate-300 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/signup">{t.hero.primaryCta}</Button>
            <Button href="/whatsapp" variant="secondary">
              {t.hero.secondaryCta}
            </Button>
          </div>
          <p className="text-xs text-slate-400">{t.hero.trustNote}</p>
        </div>
        <div className="rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_-40px_rgba(56,189,248,0.5)] backdrop-blur">
          <div className="space-y-4">
            <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-3 text-sm text-white shadow-lg shadow-fuchsia-500/30">
              Upload land documents
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
              OCR extracting Gujarati records...
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-slate-200">
              Risk level: Medium
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-slate-200 shadow-sm">
              Suggested action: verify encumbrance and NA order.
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-white/20 p-4 text-center text-xs text-slate-300">
            Gujarati + English reports in minutes
          </div>
        </div>
      </Container>
    </section>
  );
}
