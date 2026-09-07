import { Link } from "@/i18n/navigation";

interface AboutCtaProps {
  translations: {
    ctaHeading: string;
    ctaPositions: string;
    ctaContact: string;
  };
}

export default function AboutCta({ translations }: AboutCtaProps) {
  return (
    <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-balance">
        {translations.ctaHeading}
      </h2>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/jobs"
          className="px-6 py-3 bg-brand text-white rounded-full font-semibold hover:bg-brand-hover transition-colors text-sm"
        >
          {translations.ctaPositions}
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-300 dark:border-border text-gray-700 dark:text-foreground rounded-full font-semibold hover:border-brand hover:text-brand dark:hover:border-brand dark:hover:text-brand transition-colors text-sm"
        >
          {translations.ctaContact}
        </Link>
      </div>
    </section>
  );
}
