import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactForm from "./contact-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: "Contact",
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
  const { footer } = homePageData;

  return (
    <>
      <Navigation />
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("heading")}
        </h1>
        <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          {t("description")}
        </p>
        <ContactForm />
      </main>
      <Footer {...footer} />
    </>
  );
}
