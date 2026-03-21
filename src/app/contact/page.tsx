"use client";

import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import { useState } from "react";

const { contactCTA, footer } = homePageData;

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass =
    "px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-sm";

  return (
    <>
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
          {contactCTA.heading}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          {contactCTA.description}
        </p>

        {status === "success" ? (
          <div className="border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 rounded-xl p-8 text-center">
            <div className="text-3xl mb-3">✓</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Message Sent!
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Thanks for reaching out. We&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>
              <input id="name" name="name" type="text" placeholder="Jane Doe" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <input id="email" name="email" type="email" placeholder="jane@example.com" required className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="subject" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Subject
              </label>
              <input id="subject" name="subject" type="text" placeholder="Job inquiry, partnership, etc." className={inputClass} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about yourself or your company..."
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
              {status === "loading" ? "Sending…" : contactCTA.ctaText}
            </button>
          </form>
        )}
      </main>
      <Footer {...footer} />
    </>
  );
}
