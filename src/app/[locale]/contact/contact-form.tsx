"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { ToastProvider, Toast } from "@/components/ui/toast";
import { FormField } from "@/components/ui/form-field";
import { isValidEmail } from "@/lib/intake/validation";

type FieldErrors = { name?: string; email?: string; message?: string };

const INPUT_CLASS =
  "px-4 py-3 border border-gray-300 dark:border-border rounded-xl bg-white dark:bg-surface-raised text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed";

export default function ContactForm() {
  const t = useTranslations("contactForm");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = t("nameRequired");
    if (!email.trim()) {
      errors.email = t("emailRequired");
    } else if (!isValidEmail(email)) {
      errors.email = t("emailInvalid");
    }
    if (!message.trim()) errors.message = t("messageRequired");
    return errors;
  }

  function showToast(variant: "success" | "error") {
    setToastOpen(false);
    setTimeout(() => {
      setToastVariant(variant);
      setToastOpen(true);
    }, 50);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      requestAnimationFrame(() => {
        if (errors.name) nameRef.current?.focus();
        else if (errors.email) emailRef.current?.focus();
        else if (errors.message) messageRef.current?.focus();
      });
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        showToast("success");
      } else {
        showToast("error");
      }
    } catch {
      showToast("error");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ToastProvider>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <fieldset
          disabled={submitting}
          className={`flex flex-col gap-5 border-0 p-0 m-0 min-w-0 transition-opacity ${
            submitting ? "opacity-60 pointer-events-none" : ""
          }`}
        >
          <FormField id="name" label={t("fullName")} required error={fieldErrors.name}>
            <input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setFieldErrors((fe) => ({ ...fe, name: undefined }));
              }}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={`${INPUT_CLASS} ${
                fieldErrors.name ? "border-red-400 dark:border-red-500" : ""
              }`}
            />
          </FormField>

          <FormField id="email" label={t("email")} required error={fieldErrors.email}>
            <input
              ref={emailRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="jane@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setFieldErrors((fe) => ({ ...fe, email: undefined }));
              }}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`${INPUT_CLASS} ${
                fieldErrors.email ? "border-red-400 dark:border-red-500" : ""
              }`}
            />
          </FormField>

          <FormField id="subject" label={t("subject")}>
            <input
              id="subject"
              name="subject"
              type="text"
              autoComplete="off"
              placeholder={t("subjectPlaceholder")}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField id="message" label={t("message")} required error={fieldErrors.message}>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={5}
              placeholder={t("messagePlaceholder")}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setFieldErrors((fe) => ({ ...fe, message: undefined }));
              }}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "message-error" : undefined}
              className={`${INPUT_CLASS} resize-none ${
                fieldErrors.message ? "border-red-400 dark:border-red-500" : ""
              }`}
            />
          </FormField>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold transition-colors self-start disabled:opacity-50"
          >
            {submitting && (
              <svg
                className="animate-spin h-4 w-4 flex-shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
            )}
            {submitting ? t("sending") : t("submit")}
          </button>
        </fieldset>
      </form>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        title={toastVariant === "success" ? t("successTitle") : t("errorTitle")}
        description={toastVariant === "success" ? t("successDesc") : t("errorDesc")}
      />
    </ToastProvider>
  );
}
