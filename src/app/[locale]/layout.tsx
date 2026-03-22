import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BackToTop } from "@/components/ui/back-to-top";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

async function SkipLink({ locale }: { locale: string }) {
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
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("title"),
      template: `%s | Carlos Valderrama`,
    },
    description: t("description"),
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      siteName: "Carlos Valderrama",
      title: t("title"),
      description: t("description"),
      url: SITE_URL,
    },
    twitter: {
      card: "summary",
      title: t("title"),
      description: t("description"),
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark');})()`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <SkipLink locale={locale} />
          <ThemeProvider>
            {children}
            <BackToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
