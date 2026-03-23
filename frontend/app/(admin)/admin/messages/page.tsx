"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-green-100 text-green-700",
  quoted: "bg-purple-100 text-purple-700",
  negotiating: "bg-orange-100 text-orange-700",
  booked: "bg-teal-100 text-teal-700",
  completed: "bg-gray-100 text-gray-600",
  lost: "bg-red-100 text-red-700",
};

export default function AdminMessagesPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.ok ? r.json() : Promise.reject())
      .then(setMessages)
      .catch(() => router.push("/admin/login"))
      .finally(() => setLoading(false));
  }, [router, token]);

  const markContacted = async (id: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status: "contacted" }),
    });
    if (res.ok) {
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, status: "contacted" } : m));
    }
  };

  const filtered = filter === "all" ? messages : messages.filter((m) => m.status === filter);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl font-bold">Contact Messages</h1>
        <Link href="/admin/dashboard" className="text-sm text-teal-DEFAULT hover:underline">
          ← Dashboard
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {["all", "new", "contacted"].map((tab) => {
          const count = tab === "all" ? messages.length : messages.filter((m) => m.status === tab).length;
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

      {filtered.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center text-gray-500">
          No messages found.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {filtered.map((m) => (
            <div
              key={m.id}
              className={`bg-white border rounded-xl px-6 py-5 ${
                m.status === "new" ? "border-blue-200 shadow-sm" : "border-gray-200"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <span className="font-semibold text-gray-900 mr-2">{m.customer_name ?? m.name ?? "Anonymous"}</span>
                  {m.customer_email && (
                    <a href={`mailto:${m.customer_email}`} className="text-teal-DEFAULT text-sm hover:underline mr-2">
                      {m.customer_email}
                    </a>
                  )}
                  {m.customer_phone && (
                    <span className="text-gray-500 text-sm">{m.customer_phone}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 text-xs">
                    {m.created_at ? new Date(m.created_at).toLocaleString() : "—"}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[m.status] ?? "bg-gray-100 text-gray-600"}`}>
                    {m.status}
                  </span>
                </div>
              </div>

              {(m.message ?? m.notes ?? m.interests) && (
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {m.message ?? m.notes ?? (Array.isArray(m.interests) ? m.interests.join(", ") : m.interests)}
                </p>
              )}

              {m.safari_interest && (
                <p className="text-xs text-gray-400 mb-3">
                  Safari interest: <span className="text-gray-600 font-medium">{m.safari_interest}</span>
                </p>
              )}

              {m.status === "new" && (
                <button
                  onClick={() => markContacted(m.id)}
                  className="text-xs font-semibold px-3 py-1.5 rounded border border-teal-DEFAULT text-teal-DEFAULT hover:bg-teal-DEFAULT hover:text-white transition-colors"
                >
                  Mark as Contacted
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
