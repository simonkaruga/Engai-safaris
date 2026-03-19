"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createEnquiry } from "@/lib/api";
import { useRouter } from "next/navigation";

const schema = z.object({
  customer_name: z.string().min(2, "Name required"),
  customer_email: z.string().email("Valid email required"),
  customer_phone: z.string().optional(),
  customer_country: z.string().optional(),
  travel_date_from: z.string().optional(),
  group_size: z.coerce.number().min(1).max(20).optional(),
  budget_usd: z.string().optional(),
  interests: z.array(z.string()).optional(),
  special_requests: z.string().optional(),
  celebration: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const INTERESTS = ["Big Five", "Great Migration", "Photography", "Culture", "Adventure", "Honeymoon", "Family", "Birding"];
const BUDGETS = ["Under $500", "$500–$1,000", "$1,000–$2,000", "$2,000–$5,000", "$5,000+"];
const CELEBRATIONS = ["", "Honeymoon", "Anniversary", "Birthday", "Graduation", "Retirement"];

export default function EnquirePage({ searchParams }: { searchParams: { safari?: string } }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const toggleInterest = (i: string) =>
    setSelectedInterests((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const enquiry = await createEnquiry({
        ...data,
        interests: selectedInterests,
        safari_id: searchParams.safari ? undefined : undefined,
        source: "website",
      });
      router.push(`/enquire/confirmation?ref=${enquiry.reference}`);
    } catch {
      alert("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="font-display text-4xl font-bold mb-3">Plan Your Safari</h1>
        <p className="text-gray-600">Tell us about your dream trip. We'll respond within 24 hours with a personalised quote.</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
              step >= s ? "bg-teal-DEFAULT text-white" : "bg-gray-200 text-gray-500"
            }`}>{s}</div>
            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-teal-DEFAULT" : "bg-gray-200"}`} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Your Details</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Full Name *</label>
              <input {...register("customer_name")} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="Jane Smith" />
              {errors.customer_name && <p className="text-maasai-DEFAULT text-xs mt-1">{errors.customer_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email *</label>
              <input {...register("customer_email")} type="email" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="jane@example.com" />
              {errors.customer_email && <p className="text-maasai-DEFAULT text-xs mt-1">{errors.customer_email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone / WhatsApp</label>
              <input {...register("customer_phone")} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="+1 555 000 0000" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Country</label>
              <input {...register("customer_country")} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="United States" />
            </div>
            <button type="button" onClick={() => setStep(2)} className="w-full bg-teal-DEFAULT text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
              Next →
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Trip Details</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Travel Date</label>
              <input {...register("travel_date_from")} type="date" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Group Size</label>
              <input {...register("group_size")} type="number" min={1} max={20} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="2" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Budget per person</label>
              <select {...register("budget_usd")} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT">
                <option value="">Select budget</option>
                {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Interests (select all that apply)</label>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => toggleInterest(i)}
                    className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                      selectedInterests.includes(i)
                        ? "bg-teal-DEFAULT text-white border-teal-DEFAULT"
                        : "border-gray-300 text-gray-600 hover:border-teal-DEFAULT"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button type="button" onClick={() => setStep(3)} className="flex-1 bg-teal-DEFAULT text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                Next →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Final Details</h2>
            <div>
              <label className="block text-sm font-medium mb-1">Special Occasion?</label>
              <select {...register("celebration")} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT">
                {CELEBRATIONS.map((c) => <option key={c} value={c}>{c || "None"}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Special Requests / Questions</label>
              <textarea {...register("special_requests")} rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-DEFAULT" placeholder="Dietary requirements, accessibility needs, specific wildlife you want to see..." />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                ← Back
              </button>
              <button type="submit" disabled={submitting} className="flex-1 bg-teal-DEFAULT text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition-colors disabled:opacity-60">
                {submitting ? "Sending..." : "Send Enquiry →"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
