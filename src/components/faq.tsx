import { Accordion } from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";

export default async function FAQ() {
  const faqTranslations = await getTranslations("faq");
  const rawItems: { question: string; answer: string }[] =
    faqTranslations.raw("items");

  const items = rawItems.map((item, index) => ({
    title: item.question,
    content: item.answer,
    value: `faq-${index}`,
  }));

  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-border">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
          {faqTranslations("heading")}
        </h2>
        <p className="text-gray-500 dark:text-muted-fg mb-8 text-sm">
          {faqTranslations("subheading")}
        </p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
