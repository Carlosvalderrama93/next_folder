import Image from "next/image";
import Link from "next/link";
import { homePageData } from "../Data/homepage";

const hero = homePageData.hero;

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[560px] pb-20 pt-20 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/30 dark:to-gray-950">
      {hero.backgroundImage && (
        <div className="relative w-32 h-32 mb-6 rounded-full ring-4 ring-white dark:ring-gray-900 shadow-xl">
          <Image
            src={hero.backgroundImage}
            alt="Carlos Valderrama"
            fill
            className="rounded-full object-cover"
            sizes="128px"
            priority
          />
        </div>
      )}
      <span className="inline-block text-xs font-bold tracking-widest text-blue-500 uppercase mb-4">
        Tech Recruiter · LATAM
      </span>
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-950 dark:text-white mb-4 leading-tight">
        Carlos Valderrama
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 max-w-xl leading-relaxed mb-10">
        {hero.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <Link
          href={hero.ctaLink}
          className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-sm"
        >
          {hero.ctaText}
        </Link>
        <Link
          href="/articles"
          className="px-8 py-3.5 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 rounded-full font-semibold hover:border-gray-400 dark:hover:border-gray-500 hover:text-black dark:hover:text-white transition-colors"
        >
          Read the Blog
        </Link>
      </div>
    </section>
  );
}

export default Hero;
