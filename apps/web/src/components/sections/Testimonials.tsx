"use client";

import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { TestimonialCard } from "@/components/TestimonialCard";
import { useI18n } from "@/lib/i18n";

export function Testimonials() {
  const { t } = useI18n();

  return (
    <section id="testimonials" className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.testimonials.eyebrow}
          title={t.testimonials.title}
          subtitle={t.testimonials.subtitle}
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {t.testimonials.cards.map((item) => (
            <TestimonialCard
              key={item.name}
              name={item.name}
              role={item.role}
              quote={item.quote}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
