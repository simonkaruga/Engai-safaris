"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie_consent")) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem("cookie_consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie_consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white p-4 md:p-5">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-gray-300 max-w-2xl">
          We use cookies to improve your experience and analyse site traffic.{" "}
          <Link href="/privacy-policy" className="text-teal-DEFAULT hover:underline">Privacy Policy</Link>
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
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
