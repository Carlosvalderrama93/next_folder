"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FormField } from "@/components/ui/form-field";
import { Toast, ToastProvider } from "@/components/ui/toast";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INPUT_CLASS =
  "px-4 py-3 border border-gray-300 dark:border-border rounded-xl bg-white dark:bg-surface-raised text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm w-full";

type FieldErrors = { name?: string; email?: string; message?: string };

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!email.trim()) {
    errors.email = "Email is required.";
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) errors.message = "Message is required.";
  return errors;
}

export function QuickContactDialog() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [toastVariant, setToastVariant] = useState<"success" | "error">("success");

  function showToast(variant: "success" | "error") {
    setToastOpen(false);
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
        body: JSON.stringify({ name, email, subject: "General Inquiry", message }),
      });
      if (res.ok) {
        setName("");
        setEmail("");
        setMessage("");
        setOpen(false);
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
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className="px-7 py-3 bg-black dark:bg-white text-white dark:text-black rounded-full text-sm font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors">
            Get in Touch
          </button>
        </DialogTrigger>
        <DialogContent
          title="Let's connect"
          description="Tell us a bit about yourself and we'll reach out when the right role opens up."
        >
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
            <FormField id="qc-name" label="Your Name" required error={fieldErrors.name}>
              <input
                id="qc-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => { setName(e.target.value); setFieldErrors((fe) => ({ ...fe, name: undefined })); }}
                aria-invalid={!!fieldErrors.name}
                aria-describedby={fieldErrors.name ? "qc-name-error" : undefined}
                className={`${INPUT_CLASS} ${fieldErrors.name ? "border-red-400 dark:border-red-500" : ""}`}
              />
            </FormField>

            <FormField id="qc-email" label="Email Address" required error={fieldErrors.email}>
              <input
                id="qc-email"
                name="email"
                type="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="jane@example.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setFieldErrors((fe) => ({ ...fe, email: undefined })); }}
                aria-invalid={!!fieldErrors.email}
                aria-describedby={fieldErrors.email ? "qc-email-error" : undefined}
                className={`${INPUT_CLASS} ${fieldErrors.email ? "border-red-400 dark:border-red-500" : ""}`}
              />
            </FormField>

            <FormField id="qc-message" label="What are you looking for?" required error={fieldErrors.message}>
              <textarea
                id="qc-message"
                name="message"
                rows={3}
                placeholder="I'm a backend engineer with 5 years of experience…"
                value={message}
                onChange={(e) => { setMessage(e.target.value); setFieldErrors((fe) => ({ ...fe, message: undefined })); }}
                aria-invalid={!!fieldErrors.message}
                aria-describedby={fieldErrors.message ? "qc-message-error" : undefined}
                className={`${INPUT_CLASS} resize-none ${fieldErrors.message ? "border-red-400 dark:border-red-500" : ""}`}
              />
            </FormField>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold transition-colors disabled:opacity-50 text-sm"
            >
              {submitting && (
                <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </DialogContent>
      </Dialog>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        title={toastVariant === "success" ? "Message sent!" : "Something went wrong"}
        description={
          toastVariant === "success"
            ? "Thanks for reaching out. We'll keep you in mind for future openings."
            : "Please try again in a moment."
        }
      />
    </ToastProvider>
  );
}
