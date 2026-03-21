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
    <div className="flex flex-col md:flex-row border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow">
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
          <div className="flex items-center gap-3 mb-3">
            {isOpen && (
              <span className="bg-blue-500 text-white px-3 py-0.5 rounded-full text-xs font-semibold">
                Open
              </span>
            )}
            {type && (
              <span className="text-xs text-gray-400 dark:text-gray-500">{type}</span>
            )}
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-5">
          {(location || postedAt) && (
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              {location && <span>🌍 {location}</span>}
              {postedAt && <span>📅 {postedAt}</span>}
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
