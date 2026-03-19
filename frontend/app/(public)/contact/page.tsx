import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Engai Safaris. WhatsApp, email, or enquiry form.",
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="font-display text-5xl font-bold mb-4">Get in Touch</h1>
        <p className="text-gray-600 text-lg">We respond within 24 hours. WhatsApp is fastest.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
          className="bg-green-500 hover:bg-green-600 text-white rounded-xl p-6 text-center transition-colors"
        >
          <div className="text-3xl mb-3">💬</div>
          <h3 className="font-semibold text-lg mb-1">WhatsApp</h3>
          <p className="text-green-100 text-sm">Fastest response · Usually under 1 hour</p>
        </a>
        <a
          href="mailto:hello@engaisafaris.com"
          className="bg-teal-DEFAULT hover:bg-teal-600 text-white rounded-xl p-6 text-center transition-colors"
        >
          <div className="text-3xl mb-3">✉️</div>
          <h3 className="font-semibold text-lg mb-1">Email</h3>
          <p className="text-teal-100 text-sm">hello@engaisafaris.com</p>
        </a>
        <a
          href="/enquire"
          className="bg-gold-DEFAULT hover:bg-gold-600 text-white rounded-xl p-6 text-center transition-colors"
        >
          <div className="text-3xl mb-3">📋</div>
          <h3 className="font-semibold text-lg mb-1">Enquiry Form</h3>
          <p className="text-yellow-100 text-sm">Get a personalised quote</p>
        </a>
      </div>

      <div className="bg-gray-50 rounded-2xl p-8">
        <h2 className="font-display text-2xl font-bold mb-6">Office</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div>
            <p className="font-semibold mb-1">Engai Safaris Ltd</p>
            <p className="text-sm">Nairobi, Kenya</p>
            <p className="text-sm mt-3">Operating hours: Mon–Sat 7am–8pm EAT</p>
            <p className="text-sm">Emergency line: 24/7</p>
          </div>
          <div>
            <p className="font-semibold mb-1">For Tour Operators</p>
            <p className="text-sm">agents@engaisafaris.com</p>
            <p className="text-sm mt-3">B2B portal: <a href="/agent/login" className="text-teal-DEFAULT hover:underline">agent.engaisafaris.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
