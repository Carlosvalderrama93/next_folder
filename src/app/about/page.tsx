import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import Image from "next/image";
import { homePageData } from "@/Data/homepage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Carlos Valderrama and his mission to connect LATAM tech talent with global companies.",
};

const { about, footer } = homePageData;

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {about.heading}
        </h1>
        <div className="mt-3 mb-6 w-10 h-1 bg-indigo-600 rounded-full" />
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
          <div className="mt-16 grid md:grid-cols-3 gap-6 text-center">
            {about.stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900 border-t-4 border-t-indigo-600"
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
        )}
      </main>
      <Footer {...footer} />
    </>
  );
}
