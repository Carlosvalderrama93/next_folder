import Image from "next/image";
import Link from "next/link";

export interface JobCardProps {
  id: string;
  title: string;
  description: string;
  location?: string;
  type?: string;
  postedAt?: string;
  isOpen?: boolean;
  applyHref: string;
  imageUrl?: string;
  imageAlt?: string;
}

function MapPinIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export default function JobCard({
  title,
  description,
  location,
  type,
  postedAt,
  isOpen = true,
  applyHref,
  imageUrl,
  imageAlt,
}: JobCardProps) {
  return (
    <div className="group flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600 transition-[box-shadow,border-color] duration-200">
      {imageUrl && (
        <div className="relative w-full md:w-48 h-44 flex-shrink-0">
          <Image
            src={imageUrl}
            alt={imageAlt ?? title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 192px"
          />
        </div>
      )}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-3">
            {isOpen && (
              <span className="bg-emerald-500 text-white px-2.5 py-0.5 rounded-full text-xs font-semibold">
                Open
              </span>
            )}
            {type && (
              <span className="text-xs text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full">
                {type}
              </span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand transition-colors">
            {title}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          {(location || postedAt) && (
            <div className="flex gap-4 text-xs text-gray-400 dark:text-gray-500">
              {location && (
                <span className="flex items-center gap-1">
                  <MapPinIcon />
                  {location}
                </span>
              )}
              {postedAt && (
                <span className="flex items-center gap-1">
                  <CalendarIcon />
                  {postedAt}
                </span>
              )}
            </div>
          )}
          <Link
            href={applyHref}
            className="px-5 py-2 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors ml-auto"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
