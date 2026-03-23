"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ToastProvider, Toast } from "@/components/ui/toast";
import { FormField } from "@/components/ui/form-field";

interface Props {
  jobTitle: string;
  jobId: string;
}

type FieldErrors = { name?: string; email?: string; message?: string; cv?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_CV_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const MAX_COVER_LETTER = 2000;
const INPUT_CLASS =
  "px-4 py-3 border border-gray-300 dark:border-border rounded-xl bg-white dark:bg-surface-raised text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm w-full";

export default function ApplyForm({ jobTitle, jobId }: Props) {
  const t = useTranslations("applyForm");

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
  const [isDragOver, setIsDragOver] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = t("nameRequired");
    if (!email.trim()) {
      errors.email = t("emailRequired");
    } else if (!EMAIL_RE.test(email)) {
      errors.email = t("emailInvalid");
    }
    if (!message.trim()) errors.message = t("messageRequired");
    return errors;
  }

  function processFile(file: File, clearInput?: () => void) {
    if (!ALLOWED_CV_TYPES.has(file.type)) {
      setFieldErrors((fe) => ({ ...fe, cv: t("cvType") }));
      clearInput?.();
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setFieldErrors((fe) => ({ ...fe, cv: t("cvSize") }));
      clearInput?.();
      return;
    }
    setCvFile(file);
    setCvName(file.name);
    setFieldErrors((fe) => ({ ...fe, cv: undefined }));
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

  const charCountColor =
    message.length >= MAX_COVER_LETTER * 0.9
      ? message.length >= MAX_COVER_LETTER
        ? "text-red-500"
        : "text-amber-500"
      : "text-muted-fg";

  return (
    <ToastProvider>
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
        <FormField id="name" label={t("fullName")} required error={fieldErrors.name}>
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

        <FormField id="email" label={t("email")} required error={fieldErrors.email}>
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

        <FormField id="linkedin" label={`${t("linkedin")} (${t("optional")})`}>
          <input
            id="linkedin"
            name="linkedin"
            type="url"
            autoComplete="url"
            placeholder="https://linkedin.com/in/yourname"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className={INPUT_CLASS}
          />
        </FormField>

        <FormField id="cv" label={`${t("cv")} (${t("optional")})`} error={fieldErrors.cv}>
          <label
            className={`flex items-center gap-3 px-4 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
              isDragOver
                ? "border-brand bg-brand/5"
                : fieldErrors.cv
                ? "border-red-400 dark:border-red-500"
                : "border-gray-200 dark:border-border hover:border-brand dark:hover:border-brand"
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragOver(false);
              const file = e.dataTransfer.files?.[0];
              if (file) processFile(file);
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`flex-shrink-0 transition-colors ${isDragOver ? "text-brand" : "text-gray-400"}`} aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <span className={`text-sm transition-colors ${isDragOver ? "text-brand" : "text-gray-500 dark:text-muted-fg"}`}>
              {cvName || t("dragOrClick")}
            </span>
            <input
              id="cv"
              name="cv"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) processFile(file, () => { e.target.value = ""; });
                else { setCvFile(null); setCvName(""); }
              }}
            />
          </label>
        </FormField>

        <FormField id="message" label={t("coverLetter")} required error={fieldErrors.message}>
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={MAX_COVER_LETTER}
            placeholder={t("coverLetterPlaceholder")}
            value={message}
            onChange={(e) => { setMessage(e.target.value); setFieldErrors((fe) => ({ ...fe, message: undefined })); }}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? "message-error" : undefined}
            className={`${INPUT_CLASS} resize-none ${fieldErrors.message ? "border-red-400 dark:border-red-500" : ""}`}
          />
          <div className="flex justify-end">
            <span className={`text-xs tabular-nums ${charCountColor}`}>
              {message.length} / {MAX_COVER_LETTER}
            </span>
          </div>
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
          {submitting ? t("sending") : t("submit")}
        </button>
      </form>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant={toastVariant}
        title={toastVariant === "success" ? t("successTitle") : t("errorTitle")}
        description={
          toastVariant === "success"
            ? t("successDesc", { jobTitle })
            : t("errorDesc")
        }
      />
    </ToastProvider>
  );
}
