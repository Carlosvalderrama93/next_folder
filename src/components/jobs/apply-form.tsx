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
  const successRef = useRef<HTMLDivElement>(null);

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
    setIsDirty,
    resetDirty,
    focusElement,
  } = useIntakeForm<FieldErrors>({ warnOnUnload: true });

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [message, setMessage] = useState("");
  const [cvName, setCvName] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  function formatFileSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  function validateStep1(): FieldErrors {
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
    return errors;
  }

  function validateStep2(): FieldErrors {
    const errors: FieldErrors = {};
    if (!message.trim()) errors.message = t("messageRequired");
    return errors;
  }

  function validateAll(): FieldErrors {
    return { ...validateStep1(), ...validateStep2() };
  }

  function handleNextStep() {
    if (currentStep === 1) {
      const errors = validateStep1();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        focusFirstError(errors, [
          ["name", nameRef],
          ["email", emailRef],
          ["linkedin", linkedinRef],
        ]);
        return;
      }
      setFieldErrors({});
      setCurrentStep(2);
    } else if (currentStep === 2) {
      const errors = validateStep2();
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        focusFirstError(errors, [["message", messageRef]]);
        return;
      }
      setFieldErrors({});
      setCurrentStep(3);
    }
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
    setIsDirty(true);
  }

  function removeCvFile() {
    setCvFile(null);
    setCvName("");
    setIsDirty(true);
  }

  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();

    const errors = validateAll();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (errors.name || errors.email || errors.linkedin) {
        setCurrentStep(1);
      } else if (errors.message || errors.cv) {
        setCurrentStep(2);
      }
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
        resetDirty();
        focusElement(successRef);
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

  // ── Success state with Application Status Timeline (HU-009) ─────────────────
  if (submitted) {
    const timelineSteps = [
      {
        step: 1,
        title: t("timelineStep1Title"),
        desc: t("timelineStep1Desc"),
        status: "completed",
      },
      {
        step: 2,
        title: t("timelineStep2Title"),
        desc: t("timelineStep2Desc"),
        status: "current",
      },
      {
        step: 3,
        title: t("timelineStep3Title"),
        desc: t("timelineStep3Desc"),
        status: "upcoming",
      },
      {
        step: 4,
        title: t("timelineStep4Title"),
        desc: t("timelineStep4Desc"),
        status: "upcoming",
      },
    ];

    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="flex flex-col items-center py-10 px-6 sm:px-10 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 focus:outline-none"
      >
        <CheckCircleIcon />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center text-balance">
          {t("successTitle")}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8 max-w-md text-center leading-relaxed">
          {t("successDesc", { jobTitle })}
        </p>

        {/* ── Visual Application Status Timeline ── */}
        <div className="w-full max-w-lg mb-8 text-left bg-white dark:bg-surface rounded-xl p-5 border border-emerald-100 dark:border-emerald-900/40 shadow-xs">
          <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse motion-reduce:animate-none" />
            {t("timelineHeading")}
          </h4>
          <ol className="relative border-l border-emerald-200 dark:border-emerald-800/60 ml-3 space-y-6">
            {timelineSteps.map((item) => (
              <li key={item.step} className="ml-6">
                <span
                  className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold tabular-nums ${
                    item.status === "completed"
                      ? "bg-emerald-500 text-white"
                      : item.status === "current"
                      ? "bg-brand text-white ring-4 ring-brand/20"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
                  }`}
                >
                  {item.status === "completed" ? "✓" : item.step}
                </span>
                <h5 className="font-semibold text-sm text-gray-900 dark:text-white leading-none mb-1">
                  {item.title}
                </h5>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-normal">
                  {item.desc}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/jobs"
          className="px-6 py-3 bg-brand text-white rounded-full text-sm font-semibold hover:bg-brand-hover transition-colors motion-reduce:transition-none shadow-xs"
        >
          {t("viewMoreRoles")}
        </Link>
      </div>
    );
  }

  // ── Form with 3-Step Stepper (HU-008) ──────────────────────────────────────
  const steps = [
    { num: 1, label: t("step1") },
    { num: 2, label: t("step2") },
    { num: 3, label: t("step3") },
  ];

  return (
    <ToastProvider>
      <div className="rounded-2xl border border-gray-200 dark:border-border bg-white dark:bg-surface p-6 md:p-8">
        {/* ── Stepper Navigation Bar ── */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-800 -translate-y-1/2 z-0" />
            {steps.map((s) => {
              const isDone = currentStep > s.num;
              const isCurrent = currentStep === s.num;
              return (
                <button
                  key={s.num}
                  type="button"
                  onClick={() => {
                    if (s.num < currentStep) setCurrentStep(s.num as 1 | 2 | 3);
                  }}
                  disabled={s.num > currentStep}
                  className="relative z-10 flex flex-col items-center group cursor-pointer disabled:cursor-not-allowed"
                >
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold tabular-nums transition-colors motion-reduce:transition-none ${
                      isDone
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-brand text-white ring-4 ring-brand/20 shadow-xs"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {isDone ? "✓" : s.num}
                  </span>
                  <span
                    className={`text-xs mt-1.5 font-medium transition-colors motion-reduce:transition-none ${
                      isCurrent
                        ? "text-brand dark:text-white font-semibold"
                        : isDone
                        ? "text-gray-700 dark:text-gray-300"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <fieldset
            disabled={submitting}
            className={`border-0 p-0 m-0 min-w-0 transition-opacity ${
              submitting ? "opacity-60 pointer-events-none" : ""
            }`}
          >
            {/* ── STEP 1: Personal Information ─────────────────────────────────── */}
            {currentStep === 1 && (
              <div className="flex flex-col gap-4 animate-in fade-in duration-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-1">
                  {t("sectionPersonal")}
                </p>

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
                      clearFieldError("name");
                      setIsDirty(true);
                    }}
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
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearFieldError("email");
                      setIsDirty(true);
                    }}
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
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setIsDirty(true);
                    }}
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
                    onChange={(e) => {
                      setLinkedin(e.target.value);
                      clearFieldError("linkedin");
                      setIsDirty(true);
                    }}
                    aria-invalid={!!fieldErrors.linkedin}
                    aria-describedby={fieldErrors.linkedin ? "linkedin-error" : undefined}
                    className={`${INPUT_CLASS} ${fieldErrors.linkedin ? "border-red-400 dark:border-red-500" : ""}`}
                  />
                </FormField>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-border flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors shadow-xs"
                  >
                    {t("nextStep")} →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 2: CV and Cover Letter ─────────────────────────────────── */}
            {currentStep === 2 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-3">
                    {t("sectionDocuments")}
                  </p>

                  <FormField id="cv" label={`${t("cv")} (${t("optional")})`} error={fieldErrors.cv}>
                    {/* CV Preview Card when a file is loaded */}
                    {cvFile ? (
                      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/70 border border-emerald-300 dark:border-emerald-700/60 rounded-xl">
                        <div className="flex items-center gap-3 min-w-0">
                          <span className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
                            📄
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {cvName}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
                              {formatFileSize(cvFile.size)}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeCvFile}
                          className="text-xs font-semibold text-red-500 hover:text-red-600 px-3 py-1 rounded-md border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                          {t("removeCv")}
                        </button>
                      </div>
                    ) : (
                      <label
                        className={`flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                          isDragOver
                            ? "border-brand bg-brand/5"
                            : fieldErrors.cv
                            ? "border-red-400 dark:border-red-500"
                            : "border-gray-200 dark:border-border hover:border-brand dark:hover:border-brand"
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setIsDragOver(true);
                        }}
                        onDragLeave={() => setIsDragOver(false)}
                        onDrop={(e) => {
                          e.preventDefault();
                          setIsDragOver(false);
                          const file = e.dataTransfer.files?.[0];
                          if (file) processFile(file);
                        }}
                      >
                        <svg
                          width="32"
                          height="32"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={`transition-colors ${isDragOver ? "text-brand" : "text-gray-300 dark:text-gray-600"}`}
                          aria-hidden="true"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span
                          className={`text-sm font-medium text-center transition-colors ${
                            isDragOver ? "text-brand" : "text-gray-600 dark:text-muted-fg"
                          }`}
                        >
                          {t("dragOrClick")}
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
                            else { setCvFile(null); setCvName(""); setIsDirty(true); }
                          }}
                        />
                      </label>
                    )}
                  </FormField>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-muted-fg mb-3">
                    {t("sectionMessage")}
                  </p>
                  <FormField id="message" label={t("coverLetter")} required error={fieldErrors.message}>
                    <textarea
                      ref={messageRef}
                      id="message"
                      name="message"
                      rows={5}
                      maxLength={MAX_COVER_LETTER}
                      placeholder={t("coverLetterPlaceholder")}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        clearFieldError("message");
                        setIsDirty(true);
                      }}
                      aria-invalid={!!fieldErrors.message}
                      aria-describedby={[
                        fieldErrors.message ? "message-error" : null,
                        "message-count",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      className={`${INPUT_CLASS} resize-none ${
                        fieldErrors.message ? "border-red-400 dark:border-red-500" : ""
                      }`}
                    />
                    <div className="flex justify-end mt-1">
                      <span id="message-count" className={`text-xs tabular-nums ${charCountColor}`}>
                        {message.length} / {MAX_COVER_LETTER}
                      </span>
                    </div>
                  </FormField>
                </div>

                <div className="mt-2 pt-4 border-t border-gray-100 dark:border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2"
                  >
                    ← {t("prevStep")}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors shadow-xs"
                  >
                    {t("nextStep")} →
                  </button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Review and Confirmation ─────────────────────────────── */}
            {currentStep === 3 && (
              <div className="flex flex-col gap-6 animate-in fade-in duration-200">
                <div>
                  <h4 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                    {t("reviewTitle")}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                    {t("reviewSubtitle")}
                  </p>

                  <div className="bg-gray-50 dark:bg-surface-raised rounded-xl p-4 border border-gray-200 dark:border-border space-y-3 text-sm">
                    <div className="flex justify-between py-1 border-b border-gray-200/60 dark:border-gray-700/60">
                      <span className="text-gray-500 dark:text-gray-400">{t("fullName")}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-200/60 dark:border-gray-700/60">
                      <span className="text-gray-500 dark:text-gray-400">{t("email")}</span>
                      <span className="font-semibold text-gray-900 dark:text-white">{email}</span>
                    </div>
                    {phone && (
                      <div className="flex justify-between py-1 border-b border-gray-200/60 dark:border-gray-700/60">
                        <span className="text-gray-500 dark:text-gray-400">{t("phone")}</span>
                        <span className="font-medium text-gray-900 dark:text-white tabular-nums">{phone}</span>
                      </div>
                    )}
                    {linkedin && (
                      <div className="flex justify-between py-1 border-b border-gray-200/60 dark:border-gray-700/60">
                        <span className="text-gray-500 dark:text-gray-400">{t("linkedin")}</span>
                        <span className="font-medium text-brand truncate max-w-[200px]">{linkedin}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-1 border-b border-gray-200/60 dark:border-gray-700/60">
                      <span className="text-gray-500 dark:text-gray-400">{t("sectionDocuments")}</span>
                      <span className="font-medium text-gray-900 dark:text-white tabular-nums">
                        {cvFile ? `${cvName} (${formatFileSize(cvFile.size)})` : t("noCvUploaded")}
                      </span>
                    </div>
                    <div className="pt-1">
                      <span className="text-xs text-gray-500 dark:text-gray-400 block mb-1">
                        {t("coverLetter")}
                      </span>
                      <p className="text-xs text-gray-700 dark:text-gray-300 italic bg-white dark:bg-surface p-3 rounded-lg border border-gray-200 dark:border-border whitespace-pre-wrap max-h-32 overflow-y-auto">
                        {message}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-border flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white px-4 py-2"
                  >
                    ← {t("prevStep")}
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-brand hover:bg-brand-hover text-white rounded-full font-semibold text-sm transition-colors shadow-xs disabled:opacity-50"
                  >
                    {submitting && (
                      <svg
                        className="animate-spin motion-reduce:animate-none h-4 w-4 flex-shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    )}
                    {submitting ? t("sending") : t("confirmAndSubmit")}
                  </button>
                </div>
              </div>
            )}
          </fieldset>
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

