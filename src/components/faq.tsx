import { Accordion } from "@/components/ui/accordion";

const FAQ_ITEMS = [
  {
    question: "How does the recruitment process work?",
    answer:
      "We start with a brief discovery call to understand your background, goals, and preferences. From there, we match you with relevant opportunities, prepare you for interviews, and support you through the offer stage.",
  },
  {
    question: "Is your service free for candidates?",
    answer:
      "Yes — our service is completely free for candidates. We are paid by the companies we partner with when a successful placement is made.",
  },
  {
    question: "What kinds of roles do you typically fill?",
    answer:
      "We specialize in tech roles across engineering, product, and design — including frontend, backend, full-stack, DevOps, and mobile engineering positions at remote-first and hybrid companies.",
  },
  {
    question: "Do you work with candidates outside of LATAM?",
    answer:
      "Our primary focus is LATAM tech talent, but we occasionally work with candidates from other regions when there's a strong fit. Feel free to reach out and we'll let you know if we can help.",
  },
  {
    question: "How long does the process typically take?",
    answer:
      "Timelines vary by role and company, but most candidates move from first contact to offer within 3–6 weeks. We'll keep you updated at every step.",
  },
];

export default function FAQ() {
  return (
    <section className="py-16 px-4 border-t border-gray-100 dark:border-gray-800/50">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">
          Everything you need to know about working with us.
        </p>
        <Accordion items={FAQ_ITEMS} />
      </div>
    </section>
  );
}
