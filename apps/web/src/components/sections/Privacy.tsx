"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Privacy() {
  const { t } = useI18n();

  return (
    <section className="bg-zinc-900 py-20 text-white">
      <Container>
        <div className="rounded-3xl border border-white/10 bg-zinc-900/60 p-10">
          <SectionHeading
            eyebrow={t.privacy.eyebrow}
            title={t.privacy.title}
            subtitle={t.privacy.description}
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.privacy.tiles.map((tile) => (
              <div
                key={tile}
                className="rounded-2xl border border-white/10 p-4 text-sm text-white/80"
              >
                {tile}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
