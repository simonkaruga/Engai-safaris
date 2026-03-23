import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PrintButton from "./PrintButton";

export const metadata: Metadata = {
  title: "Payment Receipt — Engai Safaris",
  robots: { index: false },
};

interface ReceiptData {
  reference: string;
  customer_name: string;
  customer_email: string;
  safari_name: string;
  safari_duration_days: number;
  travel_date: string;
  pax: number;
  season: string | null;
  total_usd: number | null;
  total_kes: number;
  deposit_kes: number;
  balance_kes: number;
  status: string;
  created_at: string;
}

async function getReceipt(ref: string): Promise<ReceiptData | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/receipts/${ref}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

function formatKes(amount: number) {
  return `KES ${Math.round(amount).toLocaleString("en-KE")}`;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ReceiptPage({
  params,
}: {
  params: { ref: string };
}) {
  const data = await getReceipt(params.ref);
  if (!data) notFound();

  const issuedDate = formatDate(data.created_at);
  const travelDate = formatDate(data.travel_date);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 print:bg-white print:py-0">
      {/* Print/Download controls — hidden when printing */}
      <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between print:hidden">
        <a
          href={`/booking/confirmation?ref=${data.reference}`}
          className="text-sm text-teal-DEFAULT hover:underline"
        >
          ← Back to confirmation
        </a>
        <PrintButton />
      </div>

      {/* Receipt card */}
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden print:shadow-none print:rounded-none">
        {/* Header */}
        <div className="bg-teal-DEFAULT px-8 py-8 print:px-6 print:py-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-teal-100 text-xs uppercase tracking-widest mb-1">
                Payment Receipt
              </p>
              <h1 className="text-white font-display text-2xl font-bold leading-tight">
                Engai Safaris
              </h1>
              <p className="text-teal-100 text-xs mt-0.5">
                hello@engaisafaris.com · engaisafaris.com
              </p>
            </div>
            <div className="text-right">
              <p className="text-teal-100 text-xs uppercase tracking-widest mb-1">
                Reference
              </p>
              <p className="text-white font-bold text-xl font-mono">
                {data.reference}
              </p>
              <p className="text-teal-100 text-xs mt-1">Issued {issuedDate}</p>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-6 print:px-6 print:py-6">
          {/* Status badge */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-green-700 uppercase tracking-wide">
              Deposit Received
            </span>
          </div>

          {/* Guest & safari details */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Guest
              </p>
              <p className="font-semibold text-gray-900 text-sm">
                {data.customer_name}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">{data.customer_email}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Safari Package
              </p>
              <p className="font-semibold text-gray-900 text-sm leading-snug">
                {data.safari_name}
              </p>
              <p className="text-gray-500 text-xs mt-0.5">
                {data.safari_duration_days} days
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Travel Date
              </p>
              <p className="font-semibold text-gray-900 text-sm">{travelDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Group Size
              </p>
              <p className="font-semibold text-gray-900 text-sm">
                {data.pax} {data.pax === 1 ? "person" : "people"}
              </p>
              {data.season && (
                <p className="text-gray-500 text-xs mt-0.5 capitalize">
                  {data.season} season
                </p>
              )}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Payment breakdown */}
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">
              Payment Breakdown
            </p>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Safari total</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatKes(data.total_kes)}
                </span>
              </div>
              {data.total_usd && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Approximate USD equivalent
                  </span>
                  <span className="text-xs text-gray-400">
                    ~${Math.round(data.total_usd).toLocaleString()} USD
                  </span>
                </div>
              )}

              <hr className="border-dashed border-gray-200 my-2" />

              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Deposit paid (30%)</span>
                <span className="text-sm font-semibold text-green-700">
                  {formatKes(data.deposit_kes)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Balance remaining (70%)</span>
                <span className="text-sm font-medium text-gray-900">
                  {formatKes(data.balance_kes)}
                </span>
              </div>
            </div>

            {/* Total box */}
            <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl px-5 py-4 flex justify-between items-center">
              <div>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">
                  Paid today
                </p>
                <p className="text-[10px] text-teal-500 mt-0.5">
                  Deposit — secures your booking
                </p>
              </div>
              <p className="text-teal-DEFAULT font-bold text-2xl font-display">
                {formatKes(data.deposit_kes)}
              </p>
            </div>

            <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl px-5 py-3 flex justify-between items-center">
              <div>
                <p className="text-xs text-amber-700 font-semibold">
                  Balance due
                </p>
                <p className="text-[10px] text-amber-600 mt-0.5">
                  30 days before travel date
                </p>
              </div>
              <p className="text-amber-700 font-bold text-lg">
                {formatKes(data.balance_kes)}
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Footer */}
          <div className="text-xs text-gray-400 space-y-1 leading-relaxed">
            <p>
              <strong className="text-gray-500">Engai Safaris</strong> ·
              TRA Class A Licensed Operator · Nairobi, Kenya
            </p>
            <p>
              This receipt confirms your deposit payment for the safari above.
              Your booking is confirmed upon deposit receipt. The balance is due
              30 days before your travel date.
            </p>
            <p>
              Questions? Email{" "}
              <span className="text-teal-DEFAULT">hello@engaisafaris.com</span>{" "}
              or WhatsApp us with your booking reference.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
