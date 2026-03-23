"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="flex items-center justify-center gap-3 max-w-md mx-auto bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 rounded-xl px-6 py-4">
        <div className="w-6 h-6 rounded-full bg-teal-DEFAULT flex items-center justify-center flex-shrink-0">
          <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p className="text-teal-DEFAULT font-semibold text-sm">Guide sent! Check your inbox.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="flex-1 border border-gray-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent bg-white"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-teal-DEFAULT hover:bg-teal-600 text-white px-6 py-3.5 rounded-xl font-semibold text-sm transition-all hover:shadow-teal whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "Sending…" : "Send My Guide"}
      </button>
      {status === "error" && (
        <p className="text-red-500 text-xs mt-1 sm:col-span-2">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
