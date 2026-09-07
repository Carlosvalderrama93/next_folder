"use client";

import { useState, useCallback, useRef, useEffect } from "react";

export type ToastVariant = "success" | "error";

export type FieldOrderEntry = [string, { current: HTMLElement | null | undefined }];

export interface UseIntakeFormOptions<TFieldErrors> {
  initialErrors?: TFieldErrors;
  warnOnUnload?: boolean;
}

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
  isDirty: boolean;
  setIsDirty: React.Dispatch<React.SetStateAction<boolean>>;
  resetDirty: () => void;
  focusElement: (elementRef: { current: HTMLElement | null | undefined }) => void;
}

/**
 * Deep hook encapsulating intake form submission state, toast feedback,
 * accessible focus management, dirty tracking, beforeunload resilience,
 * and field error resets.
 */
export function useIntakeForm<
  TFieldErrors extends Record<string, string | undefined> = Record<
    string,
    string | undefined
  >
>(
  initialErrorsOrOptions:
    | TFieldErrors
    | UseIntakeFormOptions<TFieldErrors> = {} as TFieldErrors
): UseIntakeFormReturn<TFieldErrors> {
  const isOptionObject =
    initialErrorsOrOptions &&
    typeof initialErrorsOrOptions === "object" &&
    ("warnOnUnload" in initialErrorsOrOptions || "initialErrors" in initialErrorsOrOptions);

  const options: UseIntakeFormOptions<TFieldErrors> = isOptionObject
    ? (initialErrorsOrOptions as UseIntakeFormOptions<TFieldErrors>)
    : { initialErrors: initialErrorsOrOptions as TFieldErrors, warnOnUnload: false };

  const [submitting, setSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<TFieldErrors>(
    options.initialErrors ?? ({} as TFieldErrors)
  );
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<ToastVariant>("success");
  const [isDirty, setIsDirty] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const warnOnUnload = options.warnOnUnload ?? true;

  // Window beforeunload listener when form has unsaved modifications
  useEffect(() => {
    if (!warnOnUnload || !isDirty || submitting) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Most modern browsers display standard localized prompt when returnValue is set
      e.returnValue = "";
      return "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [warnOnUnload, isDirty, submitting]);

  const resetDirty = useCallback(() => {
    setIsDirty(false);
  }, []);

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
            ref.current.focus({ preventScroll: false });
            break;
          }
        }
      });
    },
    []
  );

  const focusElement = useCallback(
    (elementRef: { current: HTMLElement | null | undefined }) => {
      if (typeof window === "undefined") return;
      requestAnimationFrame(() => {
        if (elementRef.current) {
          elementRef.current.focus();
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
    isDirty,
    setIsDirty,
    resetDirty,
    focusElement,
  };
}
