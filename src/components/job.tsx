import React from "react";

import { homePageData } from "@/Data/homepage";

const authors = homePageData.authors;

const svgBase = (
  <svg
    width="24px"
    height="24px"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    color="#000000"
  >
    <path
      d="M4 16.5V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V16.5"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M3 14V13C3 11.8954 3.89543 11 5 11H19C20.1046 11 21 11.8954 21 13V14"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M12 8L12 11"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M12 8C13.2624 8 14 7.03185 14 5.375C14 3.71815 12 2 12 2C12 2 10 3.71815 10 5.375C10 7.03185 10.7376 8 12 8Z"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M9 14C9 15.6569 7.65685 17 6 17C4.34315 17 3 15.6569 3 14"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M15 14C15 15.6569 13.6569 17 12 17C10.3431 17 9 15.6569 9 14"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M21 14C21 15.6569 19.6569 17 18 17C16.3431 17 15 15.6569 15 14"
      stroke="#000000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export function Author(author: any) {
  return (
    <div className="text-xs text-gray-600 flex items-center gap-2 mt-4">
      <img
        src={author.avatar}
        alt="Avatar"
        className="w-4 h-4 rounded-full object-cover"
      />
      <span>By</span>
      <a href={`authors/${author.slug}`} className="font-bold">
        {author.name}
      </a>
    </div>
  );
}

function Job() {
  return (
    <section className="my-20 px-4 max-w-6xl mx-auto shadow-sm pb-10">
      <div className="flex justify-center mt-16 mb-8 gap-4 items-center">
        <h2 className="text-4xl font-bold">Jobs</h2>
      </div>

      <div className="flex pr-6 border-gray-500  max-w-3xl h-60 h-2xl mx-auto m-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <div className="w-2/9 box-border py-2 mt-6 mb-4 mr-6 flex flex-col">
          <span className="w-min h-8 bg-blue-500 text-white px-6 py-2 rounded-r-2xl font-semibold shadow text-xs mb-2">
            Open
          </span>
          <div className="flex flex-col mx-6 mt-3 gap-1 text-gray-600 text-xs">
            <span className="font-medium flex items-center gap-2 mb-2">
              📅 <span className="text-gray-700">Jan 19, 2024</span>
            </span>
            <span className="font-medium flex items-center gap-2 mb-2">
              ⏰ <span className="text-gray-700">8-5 CST (M-F)</span>
            </span>
            <span className="font-medium flex items-center gap-2 mb-2">
              🌍 <span className="text-gray-700">Only Latam</span>
            </span>
            <span className="font-medium flex items-center gap-2 mb-2">
              🌐 <span className="text-gray-700">100% Remote</span>
            </span>
          </div>
        </div>
        <div className="w-7/9 p-6 flex flex-col justify-between">
          <div>
            <a href="">
              <h2 className="text-xl font-extrabold text-gray-900 leading-snug mb-6 hover:underline ">
                Exciting Job Opportunity: Frontend Developer Role
              </h2>
            </a>

            <p className="text-sm text-gray-700 mt-3 leading-relaxed line-clamp-4">
              Join our team as a Frontend Developer and work on cutting-edge
              projects that make a real impact. Collaborate with talented
              professionals and grow your career in a dynamic environment. Be
              part of a company that values innovation, teamwork, and personal
              growth.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 mt-4 text-xs">
              <div className="flex items-center mr-3">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                <span className="font-bold">Javascript</span>
              </div>
              <div className="flex items-center mr-3">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                <span className="font-bold">AWS S3</span>
              </div>
            </div>
            <Author {...authors[0]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Job;
