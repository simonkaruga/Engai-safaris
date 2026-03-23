import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Engai Safaris Kenya",
  description: "How Engai Safaris collects, uses, and protects your personal data. Compliant with the Kenya Data Protection Act 2019 and EU GDPR.",
  alternates: { canonical: "https://www.engaisafaris.com/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg">
      <h1 className="font-display text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-2">Last updated: March 2026</p>
      <p className="text-gray-500 text-sm mb-8">
        Compliance: Kenya Data Protection Act 2019 · EU GDPR · UK GDPR
      </p>

      <p>
        Engai Safaris Limited (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting your
        personal data. This Privacy Policy explains how we collect, use, store, and protect your
        information when you use our website (engaisafaris.com) or make a booking with us.
      </p>
      <p>
        We comply with the <strong>Kenya Data Protection Act 2019 (DPA)</strong>, which
        establishes standards and principles for handling personal data modelled after the EU
        General Data Protection Regulation (GDPR).
      </p>

      <h2>1. Who We Are (Data Controller)</h2>
      <p>
        <strong>Engai Safaris Limited</strong><br />
        Lake Naivasha, Nakuru County, Kenya<br />
        Email: <a href="mailto:privacy@engaisafaris.com">privacy@engaisafaris.com</a><br />
        We are registered as a Data Controller with the Office of the Data Protection
        Commissioner (ODPC), Kenya.
      </p>

      <h2>2. What Data We Collect</h2>
      <p><strong>Booking and enquiry data:</strong></p>
      <ul>
        <li>Full name, email address, phone number (including WhatsApp)</li>
        <li>Country of residence and nationality</li>
        <li>Travel dates, safari preferences, group size</li>
        <li>Dietary requirements and medical notes (where provided)</li>
        <li>Special occasion information (honeymoon, birthday, etc.)</li>
        <li>Payment information — processed securely by Pesapal. We never store card numbers.</li>
      </ul>
      <p><strong>Website usage data:</strong></p>
      <ul>
        <li>IP address (anonymised after 24 hours)</li>
        <li>Browser type, device, pages visited, time spent</li>
        <li>Referring website and currency preference</li>
      </ul>
      <p><strong>Communications data:</strong></p>
      <ul>
        <li>Emails and WhatsApp messages you send us</li>
        <li>AI Safari Planner conversation history (when you submit an enquiry)</li>
        <li>Reviews and feedback you provide</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <p>We use your data to:</p>
      <ul>
        <li>Process your booking and send confirmation documents</li>
        <li>Send pre-trip information (packing guides, itineraries, wildlife reports)</li>
        <li>Contact you regarding your booking via WhatsApp, SMS, and email</li>
        <li>Process your payment via Pesapal</li>
        <li>Generate your post-trip photo album (with your permission)</li>
        <li>Send review requests after your safari</li>
        <li>Comply with legal obligations (KRA, KATO)</li>
        <li>Improve our website and services (anonymised analytics only)</li>
      </ul>
      <p>
        <strong>Marketing:</strong> We will only send marketing emails if you have explicitly
        opted in. You may unsubscribe at any time by clicking &ldquo;Unsubscribe&rdquo; in any marketing
        email or by emailing{" "}
        <a href="mailto:privacy@engaisafaris.com">privacy@engaisafaris.com</a>.
      </p>

      <h2>4. Legal Basis for Processing</h2>
      <table>
        <thead>
          <tr><th>Purpose</th><th>Legal Basis</th></tr>
        </thead>
        <tbody>
          <tr><td>Processing your booking</td><td>Performance of contract</td></tr>
          <tr><td>Sending booking confirmations</td><td>Performance of contract</td></tr>
          <tr><td>Payment processing</td><td>Performance of contract</td></tr>
          <tr><td>Safety and emergency contact</td><td>Legitimate interest</td></tr>
          <tr><td>Marketing emails</td><td>Your explicit consent</td></tr>
          <tr><td>Website analytics</td><td>Legitimate interest (anonymised)</td></tr>
          <tr><td>Legal compliance</td><td>Legal obligation</td></tr>
        </tbody>
      </table>

      <h2>5. Who We Share Your Data With</h2>
      <p>
        We share your data only with trusted partners necessary to deliver your safari. We do{" "}
        <strong>not</strong> sell your personal data to any third party. Ever.
      </p>
      <table>
        <thead>
          <tr><th>Third Party</th><th>Purpose</th><th>Location</th></tr>
        </thead>
        <tbody>
          <tr><td>Pesapal Limited</td><td>Payment processing</td><td>Kenya</td></tr>
          <tr><td>Africa&apos;s Talking</td><td>SMS notifications</td><td>Kenya</td></tr>
          <tr><td>Resend Inc.</td><td>Email delivery</td><td>USA (SCCs)</td></tr>
          <tr><td>Cloudinary Inc.</td><td>Photo storage</td><td>USA (SCCs)</td></tr>
          <tr><td>Partner lodges and camps</td><td>Accommodation bookings</td><td>Kenya</td></tr>
          <tr><td>Kenya Wildlife Service</td><td>Park fee payments</td><td>Kenya</td></tr>
          <tr><td>Anthropic (Claude AI)</td><td>AI Safari Planner responses</td><td>USA (SCCs)</td></tr>
          <tr><td>PostHog</td><td>Website analytics (anonymised)</td><td>EU</td></tr>
        </tbody>
      </table>

      <h2>6. How Long We Keep Your Data</h2>
      <table>
        <thead>
          <tr><th>Data Type</th><th>Retention Period</th><th>Reason</th></tr>
        </thead>
        <tbody>
          <tr><td>Booking records</td><td>7 years</td><td>Kenya tax law</td></tr>
          <tr><td>Payment records</td><td>7 years</td><td>KRA compliance</td></tr>
          <tr><td>Email communications</td><td>3 years</td><td>Customer service</td></tr>
          <tr><td>Website analytics</td><td>26 months</td><td>Industry standard</td></tr>
          <tr><td>Marketing consent records</td><td>Until withdrawn + 1 year</td><td>Legal compliance</td></tr>
          <tr><td>Enquiries (not booked)</td><td>2 years</td><td>Business development</td></tr>
        </tbody>
      </table>

      <h2>7. Your Rights</h2>
      <p>Under the Kenya Data Protection Act 2019, you have the right to:</p>
      <ul>
        <li><strong>Access</strong> — request a copy of all personal data we hold about you</li>
        <li><strong>Correction</strong> — request we correct inaccurate data</li>
        <li><strong>Erasure</strong> — request deletion of your data (subject to legal retention requirements)</li>
        <li><strong>Restriction</strong> — request we limit how we use your data</li>
        <li><strong>Portability</strong> — request your data in a machine-readable format</li>
        <li><strong>Object</strong> — object to processing based on legitimate interest</li>
        <li><strong>Withdraw consent</strong> — withdraw marketing consent at any time</li>
      </ul>
      <p>
        To exercise any right, email{" "}
        <a href="mailto:privacy@engaisafaris.com">privacy@engaisafaris.com</a>. We will respond
        within 21 days as required by the Kenya DPA.
      </p>

      <h2>8. Data Security</h2>
      <p>We protect your data using:</p>
      <ul>
        <li>HTTPS encryption on all pages (SSL/TLS)</li>
        <li>PCI DSS compliant payment processing (Pesapal)</li>
        <li>Encrypted database storage (Supabase · AES-256)</li>
        <li>Access controls — only authorised staff can access booking data</li>
        <li>Automatic deletion of data past retention period</li>
      </ul>
      <p>
        In the event of a data breach affecting your rights, we will notify you and the ODPC
        within 72 hours as required by the DPA.
      </p>

      <h2>9. Cookies</h2>
      <table>
        <thead>
          <tr><th>Cookie</th><th>Purpose</th><th>Duration</th></tr>
        </thead>
        <tbody>
          <tr><td>engai-currency</td><td>Remember your currency preference</td><td>1 year</td></tr>
          <tr><td>posthog</td><td>Anonymous website analytics</td><td>1 year</td></tr>
          <tr><td>_ga (Google Analytics)</td><td>Anonymous traffic analysis</td><td>2 years</td></tr>
          <tr><td>Session cookie</td><td>Keep you logged in (admin/agent only)</td><td>Session</td></tr>
        </tbody>
      </table>
      <p>
        You may accept or decline non-essential cookies when you first visit our website. You
        can change your cookie preferences at any time in your browser settings.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        Some of our service providers (Resend, Cloudinary, Anthropic) are based in the United
        States. When we transfer data internationally, we ensure appropriate safeguards are in
        place including Standard Contractual Clauses (SCCs) as recognised under both the Kenya
        DPA and EU GDPR.
      </p>

      <h2>11. Children&apos;s Data</h2>
      <p>
        Our services are not directed at children under 18. We do not knowingly collect personal
        data from children under 18 without verifiable parental consent. If you believe a child
        has provided us with data, please contact{" "}
        <a href="mailto:privacy@engaisafaris.com">privacy@engaisafaris.com</a> immediately.
      </p>

      <h2>12. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of significant
        changes by email (if you are a client) or by posting a notice on our website. The
        &ldquo;Last Updated&rdquo; date at the top of this page indicates when changes were last made.
      </p>

      <h2>13. Complaints to the Regulator</h2>
      <p>
        If you are unhappy with how we have handled your data, you have the right to lodge a
        complaint with:
      </p>
      <p>
        <strong>Office of the Data Protection Commissioner (ODPC)</strong><br />
        Website: <a href="https://odpc.go.ke" target="_blank" rel="noopener noreferrer">odpc.go.ke</a><br />
        Email: <a href="mailto:info@odpc.go.ke">info@odpc.go.ke</a><br />
        P.O. Box 30274-00100, Nairobi, Kenya
      </p>
      <p>
        EU/UK residents may also contact their local data protection authority (e.g. ICO in the
        UK, or your national DPA in the EU).
      </p>

      <h2>14. Contact</h2>
      <p>
        <strong>Engai Safaris Limited — Data Controller</strong><br />
        Lake Naivasha, Nakuru County, Kenya<br />
        <a href="mailto:privacy@engaisafaris.com">privacy@engaisafaris.com</a>
      </p>

      <p className="text-sm text-gray-400 mt-12 border-t pt-6">
        ⚠️ These documents are a strong legal foundation but should be reviewed by a
        Kenya-qualified lawyer before going live. Recommended: WKA Advocates (wka.co.ke).
      </p>
    </div>
  );
}
