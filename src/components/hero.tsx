import React from "react";
import { homePageData } from "../Data/homepage";
import type { Hero, HomePageData } from "../Data/homepage";

const data: HomePageData = homePageData;
const hero: Hero = data.hero;

function Hero() {
  return (
    <section className="max-w-6xl max-h-[500px] flex flex-col items-center justify-center text-white py-20 bg-white place-self-stretch">
      <h1 className="text-black font-bold text-4xl">{hero.title}</h1>
      <p className="text-black text-xl font-medium">{hero.subtitle}</p>
      <div className="flex items-center space-x-6 mt-6 w-full p-6 justify-around">
        {hero.backgroundImage && (
          <img
            className="h-60 w-45 mt-4 rounded-full object-cover"
            src={hero.backgroundImage}
            alt="Hero Background"
          />
        )}
        <a
          className="px-6 py-3 bg-violet-600 text-white font-semibold rounded-full shadow hover:bg-gray-100"
          href={hero.ctaLink}
        >
          {hero.ctaText}
        </a>
      </div>
    </section>
  );
}

export default Hero;
