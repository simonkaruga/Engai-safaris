"use client";

import { useState, useEffect } from "react";
import type { AvailabilityDay } from "@/types/api";

interface Props {
  safariSlug: string;
  durationDays: number;
  onDateSelect: (date: string | null) => void;
  selectedDate: string | null;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function toYearMonth(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

export default function BookingCalendar({ safariSlug, durationDays, onDateSelect, selectedDate }: Props) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [availability, setAvailability] = useState<Record<string, AvailabilityDay>>({});
  const [loading, setLoading] = useState(false);

  const month = toYearMonth(current);

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/safaris/${safariSlug}/availability?month=${month}`)
      .then((r) => r.json())
      .then((data: AvailabilityDay[]) => {
        const map: Record<string, AvailabilityDay> = {};
        data.forEach((d) => (map[d.date] = d));
        setAvailability(map);
      })
      .catch(() => setAvailability({}))
      .finally(() => setLoading(false));
  }, [safariSlug, month]);

  const daysInMonth = new Date(current.getFullYear(), current.getMonth() + 1, 0).getDate();
  const firstDow = new Date(current.getFullYear(), current.getMonth(), 1).getDay();

  function getStatus(day: number): "past" | "available" | "blocked" | "full" | "selected" | "in-range" {
    const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const date = new Date(current.getFullYear(), current.getMonth(), day);

    if (date < today) return "past";

    if (selectedDate) {
      const sel = new Date(selectedDate);
      const end = new Date(sel);
      end.setDate(end.getDate() + durationDays - 1);
      if (dateStr === selectedDate) return "selected";
      if (date > sel && date <= end) return "in-range";
    }

    const avail = availability[dateStr];
    if (avail?.status === "blocked") return "blocked";
    if (avail?.status === "full") return "full";
    return "available";
  }

  function handleDayClick(day: number) {
    const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const status = getStatus(day);
    if (status === "past" || status === "blocked" || status === "full") return;
    onDateSelect(selectedDate === dateStr ? null : dateStr);
  }

  const prevMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() - 1, 1));
  const nextMonth = () => setCurrent(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  const isPrevDisabled = current <= new Date(today.getFullYear(), today.getMonth(), 1);

  const monthLabel = current.toLocaleDateString("en-GB", { month: "long", year: "numeric" });

  const styleMap: Record<string, string> = {
    past: "text-gray-300 cursor-not-allowed",
    available: "hover:bg-teal-50 hover:border-teal-DEFAULT cursor-pointer text-gray-800 border border-transparent",
    blocked: "bg-red-50 text-red-300 cursor-not-allowed line-through",
    full: "bg-orange-50 text-orange-400 cursor-not-allowed",
    selected: "bg-teal-DEFAULT text-white font-bold cursor-pointer",
    "in-range": "bg-teal-50 text-teal-700 cursor-pointer",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          disabled={isPrevDisabled}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          ←
        </button>
        <div className="text-center">
          <p className="font-semibold text-gray-900">{monthLabel}</p>
          {loading && <p className="text-xs text-gray-400">Loading...</p>}
        </div>
        <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
          →
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDow }).map((_, i) => <div key={`e-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const status = getStatus(day);
          const dateStr = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const avail = availability[dateStr];
          return (
            <button
              key={day}
              onClick={() => handleDayClick(day)}
              title={avail?.note ?? undefined}
              className={`relative h-9 w-full rounded-lg text-sm transition-colors ${styleMap[status]}`}
            >
              {day}
              {status === "full" && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-teal-DEFAULT inline-block" />Selected</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-teal-50 border border-teal-DEFAULT inline-block" />Available</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-orange-50 inline-block" />Full</span>
        <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-red-50 inline-block" />Unavailable</span>
      </div>

      {selectedDate && (
        <div className="mt-3 p-3 bg-teal-50 rounded-lg text-sm text-teal-800">
          ✓ Departure: <strong>{new Date(selectedDate + "T00:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</strong>
          <br />
          <span className="text-teal-600 text-xs">
            Returns: {new Date(new Date(selectedDate + "T00:00:00").setDate(new Date(selectedDate + "T00:00:00").getDate() + durationDays - 1)).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>
      )}
    </div>
  );
}
