"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function UseCases() {
  const { t } = useI18n();

  return (
    <section id="use-cases" className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.useCases.eyebrow}
          title={t.useCases.title}
          subtitle={t.useCases.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.useCases.cards.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_60px_-40px_rgba(14,165,233,0.4)] backdrop-blur"
            >
              <h3 className="text-lg font-semibold text-white">
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
