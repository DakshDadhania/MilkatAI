"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="bg-zinc-50 py-20">
      <Container className="grid items-center gap-12 md:grid-cols-2">
        <div className="space-y-6">
          <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            {t.hero.badge}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl">
            {t.hero.title}
          </h1>
          <p className="text-base text-zinc-600 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href="/signup">{t.hero.primaryCta}</Button>
            <Button href="/whatsapp" variant="secondary">
              {t.hero.secondaryCta}
            </Button>
          </div>
          <p className="text-xs text-zinc-500">{t.hero.trustNote}</p>
        </div>
        <div className="rounded-[32px] border border-zinc-200 bg-white p-6 shadow-lg">
          <div className="space-y-4">
            <div className="rounded-2xl bg-zinc-900 px-4 py-3 text-sm text-white">
              Upload land documents
            </div>
            <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
              OCR extracting Gujarati records...
            </div>
            <div className="rounded-2xl bg-zinc-100 px-4 py-3 text-sm text-zinc-700">
              Risk level: Medium
            </div>
            <div className="rounded-2xl bg-white px-4 py-3 text-sm text-zinc-700 shadow-sm">
              Suggested action: verify encumbrance and NA order.
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-dashed border-zinc-200 p-4 text-center text-xs text-zinc-500">
            Gujarati + English reports in minutes
          </div>
        </div>
      </Container>
    </section>
  );
}
