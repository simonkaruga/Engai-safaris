"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-gray-100 text-gray-600",
};

const BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"];
const FILTER_TABS = ["all", "pending", "confirmed", "cancelled", "completed"];

export default function AdminBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [albumUrls, setAlbumUrls] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setBookings)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 4000);
  };

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status } : b));
  };

  const sendBalance = async (id: string, ref: string) => {
    setActionLoading(`balance-${id}`);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}/send-balance`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await r.json();
      if (r.ok) {
        showToast(`Balance request sent to ${data.email_sent_to} — KES ${Number(data.balance_kes).toLocaleString()}`);
      } else {
        showToast(data.detail || "Failed to send balance request", false);
      }
    } catch {
      showToast("Network error", false);
    } finally {
      setActionLoading(null);
    }
  };

  const markComplete = async (id: string) => {
    const memoriesUrl = albumUrls[id]?.trim() || undefined;
    setActionLoading(`complete-${id}`);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(memoriesUrl ? { memories_url: memoriesUrl } : {}),
      });
      const data = await r.json();
      if (r.ok) {
        setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: "completed" } : b));
        const sent = data.emails_sent?.join(", ") || "none";
        showToast(`Marked complete. Emails sent: ${sent}`);
        setExpanded(null);
      } else {
        showToast(data.detail || "Failed", false);
      }
    } catch {
      showToast("Network error", false);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Bookings</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTER_TABS.map((tab) => {
          const count = tab === "all" ? bookings.length : bookings.filter((b) => b.status === tab).length;
          return (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${
                filter === tab ? "bg-teal-DEFAULT text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab} {count > 0 && <span className="ml-1">({count})</span>}
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No bookings found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-left">Guest</th>
                <th className="px-4 py-3 text-left">Safari</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Pax</th>
                <th className="px-4 py-3 text-left">Total KES</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((b) => (
                <>
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-mono text-xs text-teal-DEFAULT font-semibold">
                      {b.reference || b.id?.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 font-medium text-xs">{b.customer_name || b.guest_name || "—"}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs max-w-[160px] truncate">{b.safari_name || b.safari?.name || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
                      {b.travel_date ? new Date(b.travel_date).toLocaleDateString() : "—"}
                    </td>
                    <td className="px-4 py-3 text-center text-xs">{b.num_adults ?? b.pax ?? "—"}</td>
                    <td className="px-4 py-3 font-semibold text-xs">
                      {b.total_kes != null ? `KES ${Number(b.total_kes).toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <select
                          value={b.status}
                          onChange={(ev) => updateStatus(b.id, ev.target.value)}
                          className="text-xs border border-gray-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-DEFAULT"
                        >
                          {BOOKING_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <Link
                          href={`/admin/itinerary/${b.id}`}
                          className="text-xs text-teal-DEFAULT hover:underline font-semibold whitespace-nowrap"
                        >
                          Itinerary
                        </Link>
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => sendBalance(b.id, b.reference)}
                            disabled={actionLoading === `balance-${b.id}`}
                            className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded px-2 py-1 hover:bg-amber-100 disabled:opacity-50 whitespace-nowrap font-semibold"
                          >
                            {actionLoading === `balance-${b.id}` ? "Sending…" : "Send Balance"}
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button
                            onClick={() => setExpanded(expanded === b.id ? null : b.id)}
                            className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded px-2 py-1 hover:bg-gray-200 whitespace-nowrap"
                          >
                            {expanded === b.id ? "Cancel" : "Complete ↓"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                  {expanded === b.id && (
                    <tr key={`${b.id}-expand`} className="bg-teal-50">
                      <td colSpan={8} className="px-4 py-4">
                        <div className="max-w-lg">
                          <p className="text-xs font-semibold text-gray-700 mb-2">
                            Mark trip complete — sends review request email automatically.
                            Add album URL to also send photo album email.
                          </p>
                          <div className="flex gap-2 items-center">
                            <input
                              type="url"
                              placeholder="Photo album URL (optional, e.g. Google Drive link)"
                              value={albumUrls[b.id] || ""}
                              onChange={(e) => setAlbumUrls((prev) => ({ ...prev, [b.id]: e.target.value }))}
                              className="flex-1 text-xs border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-DEFAULT"
                            />
                            <button
                              onClick={() => markComplete(b.id)}
                              disabled={actionLoading === `complete-${b.id}`}
                              className="text-xs bg-teal-DEFAULT text-white rounded px-3 py-2 hover:bg-teal-dark disabled:opacity-50 font-semibold whitespace-nowrap"
                            >
                              {actionLoading === `complete-${b.id}` ? "Processing…" : "Mark Complete"}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
