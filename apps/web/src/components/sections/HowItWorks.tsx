"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();

  return (
    <section className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.howItWorks.eyebrow}
          title={t.howItWorks.title}
          subtitle={t.howItWorks.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.howItWorks.steps.map((item, index) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-40px_rgba(59,130,246,0.45)] backdrop-blur"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30">
                {index + 1}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
