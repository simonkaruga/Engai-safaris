import SafariPlannerChat from "@/components/ai/SafariPlannerChat";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Safari Planner",
  description: "Tell Engai your travel dates, budget and interests. Get a personalised Kenya safari recommendation in minutes.",
  alternates: { canonical: "https://www.engaisafaris.com/plan-my-safari" },
};

const WHAT_ENGAI_KNOWS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    text: "Great Migration timing · Big Five sightings",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
    text: "Best seasons for each park · Weather patterns",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    text: "Family-friendly options · Age requirements",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    text: "Real pricing · Budget vs luxury options",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
    text: "Drive times · Park combinations · Routing",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    text: "Green season deals · Peak season tradeoffs",
  },
];

export default function PlanMySafariPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — editorial side */}
          <div className="lg:sticky lg:top-28">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-teal-DEFAULT/10 border border-teal-DEFAULT/20 text-teal-DEFAULT px-4 py-1.5 rounded-full text-xs font-semibold mb-6">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              Powered by Claude AI
            </div>

            <h1 className="font-display text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-5">
              Your perfect safari,<br />
              <span className="italic text-teal-DEFAULT">planned in minutes</span>
            </h1>

            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-md">
              Chat with Engai — our AI safari planner. Tell it your dates, group size,
              budget and dream moments. It knows Kenya intimately and will recommend
              the perfect package from our catalogue.
            </p>

            {/* What Engai knows */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-6 mb-8">
              <p className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4">What Engai knows</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHAT_ENGAI_KNOWS.map(({ icon, text }) => (
                  <div key={text} className="flex items-start gap-2.5">
                    <span className="text-teal-DEFAULT flex-shrink-0 mt-0.5">{icon}</span>
                    <span className="text-sm text-gray-600 leading-snug">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* How it works */}
            <div className="space-y-4">
              {[
                { step: "1", title: "Chat with Engai", desc: "Answer 2–3 questions about your trip" },
                { step: "2", title: "Get a recommendation", desc: "Engai picks the best matching safari" },
                { step: "3", title: "Book instantly", desc: "Click Book Now — deposit paid in seconds" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-teal-DEFAULT text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{title}</p>
                    <p className="text-gray-500 text-sm">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp alternative */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-400 mb-3">Prefer to chat directly?</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP ?? "254797033513"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#25D366] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#25D366]" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp our team directly
              </a>
            </div>
          </div>

          {/* Right — chat */}
          <div>
            <SafariPlannerChat />
            <p className="text-center text-xs text-gray-400 mt-4">
              Engai uses real-time data from our safari catalogue · Response time: ~2 seconds
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
