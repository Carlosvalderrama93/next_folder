"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { type ReactNode } from "react";

export interface AccordionItemData {
  title?: ReactNode;
  content?: ReactNode;
  value?: string;
  // Optional backwards compatibility alias for FAQ items
  question?: string;
  answer?: ReactNode;
}

export interface AccordionProps {
  items: AccordionItemData[];
  type?: "single" | "multiple";
  collapsible?: boolean;
  className?: string;
}

/**
 * Generic accessible Accordion UI primitive.
 * Agnostic to business domains, supporting any collapsible section with title and content.
 */
export function Accordion({
  items,
  type = "single",
  collapsible = true,
  className = "flex flex-col divide-y divide-gray-100 dark:divide-border",
}: AccordionProps) {
  return (
    <AccordionPrimitive.Root
      type={type as "single"}
      collapsible={collapsible}
      className={className}
    >
      {items.map((item, i) => {
        const itemValue = item.value ?? String(i);
        const itemTitle = item.title ?? item.question;
        const itemContent = item.content ?? item.answer;

        return (
          <AccordionPrimitive.Item key={itemValue} value={itemValue}>
            <AccordionPrimitive.Header>
              <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-gray-900 dark:text-foreground hover:text-brand transition-colors gap-4">
                <span>{itemTitle}</span>
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
              <div className="pb-4 text-sm text-gray-600 dark:text-muted-fg leading-relaxed">
                {typeof itemContent === "string" ? (
                  <p>{itemContent}</p>
                ) : (
                  itemContent
                )}
              </div>
            </AccordionPrimitive.Content>
          </AccordionPrimitive.Item>
        );
      })}
    </AccordionPrimitive.Root>
  );
}
