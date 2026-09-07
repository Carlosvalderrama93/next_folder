import { getTranslations } from "next-intl/server";

export async function SkipLink({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "layout" });
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-black focus:text-white focus:rounded-lg focus:text-sm focus:font-semibold focus:shadow-lg"
    >
      {t("skipToContent")}
    </a>
  );
}
