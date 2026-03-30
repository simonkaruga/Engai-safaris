"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error tracking service here if needed
    console.error(error);
  }, [error]);

  return (
    <div className="relative min-h-screen bg-[#0F1C17] flex items-center justify-center overflow-hidden px-4">
      {/* Background acacia silhouette — same as not-found for brand consistency */}
      <div className="absolute inset-0 flex items-end justify-center opacity-10 pointer-events-none select-none">
        <svg
          viewBox="0 0 1200 600"
          className="w-full max-w-4xl"
          fill="#1B7A60"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="0" y="540" width="1200" height="60" />
          <rect x="130" y="320" width="18" height="220" />
          <ellipse cx="139" cy="310" rx="90" ry="22" />
          <ellipse cx="100" cy="290" rx="65" ry="18" />
          <ellipse cx="178" cy="288" rx="60" ry="16" />
          <ellipse cx="139" cy="270" rx="75" ry="20" />
          <rect x="588" y="220" width="24" height="320" />
          <ellipse cx="600" cy="208" rx="130" ry="30" />
          <ellipse cx="530" cy="182" rx="90" ry="22" />
          <ellipse cx="670" cy="178" rx="85" ry="20" />
          <ellipse cx="600" cy="158" rx="110" ry="26" />
          <ellipse cx="555" cy="138" rx="70" ry="18" />
          <ellipse cx="648" cy="135" rx="65" ry="17" />
          <rect x="1040" y="360" width="16" height="180" />
          <ellipse cx="1048" cy="350" rx="80" ry="20" />
          <ellipse cx="1010" cy="330" rx="58" ry="16" />
          <ellipse cx="1086" cy="328" rx="55" ry="15" />
          <ellipse cx="1048" cy="312" rx="68" ry="18" />
          <ellipse cx="250" cy="536" rx="40" ry="12" />
          <ellipse cx="450" cy="539" rx="30" ry="9" />
          <ellipse cx="750" cy="537" rx="35" ry="10" />
          <ellipse cx="950" cy="538" rx="28" ry="8" />
        </svg>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C17] via-transparent to-[#0F1C17]/80 pointer-events-none" />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-[#1B7A60]/20 border border-[#1B7A60]/30 flex items-center justify-center mx-auto mb-8">
          <svg className="w-9 h-9 text-[#1B7A60]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>

        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Something went wrong
        </h1>

        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          A wild error appeared. Our team has been notified — try again or WhatsApp us if it persists.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-[#1B7A60] hover:bg-[#156650] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </Link>
        </div>

        <p className="mt-12 text-gray-600 text-sm">
          Need help?{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            className="text-[#1B7A60] hover:text-[#25a07a] underline underline-offset-2 transition-colors"
          >
            WhatsApp us
          </a>
          {" "}— we respond within minutes.
        </p>
      </div>
    </div>
  );
}
