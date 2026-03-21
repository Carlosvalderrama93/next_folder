import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { homePageData } from "@/Data/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Carlos Valderrama",
  description: "Learn about Carlos Valderrama and his mission to connect LATAM tech talent with global companies.",
};

const { about, footer } = homePageData;

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {about.heading}
        </h1>
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
          {about.description}
        </p>

        {about.stats && about.stats.length > 0 && (
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
              >
                <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer {...footer} />
    </>
  );
}
