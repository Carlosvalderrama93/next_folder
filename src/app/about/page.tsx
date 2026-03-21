import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

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
          <img
            src={about.image}
            alt="About"
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {about.description}
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900">
            <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
              50+
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Companies Partnered
            </div>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900">
            <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
              200+
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Placements Made
            </div>
          </div>
          <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900">
            <div className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">
              100%
            </div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">
              Remote Focus
            </div>
          </div>
        </div>
      </main>
      <Footer {...footer} />
    </>
  );
}
