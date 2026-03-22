"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ReactNode } from "react";

export function Accordion({
  items,
}: {
  items: { question: string; answer: ReactNode }[];
}) {
  return (
    <AccordionPrimitive.Root type="single" collapsible className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
      {items.map((item, i) => (
        <AccordionPrimitive.Item key={i} value={String(i)}>
          <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-gray-900 dark:text-white hover:text-brand transition-colors gap-4">
              <span>{item.question}</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="flex-shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </AccordionPrimitive.Trigger>
          </AccordionPrimitive.Header>
          <AccordionPrimitive.Content className="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-up data-[state=open]:slide-down">
            <p className="pb-4 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.answer}
            </p>
          </AccordionPrimitive.Content>
        </AccordionPrimitive.Item>
      ))}
    </AccordionPrimitive.Root>
  );
}
