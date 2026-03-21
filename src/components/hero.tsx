import React from "react";
import Link from "next/link";
import { homePageData } from "../Data/homepage";

const hero = homePageData.hero;

function Hero() {
  return (
    <section className="flex flex-col items-center justify-center text-center min-h-[540px] pb-16 pt-20 px-4">
      {hero.backgroundImage && (
        <img
          className="object-cover w-32 h-32 rounded-full mb-8 shadow-lg"
          src={hero.backgroundImage}
          alt="Carlos Valderrama"
        />
      )}
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-950 mb-4 leading-tight">
        Carlos Valderrama
      </h1>
      <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-10">
        {hero.subtitle}
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link
          href={hero.ctaLink}
          className="px-8 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors"
        >
          {hero.ctaText}
        </Link>
        <Link
          href="/articles"
          className="px-8 py-3.5 border border-gray-300 text-gray-700 rounded-full font-semibold hover:border-gray-500 hover:text-black transition-colors"
        >
          Read the Blog
        </Link>
      </div>
    </section>
  );
}

export default Hero;
