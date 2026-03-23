import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Engai Safaris Kenya",
  description: "Booking terms, cancellation policy, and conditions for Engai Safaris Kenya. Governed by the laws of the Republic of Kenya.",
  alternates: { canonical: "https://www.engaisafaris.com/terms-conditions" },
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg">
      <h1 className="font-display text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
      <p className="text-gray-500 text-sm mb-2">Last updated: March 2026</p>
      <p className="text-gray-500 text-sm mb-8">Governing law: Republic of Kenya</p>

      <p>
        These Terms and Conditions (&ldquo;Terms&rdquo;) govern all bookings made with{" "}
        <strong>Engai Safaris Limited</strong>, a company incorporated in Kenya, trading as{" "}
        <strong>Engai Safaris</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;). By making a booking you confirm
        that you have read, understood, and agreed to these Terms in full.
      </p>

      <h2>1. Booking and Confirmation</h2>
      <p>A booking is confirmed only when:</p>
      <ul>
        <li>You have submitted a completed booking form or enquiry</li>
        <li>We have sent you a written confirmation email</li>
        <li>Your deposit payment has been received and verified</li>
      </ul>
      <p>
        Your booking reference number (e.g. ENG-2026-00042) will be stated in your confirmation
        email. Please quote this reference in all correspondence.
      </p>
      <p>
        Engai Safaris reserves the right to decline any booking at our discretion. The person
        making the booking accepts these Terms on behalf of all members of their travelling party.
      </p>

      <h2>2. Pricing and Payment</h2>
      <p>
        <strong>Deposit:</strong> A deposit of 30% of the total safari price is required at the
        time of booking to secure your reservation.
      </p>
      <p>
        <strong>Balance:</strong> The remaining 70% is payable on arrival at our offices or at
        the first lodge/camp on Day 1 of your safari.
      </p>
      <p>
        <strong>Lipa Polepole (Installment Plan):</strong> Local Kenyan clients may apply for our
        installment plan. Terms are agreed at booking and must be honoured in full before the
        departure date. Failure to complete payments will result in cancellation per Clause 4.
      </p>
      <p>
        <strong>Currency:</strong> International tourists are quoted in USD. The KES equivalent
        is shown for reference at the exchange rate on the date of booking — this rate is locked
        and will not change. Local clients are quoted and charged in KES. Payment is processed by
        Pesapal (PCI DSS compliant).
      </p>
      <p>
        <strong>Price lock:</strong> Once your deposit is paid, your price is locked. We will not
        increase your price after receiving your deposit, except in cases of government-imposed
        park fee changes (we will notify you immediately) or force majeure events (Clause 8).
      </p>

      <h2>3. Cancellation by the Client</h2>
      <p>
        All cancellations must be made in writing to{" "}
        <a href="mailto:bookings@engaisafaris.com">bookings@engaisafaris.com</a> and are subject
        to the following charges, calculated from the date written notice is received:
      </p>
      <table>
        <thead>
          <tr>
            <th>Notice Period</th>
            <th>Cancellation Charge</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>60 days or more before departure</td><td>Deposit forfeited (30%)</td></tr>
          <tr><td>31–59 days before departure</td><td>50% of total price</td></tr>
          <tr><td>15–30 days before departure</td><td>75% of total price</td></tr>
          <tr><td>14 days or less before departure</td><td>100% of total price</td></tr>
          <tr><td>No-show (no notice given)</td><td>100% of total price</td></tr>
        </tbody>
      </table>
      <p>
        We strongly recommend all clients purchase comprehensive travel insurance covering
        cancellation. Cancellation charges apply regardless of the reason, including illness,
        injury, or bereavement, unless covered by your travel insurance.
      </p>

      <h2>4. Cancellation by Engai Safaris</h2>
      <p>We reserve the right to cancel any booking in the following circumstances:</p>
      <ul>
        <li>Non-payment of deposit or balance by the due date</li>
        <li>Force majeure (Clause 8)</li>
        <li>Safety concerns at the destination (government travel advisories)</li>
        <li>Minimum group size not met for group departures</li>
      </ul>
      <p>
        If we cancel your safari for reasons other than your failure to pay or force majeure, we
        will offer a full alternative safari of equivalent value, or a full refund of all monies
        paid. In cases of force majeure cancellation, we will refund all amounts received minus
        any non-recoverable third-party costs already paid on your behalf.
      </p>

      <h2>5. Modifications</h2>
      <p>
        Requests to modify confirmed bookings (date changes, destination changes, group size
        changes) are subject to a modification fee of KES 5,000 (approx. $38 USD) per change,
        plus any price difference resulting from the change, subject to availability.
      </p>
      <p>
        We reserve the right to make minor modifications to itineraries (e.g. substitute
        accommodation of equivalent or higher standard, adjust game drive times due to weather
        or road conditions) without prior notice. We will always inform you of significant changes.
      </p>

      <h2>6. Wildlife and Nature Disclaimer</h2>
      <p>
        Safari activities take place in wild, natural environments. Wildlife sightings, including
        the Big Five, <strong>cannot be guaranteed</strong>. Animal behaviour is entirely
        unpredictable. Engai Safaris will use all reasonable skill and expertise to maximise
        wildlife sightings, but accepts no liability for the absence of any specific animal species.
      </p>
      <p>
        The Great Migration (July–October) cannot be guaranteed at any specific location. River
        crossings are entirely dependent on wildebeest behaviour and cannot be predicted or
        guaranteed. Weather conditions are part of the safari experience and do not constitute
        grounds for refund or compensation.
      </p>

      <h2>7. Client Responsibilities</h2>
      <p>You are responsible for:</p>
      <ul>
        <li>Ensuring you hold a valid passport with at least 6 months validity</li>
        <li>Obtaining all required visas (Kenya e-Visa at evisa.go.ke)</li>
        <li>Receiving all recommended vaccinations</li>
        <li>Purchasing comprehensive travel insurance before departure</li>
        <li>Arriving at designated pickup points on time</li>
        <li>Following all safety instructions given by your guide</li>
        <li>Behaving responsibly toward wildlife and the environment</li>
      </ul>
      <p>
        Engai Safaris reserves the right to remove any client from a safari without refund if
        their behaviour endangers wildlife, other guests, or staff; violates Kenya Wildlife
        Service (KWS) regulations; or is abusive, threatening, or illegal.
      </p>

      <h2>8. Force Majeure</h2>
      <p>
        Engai Safaris accepts no liability for failure to perform obligations caused by
        circumstances beyond our reasonable control, including but not limited to: natural
        disasters, acts of terrorism or civil unrest, government travel bans or park closures,
        pandemic or epidemic declarations (WHO or Kenya Government), or KWS/conservancy closures.
        In such cases, we will make every effort to reschedule your safari to a mutually agreed
        alternative date at no extra charge.
      </p>

      <h2>9. Liability</h2>
      <p>
        Engai Safaris holds Public Liability Insurance covering incidents during our safaris.
        Our liability to you for any claim shall not exceed the total price paid for your safari.
        We accept no liability for loss or damage to personal belongings; personal injury not
        caused by our negligence; consequential losses (missed flights, business losses, etc.);
        or actions or omissions of third-party suppliers (lodges, airlines).
      </p>
      <p>
        Clients participate in all safari activities entirely at their own risk. By accepting
        these Terms, you acknowledge the inherent risks of wildlife safaris.
      </p>

      <h2>10. Complaints</h2>
      <p>
        If you have a complaint during your safari, please inform your guide or our office
        immediately so we can attempt to resolve it in real time. Complaints received after the
        safari has ended must be submitted in writing within 28 days of your return to{" "}
        <a href="mailto:bookings@engaisafaris.com">bookings@engaisafaris.com</a>. We will
        acknowledge within 3 business days and aim to resolve within 14 business days.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms are governed by and construed in accordance with the laws of the Republic of
        Kenya. Any disputes shall be subject to the exclusive jurisdiction of the Kenyan courts.
      </p>

      <h2>12. Contact</h2>
      <p>
        <strong>Engai Safaris Limited</strong><br />
        Lake Naivasha, Nakuru County, Kenya<br />
        <a href="mailto:bookings@engaisafaris.com">bookings@engaisafaris.com</a>
      </p>
    </div>
  );
}
