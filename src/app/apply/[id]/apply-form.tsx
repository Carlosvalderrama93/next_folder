"use client";

import { useState } from "react";

interface Props {
  jobTitle: string;
  jobId: string;
}

export default function ApplyForm({ jobTitle, jobId }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const body = {
      jobId,
      jobTitle,
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      linkedin: (form.elements.namedItem("linkedin") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center">
        <div className="text-3xl mb-3">✓</div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          Application Sent!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          Thanks for applying to <strong>{jobTitle}</strong>. We&apos;ll be in touch soon.
        </p>
      </div>
    );
  }

  const inputClass =
    "px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm w-full";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Full Name *
        </label>
        <input id="name" name="name" type="text" placeholder="Jane Doe" required className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Email Address *
        </label>
        <input id="email" name="email" type="email" placeholder="jane@example.com" required className={inputClass} />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="linkedin" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          LinkedIn Profile
        </label>
        <input id="linkedin" name="linkedin" type="url" placeholder="https://linkedin.com/in/yourname" className={inputClass} />
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
          required
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors self-start disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Submit Application"}
      </button>
    </form>
  );
}
