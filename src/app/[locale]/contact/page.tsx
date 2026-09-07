import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactView } from "@/components/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("heading"),
    description: t("description"),
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });

  return (
    <main id="main-content">
      <ContactView heading={t("heading")} description={t("description")} />
    </main>
  );
}
