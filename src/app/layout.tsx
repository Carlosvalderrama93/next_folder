import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carlosvalderrama.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Carlos Valderrama | Tech Recruiter",
  description:
    "Connecting top LATAM tech talent with leading companies worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Carlos Valderrama",
    title: "Carlos Valderrama | Tech Recruiter",
    description: "Connecting top LATAM tech talent with leading companies worldwide.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: "Carlos Valderrama | Tech Recruiter",
    description: "Connecting top LATAM tech talent with leading companies worldwide.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme'),p=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';if((s||p)==='dark')document.documentElement.classList.add('dark');})()`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
