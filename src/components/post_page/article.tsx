import { subscribe } from "diagnostics_channel";
import { Author } from "../job";

const structure = {
  Image: {
    url: "https://okiro.fueko.net/content/images/size/w1200/format/webp/2020/11/photo-1560141343-966cb5212777.jpeg",
    alt: "Main Image",
  },
  tags: ["Design", "Productivity", "Inspiration"],
  title: " The Ultimate Guide to Designing for the Web in 2025",
  authors: [
    {
      img: "https://okiro.fueko.net/content/images/size/w120/format/webp/2020/11/prince-akachi-J1OScm_uHUQ-unsplash.jpg",
      author: "Carlos Valderrama",
      date: "June 12, 2025",
      readTime: "8 min read",
    },
  ],

  description: "Latest articles and insights from our team.",
  text: "Explore our collection of articles on design, productivity, and inspiration. Stay updated with the latest trends and insights from industry experts.",
  postImages: [
    "/images/article1.jpg",
    "/images/article2.jpg",
    "/images/article3.jpg",
  ],
  socialMedia: [
    {
      platform: "Twitter",
      url: "https://twitter.com/share?text=Check%20out%20this%20article!",
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/shareArticle?mini=true&url=https://example.com/article",
    },
    {
      platform: "Facebook",
      url: "https://www.facebook.com/sharer/sharer.php?u=https://example.com/article",
    },
  ],

  morePosts: {
    newerPosts: [
      {
        title: "Designing for Accessibility",
        date: "June 10, 2025",
        link: "/articles/designing-for-accessibility",
      },
      {
        title: "Boosting Productivity with Time Management",
        date: "June 5, 2025",
        link: "/articles/boosting-productivity",
      },
    ],
    olderrPosts: [
      {
        title: "Understanding User Experience Design",
        date: "May 20, 2025",
        link: "/articles/understanding-ux-design",
      },
      {
        title: "10 Tips for Effective Remote Work",
        date: "April 15, 2025",
        link: "/articles/10-tips-remote-work",
      },
      {
        title: "The Future of Web Development",
        date: "March 30, 2025",
        link: "/articles/future-web-development",
      },
    ],
  },
  subscribeCTA: {
    heading: "Stay Updated!",
    description: "Subscribe to our newsletter for the latest articles.",
    placeholder: "Enter your email",
    buttonText: "Subscribe",
  },
};

import React from "react";

function Article() {
  return (
    <div className="max-w-7xl m-20">
      <div className="flex flex-wrap">
        <div className="w-1/2">
          <img
            src={structure.Image.url}
            alt={structure.Image.alt}
            className="size-130 object-cover rounded-4xl"
          />
        </div>
        <div className="w-1/2 flex flex-col justify-center">
          <div className="flex gap-2 text-xs font-semibold gap-2 text-gray-700 mb-5">
            {structure.tags.map((tag) => (
              <span className="bg-gray-200 py-2 px-4 rounded-full">{tag}</span>
            ))}
          </div>
          <h1 className="font-black text-4xl text-gray-700 ">
            {structure.title}
          </h1>
          <div className="mt-6">
            {structure.authors.map((author) => (
              <div className="text-sm text-gray-600 flex items-center gap-2 mt-4">
                <img
                  src={author.img}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <a
                    href={`authors/${author.author}`}
                    className="font-bold hover:underline text-"
                  >
                    {author.author}
                  </a>
                  <div>
                    <span> {author.date}</span>
                    <span> · {author.readTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Article;
