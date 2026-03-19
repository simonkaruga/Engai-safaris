"use client";

import { useState } from "react";
import type { ItineraryDay } from "@/types/api";

interface Props {
  days: ItineraryDay[];
}

export default function ItineraryAccordion({ days }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {days.map((day, i) => (
        <div key={day.day_number} className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-teal-DEFAULT text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                {day.day_number}
              </span>
              <span className="font-semibold">{day.title}</span>
            </div>
            <span className={`text-teal-DEFAULT transition-transform ${open === i ? "rotate-180" : ""}`}>▼</span>
          </button>

          {open === i && (
            <div className="px-4 pb-4 border-t border-gray-100">
              {day.description && (
                <p className="text-gray-700 text-sm leading-relaxed mt-3 mb-4">{day.description}</p>
              )}

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                {day.accommodation && (
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-400 mb-0.5">Sleep</p>
                    <p className="font-medium">{day.accommodation}</p>
                  </div>
                )}
                {day.meals && Object.entries(day.meals).map(([meal, desc]) => (
                  <div key={meal} className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-400 mb-0.5 capitalize">{meal}</p>
                    <p className="font-medium">{desc as string}</p>
                  </div>
                ))}
                {day.distance_km && (
                  <div className="bg-gray-50 rounded-lg p-2">
                    <p className="text-gray-400 mb-0.5">Drive</p>
                    <p className="font-medium">{day.distance_km} km · {day.drive_hours}h</p>
                  </div>
                )}
              </div>

              {day.activities && (day.activities as string[]).length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {(day.activities as string[]).map((a) => (
                    <span key={a} className="bg-teal-50 text-teal-DEFAULT text-xs px-2 py-1 rounded-full">{a}</span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
