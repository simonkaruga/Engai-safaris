/**
 * Official-style SVG payment method logos.
 * Use <PaymentLogos /> to render all three inline.
 */

export function MPesaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 28" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="M-Pesa">
      {/* Green pill background */}
      <rect width="80" height="28" rx="5" fill="#00A651" />
      {/* M */}
      <text
        x="8" y="21"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontSize="17"
        fill="white"
        letterSpacing="-0.5"
      >M</text>
      {/* dash */}
      <rect x="23" y="12" width="4" height="2.5" rx="1" fill="white" />
      {/* PESA */}
      <text
        x="30" y="21"
        fontFamily="Arial, sans-serif"
        fontWeight="700"
        fontSize="13"
        fill="white"
        letterSpacing="0.5"
      >PESA</text>
    </svg>
  );
}

export function VisaLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 28" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Visa">
      <rect width="60" height="28" rx="5" fill="#1A1F71" />
      <text
        x="50%" y="20"
        fontFamily="Arial, sans-serif"
        fontWeight="900"
        fontStyle="italic"
        fontSize="17"
        fill="white"
        textAnchor="middle"
        letterSpacing="1"
      >VISA</text>
    </svg>
  );
}

export function MastercardLogo({ className = "h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Mastercard">
      <rect width="50" height="32" rx="5" fill="#252525" />
      {/* Red circle */}
      <circle cx="19" cy="16" r="9" fill="#EB001B" />
      {/* Yellow circle */}
      <circle cx="31" cy="16" r="9" fill="#F79E1B" />
      {/* Overlap — orange blend */}
      <path
        d="M25 8.8a9 9 0 010 14.4A9 9 0 0125 8.8z"
        fill="#FF5F00"
      />
    </svg>
  );
}

/** Renders all three logos in a row */
export default function PaymentLogos({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <MPesaLogo className="h-6" />
      <VisaLogo className="h-6" />
      <MastercardLogo className="h-6" />
    </div>
  );
}
