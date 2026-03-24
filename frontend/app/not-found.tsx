import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#0F1C17] flex items-center justify-center overflow-hidden px-4">
      {/* Background acacia silhouette SVG */}
      <div className="absolute inset-0 flex items-end justify-center opacity-10 pointer-events-none select-none">
        <svg
          viewBox="0 0 1200 600"
          className="w-full max-w-4xl"
          fill="#1B7A60"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Ground */}
          <rect x="0" y="540" width="1200" height="60" />

          {/* Left acacia tree */}
          <rect x="130" y="320" width="18" height="220" />
          {/* Left canopy layers */}
          <ellipse cx="139" cy="310" rx="90" ry="22" />
          <ellipse cx="100" cy="290" rx="65" ry="18" />
          <ellipse cx="178" cy="288" rx="60" ry="16" />
          <ellipse cx="139" cy="270" rx="75" ry="20" />

          {/* Center large acacia */}
          <rect x="588" y="220" width="24" height="320" />
          {/* Center canopy */}
          <ellipse cx="600" cy="208" rx="130" ry="30" />
          <ellipse cx="530" cy="182" rx="90" ry="22" />
          <ellipse cx="670" cy="178" rx="85" ry="20" />
          <ellipse cx="600" cy="158" rx="110" ry="26" />
          <ellipse cx="555" cy="138" rx="70" ry="18" />
          <ellipse cx="648" cy="135" rx="65" ry="17" />

          {/* Right acacia tree */}
          <rect x="1040" y="360" width="16" height="180" />
          {/* Right canopy */}
          <ellipse cx="1048" cy="350" rx="80" ry="20" />
          <ellipse cx="1010" cy="330" rx="58" ry="16" />
          <ellipse cx="1086" cy="328" rx="55" ry="15" />
          <ellipse cx="1048" cy="312" rx="68" ry="18" />

          {/* Distant small tree */}
          <rect x="320" y="430" width="10" height="110" />
          <ellipse cx="325" cy="422" rx="45" ry="12" />
          <ellipse cx="305" cy="410" rx="32" ry="10" />
          <ellipse cx="345" cy="408" rx="30" ry="9" />

          {/* Another distant tree */}
          <rect x="870" y="410" width="10" height="130" />
          <ellipse cx="875" cy="402" rx="48" ry="13" />
          <ellipse cx="852" cy="388" rx="34" ry="10" />
          <ellipse cx="898" cy="386" rx="32" ry="9" />

          {/* Small bush shapes */}
          <ellipse cx="250" cy="536" rx="40" ry="12" />
          <ellipse cx="450" cy="539" rx="30" ry="9" />
          <ellipse cx="750" cy="537" rx="35" ry="10" />
          <ellipse cx="950" cy="538" rx="28" ry="8" />
        </svg>
      </div>

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C17] via-transparent to-[#0F1C17]/80 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 */}
        <div className="font-display font-bold text-[#1B7A60] leading-none mb-6 select-none"
          style={{ fontSize: "clamp(8rem, 20vw, 14rem)" }}>
          404
        </div>

        {/* Headline */}
        <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Lost in the savanna?
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-10 max-w-lg mx-auto">
          The page you&apos;re looking for has wandered off. Let&apos;s get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/safaris"
            className="inline-flex items-center justify-center gap-2 bg-[#1B7A60] hover:bg-[#156650] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z" />
            </svg>
            Browse Safaris
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 hover:bg-white/5 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-sm"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Footer hint */}
        <p className="mt-12 text-gray-600 text-sm">
          Or{" "}
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`}
            className="text-[#1B7A60] hover:text-[#25a07a] underline underline-offset-2 transition-colors"
          >
            WhatsApp us
          </a>
          {" "}— we&apos;re online.
        </p>
      </div>
    </div>
  );
}
