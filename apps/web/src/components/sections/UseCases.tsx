"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function UseCases() {
  const { t } = useI18n();

  return (
    <section id="use-cases" className="bg-zinc-50 py-20">
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
              className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
