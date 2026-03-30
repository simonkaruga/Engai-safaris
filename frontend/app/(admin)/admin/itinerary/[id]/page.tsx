"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface ItineraryBooking {
  id: string;
  reference: string;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  travel_date?: string;
  pax?: number;
  total_kes?: number;
  deposit_kes?: number;
  balance_kes?: number;
  status?: string;
  celebration?: string;
  dietary_req?: unknown;
  guide_id?: string;
  memories_url?: string;
}

interface GuideOption {
  id: string;
  name: string;
}

export default function ItineraryBuilderPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [booking, setBooking] = useState<ItineraryBooking | null>(null);
  const [guides, setGuides] = useState<GuideOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [guideId, setGuideId] = useState("");
  const [saved, setSaved] = useState(false);
  const [albumInput, setAlbumInput] = useState<string | null>(null);
  const [albumVal, setAlbumVal] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    Promise.all([
      fetch(`${BASE}/api/admin/bookings/${id}`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
      fetch(`${BASE}/api/admin/guides`, { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.json()),
    ])
      .then(([b, g]) => {
        setBooking(b);
        setGuides(g);
        setGuideId(b.guide_id ?? "");
      })
      .catch(() => router.push("/admin/bookings"))
      .finally(() => setLoading(false));
  }, [id, token, BASE, router]);

  const assignGuide = async () => {
    setSaving(true);
    const res = await fetch(`${BASE}/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ guide_id: guideId || null }),
    });
    if (res.ok) {
      setBooking((prev) => prev ? { ...prev, guide_id: guideId || undefined } : prev);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;
  if (!booking) return null;

  const pdfBase = `${BASE}/api/agent/bookings/${id}`;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/bookings" className="text-sm text-teal-DEFAULT hover:underline">← Bookings</Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm font-mono text-gray-500">{booking.reference}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Booking summary */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Booking Summary</h2>
            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Reference", booking.reference],
                ["Guest", booking.customer_name],
                ["Email", booking.customer_email],
                ["Phone", booking.customer_phone],
                ["Travel Date", booking.travel_date ? new Date(booking.travel_date).toLocaleDateString() : "—"],
                ["Pax", booking.pax],
                ["Total KES", booking.total_kes != null ? `KES ${Number(booking.total_kes).toLocaleString()}` : "—"],
                ["Deposit KES", booking.deposit_kes != null ? `KES ${Number(booking.deposit_kes).toLocaleString()}` : "—"],
                ["Balance KES", booking.balance_kes != null ? `KES ${Number(booking.balance_kes).toLocaleString()}` : "—"],
                ["Status", booking.status],
                ["Celebration", booking.celebration ?? "—"],
                ["Dietary", booking.dietary_req ? JSON.stringify(booking.dietary_req) : "—"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-400 text-xs">{label}</p>
                  <p className="font-medium text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* PDF Downloads */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Documents</h2>
            <div className="flex flex-wrap gap-3">
              <a
                href={`${pdfBase}/itinerary-pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-teal-DEFAULT text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors"
              >
                📄 Download Itinerary PDF
              </a>
              <a
                href={`${pdfBase}/voucher-pdf`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 bg-gray-800 text-white rounded-lg text-sm font-semibold hover:bg-gray-900 transition-colors"
              >
                🎫 Download Voucher PDF
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">PDFs are generated live from the booking data. Share the itinerary with the guest after confirming.</p>
          </div>
        </div>

        {/* Guide assignment */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-4 text-sm uppercase tracking-wide">Assign Guide</h2>
            <select
              value={guideId}
              onChange={(e) => setGuideId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
            >
              <option value="">— No guide assigned —</option>
              {guides.map((g) => (
                <option key={g.id} value={g.id}>{g.name}</option>
              ))}
            </select>
            <button
              onClick={assignGuide}
              disabled={saving}
              className={`w-full py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                saved ? "bg-green-500 text-white" : "bg-teal-DEFAULT hover:bg-teal-600 text-white"
              } disabled:opacity-60`}
            >
              {saved ? "✓ Saved" : saving ? "Saving..." : "Assign Guide"}
            </button>
          </div>

          {/* Memories album */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h2 className="font-semibold text-gray-700 mb-3 text-sm uppercase tracking-wide">Memory Album</h2>
            {booking.memories_url ? (
              <a href={booking.memories_url} target="_blank" rel="noopener noreferrer"
                className="text-teal-DEFAULT text-sm underline break-all">
                {booking.memories_url}
              </a>
            ) : (
              <p className="text-gray-400 text-sm italic">No album set yet.</p>
            )}
            {albumInput === id ? (
              <div className="mt-3 flex gap-2 items-center">
                <input
                  type="url"
                  value={albumVal}
                  onChange={(e) => setAlbumVal(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-DEFAULT"
                  autoFocus
                />
                <button
                  onClick={async () => {
                    if (!albumVal.trim()) return;
                    const res = await fetch(`${BASE}/api/admin/bookings/${id}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
                      body: JSON.stringify({ memories_url: albumVal.trim() }),
                    });
                    if (res.ok) { setBooking((prev) => prev ? { ...prev, memories_url: albumVal.trim() } : prev); setAlbumInput(null); setAlbumVal(""); }
                  }}
                  className="text-xs bg-teal-DEFAULT text-white rounded-lg px-3 py-2 font-semibold"
                >Save</button>
                <button onClick={() => { setAlbumInput(null); setAlbumVal(""); }} className="text-xs text-gray-400 hover:text-gray-600">Cancel</button>
              </div>
            ) : (
              <button
                onClick={() => { setAlbumInput(id); setAlbumVal(booking.memories_url ?? ""); }}
                className="mt-3 text-xs font-semibold px-3 py-1.5 rounded border border-gray-200 text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white hover:border-teal-DEFAULT transition-colors"
              >
                {booking.memories_url ? "Update Album URL" : "Set Album URL"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
