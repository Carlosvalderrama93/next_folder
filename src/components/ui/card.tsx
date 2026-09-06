import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type CardVariant = "default" | "job" | "testimonial";
type CardSize = "default" | "compact" | "large";

type CardProps<T extends ElementType = "article"> = {
  as?: T;
  variant?: CardVariant;
  size?: CardSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export default function Card<T extends ElementType = "article">({
  as,
  variant = "default",
  size = "default",
  className,
  children,
  ...rest
}: CardProps<T>) {
  const Component = as || "article";

  const baseStyles =
    "group relative flex h-full flex-col rounded-2xl border border-gray-200/80 dark:border-border bg-white/90 dark:bg-surface/90 shadow-sm transition-all duration-200 hover:shadow-md";

  const variantStyles =
    variant === "testimonial" ? "h-[200px]" : variant === "job" ? "" : "";

  const sizeStyles =
    size === "compact"
      ? "max-w-[620px]"
      : size === "large"
        ? "max-w-[760px]"
        : "";

  return (
    <Component
      className={classNames(baseStyles, variantStyles, sizeStyles, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}
