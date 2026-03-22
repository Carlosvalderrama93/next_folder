import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function Avatar({ src, alt, size = 28, className = "" }: AvatarProps) {
  return (
    <AvatarPrimitive.Root
      className={`relative flex flex-shrink-0 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 ${className}`}
      style={{ width: size, height: size }}
    >
      {src && (
        <AvatarPrimitive.Image
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      )}
      <AvatarPrimitive.Fallback
        className="flex h-full w-full items-center justify-center text-gray-600 dark:text-gray-300 font-semibold"
        style={{ fontSize: size * 0.38 }}
        delayMs={300}
      >
        {getInitials(alt)}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
}
