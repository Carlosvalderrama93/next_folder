"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

export function Tabs({
  value,
  onValueChange,
  children,
}: {
  value: string;
  onValueChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <TabsPrimitive.Root value={value} onValueChange={onValueChange}>
      {children}
    </TabsPrimitive.Root>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return (
    <TabsPrimitive.List className="flex gap-2 flex-wrap mb-10" aria-label="Filter articles by category">
      {children}
    </TabsPrimitive.List>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  return (
    <TabsPrimitive.Trigger
      value={value}
      className="px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors
        data-[state=active]:bg-brand data-[state=active]:dark:bg-white data-[state=active]:text-white data-[state=active]:dark:text-gray-900 data-[state=active]:border-brand data-[state=active]:dark:border-white
        data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 data-[state=inactive]:dark:text-gray-400 data-[state=inactive]:border-gray-300 data-[state=inactive]:dark:border-gray-600 data-[state=inactive]:hover:border-gray-500 data-[state=inactive]:dark:hover:border-gray-400"
    >
      {children}
    </TabsPrimitive.Trigger>
  );
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  return (
    <TabsPrimitive.Content value={value} forceMount>
      {children}
    </TabsPrimitive.Content>
  );
}
