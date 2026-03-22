"use client";

import { homePageData } from "@/Data/homepage";
import { useState } from "react";
import { ToastProvider, Toast } from "@/components/ui/toast";

const { contactCTA } = homePageData;

type FieldErrors = { name?: string; email?: string; message?: string };

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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

  const inputClass =
    "px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 text-sm";

  const errorClass = "text-red-500 text-xs mt-1";

  return (
    <ToastProvider>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Full Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => { setName(e.target.value); setFieldErrors((fe) => ({ ...fe, name: undefined })); }}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={`${inputClass} ${fieldErrors.name ? "border-red-400 dark:border-red-500" : ""}`}
          />
          {fieldErrors.name && <p id="name-error" className={errorClass}>{fieldErrors.name}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Email Address *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((fe) => ({ ...fe, email: undefined })); }}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`${inputClass} ${fieldErrors.email ? "border-red-400 dark:border-red-500" : ""}`}
          />
          {fieldErrors.email && <p id="email-error" className={errorClass}>{fieldErrors.email}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="Job inquiry, partnership, etc."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us about yourself or your company..."
            value={message}
            onChange={(e) => { setMessage(e.target.value); setFieldErrors((fe) => ({ ...fe, message: undefined })); }}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={`${inputClass} resize-none ${fieldErrors.message ? "border-red-400 dark:border-red-500" : ""}`}
          />
          {fieldErrors.message && <p id="message-error" className={errorClass}>{fieldErrors.message}</p>}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-semibold transition-colors self-start disabled:opacity-50"
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
