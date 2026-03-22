"use client";

import { homePageData } from "@/Data/homepage";
import { useState } from "react";
import { ToastProvider, Toast } from "@/components/ui/toast";
import { FormField } from "@/components/ui/form-field";

const { contactCTA } = homePageData;

type FieldErrors = { name?: string; email?: string; message?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INPUT_CLASS =
  "px-4 py-3 border border-gray-300 dark:border-border rounded-xl bg-white dark:bg-surface-raised text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm";

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) errors.message = "Message is required.";
  return errors;
}

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");

  function showToast(variant: "success" | "error") {
    setToastOpen(false);
    // small delay so re-opening the same toast re-triggers the animation
    setTimeout(() => {
      setToastVariant(variant);
      setToastOpen(true);
    }, 50);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
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
        <FormField id="name" label="Full Name" required error={fieldErrors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => { setName(e.target.value); setFieldErrors((fe) => ({ ...fe, name: undefined })); }}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={`${INPUT_CLASS} ${fieldErrors.name ? "border-red-400 dark:border-red-500" : ""}`}
          />
        </FormField>

        <FormField id="email" label="Email Address" required error={fieldErrors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((fe) => ({ ...fe, email: undefined })); }}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`${INPUT_CLASS} ${fieldErrors.email ? "border-red-400 dark:border-red-500" : ""}`}
          />
        </FormField>

        <FormField id="subject" label="Subject">
          <input
            id="subject"
            name="subject"
            type="text"
            autoComplete="off"
            placeholder="Job inquiry, partnership, etc."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField id="message" label="Message" required error={fieldErrors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about yourself or your company…"
            value={message}
            onChange={(e) => { setMessage(e.target.value); setFieldErrors((fe) => ({ ...fe, message: undefined })); }}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={`${INPUT_CLASS} resize-none ${fieldErrors.message ? "border-red-400 dark:border-red-500" : ""}`}
          />
        </FormField>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold transition-colors self-start disabled:opacity-50"
        >
          {submitting && (
            <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitting ? "Sending…" : contactCTA.ctaText}
        </button>
      </form>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        title={toastVariant === "success" ? "Message sent!" : "Something went wrong"}
        description={
          toastVariant === "success"
            ? "Thanks for reaching out. We'll get back to you soon."
            : "Please try again in a moment."
        }
      />
    </ToastProvider>
  );
}
