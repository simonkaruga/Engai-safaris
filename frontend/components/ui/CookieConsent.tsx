"use client";

import { useState, useEffect } from "react";

const CONSENT_KEY = "cookie_consent";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const essentialOnly = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
  };

  if (!mounted) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg transition-transform duration-300 ease-out ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">
          We use cookies to improve your experience and analyse site traffic. By continuing, you accept our use of cookies.
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={essentialOnly}
            className="text-sm px-5 py-2.5 border-2 border-teal-DEFAULT text-teal-DEFAULT rounded-xl font-semibold hover:bg-teal-50 transition-colors whitespace-nowrap"
          >
            Essential Only
          </button>
          <button
            onClick={accept}
            className="text-sm bg-teal-DEFAULT hover:bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold transition-colors whitespace-nowrap"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
