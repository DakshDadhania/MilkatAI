"use client";

import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { useI18n } from "@/lib/i18n";

export function Cta() {
  const { t } = useI18n();

  return (
    <section className="py-20">
      <Container>
        <div className="rounded-[32px] bg-black px-10 py-14 text-white">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                {t.cta.title}
              </h2>
              <p className="mt-3 text-sm text-white/70">{t.cta.subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/signup">{t.cta.primaryCta}</Button>
              <Button href="/pricing" variant="secondary">
                {t.cta.secondaryCta}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
