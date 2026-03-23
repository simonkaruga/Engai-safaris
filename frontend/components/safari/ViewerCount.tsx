"use client";

import { useEffect, useState } from "react";

/**
 * Shows a realistic "X people viewing this safari today" signal.
 * Uses the safari slug to seed a deterministic-but-varied number
 * so each safari has its own unique count, and it changes slightly
 * every few minutes to feel live.
 */
export default function ViewerCount({ slug }: { slug: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Seed a base number from the slug (deterministic per safari)
    const seed = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const base = 6 + (seed % 19); // 6–24 range

    // Add small time-based variance (changes every 8 minutes)
    const timeSlot = Math.floor(Date.now() / (8 * 60 * 1000));
    const variance = (timeSlot + seed) % 5; // 0–4 variance
    setCount(base + variance);
  }, [slug]);

  if (!count) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
      </span>
      <span>
        <strong>{count} people</strong> viewing this safari today
      </span>
    </div>
  );
}
