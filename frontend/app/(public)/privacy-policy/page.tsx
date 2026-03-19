import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-16 prose prose-lg">
      <h1 className="font-display text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-gray-500 text-sm mb-8">Last updated: January 2026</p>

      <h2>1. Who We Are</h2>
      <p>Engai Safaris Ltd, registered in Kenya. Contact: privacy@engaisafaris.com</p>

      <h2>2. Data We Collect</h2>
      <ul>
        <li>Name, email, phone number when you submit an enquiry or booking</li>
        <li>Payment data processed by Pesapal (we do not store card numbers)</li>
        <li>Usage data via PostHog analytics (anonymised)</li>
        <li>Cookies for session management and analytics</li>
      </ul>

      <h2>3. How We Use Your Data</h2>
      <ul>
        <li>Processing your safari booking and enquiry</li>
        <li>Sending booking confirmations, itineraries, and reminders via email and SMS</li>
        <li>Improving our service through anonymised analytics</li>
      </ul>

      <h2>4. Third Parties We Share Data With</h2>
      <ul>
        <li><strong>Pesapal</strong> — payment processing</li>
        <li><strong>Africa's Talking</strong> — SMS delivery</li>
        <li><strong>Resend</strong> — transactional email</li>
        <li><strong>Cloudinary</strong> — image hosting</li>
      </ul>

      <h2>5. Your Rights</h2>
      <p>Under the Kenya Data Protection Act 2019 and GDPR (for EU residents), you have the right to access, correct, or delete your personal data. Email privacy@engaisafaris.com to exercise these rights.</p>

      <h2>6. Data Retention</h2>
      <p>Booking data is retained for 7 years for legal and tax purposes. Enquiry data not resulting in a booking is deleted after 2 years.</p>

      <h2>7. Cookies</h2>
      <p>We use essential cookies for session management and optional analytics cookies (PostHog). You can manage cookie preferences via the banner on your first visit.</p>

      <h2>8. Contact</h2>
      <p>privacy@engaisafaris.com · Engai Safaris Ltd · Nairobi, Kenya</p>
    </div>
  );
}
