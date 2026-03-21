import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";
import type { Metadata } from "next";
import ContactForm from "./contact-form";

export const metadata: Metadata = {
  title: "Contact | Carlos Valderrama",
  description: "Get in touch about open roles, partnerships, or general inquiries.",
};

const { contactCTA, footer } = homePageData;

export default function ContactPage() {
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
        <ContactForm />
      </main>
      <Footer {...footer} />
    </>
  );
}
