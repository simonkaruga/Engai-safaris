"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const STATUSES = ["available", "blocked", "full"] as const;
type Status = typeof STATUSES[number];

interface AvailDay { date: string; status: Status; spots_left: number | null; note: string | null; }

function toYearMonth(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

const STATUS_STYLE: Record<Status, string> = {
  available: "bg-teal-50 border-teal-200 text-teal-700",
  blocked: "bg-red-100 border-red-300 text-red-600 line-through",
  full: "bg-orange-100 border-orange-300 text-orange-600",
};

export default function AdminAvailabilityPage() {
  const router = useRouter();
  const [safaris, setSafaris] = useState<{ slug: string; name: string }[]>([]);
  const [slug, setSlug] = useState("");
  const [current, setCurrent] = useState(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
  const [availability, setAvailability] = useState<Record<string, AvailDay>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<Status>("blocked");
  const [editNote, setEditNote] = useState("");
  const [editSpots, setEditSpots] = useState("");

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const BASE = process.env.NEXT_PUBLIC_API_URL;
  const month = toYearMonth(current);

  useEffect(() => {
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${BASE}/api/safaris`, { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.json())
      .then((data) => { setSafaris(data); if (data.length) setSlug(data[0].slug); })
      .catch(() => router.push("/admin/login"));
  }, [token, BASE, router]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    fetch(`${BASE}/api/admin/availability/${slug}?month=${month}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data: AvailDay[]) => {
        const map: Record<string, AvailDay> = {};
        data.forEach((d) => (map[d.date] = d));
        setAvailability(map);
      })
      .catch(() => setAvailability({}))
      .finally(() => setLoading(false));
  }, [slug, month, token, BASE]);

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDow = new Date(current.getFullYear(), current.getMonth(), 1).getDay();

  function dateStr(day: number) {
    return `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function openEdit(day: number) {
    const d = dateStr(day);
    setSelected(d);
    const existing = availability[d];
    setEditStatus(existing?.status ?? "blocked");
    setEditNote(existing?.note ?? "");
    setEditSpots(existing?.spots_left != null ? String(existing.spots_left) : "");
  }

  async function save() {
    if (!selected) return;
    setSaving(selected);
    await fetch(`${BASE}/api/admin/availability/${slug}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        date: selected,
        status: editStatus,
        spots_left: editSpots ? Number(editSpots) : null,
        note: editNote || null,
      }),
    });
    setAvailability((prev) => ({
      ...prev,
      [selected]: { date: selected, status: editStatus, spots_left: editSpots ? Number(editSpots) : null, note: editNote || null },
    }));
    setSaving(null);
    setSelected(null);
  }

  async function remove() {
    if (!selected) return;
    setSaving(selected);
    await fetch(`${BASE}/api/admin/availability/${slug}/${selected}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setAvailability((prev) => { const n = { ...prev }; delete n[selected]; return n; });
    setSaving(null);
    setSelected(null);
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl font-bold mb-6">Availability Calendar</h1>

      {/* Safari selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Safari</label>
        <select
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-sm"
        >
          {safaris.map((s) => <option key={s.slug} value={s.slug}>{s.name}</option>)}
        </select>
      </div>

      {/* Month nav */}
      <div className="flex items-center gap-4 mb-4">
        <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1))} className="px-3 py-1 border rounded-lg hover:bg-gray-50">←</button>
        <span className="font-semibold">{current.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}</span>
        <button onClick={() => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1))} className="px-3 py-1 border rounded-lg hover:bg-gray-50">→</button>
        {loading && <span className="text-sm text-gray-400">Loading...</span>}
      </div>

      {/* Calendar grid */}
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="grid grid-cols-7 mb-2">
          {DAYS.map((d) => <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const d = dateStr(day);
            const avail = availability[d];
            const status = avail?.status;
            return (
              <button
                key={day}
                onClick={() => openEdit(day)}
                className={`h-12 w-full rounded-lg text-sm border transition-all hover:opacity-80 ${
                  status ? STATUS_STYLE[status] : "border-gray-100 hover:border-teal-DEFAULT hover:bg-teal-50 text-gray-700"
                } ${selected === d ? "ring-2 ring-teal-DEFAULT" : ""}`}
              >
                <span className="block text-center font-medium">{day}</span>
                {status && <span className="block text-center text-xs capitalize">{status}</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs text-gray-500">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-teal-50 border border-teal-200 inline-block" />Available (set)</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-100 border border-red-300 inline-block" />Blocked</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-orange-100 border border-orange-300 inline-block" />Full</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded border border-gray-100 inline-block" />No override (default available)</span>
      </div>

      {/* Edit panel */}
      {selected && (
        <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5">
          <h2 className="font-semibold mb-4">Edit: {selected}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value as Status)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Spots left (optional)</label>
              <input
                type="number"
                value={editSpots}
                onChange={(e) => setEditSpots(e.target.value)}
                placeholder="e.g. 2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Note (optional)</label>
              <input
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                placeholder="e.g. Private booking"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={save}
              disabled={!!saving}
              className="bg-teal-DEFAULT text-white px-6 py-2 rounded-lg font-semibold hover:bg-teal-600 disabled:opacity-60"
            >
              {saving === selected ? "Saving..." : "Save"}
            </button>
            {availability[selected] && (
              <button
                onClick={remove}
                disabled={!!saving}
                className="border border-red-300 text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-red-50 disabled:opacity-60"
              >
                Remove Override
              </button>
            )}
            <button onClick={() => setSelected(null)} className="border border-gray-300 px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
