"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { type ReactNode } from "react";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <ToastPrimitive.Provider swipeDirection="right" duration={4500}>
      {children}
      <ToastPrimitive.Viewport className="fixed bottom-6 right-6 flex flex-col gap-2 w-80 z-[200] outline-none" />
    </ToastPrimitive.Provider>
  );
}

interface ToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "success" | "error";
}

export function Toast({
  open,
  onOpenChange,
  title,
  description,
  variant = "success",
}: ToastProps) {
  const isSuccess = variant === "success";

  return (
    <ToastPrimitive.Root
      open={open}
      onOpenChange={onOpenChange}
      className={[
        "rounded-xl border-y border-r p-4 shadow-xl flex items-start gap-3",
        "transition-all duration-300",
        "data-[state=open]:opacity-100 data-[state=open]:translate-x-0",
        "data-[state=closed]:opacity-0 data-[state=closed]:translate-x-full",
        "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
        "data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]",
        isSuccess
          ? "bg-white dark:bg-gray-900 border-green-200 dark:border-green-800 border-l-4 border-l-green-500"
          : "bg-white dark:bg-gray-900 border-red-200 dark:border-red-800 border-l-4 border-l-red-500",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 text-base font-bold leading-none ${
          isSuccess
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {isSuccess ? "✓" : "✕"}
      </span>

      <div className="flex-1 min-w-0">
        <ToastPrimitive.Title className="text-sm font-semibold text-gray-900 dark:text-white">
          {title}
        </ToastPrimitive.Title>
        {description && (
          <ToastPrimitive.Description className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
            {description}
          </ToastPrimitive.Description>
        )}
      </div>

      <ToastPrimitive.Close
        aria-label="Dismiss"
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors text-base leading-none flex-shrink-0"
      >
        ×
      </ToastPrimitive.Close>
    </ToastPrimitive.Root>
  );
}
