import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { homePageData } from "@/Data/homepage";

const { contactCTA, footer } = homePageData;

export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="max-w-2xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-3">{contactCTA.heading}</h1>
        <p className="text-gray-500 mb-10">{contactCTA.description}</p>

        <form className="flex flex-col gap-5" action="#" method="POST">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Jane Doe"
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="jane@example.com"
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="subject" className="text-sm font-semibold text-gray-700">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Job inquiry, partnership, etc."
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-semibold text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Tell us about yourself or your company..."
              required
              className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-sm resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-8 py-3.5 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-colors self-start"
          >
            {contactCTA.ctaText}
          </button>
        </form>
      </main>
      <Footer {...footer} />
    </>
  );
}
