import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Booking Confirmed | Engai Safaris" };

export default function BookingConfirmationPage({
  searchParams,
}: {
  searchParams: { ref?: string; OrderTrackingId?: string; OrderMerchantReference?: string };
}) {
  const ref = searchParams.ref ?? searchParams.OrderMerchantReference ?? null;

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">

        {/* Success icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-teal-50 border-2 border-teal-100 flex items-center justify-center">
              <svg className="w-12 h-12 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-teal-DEFAULT/30 animate-ping" />
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="font-display text-4xl font-bold text-gray-900 mb-3">
            Booking Confirmed!
          </h1>
          <p className="text-gray-500 text-lg leading-relaxed">
            Your deposit has been received. Your Kenya safari adventure is now officially on.
          </p>
          {ref && (
            <div className="mt-4 inline-flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-xl px-4 py-2">
              <svg className="w-4 h-4 text-teal-DEFAULT" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
              </svg>
              <span className="text-teal-DEFAULT font-semibold text-sm">Booking ref: <span className="font-bold">{ref}</span></span>
            </div>
          )}
        </div>

        {/* What happens next */}
        <div className="bg-gray-950 rounded-2xl p-6 mb-6">
          <p className="text-white font-semibold text-sm mb-5">What happens next</p>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Confirmation email",
                desc: "Check your inbox, your booking details and receipt are on their way.",
              },
              {
                step: "2",
                title: "Guide assignment",
                desc: "We'll assign your TRA-certified guide and share their full profile within 24 hours.",
              },
              {
                step: "3",
                title: "Pre-trip briefing",
                desc: "3 days before departure, your guide calls you directly to confirm logistics.",
              },
              {
                step: "4",
                title: "Safari day",
                desc: "Your guide picks you up. The adventure begins.",
              },
            ].map(({ step, title, desc }, i, arr) => (
              <div key={step} className="flex gap-4">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-teal-DEFAULT flex items-center justify-center text-white text-xs font-bold">
                    {step}
                  </div>
                  {i < arr.length - 1 && <div className="w-px flex-1 bg-white/10 my-2" />}
                </div>
                <div className="pb-4">
                  <p className="text-white text-sm font-semibold">{title}</p>
                  <p className="text-gray-400 text-xs leading-relaxed mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Balance reminder */}
        <div className="bg-gold-50 border border-gold-100 rounded-xl p-4 text-sm mb-6">
          <p className="font-semibold text-gold-DEFAULT mb-1">Balance payment reminder</p>
          <p className="text-gray-600 leading-relaxed">
            Your balance is due 30 days before your travel date. We'll send a reminder email and you can pay via M-Pesa, Visa, or Mastercard.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {ref && (
            <a
              href={`/booking/receipt/${ref}`}
              className="flex items-center justify-center gap-2 w-full border border-teal-DEFAULT text-teal-DEFAULT py-3.5 rounded-xl font-semibold hover:bg-teal-50 transition-colors text-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
              </svg>
              Print / Download Receipt
            </a>
          )}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}?text=Hi! I just booked${ref ? ` (ref: ${ref})` : ""}. Looking forward to the safari!`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1da851] text-white py-3.5 rounded-xl font-semibold transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Say hello to your team on WhatsApp
          </a>
          <Link
            href="/safaris"
            className="flex items-center justify-center w-full border border-gray-200 text-gray-700 py-3.5 rounded-xl font-semibold hover:bg-gray-50 transition-colors text-sm"
          >
            Browse more safaris
          </Link>
        </div>

        {/* Post-Trip Review Nudge */}
        <div className="mt-8 border-t border-gray-100 pt-8">
          <p className="text-center text-xs text-gray-400 uppercase tracking-widest mb-4">
            After your safari, please share your experience
          </p>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="https://g.page/r/engaisafaris/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border border-gray-200 hover:border-[#4285F4]/40 hover:shadow-sm rounded-xl px-4 py-3 transition-all group"
            >
              <svg viewBox="0 0 48 48" className="w-5 h-5 flex-shrink-0">
                <path fill="#4285F4" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"/>
                <path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 16.6 19.2 14 24 14c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 16.3 2 9.7 7.4 6.3 14.7z"/>
                <path fill="#FBBC05" d="M24 46c5.5 0 10.6-1.8 14.5-5l-6.7-5.5C29.8 37 27 38 24 38c-6.1 0-11.2-4.1-13-9.7l-7.1 5.5C7.6 41.5 15.3 46 24 46z"/>
                <path fill="#EA4335" d="M44.5 20H24v8.5h11.8c-.9 2.5-2.6 4.7-4.8 6.2l6.7 5.5C42.2 36.4 46 30.7 46 24c0-1.3-.2-2.7-.5-4z"/>
              </svg>
              <div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#4285F4] transition-colors">Google Review</p>
                <p className="text-[10px] text-gray-400">2 min · helps others</p>
              </div>
            </a>
            <a
              href="https://www.tripadvisor.com/engaisafaris"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-white border border-gray-200 hover:border-[#34E0A1]/50 hover:shadow-sm rounded-xl px-4 py-3 transition-all group"
            >
              <svg viewBox="0 0 60 60" className="w-5 h-5 flex-shrink-0">
                <circle cx="15" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="45" cy="35" r="10" fill="#34E0A1"/>
                <circle cx="30" cy="20" r="8" fill="#fff" stroke="#34E0A1" strokeWidth="2"/>
                <path d="M5 25 Q15 10 30 12 Q45 10 55 25" stroke="#34E0A1" strokeWidth="2" fill="none"/>
                <circle cx="15" cy="35" r="4" fill="#fff"/>
                <circle cx="45" cy="35" r="4" fill="#fff"/>
              </svg>
              <div>
                <p className="text-xs font-semibold text-gray-800 group-hover:text-[#00aa6c] transition-colors">TripAdvisor</p>
                <p className="text-[10px] text-gray-400">2 min · helps others</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
