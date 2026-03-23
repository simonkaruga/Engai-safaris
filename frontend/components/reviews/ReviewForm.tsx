"use client";

import { useState } from "react";
import { submitReview } from "@/lib/api";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function StarPicker({
  label,
  value,
  onChange,
  size = "lg",
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  size?: "sm" | "lg";
}) {
  const [hovered, setHovered] = useState(0);
  const starSize = size === "lg" ? "w-9 h-9" : "w-6 h-6";

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700 mb-2">{label}</p>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = star <= (hovered || value);
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110 focus:outline-none"
              aria-label={`${star} star${star !== 1 ? "s" : ""}`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`${starSize} transition-colors ${filled ? "text-gold-DEFAULT" : "text-gray-200"}`}
                fill="currentColor"
              >
                <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005z" />
              </svg>
            </button>
          );
        })}
        {value > 0 && (
          <span className="ml-2 text-sm font-semibold text-gold-DEFAULT">
            {["", "Poor", "Fair", "Good", "Great", "Excellent"][value]}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ReviewForm({ onSuccess }: { onSuccess?: () => void }) {
  const [rating, setRating] = useState(0);
  const [guideRating, setGuideRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    author_name: "",
    author_country: "",
    title: "",
    body: "",
    trip_month: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.author_name.trim()) { setError("Please enter your name."); return; }
    if (rating === 0) { setError("Please select an overall rating."); return; }
    if (!form.body.trim() || form.body.length < 20) { setError("Review must be at least 20 characters."); return; }

    setSubmitting(true);
    try {
      await submitReview({
        author_name: form.author_name.trim(),
        author_country: form.author_country.trim() || undefined,
        rating,
        guide_rating: guideRating || undefined,
        value_rating: valueRating || undefined,
        title: form.title.trim() || undefined,
        body: form.body.trim(),
        trip_month: form.trip_month || undefined,
      });
      setSubmitted(true);
      onSuccess?.();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">Thank you!</h3>
        <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
          Your review has been submitted and will appear after our team approves it — usually within 24 hours.
        </p>
      </div>
    );
  }

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT focus:border-transparent transition-shadow text-sm bg-white";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Star ratings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 rounded-2xl p-5">
        <StarPicker label="Overall experience" value={rating} onChange={setRating} />
        <StarPicker label="Guide rating" value={guideRating} onChange={setGuideRating} size="sm" />
        <StarPicker label="Value for money" value={valueRating} onChange={setValueRating} size="sm" />
      </div>

      {/* Personal details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelClass}>Your Name <span className="text-maasai-DEFAULT">*</span></label>
          <input
            name="author_name"
            value={form.author_name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Jane Smith"
          />
        </div>
        <div>
          <label className={labelClass}>Country</label>
          <input
            name="author_country"
            value={form.author_country}
            onChange={handleChange}
            className={inputClass}
            placeholder="United Kingdom"
          />
        </div>
      </div>

      {/* Trip month */}
      <div>
        <label className={labelClass}>When did you travel?</label>
        <select name="trip_month" value={form.trip_month} onChange={handleChange} className={inputClass}>
          <option value="">Select month</option>
          {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>
      </div>

      {/* Review title */}
      <div>
        <label className={labelClass}>Review headline</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          className={inputClass}
          placeholder="An unforgettable sunrise over the Mara..."
        />
      </div>

      {/* Body */}
      <div>
        <label className={labelClass}>Your review <span className="text-maasai-DEFAULT">*</span></label>
        <textarea
          name="body"
          value={form.body}
          onChange={handleChange}
          rows={5}
          className={inputClass + " resize-none"}
          placeholder="Tell others about your experience — the wildlife, your guide, the camp, what surprised you most..."
        />
        <p className="text-xs text-gray-400 mt-1.5">{form.body.length} / 1000 characters</p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 text-maasai-DEFAULT text-sm bg-red-50 border border-red-100 rounded-xl px-4 py-3">
          <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-teal-DEFAULT hover:bg-teal-600 text-white py-4 rounded-xl font-semibold transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Submitting...
          </>
        ) : (
          <>
            Submit Review
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Reviews are moderated and typically approved within 24 hours.
      </p>
    </form>
  );
}
