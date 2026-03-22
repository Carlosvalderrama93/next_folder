import { Accordion } from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";

export default async function FAQ() {
  const t = await getTranslations("faq");
  const items: { question: string; answer: string }[] = t.raw("items");

  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-border">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
          {t("heading")}
        </h2>
        <p className="text-gray-500 dark:text-muted-fg mb-8 text-sm">
          {t("subheading")}
        </p>
        <Accordion items={items} />
      </div>
    </section>
  );
}
