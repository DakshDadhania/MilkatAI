"use client";

import { Container } from "@/components/Container";
import { FeatureCard } from "@/components/FeatureCard";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Features() {
  const { t } = useI18n();

  return (
    <section id="features" className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.features.groups.map((group) => (
            <FeatureCard
              key={group.title}
              title={group.title}
              items={group.items}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
