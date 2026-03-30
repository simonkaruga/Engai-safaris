"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createEnquiry } from "@/lib/api";

function EnquirePageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const prefillDate = searchParams.get("date") ?? "";

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    travel_date_from: prefillDate,
    group_size: "2",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_email) return;
    setSubmitting(true);
    setError("");
    try {
      const enquiry = await createEnquiry({
        customer_name: form.customer_name,
        customer_email: form.customer_email,
        customer_phone: form.customer_phone || undefined,
        travel_date_from: form.travel_date_from || undefined,
        group_size: form.group_size ? Number(form.group_size) : undefined,
        special_requests: form.message || undefined,
        source: "website",
      });
      router.push(`/enquire/confirmation?ref=${enquiry.reference}`);
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  const inp = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent bg-white";

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-16">

        <div className="text-center mb-10">
          <p className="text-teal-DEFAULT text-xs font-semibold tracking-widest uppercase mb-3">Have a question?</p>
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">Get in touch</h1>
          <p className="text-gray-500 text-base">
            Tell us what you're looking for. We reply within 4 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-8">
          <form onSubmit={submit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  value={form.customer_name}
                  onChange={(e) => set("customer_name", e.target.value)}
                  required
                  placeholder="Jane Smith"
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={form.customer_email}
                  onChange={(e) => set("customer_email", e.target.value)}
                  required
                  placeholder="jane@example.com"
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  WhatsApp / Phone
                </label>
                <input
                  value={form.customer_phone}
                  onChange={(e) => set("customer_phone", e.target.value)}
                  placeholder="+1 555 000 0000"
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Travel Date
                </label>
                <input
                  type="date"
                  value={form.travel_date_from}
                  onChange={(e) => set("travel_date_from", e.target.value)}
                  className={inp}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Group Size
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={form.group_size}
                  onChange={(e) => set("group_size", e.target.value)}
                  className={inp}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message", e.target.value)}
                  rows={4}
                  placeholder="Which safari interests you? Any questions, special requests or occasions..."
                  className={inp + " resize-none"}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={submitting || !form.customer_name || !form.customer_email}
              className="w-full bg-teal-DEFAULT hover:bg-teal-600 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {submitting ? "Sending..." : "Send Enquiry. We reply within 4 hours"}
              {!submitting && (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
            <span>Prefer instant booking?</span>
            <a
              href="/safaris"
              className="font-semibold text-teal-DEFAULT hover:underline"
            >
              Browse & book a safari →
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#25D366] transition-colors"
          >
            <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Or WhatsApp us directly
          </a>
        </div>
      </div>
    </div>
  );
}

export default function EnquirePage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-2 border-teal-DEFAULT border-t-transparent rounded-full animate-spin" /></div>}>
      <EnquirePageInner />
    </Suspense>
  );
}
