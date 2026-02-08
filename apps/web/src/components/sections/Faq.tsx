"use client";

import { Container } from "@/components/Container";
import { FaqItem } from "@/components/FaqItem";
import { SectionHeading } from "@/components/SectionHeading";
import { useI18n } from "@/lib/i18n";

export function Faq() {
  const { t } = useI18n();

  return (
    <section id="faq" className="py-20">
      <Container>
        <SectionHeading
          eyebrow={t.faqs.eyebrow}
          title={t.faqs.title}
          subtitle={t.faqs.subtitle}
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {t.faqs.items.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
