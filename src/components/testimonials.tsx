import { homePageData } from "@/Data/homepage";
import { Avatar } from "@/components/ui/avatar";
import { getTranslations } from "next-intl/server";

const { testimonials } = homePageData;

export default async function Testimonials() {
  if (!testimonials?.length) return null;
  const t = await getTranslations("testimonials");

  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-gray-800/50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {t("heading")}
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <figure
              key={t.id}
              className="border border-gray-200 dark:border-gray-700 rounded-xl p-6 bg-white dark:bg-gray-900"
            >
              <blockquote>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5">
                  &ldquo;{t.message}&rdquo;
                </p>
              </blockquote>
              <figcaption className="flex items-center gap-3">
                <Avatar src={t.avatar} alt={t.name} size={40} />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {t.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
