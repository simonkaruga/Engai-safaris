import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kenya Wildlife Calendar — What to See Every Month",
  description: "Month-by-month guide to Kenya's wildlife. When to see the Great Migration, lion cubs, whale sharks, flamingos, and every park at its best.",
  alternates: { canonical: "https://www.engaisafaris.com/wildlife-calendar" },
};

const MONTHS = [
  {
    month: "January",
    season: "Dry",
    highlight: "Calving season in the Mara — thousands of wildebeest calves born",
    parks: ["Masai Mara", "Amboseli"],
    wildlife: ["Wildebeest calves", "Elephants near Kilimanjaro", "Lion cubs", "Cheetah with young"],
    tip: "Amboseli has perfect Kilimanjaro views in January's clear skies.",
    crowd: "Low",
    rain: "Minimal",
  },
  {
    month: "February",
    season: "Dry",
    highlight: "Peak dry season — best game viewing before the long rains",
    parks: ["Masai Mara", "Samburu", "Laikipia"],
    wildlife: ["Lion prides", "Reticulated giraffe (Samburu)", "Grevy's zebra", "Elephants"],
    tip: "Samburu's unique northern species — Grevy's zebra, reticulated giraffe — are at their most visible.",
    crowd: "Low–Medium",
    rain: "None",
  },
  {
    month: "March",
    season: "Shoulder",
    highlight: "Last chance before long rains — good prices, low crowds",
    parks: ["Tsavo", "Amboseli", "Lake Naivasha"],
    wildlife: ["Elephants", "Buffalo herds", "Hippos at Naivasha", "Colobus monkeys"],
    tip: "Tsavo East's red elephants are spectacular — cheaper rates, fewer tourists.",
    crowd: "Low",
    rain: "Starting",
  },
  {
    month: "April",
    season: "Long Rains",
    highlight: "Landscape turns brilliant green — good for birdwatching",
    parks: ["Naivasha", "Nakuru", "Aberdares"],
    wildlife: ["Flamingos at Nakuru", "Migratory birds", "Waterfowl", "Leopards in Aberdares"],
    tip: "April rains mean dramatic skies and lush scenery — great for photography despite wet conditions.",
    crowd: "Very Low",
    rain: "Heavy",
  },
  {
    month: "May",
    season: "Long Rains",
    highlight: "Long rains peak — off-season rates at their lowest",
    parks: ["Aberdares", "Mt Kenya"],
    wildlife: ["Forest species", "Colobus monkeys", "Bongo (rare)", "Mountain birds"],
    tip: "Mt Kenya trekking is quiet and lush. Best lodge rates of the year.",
    crowd: "Very Low",
    rain: "Heavy",
  },
  {
    month: "June",
    season: "Cool Dry",
    highlight: "Migration begins — wildebeest moving north from Tanzania",
    parks: ["Masai Mara", "Serengeti border"],
    wildlife: ["Wildebeest herds building", "Zebra", "Gazelle", "Lions hunting"],
    tip: "The Mara is less crowded than peak months. Book now — this is when the drama starts.",
    crowd: "Medium",
    rain: "Low",
  },
  {
    month: "July",
    season: "Peak",
    highlight: "Great Migration river crossings BEGIN — crocodiles, lions, chaos",
    parks: ["Masai Mara"],
    wildlife: ["Wildebeest river crossings", "Nile crocodile", "Hippos", "Big cats hunting"],
    tip: "This is the month most people come for. Book 6–9 months ahead for July camps.",
    crowd: "High",
    rain: "None",
  },
  {
    month: "August",
    season: "Peak",
    highlight: "Peak river crossings — over 1.5 million wildebeest in the Mara",
    parks: ["Masai Mara"],
    wildlife: ["Wildebeest crossings daily", "Lion prides", "Cheetah", "Leopard"],
    tip: "The single best month for river crossings. Most expensive and most crowded.",
    crowd: "Very High",
    rain: "None",
  },
  {
    month: "September",
    season: "Peak",
    highlight: "Migration continues — wildebeest still crossing, big cat action",
    parks: ["Masai Mara", "Amboseli"],
    wildlife: ["River crossings winding down", "Big cats", "Elephant families", "Cheetah cubs"],
    tip: "Better value than August, same wildlife. Often our favourite month.",
    crowd: "High",
    rain: "Minimal",
  },
  {
    month: "October",
    season: "Shoulder",
    highlight: "Migration exits south — Amboseli elephant herds at peak",
    parks: ["Amboseli", "Tsavo", "Laikipia"],
    wildlife: ["Large elephant herds", "Buffalo", "Whale sharks (Diani coast)", "Migratory birds arriving"],
    tip: "Whale sharks at Diani Beach in October — combine with a Tsavo safari.",
    crowd: "Medium",
    rain: "Short Rains Starting",
  },
  {
    month: "November",
    season: "Short Rains",
    highlight: "Short rains — green landscapes, baby animals, empty parks",
    parks: ["Masai Mara", "Nakuru", "Naivasha"],
    wildlife: ["Baby animals — many species calve now", "Flamingos", "Migratory birds peak", "Elephants"],
    tip: "November has the most migratory birds of any month — ideal for birding safaris.",
    crowd: "Low",
    rain: "Moderate",
  },
  {
    month: "December",
    season: "Dry",
    highlight: "Festive season — Mara and Amboseli at their festive best",
    parks: ["Masai Mara", "Amboseli", "Diani"],
    wildlife: ["Big cats", "Elephant families", "Flamingos", "Whale sharks (last chance)"],
    tip: "Book early — Christmas and New Year weeks sell out a year in advance.",
    crowd: "High (Dec 20–Jan 2)",
    rain: "Low",
  },
];

const crowdColor: Record<string, string> = {
  "Very Low": "text-green-600",
  "Low": "text-green-500",
  "Low–Medium": "text-yellow-500",
  "Medium": "text-yellow-500",
  "High": "text-orange-500",
  "Very High": "text-red-500",
  "High (Dec 20–Jan 2)": "text-orange-500",
};

export default function WildlifeCalendarPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-teal-50 via-white to-stone-50 py-20 px-4 text-center">
        <p className="eyebrow text-teal-DEFAULT mb-4">Wildlife Calendar</p>
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Kenya Wildlife:<br />
          <span className="text-teal-DEFAULT">Month by Month</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Every month in Kenya is different. This is our honest guide to what you'll see, when crowds peak, and which parks deliver — written by our guides.
        </p>
      </section>

      {/* Quick summary bar */}
      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-3 md:grid-cols-6 gap-4">
          {["Jul", "Aug", "Sep"].map((m) => (
            <div key={m} className="text-center">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-1">
                <span className="text-orange-600 text-xs font-bold">★</span>
              </div>
              <p className="text-xs font-semibold text-gray-700">{m}</p>
              <p className="text-[10px] text-gray-400">Migration</p>
            </div>
          ))}
          {["Jan", "Feb", "Oct"].map((m) => (
            <div key={m} className="text-center">
              <div className="w-8 h-8 rounded-full bg-teal-50 flex items-center justify-center mx-auto mb-1">
                <span className="text-teal-DEFAULT text-xs font-bold">✓</span>
              </div>
              <p className="text-xs font-semibold text-gray-700">{m}</p>
              <p className="text-[10px] text-gray-400">Great value</p>
            </div>
          ))}
        </div>
      </section>

      {/* Month cards */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MONTHS.map((m, i) => (
            <div key={m.month} className="border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow bg-white">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">{m.season}</span>
                  <h2 className="font-display text-2xl font-bold text-gray-900">{m.month}</h2>
                </div>
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">{i + 1}</span>
              </div>

              <p className="text-sm text-gray-700 font-medium mb-4 leading-relaxed">{m.highlight}</p>

              <div className="mb-4">
                <p className="text-[10px] uppercase font-semibold text-gray-400 mb-1">Best parks</p>
                <div className="flex flex-wrap gap-1">
                  {m.parks.map((p) => (
                    <span key={p} className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">{p}</span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <p className="text-[10px] uppercase font-semibold text-gray-400 mb-1">Wildlife highlights</p>
                <ul className="text-xs text-gray-600 space-y-0.5">
                  {m.wildlife.slice(0, 3).map((w) => (
                    <li key={w} className="flex items-center gap-1.5">
                      <span className="text-teal-400">›</span> {w}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-xs text-teal-700 bg-teal-50 rounded-lg px-3 py-2 leading-relaxed mb-3">
                💡 {m.tip}
              </p>

              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Crowds: <span className={crowdColor[m.crowd] ?? "text-gray-600"}>{m.crowd}</span></span>
                <span>Rain: {m.rain}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-700 text-white py-16 px-4 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
          Ready to plan around your dates?
        </h2>
        <p className="text-teal-100 mb-8 max-w-xl mx-auto">
          Tell our AI planner when you want to go and it'll suggest the best parks and safaris for your dates.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/ai-planner" className="bg-white text-teal-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-50 transition-colors">
            Use the AI Planner
          </Link>
          <Link href="/safaris" className="border border-teal-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-teal-600 transition-colors">
            Browse All Safaris
          </Link>
        </div>
      </section>
    </div>
  );
}
