import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display font-bold text-xl text-white mb-2">Engai Safaris</p>
            <p className="text-sm text-gray-400 mb-4">
              En-KAI · Supreme Sky God of the Maasai<br />
              Where the Sky Meets the Wild
            </p>
            <p className="text-xs text-gray-500">Kenya-owned · TRA Licensed · GDPR Compliant</p>
          </div>

          {/* Safaris */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm">Safaris</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Classic Safaris", "/safaris?category=classic"],
                ["Luxury Safaris", "/safaris?category=luxury"],
                ["Photography Safaris", "/safaris?category=photography"],
                ["Cultural Safaris", "/safaris?category=cultural"],
                ["Corporate Safaris", "/safaris?category=corporate"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm">Destinations</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Masai Mara", "/destinations/masai-mara"],
                ["Amboseli", "/destinations/amboseli"],
                ["Lake Naivasha", "/destinations/lake-naivasha"],
                ["Samburu", "/destinations/samburu"],
                ["All Destinations", "/destinations"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="font-semibold text-white mb-4 text-sm">Company</p>
            <ul className="space-y-2 text-sm">
              {[
                ["About Us", "/about"],
                ["Our Guides", "/guides"],
                ["Reviews", "/reviews"],
                ["Blog", "/blog"],
                ["FAQ", "/faq"],
                ["Contact", "/contact"],
                ["Agent Portal", "/agent/login"],
                ["Privacy Policy", "/privacy-policy"],
                ["Terms & Conditions", "/terms-conditions"],
              ].map(([label, href]) => (
                <li key={href}><Link href={href} className="hover:text-white transition-colors">{label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Engai Safaris Ltd. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="https://instagram.com/engaisafaris" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://tiktok.com/@engaisafaris" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a>
            <a href="https://youtube.com/@engaisafaris" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
