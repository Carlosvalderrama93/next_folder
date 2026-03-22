"use client";

import { useState } from "react";
import { ToastProvider, Toast } from "@/components/ui/toast";

interface Props {
  jobTitle: string;
  jobId: string;
}

type FieldErrors = { name?: string; email?: string; message?: string; cv?: string };

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Full name is required.";
  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!message.trim()) errors.message = "Cover letter is required.";
  return errors;
}

export default function ApplyForm({ jobTitle, jobId }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("jobTitle", jobTitle);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("linkedin", linkedin);
    formData.append("message", message);
    if (cvFile) formData.append("cv", cvFile);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData });
      if (res.ok) {
        setName("");
        setEmail("");
        setLinkedin("");
        setMessage("");
        setCvFile(null);
        setCvName("");
        showToast("success");
      } else {
        const body = await res.json().catch(() => ({}));
        if (body?.errors) setFieldErrors(body.errors);
        showToast("error");
      }
    } catch {
      showToast("error");
    } finally {
      setSubmitting(false);
    }
  }

  const inputClass =
    "px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm w-full";

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
          <label htmlFor="linkedin" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            LinkedIn Profile
          </label>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/yourname"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="cv" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            CV / Resume (PDF, DOC — max 5 MB)
          </label>
          <label className={`flex items-center gap-3 px-4 py-3 border border-dashed rounded-xl cursor-pointer transition-colors ${fieldErrors.cv ? "border-red-400 dark:border-red-500" : "border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400"}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 flex-shrink-0" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {cvName || "Click to upload your CV"}
            </span>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file) {
                  const allowed = new Set(["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]);
                  if (!allowed.has(file.type)) {
                    setFieldErrors((fe) => ({ ...fe, cv: "Only PDF, DOC, and DOCX files are allowed." }));
                    e.target.value = "";
                    return;
                  }
                  if (file.size > 5 * 1024 * 1024) {
                    setFieldErrors((fe) => ({ ...fe, cv: "CV must be under 5 MB." }));
                    e.target.value = "";
                    return;
                  }
                }
                setCvFile(file);
                setCvName(file?.name ?? "");
                setFieldErrors((fe) => ({ ...fe, cv: undefined }));
              }}
            />
          </label>
          {fieldErrors.cv && <p id="cv-error" className={errorClass}>{fieldErrors.cv}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Cover Letter / Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="Tell us why you're a great fit..."
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
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors self-start disabled:opacity-50"
        >
          {submitting && (
            <svg className="animate-spin h-4 w-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          )}
          {submitting ? "Sending…" : "Submit Application"}
        </button>
      </form>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        title={toastVariant === "success" ? "Application sent!" : "Something went wrong"}
        description={
          toastVariant === "success"
            ? `Thanks for applying to ${jobTitle}. We'll be in touch soon.`
            : "Please check your details and try again."
        }
      />
    </ToastProvider>
  );
}
