import React from "react";
import { homePageData } from "../Data/homepage";
import type { Hero, HomePageData } from "../Data/homepage";

const data: HomePageData = homePageData;
const hero: Hero = data.hero;

function Hero() {
  return (
    <section className="flex flex-col items-center justify-between text-center min-h-[500px] pb-10 shadow-md">
      <div className="text-7xl font-extrabold text-gray-950 mt-10 mb-6 flex flex-col items-center gap-6">
        {hero.backgroundImage && (
          <img
            className="object-cover size-37 rounded-full"
            src={hero.backgroundImage}
            alt="Hero Background"
          />
        )}
        <span>Carlos Valderrama</span>
      </div>
      <div className="text-center max-w-3xl px-4 space-y-6 ">
        <p className="text-xl leading-[1.8]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          consequuntur dicta vitae ad perspiciatis quisquam id delectus, nam.
        </p>
        <div className="flex justify-center mt-4 gap-0">
          <input
            type="text"
            placeholder="Enter your email"
            className="px-5 py-4 w-70 bg-gray-100 rounded-l-full focus:outline-none focus:ring-2 focus:ring-gray-200 text-gray-700 font-semibold"
          />
          <button className="px-6 py-3 bg-black text-white rounded-r-full font-semibold hover:bg-gray-800">
            {hero.ctaText}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;
