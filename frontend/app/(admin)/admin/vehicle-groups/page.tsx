"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BookingInGroup {
  id: string;
  reference: string;
  customer_name: string;
  customer_phone: string;
  pax: number;
  status: string;
  travel_date: string;
  safari_id: string;
  vehicle_ref: string | null;
  base_price_usd: number | null;
}

interface VehicleGroup {
  vehicle_ref: string;
  bookings: BookingInGroup[];
  total_pax: number;
  departure_date: string;
  safari_name: string;
  status_summary: string;
}

interface SuggestionGroup {
  safari_name: string;
  safari_slug: string;
  departure_date: string;
  bookings: BookingInGroup[];
  total_pax: number;
}

interface UnassignedBooking {
  id: string;
  reference: string;
  customer_name: string;
  pax: number;
  status: string;
  travel_date?: string;
  safari_name?: string;
  vehicle_ref?: string | null;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  confirmed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  completed: "bg-gray-100 text-gray-600",
};

export default function VehicleGroupsPage() {
  const router = useRouter();
  const [groups, setGroups] = useState<VehicleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Suggestions
  const [suggestions, setSuggestions] = useState<SuggestionGroup[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Create new group panel
  const [showCreatePanel, setShowCreatePanel] = useState(false);
  const [newGroupRef, setNewGroupRef] = useState("");
  const [newGroupRefLoading, setNewGroupRefLoading] = useState(false);
  const [allBookings, setAllBookings] = useState<UnassignedBooking[]>([]);
  const [allBookingsLoading, setAllBookingsLoading] = useState(false);
  const [selectedBookingIds, setSelectedBookingIds] = useState<Set<string>>(new Set());
  const [createLoading, setCreateLoading] = useState(false);

  // Remove loading per booking
  const [removeLoading, setRemoveLoading] = useState<string | null>(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const fetchGroups = useCallback(async () => {
    if (!token) { router.push("/admin/login"); return; }
    setLoading(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicle-groups`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) { router.push("/admin/login"); return; }
      setGroups(await r.json());
    } catch {
      showToast("Failed to load vehicle groups", false);
    } finally {
      setLoading(false);
    }
  }, [token, router]);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const autoSuggest = async () => {
    setSuggestLoading(true);
    setShowSuggestions(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicle-groups/auto-suggest`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!r.ok) throw new Error("Failed");
      const data = await r.json();
      setSuggestions(data);
      if (data.length === 0) showToast("No groupable bookings found right now.");
    } catch {
      showToast("Failed to load suggestions", false);
    } finally {
      setSuggestLoading(false);
    }
  };

  const removeFromGroup = async (bookingId: string) => {
    setRemoveLoading(bookingId);
    try {
      const r = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${bookingId}/assign-vehicle`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ vehicle_ref: null }),
        }
      );
      if (!r.ok) throw new Error("Failed");
      showToast("Booking removed from group");
      await fetchGroups();
    } catch {
      showToast("Failed to remove booking", false);
    } finally {
      setRemoveLoading(null);
    }
  };

  const assignSuggestion = async (suggestion: SuggestionGroup) => {
    // Get a new vehicle_ref
    try {
      const refResp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicle-groups/next-ref`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!refResp.ok) throw new Error("Could not generate ref");
      const { vehicle_ref } = await refResp.json();

      // Assign all bookings in the suggestion
      await Promise.all(
        suggestion.bookings.map((b) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${b.id}/assign-vehicle`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ vehicle_ref }),
          })
        )
      );

      showToast(`Created group ${vehicle_ref} with ${suggestion.bookings.length} bookings`);
      // Remove from suggestions list
      setSuggestions((prev) =>
        prev.filter((s) => s.departure_date !== suggestion.departure_date || s.safari_slug !== suggestion.safari_slug)
      );
      await fetchGroups();
    } catch {
      showToast("Failed to create group from suggestion", false);
    }
  };

  const openCreatePanel = async () => {
    setShowCreatePanel(true);
    setSelectedBookingIds(new Set());

    // Fetch next ref
    setNewGroupRefLoading(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/vehicle-groups/next-ref`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.ok) {
        const data = await r.json();
        setNewGroupRef(data.vehicle_ref);
      }
    } catch {
      // ignore
    } finally {
      setNewGroupRefLoading(false);
    }

    // Fetch all unassigned bookings
    setAllBookingsLoading(true);
    try {
      const r = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (r.ok) {
        const data = await r.json();
        setAllBookings(data.filter((b: UnassignedBooking) => !b.vehicle_ref && ["pending", "confirmed"].includes(b.status)));
      }
    } catch {
      // ignore
    } finally {
      setAllBookingsLoading(false);
    }
  };

  const createGroup = async () => {
    if (!newGroupRef.trim()) { showToast("Enter a vehicle reference", false); return; }
    if (selectedBookingIds.size === 0) { showToast("Select at least one booking", false); return; }
    setCreateLoading(true);
    try {
      await Promise.all(
        Array.from(selectedBookingIds).map((id) =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/bookings/${id}/assign-vehicle`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
            body: JSON.stringify({ vehicle_ref: newGroupRef.trim() }),
          })
        )
      );
      showToast(`Group ${newGroupRef.trim()} created with ${selectedBookingIds.size} bookings`);
      setShowCreatePanel(false);
      setSelectedBookingIds(new Set());
      await fetchGroups();
    } catch {
      showToast("Failed to create group", false);
    } finally {
      setCreateLoading(false);
    }
  };

  const toggleBookingSelection = (id: string) => {
    setSelectedBookingIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const hasSoloRate = (booking: BookingInGroup) => booking.pax === 1;

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading…</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-xl shadow-lg text-sm font-medium text-white transition-all ${toast.ok ? "bg-teal-DEFAULT" : "bg-red-500"}`}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold">Vehicle Groups</h1>
          <p className="text-gray-500 text-sm mt-1">Group solo and small bookings into shared 4x4 vehicles.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/bookings" className="text-sm text-teal-DEFAULT hover:underline">
            ← Bookings
          </Link>
        </div>
      </div>

      {/* Action bar */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={autoSuggest}
          disabled={suggestLoading}
          className="px-4 py-2 bg-teal-DEFAULT text-white rounded-lg text-sm font-semibold hover:bg-teal-dark disabled:opacity-50 transition-colors"
        >
          {suggestLoading ? "Analysing…" : "Auto-suggest Groupings"}
        </button>
        <button
          onClick={() => { setShowCreatePanel(!showCreatePanel); if (!showCreatePanel) openCreatePanel(); }}
          className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${
            showCreatePanel
              ? "bg-gray-100 text-gray-700 border-gray-300"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          {showCreatePanel ? "Cancel" : "+ New Group"}
        </button>
      </div>

      {/* Auto-suggest results */}
      {showSuggestions && (
        <div className="mb-8">
          <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
            Suggested Groupings
            {suggestions.length > 0 && (
              <span className="ml-2 text-xs font-normal text-gray-500 normal-case">
                — {suggestions.length} set{suggestions.length !== 1 ? "s" : ""} of bookings share the same safari & date
              </span>
            )}
          </h2>
          {suggestions.length === 0 ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center text-gray-500 text-sm">
              No unassigned bookings share the same safari and travel date right now.
            </div>
          ) : (
            <div className="space-y-3">
              {suggestions.map((s, idx) => (
                <div key={idx} className="bg-teal-50 border border-teal-200 rounded-xl p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{s.safari_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Departure: {new Date(s.departure_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                        &nbsp;·&nbsp;{s.bookings.length} bookings · {s.total_pax} pax total
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {s.bookings.map((b) => (
                          <div key={b.id} className="bg-white border border-teal-100 rounded-lg px-3 py-1.5 text-xs">
                            <span className="font-mono font-semibold text-teal-DEFAULT">{b.reference}</span>
                            <span className="text-gray-600 ml-1">· {b.customer_name} · {b.pax} pax</span>
                            <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_COLORS[b.status] ?? ""}`}>
                              {b.status}
                            </span>
                            {hasSoloRate(b) && (
                              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-700">
                                solo rate
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={() => assignSuggestion(s)}
                      className="shrink-0 px-3 py-2 bg-teal-DEFAULT text-white rounded-lg text-xs font-semibold hover:bg-teal-dark transition-colors"
                    >
                      Create Group
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Create new group panel */}
      {showCreatePanel && (
        <div className="mb-8 bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-bold text-gray-700 mb-4">Create New Group Manually</h2>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 block mb-1">Vehicle Reference</label>
            <input
              type="text"
              value={newGroupRefLoading ? "Generating…" : newGroupRef}
              onChange={(e) => setNewGroupRef(e.target.value)}
              placeholder="VEH-2026-001"
              className="text-sm border border-gray-200 rounded-lg px-3 py-2 w-64 font-mono focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT"
            />
          </div>
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-600 block mb-2">
              Select Bookings to Include
              <span className="font-normal text-gray-400 ml-1">(unassigned pending/confirmed only)</span>
            </label>
            {allBookingsLoading ? (
              <p className="text-xs text-gray-500">Loading bookings…</p>
            ) : allBookings.length === 0 ? (
              <p className="text-xs text-gray-500">No unassigned bookings available.</p>
            ) : (
              <div className="border border-gray-200 rounded-lg overflow-hidden max-h-64 overflow-y-auto">
                {allBookings.map((b) => (
                  <label
                    key={b.id}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer border-b last:border-b-0 border-gray-100 hover:bg-gray-50 ${
                      selectedBookingIds.has(b.id) ? "bg-teal-50" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBookingIds.has(b.id)}
                      onChange={() => toggleBookingSelection(b.id)}
                      className="accent-teal-DEFAULT"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="font-mono text-xs text-teal-DEFAULT font-semibold">{b.reference}</span>
                      <span className="text-xs text-gray-700 ml-2">{b.customer_name}</span>
                      <span className="text-xs text-gray-400 ml-2">· {b.pax} pax · {b.safari_name || "—"}</span>
                      <span className="text-xs text-gray-400 ml-2">
                        · {b.travel_date ? new Date(b.travel_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" }) : "—"}
                      </span>
                    </div>
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${STATUS_COLORS[b.status] ?? ""}`}>
                      {b.status}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-3 items-center">
            <button
              onClick={createGroup}
              disabled={createLoading || selectedBookingIds.size === 0}
              className="px-4 py-2 bg-teal-DEFAULT text-white rounded-lg text-sm font-semibold hover:bg-teal-dark disabled:opacity-50 transition-colors"
            >
              {createLoading ? "Creating…" : `Create Group (${selectedBookingIds.size} selected)`}
            </button>
            <span className="text-xs text-gray-400">
              {selectedBookingIds.size} booking{selectedBookingIds.size !== 1 ? "s" : ""} selected
            </span>
          </div>
        </div>
      )}

      {/* Existing vehicle groups */}
      <h2 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
        Active Groups
        {groups.length > 0 && <span className="ml-2 text-xs font-normal text-gray-500 normal-case">— {groups.length} vehicle{groups.length !== 1 ? "s" : ""}</span>}
      </h2>

      {groups.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-500 text-sm">No vehicle groups yet.</p>
          <p className="text-gray-400 text-xs mt-1">
            Use "Auto-suggest Groupings" or "+ New Group" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const soloRateBookings = group.bookings.filter(hasSoloRate);
            return (
              <div key={group.vehicle_ref} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                {/* Group header */}
                <div className="px-5 py-4 bg-gray-50 border-b border-gray-200 flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono font-bold text-base text-amber-700 bg-amber-100 px-3 py-1 rounded-lg">
                        {group.vehicle_ref}
                      </span>
                      <span className="text-sm font-semibold text-gray-900">{group.safari_name}</span>
                      <span className="text-xs text-gray-500">
                        Departure: {new Date(group.departure_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-600">
                        <span className="font-semibold">{group.total_pax}</span> total pax
                      </span>
                      <span className="text-xs text-gray-600">
                        {group.status_summary}
                      </span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        group.total_pax >= 4 ? "bg-green-100 text-green-700" :
                        group.total_pax === 3 ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-500"
                      }`}>
                        {group.total_pax >= 6 ? "Full" : group.total_pax >= 4 ? "Good fill" : group.total_pax >= 2 ? "Partial fill" : "Sparse"}
                      </span>
                    </div>
                    {soloRateBookings.length > 0 && (
                      <div className="mt-2 flex items-center gap-1.5 text-amber-700 text-xs">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        Check pricing — solo rate applied to {soloRateBookings.length} booking{soloRateBookings.length > 1 ? "s" : ""}
                        {soloRateBookings.map((b) => ` (${b.reference})`).join("")}
                      </div>
                    )}
                  </div>
                  <Link
                    href={`/admin/bookings`}
                    className="text-xs text-teal-DEFAULT hover:underline font-semibold shrink-0"
                  >
                    View in Bookings
                  </Link>
                </div>

                {/* Booking rows */}
                <div className="divide-y divide-gray-100">
                  {group.bookings.map((b) => (
                    <div key={b.id} className="px-5 py-3 flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs text-teal-DEFAULT font-semibold w-28 shrink-0">{b.reference}</span>
                      <span className="text-sm font-medium text-gray-900 flex-1 min-w-[120px]">{b.customer_name}</span>
                      <span className="text-xs text-gray-500">{b.customer_phone}</span>
                      <span className="text-xs text-gray-500">
                        {b.pax} pax
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${STATUS_COLORS[b.status] ?? "bg-gray-100 text-gray-600"}`}>
                        {b.status}
                      </span>
                      {hasSoloRate(b) && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
                          solo rate
                        </span>
                      )}
                      <button
                        onClick={() => removeFromGroup(b.id)}
                        disabled={removeLoading === b.id}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 border border-red-200 rounded px-2 py-1 hover:bg-red-50 disabled:opacity-50 transition-colors whitespace-nowrap"
                      >
                        {removeLoading === b.id ? "Removing…" : "Remove from group"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
