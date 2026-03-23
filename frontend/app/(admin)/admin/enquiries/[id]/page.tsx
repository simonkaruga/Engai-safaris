"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

const STATUSES = ["new", "contacted", "quoted", "negotiating", "booked", "completed", "lost"];

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  quoted: "bg-purple-100 text-purple-700",
  negotiating: "bg-orange-100 text-orange-700",
  booked: "bg-green-100 text-green-700",
  completed: "bg-gray-100 text-gray-600",
  lost: "bg-red-100 text-red-700",
};

export default function EnquiryDetailPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [enquiry, setEnquiry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");
  const [quote, setQuote] = useState("");
  const [followUp, setFollowUp] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${BASE}/api/admin/enquiries/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then((data) => {
        setEnquiry(data);
        setNotes(data.notes ?? "");
        setStatus(data.status ?? "new");
        setQuote(data.quoted_amount_usd != null ? String(data.quoted_amount_usd) : "");
        setFollowUp(data.follow_up_date ?? "");
      })
      .catch(() => router.push("/admin/enquiries"))
      .finally(() => setLoading(false));
  }, [id]);

  const save = async () => {
    setSaving(true);
    const res = await fetch(`${BASE}/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        status,
        notes: notes || null,
        quoted_amount_usd: quote ? Number(quote) : null,
        follow_up_date: followUp || null,
      }),
    });
    if (res.ok) setEnquiry((prev: any) => ({ ...prev, status, notes, quoted_amount_usd: quote || null, follow_up_date: followUp || null }));
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!enquiry) return null;

  const Row = ({ label, value }: { label: string; value: any }) =>
    value != null && value !== "" ? (
      <div className="flex gap-2 py-2 border-b border-gray-100 last:border-0">
        <span className="text-gray-500 text-sm w-40 shrink-0">{label}</span>
        <span className="text-sm text-gray-800 font-medium break-words">{String(value)}</span>
      </div>
    ) : null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/enquiries" className="text-sm text-teal-DEFAULT hover:underline">← Enquiries</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-mono text-gray-500">{enquiry.reference}</span>
        <span className={`ml-auto px-3 py-1 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[enquiry.status] ?? "bg-gray-100 text-gray-600"}`}>
          {enquiry.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: enquiry details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Guest Details</h2>
            <Row label="Name" value={enquiry.customer_name} />
            <Row label="Email" value={enquiry.customer_email} />
            <Row label="Phone" value={enquiry.customer_phone} />
            <Row label="Country" value={enquiry.customer_country} />
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Trip Details</h2>
            <Row label="Travel From" value={enquiry.travel_date_from} />
            <Row label="Travel To" value={enquiry.travel_date_to} />
            <Row label="Flexibility" value={enquiry.flexibility} />
            <Row label="Group Size" value={enquiry.group_size} />
            <Row label="Group Type" value={enquiry.group_type} />
            <Row label="Budget (USD)" value={enquiry.budget_usd} />
            <Row label="Celebration" value={enquiry.celebration} />
            <Row label="Interests" value={Array.isArray(enquiry.interests) ? enquiry.interests.join(", ") : enquiry.interests} />
            <Row label="Dietary Req" value={Array.isArray(enquiry.dietary_req) ? enquiry.dietary_req.join(", ") : enquiry.dietary_req} />
            <Row label="Medical Notes" value={enquiry.medical_notes} />
            <Row label="Special Requests" value={enquiry.special_requests} />
            <Row label="Source" value={enquiry.source} />
            <Row label="Submitted" value={enquiry.created_at ? new Date(enquiry.created_at).toLocaleString() : null} />
          </div>
        </div>

        {/* Right: CRM actions */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">CRM Actions</h2>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Quote (USD)</label>
              <input
                type="number"
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="e.g. 2400"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
              />
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">Follow-up Date</label>
              <input
                type="date"
                value={followUp}
                onChange={(e) => setFollowUp(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
              />
            </div>

            <div className="mb-5">
              <label className="block text-xs font-medium text-gray-600 mb-1">Internal Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Add notes about this enquiry..."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT resize-none"
              />
            </div>

            <button
              onClick={save}
              disabled={saving}
              className="w-full bg-teal-DEFAULT hover:bg-teal-600 text-white py-2.5 rounded-lg font-semibold text-sm transition-colors disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Quick Actions</h2>
            <a
              href={`mailto:${enquiry.customer_email}?subject=Your Engai Safaris Enquiry ${enquiry.reference}`}
              className="flex items-center gap-2 text-sm text-teal-DEFAULT hover:underline mb-2"
            >
              ✉️ Email Guest
            </a>
            {enquiry.customer_phone && (
              <a
                href={`https://wa.me/${enquiry.customer_phone.replace(/\D/g, "")}?text=Hi ${enquiry.customer_name}, thank you for your enquiry with Engai Safaris!`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-600 hover:underline"
              >
                💬 WhatsApp Guest
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
