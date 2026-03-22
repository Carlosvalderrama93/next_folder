"use client";

import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { type ReactNode } from "react";

export function TooltipProvider({ children }: { children: ReactNode }) {
  return (
    <TooltipPrimitive.Provider delayDuration={400} skipDelayDuration={0}>
      {children}
    </TooltipPrimitive.Provider>
  );
}

interface TooltipProps {
  content: string;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}

export function Tooltip({ content, children, side = "bottom" }: TooltipProps) {
  return (
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side={side}
          sideOffset={6}
          className={[
            "px-2.5 py-1.5 text-xs font-medium rounded-lg shadow-md",
            "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900",
            "transition-opacity duration-150",
            "data-[state=delayed-open]:opacity-100",
            "data-[state=instant-open]:opacity-100",
            "data-[state=closed]:opacity-0",
          ].join(" ")}
        >
          {content}
          <TooltipPrimitive.Arrow className="fill-gray-900 dark:fill-gray-100" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
}
