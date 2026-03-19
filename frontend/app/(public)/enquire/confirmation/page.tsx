import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Enquiry Received" };

export default function EnquiryConfirmationPage({ searchParams }: { searchParams: { ref?: string } }) {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🦁</div>
      <h1 className="font-display text-4xl font-bold mb-4">Enquiry Received!</h1>
      {searchParams.ref && (
        <p className="text-gray-500 text-sm mb-4">Reference: <strong>{searchParams.ref}</strong></p>
      )}
      <p className="text-gray-600 text-lg mb-8">
        Our team will review your details and send a personalised quote within 24 hours.
        Check your email — and your spam folder just in case.
      </p>
      <div className="space-y-3">
        <a
          href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
          className="block w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition-colors"
        >
          💬 WhatsApp Us Now
        </a>
        <Link href="/safaris" className="block w-full border border-teal-DEFAULT text-teal-DEFAULT py-3 rounded-lg font-semibold hover:bg-teal-50 transition-colors">
          Browse More Safaris
        </Link>
      </div>
    </div>
  );
}
