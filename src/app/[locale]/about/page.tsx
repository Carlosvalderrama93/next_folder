import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { homePageData } from "@/Data/homepage";
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
  const t = await getTranslations({ locale, namespace: "aboutPage" });
  const { about, footer } = homePageData;

  const stats = [
    { value: "50+", label: t("companiesPartnered") },
    { value: "200+", label: t("placementsMade") },
    { value: "100%", label: t("remoteFocus") },
  ];

  return (
    <>
      <Navigation />
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {t("heading")}
        </h1>
        <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
        {about.image && (
          <div className="relative w-full h-64 mb-8">
            <Image
              src={about.image}
              alt="About"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("description")}
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 border-t-4 border-t-brand"
            >
              <div className="text-4xl font-extrabold mb-1 text-gray-900 dark:text-white">
                {stat.value}
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
