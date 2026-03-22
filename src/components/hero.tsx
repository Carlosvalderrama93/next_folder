import Image from "next/image";
import Link from "next/link";
import { homePageData } from "../Data/homepage";

const hero = homePageData.hero;

function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center min-h-[580px] pb-20 pt-20 px-4 overflow-hidden bg-gradient-to-b from-indigo-50/60 via-white to-white dark:from-indigo-950/20 dark:via-gray-950 dark:to-gray-950">
      {/* Decorative background blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 w-[28rem] h-[28rem] rounded-full bg-indigo-200/40 dark:bg-indigo-900/20 blur-3xl" />
        <div className="absolute top-24 -left-24 w-80 h-80 rounded-full bg-violet-200/30 dark:bg-violet-900/15 blur-3xl" />
        <div className="absolute bottom-0 right-1/3 w-64 h-64 rounded-full bg-blue-100/30 dark:bg-blue-950/20 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {hero.backgroundImage && (
          <div className="relative w-32 h-32 mb-6 rounded-full ring-4 ring-white dark:ring-gray-900 shadow-2xl shadow-indigo-200/50 dark:shadow-indigo-900/50">
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

        <span className="inline-flex items-center gap-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase mb-5 border border-indigo-200/60 dark:border-indigo-700/50">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400" />
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
      </div>
    </section>
  );
}

export default Hero;
