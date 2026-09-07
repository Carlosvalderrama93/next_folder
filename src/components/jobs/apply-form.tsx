"use client";

import { useState, useRef } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ToastProvider, Toast } from "@/components/ui/toast";
import { FormField } from "@/components/ui/form-field";
import {
  ALLOWED_CV_EXTENSIONS,
  isAllowedCvMime,
  isAllowedCvSize,
  isValidEmail,
  isValidLinkedInUrl,
} from "@/lib/intake/validation";
import { useIntakeForm } from "@/lib/intake/use-intake-form";

interface Props {
  jobTitle: string;
  jobId: string;
}

type FieldErrors = {
  name?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  message?: string;
  cv?: string;
};

const MAX_COVER_LETTER = 2000;
const INPUT_CLASS =
  "px-4 py-3 border border-gray-300 dark:border-border rounded-xl bg-white dark:bg-surface-raised text-gray-900 dark:text-foreground placeholder-gray-400 dark:placeholder-muted-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed";

function CheckCircleIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500 mb-4" aria-hidden="true">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

export default function ApplyForm({ jobTitle, jobId }: Props) {
  const t = useTranslations("applyForm");

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const linkedinRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const {
    submitting,
    setSubmitting,
    fieldErrors,
    setFieldErrors,
    clearFieldError,
    toastOpen,
    setToastOpen,
    showToast,
    focusFirstError,
  } = useIntakeForm<FieldErrors>();

  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = t("nameRequired");
    if (!email.trim()) {
      errors.email = t("emailRequired");
    } else if (!isValidEmail(email)) {
      errors.email = t("emailInvalid");
    }
    if (linkedin.trim() && !isValidLinkedInUrl(linkedin)) {
      errors.linkedin = t("linkedinInvalid");
    }
    if (!message.trim()) errors.message = t("messageRequired");
    return errors;
  }

  function processFile(file: File, clearInput?: () => void) {
    if (!isAllowedCvMime(file.type)) {
      setFieldErrors((fe) => ({ ...fe, cv: t("cvType") }));
      clearInput?.();
      return;
    }
    if (!isAllowedCvSize(file.size)) {
      setFieldErrors((fe) => ({ ...fe, cv: t("cvSize") }));
      clearInput?.();
      return;
    }
    setCvFile(file);
    setCvName(file.name);
    clearFieldError("cv");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      focusFirstError(errors, [
        ["name", nameRef],
        ["email", emailRef],
        ["linkedin", linkedinRef],
        ["message", messageRef],
      ]);
      return;
    }
    setFieldErrors({});
    setSubmitting(true);

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("jobTitle", jobTitle);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("linkedin", linkedin);
    formData.append("message", message);
    if (cvFile) formData.append("cv", cvFile);

    try {
      const res = await fetch("/api/apply", { method: "POST", body: formData });
      if (res.ok) {
        setSubmitted(true);
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

  // ── Success state ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-12 px-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40">
        <CheckCircleIcon />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {t("successTitle")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-xs leading-relaxed">
          {t("successDesc", { jobTitle })}
        </p>
        <Link
          href="/jobs"
          className="px-5 py-2.5 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors"
        >
          {t("viewMoreRoles")}
        </Link>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <ToastProvider>
      <div className="rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-surface p-6 md:p-8">
      <form onSubmit={handleSubmit} noValidate>
        <fieldset
          disabled={submitting}
          className={`border-0 p-0 m-0 min-w-0 transition-opacity ${submitting ? "opacity-60 pointer-events-none" : ""}`}
        >
          {/* ── Personal Info ─────────────────────────────────────────────────── */}
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-4">{t("sectionPersonal")}</p>
          <div className="flex flex-col gap-4">
          <FormField id="name" label={t("fullName")} required error={fieldErrors.name}>
            <input
              ref={nameRef}
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Jane Doe"
              value={name}
              onChange={(e) => { setName(e.target.value); clearFieldError("name"); }}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={`${INPUT_CLASS} ${fieldErrors.name ? "border-red-400 dark:border-red-500" : ""}`}
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
              onChange={(e) => { setEmail(e.target.value); clearFieldError("email"); }}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={`${INPUT_CLASS} ${fieldErrors.email ? "border-red-400 dark:border-red-500" : ""}`}
            />
          </FormField>

          <FormField id="phone" label={`${t("phone")} (${t("optional")})`}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={INPUT_CLASS}
            />
          </FormField>

          <FormField id="linkedin" label={`${t("linkedin")} (${t("optional")})`} error={fieldErrors.linkedin}>
            <input
              ref={linkedinRef}
              id="linkedin"
              name="linkedin"
              type="url"
              autoComplete="url"
              placeholder="https://linkedin.com/in/yourname"
              value={linkedin}
              onChange={(e) => { setLinkedin(e.target.value); clearFieldError("linkedin"); }}
              aria-invalid={!!fieldErrors.linkedin}
              aria-describedby={fieldErrors.linkedin ? "linkedin-error" : undefined}
              className={`${INPUT_CLASS} ${fieldErrors.linkedin ? "border-red-400 dark:border-red-500" : ""}`}
            />
          </FormField>

          </div>

          <div className="border-t border-gray-100 dark:border-border my-6" />

          {/* ── Documents ─────────────────────────────────────────────────────── */}
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-4">{t("sectionDocuments")}</p>
          <FormField id="cv" label={`${t("cv")} (${t("optional")})`} error={fieldErrors.cv}>
            <label
              className={`flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
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
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-colors ${isDragOver ? "text-brand" : cvName ? "text-emerald-500" : "text-gray-300 dark:text-gray-600"}`} aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              <span className={`text-sm font-medium text-center transition-colors ${isDragOver ? "text-brand" : "text-gray-600 dark:text-muted-fg"}`}>
                {cvName || t("dragOrClick")}
              </span>
              <input
                id="cv"
                name="cv"
                type="file"
                accept={ALLOWED_CV_EXTENSIONS}
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) processFile(file, () => { e.target.value = ""; });
                  else { setCvFile(null); setCvName(""); }
                }}
              />
            </label>
          </FormField>

          <div className="border-t border-gray-100 dark:border-border my-6" />

          {/* ── Message ───────────────────────────────────────────────────────── */}
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-4">{t("sectionMessage")}</p>
          <FormField id="message" label={t("coverLetter")} required error={fieldErrors.message}>
            <textarea
              ref={messageRef}
              id="message"
              name="message"
              rows={5}
              maxLength={MAX_COVER_LETTER}
              placeholder={t("coverLetterPlaceholder")}
              value={message}
              onChange={(e) => { setMessage(e.target.value); clearFieldError("message"); }}
              aria-invalid={!!fieldErrors.message}
              aria-describedby={[fieldErrors.message ? "message-error" : null, "message-count"].filter(Boolean).join(" ")}
              className={`${INPUT_CLASS} resize-none ${fieldErrors.message ? "border-red-400 dark:border-red-500" : ""}`}
            />
            <div className="flex justify-end">
              <span id="message-count" className={`text-xs tabular-nums ${charCountColor}`}>
                {message.length} / {MAX_COVER_LETTER}
              </span>
            </div>
          </FormField>
        </fieldset>

        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-border">
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
        </div>
      </form>
      </div>

      <Toast
        open={toastOpen}
        onOpenChange={setToastOpen}
        variant="error"
        title={t("errorTitle")}
        description={t("errorDesc")}
      />
    </ToastProvider>
  );
}
