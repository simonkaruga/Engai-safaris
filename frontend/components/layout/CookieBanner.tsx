"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const CONSENT_KEY = "cookie_consent";

/**
 * Injects Google Analytics only after the user has given consent.
 * Called once on accept AND on re-hydration when consent was previously accepted.
 */
function loadAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId || document.querySelector(`script[data-ga="${gaId}"]`)) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  script.setAttribute("data-ga", gaId);
  document.head.appendChild(script);

  const inline = document.createElement("script");
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gaId}', { anonymize_ip: true });
  `;
  document.head.appendChild(inline);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) {
      setVisible(true);
    } else if (stored === "accepted") {
      // Re-hydration: user already accepted in a previous session — load analytics now
      loadAnalytics();
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    loadAnalytics();
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setVisible(false);
    // Ensure no analytics scripts are injected
  };

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 md:p-5 shadow-2xl">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
          We use cookies to improve your experience and analyse site traffic. Your data is never sold.{" "}
          <Link href="/privacy-policy" className="text-teal-DEFAULT hover:underline font-medium">Privacy Policy</Link>
        </p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={decline}
            className="text-sm text-gray-400 hover:text-white px-4 py-2 border border-gray-600 rounded-lg transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm bg-teal-DEFAULT hover:bg-teal-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
