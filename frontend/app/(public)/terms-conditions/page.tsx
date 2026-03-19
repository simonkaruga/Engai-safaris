import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg">
      <h1 className="font-display text-4xl font-bold mb-2">Terms & Conditions</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>

      <h2>1. Booking Confirmation</h2>
      <p>A booking is confirmed upon receipt of a 30% deposit and written confirmation from Engai Safaris. The balance is due 30 days before the travel date.</p>

      <h2>2. Cancellation Policy</h2>
      <ul>
        <li><strong>60+ days before travel:</strong> 25% of total cost forfeited</li>
        <li><strong>31–60 days before travel:</strong> 50% of total cost forfeited</li>
        <li><strong>Under 30 days before travel:</strong> 100% of total cost forfeited</li>
        <li><strong>No-show:</strong> 100% of total cost forfeited</li>
      </ul>

      <h2>3. Modifications</h2>
      <p>Changes to confirmed bookings incur a KES 5,000 modification fee per change, subject to availability.</p>

      <h2>4. Force Majeure</h2>
      <p>Engai Safaris is not liable for cancellations or changes caused by events beyond our control including but not limited to: extreme weather, political instability, pandemic, natural disaster, or government travel advisories.</p>

      <h2>5. Liability</h2>
      <p>Engai Safaris acts as a tour operator and is not liable for personal injury, loss, or damage arising from acts of nature, wildlife encounters, or third-party service providers. Travel insurance is strongly recommended.</p>

      <h2>6. Pricing</h2>
      <p>Prices are locked at the time of booking confirmation. Seasonal pricing is applied automatically based on travel date. All prices are displayed in both USD and KES.</p>

      <h2>7. Dispute Resolution</h2>
      <p>Any disputes shall be resolved under the laws of Kenya. Jurisdiction: Nairobi courts.</p>

      <h2>8. Contact</h2>
      <p>legal@engaisafaris.com · Engai Safaris Ltd · Nairobi, Kenya</p>
    </div>
  );
}
