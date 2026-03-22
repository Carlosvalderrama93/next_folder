"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function switchLocale(next: string) {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  }

  return (
    <div className="flex items-center rounded-full border border-gray-200 dark:border-gray-700 overflow-hidden text-xs font-semibold">
      {(["en", "es"] as const).map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          disabled={isPending || locale === l}
          aria-pressed={locale === l}
          className={`px-2.5 py-1 transition-colors ${
            locale === l
              ? "bg-black dark:bg-white text-white dark:text-black"
              : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
