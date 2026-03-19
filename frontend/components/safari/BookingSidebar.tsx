"use client";

import { useState } from "react";
import BookingCalendar from "./BookingCalendar";
import Link from "next/link";

interface Props {
  safariSlug: string;
  durationDays: number;
  depositPct: number;
  installmentsOk: boolean;
}

export default function BookingSidebar({ safariSlug, durationDays, depositPct, installmentsOk }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const bookingHref = selectedDate
    ? `/enquire?safari=${safariSlug}&date=${selectedDate}`
    : `/enquire?safari=${safariSlug}`;

  return (
    <div className="space-y-4">
      <div>
        <p className="font-semibold text-sm mb-2 text-gray-700">Select Departure Date</p>
        <BookingCalendar
          safariSlug={safariSlug}
          durationDays={durationDays}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      <Link
        href={bookingHref}
        className={`block w-full text-white text-center py-4 rounded-lg font-semibold text-lg transition-colors ${
          selectedDate
            ? "bg-teal-DEFAULT hover:bg-teal-600"
            : "bg-teal-DEFAULT hover:bg-teal-600 opacity-90"
        }`}
      >
        {selectedDate ? "Book This Date →" : "Book This Safari →"}
      </Link>

      {installmentsOk && (
        <div className="bg-gold-50 border border-gold-100 rounded-lg p-4 text-sm">
          <p className="font-semibold text-gold-DEFAULT mb-1">💳 Lipa Polepole Available</p>
          <p className="text-gray-600">Pay in 4 monthly M-Pesa instalments. No interest.</p>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
        <p className="font-semibold">Quick Facts</p>
        <p>⏱ {durationDays} day{durationDays > 1 ? "s" : ""}</p>
        <p>💰 {depositPct}% deposit to confirm</p>
      </div>
    </div>
  );
}
