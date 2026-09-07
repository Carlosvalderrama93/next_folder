import { getAboutProfile } from "@/lib/about";
import { AboutView } from "@/components/about";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  return {
    title: "About",
    description: t("description"),
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const profile = await getAboutProfile(locale);

  return (
    <main id="main-content">
      <AboutView profile={profile} locale={locale} />
    </main>
  );
}
