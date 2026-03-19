export default function WhatsAppButton() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP ?? "254XXXXXXXXX";
  return (
    <a
      href={`https://wa.me/${phone}?text=Hi%20Engai%20Safaris!%20I%27d%20like%20to%20enquire%20about%20a%20safari.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl transition-colors"
      aria-label="Chat on WhatsApp"
    >
      💬
    </a>
  );
}
