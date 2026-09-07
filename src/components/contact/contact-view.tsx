import ContactForm from "./contact-form";

export interface ContactViewProps {
  heading: string;
  description: string;
  className?: string;
}

export function ContactView({ heading, description, className = "" }: ContactViewProps) {
  return (
    <div className={`max-w-3xl mx-auto px-4 py-16 ${className}`.trim()}>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
        {heading}
      </h1>
      <div className="mt-3 mb-6 w-10 h-1 bg-brand rounded-full" />
      <p className="text-gray-500 dark:text-gray-400 mb-10">
        {description}
      </p>
      <ContactForm />
    </div>
  );
}
