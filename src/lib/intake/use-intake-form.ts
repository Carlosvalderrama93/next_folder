"use client";

import { useState, useCallback, useRef } from "react";

export type ToastVariant = "success" | "error";

export type FieldOrderEntry = [string, { current: HTMLElement | null | undefined }];

export interface UseIntakeFormReturn<
  TFieldErrors extends Record<string, string | undefined>
> {
  submitting: boolean;
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
  fieldErrors: TFieldErrors;
  setFieldErrors: React.Dispatch<React.SetStateAction<TFieldErrors>>;
  clearFieldError: (field: keyof TFieldErrors) => void;
  toastOpen: boolean;
  setToastOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toastVariant: ToastVariant;
  setToastVariant: React.Dispatch<React.SetStateAction<ToastVariant>>;
  showToast: (variant: ToastVariant) => void;
  focusFirstError: (
    errors: Partial<TFieldErrors>,
    fieldOrder: FieldOrderEntry[]
  ) => void;
}

/**
 * Deep hook encapsulating intake form submission state, toast feedback,
 * accessible focus management, and field error resets.
 */
export function useIntakeForm<
  TFieldErrors extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
>(
  initialErrors: TFieldErrors = {} as TFieldErrors
): UseIntakeFormReturn<TFieldErrors> {
  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>(initialErrors);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<ToastVariant>("success");
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearFieldError = useCallback((field: keyof TFieldErrors) => {
    setFieldErrors((prev) => {
      if (prev[field] === undefined) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const showToast = useCallback((variant: ToastVariant) => {
    if (toastTimeoutRef.current) {
      clearTimeout(toastTimeoutRef.current);
    }
    setToastOpen(false);
    toastTimeoutRef.current = setTimeout(() => {
      setToastVariant(variant);
      setToastOpen(true);
    }, 50);
  }, []);

  const focusFirstError = useCallback(
    (errors: Partial<TFieldErrors>, fieldOrder: FieldOrderEntry[]) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => {
        for (const [key, ref] of fieldOrder) {
          if (errors[key as keyof TFieldErrors] && ref.current) {
            ref.current.focus();
            break;
          }
        }
      });
    },
    []
  );

  return {
    submitting,
    setSubmitting,
    fieldErrors,
    setFieldErrors,
    clearFieldError,
    toastOpen,
    setToastOpen,
    toastVariant,
    setToastVariant,
    showToast,
    focusFirstError,
  };
}
