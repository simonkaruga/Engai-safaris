"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API?: Record<string, unknown>;
    Tawk_LoadStart?: Date;
  }
}

/**
 * Tawk.to live chat widget.
 * Set NEXT_PUBLIC_TAWK_PROPERTY_ID in your .env.local to your Tawk.to property ID.
 * Format: "64abc123def456/1hxyz"  (found in Tawk.to dashboard → Administration → Chat Widget)
 * Widget is silently skipped when the env var is absent or empty.
 */
const TAWK_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID ?? "";

export default function LiveChat() {
  useEffect(() => {
    if (typeof window === "undefined" || !TAWK_ID) return;

    window.Tawk_API = window.Tawk_API ?? {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://embed.tawk.to/${TAWK_ID}/default`;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    if (!document.querySelector(`script[src*="tawk.to"]`)) {
      document.head.appendChild(script);
    }

    return () => {
      const existing = document.querySelector(`script[src*="tawk.to"]`);
      existing?.remove();
    };
  }, []);

  return null;
}
