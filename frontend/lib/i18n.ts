export type Locale = "en" | "de" | "fr" | "it";

export const LOCALES: Record<Locale, { label: string; flag: string }> = {
  en: { label: "English",  flag: "🇬🇧" },
  de: { label: "Deutsch",  flag: "🇩🇪" },
  fr: { label: "Français", flag: "🇫🇷" },
  it: { label: "Italiano", flag: "🇮🇹" },
};

const en = {
  // Nav
  "nav.home":         "Home",
  "nav.safaris":      "Safaris",
  "nav.destinations": "Destinations",
  "nav.guides":       "Guides",
  "nav.reviews":      "Reviews",
  "nav.blog":         "Blog",
  "nav.about":        "About",

  // Header actions
  "header.bookNow":    "Book Now",
  "header.bookSafari": "Book a Safari",
  "header.wildlifeId": "Wildlife ID",
  "header.aiPlanner":  "AI Planner",
  "header.openMenu":   "Open menu",
  "header.closeMenu":  "Close menu",
  "header.language":   "Language",

  // Hero
  "hero.eyebrow":      "En-KAI · Supreme Sky God of the Maasai",
  "hero.badge":        "Kenya's First AI Safari Platform",
  "hero.headline1":    "Where the Sky",
  "hero.headline2":    "Meets the Wild",
  "hero.subtext":      "Elephant herds beneath Kilimanjaro at dawn. Lion prides on the Mara plains. Transparent pricing, instant booking, real Kenyan guides.",
  "hero.browseSafaris":"Browse Safaris",
  "hero.aiPlanner":    "Plan with AI",
  "hero.statRating":   "Avg guest rating",
  "hero.statGuests":   "Safaris completed",
  "hero.statDestinations": "Destinations",
  "hero.scroll":       "Scroll",
  "hero.noFees":       "No hidden fees — ever",

  // Footer
  "footer.tagline":       "En-KAI · Supreme Sky God of the Maasai",
  "footer.taglineQuote":  "\"Where the Sky Meets the Wild\"",
  "footer.badgeOwned":    "Kenya-owned",
  "footer.badgeLicensed": "TRA Licensed",
  "footer.badgeGDPR":     "GDPR Compliant",

  "footer.safaris":           "Safaris",
  "footer.classicSafaris":    "Classic Safaris",
  "footer.luxurySafaris":     "Luxury Safaris",
  "footer.photographySafaris":"Photography Safaris",
  "footer.culturalSafaris":   "Cultural Safaris",
  "footer.corporateSafaris":  "Corporate Safaris",
  "footer.viewAllPackages":   "View All Packages",

  "footer.destinations":      "Destinations",
  "footer.allDestinations":   "All Destinations",

  "footer.company":           "Company",
  "footer.aboutUs":           "About Us",
  "footer.ourGuides":         "Our Guides",
  "footer.guestReviews":      "Guest Reviews",
  "footer.blog":              "Blog",
  "footer.faq":               "FAQ",
  "footer.contact":           "Contact",
  "footer.agentPortal":       "Agent Portal →",

  "footer.legal":             "Legal",
  "footer.terms":             "Terms & Conditions",
  "footer.privacy":           "Privacy Policy",
  "footer.cancellationPolicy":"Cancellation Policy",

  "footer.builtIn":           "Built with ❤ in Nairobi, Kenya",
  "footer.allRights":         "All rights reserved.",

  // Common
  "common.loading":    "Loading...",
  "common.days":       "days",
  "common.person":     "person",
  "common.people":     "people",
  "common.viewAll":    "View all",
  "common.readMore":   "Read more",
  "common.contactUs":  "Contact us",
  "common.perPerson":  "per person",
  "common.from":       "From",
};

const de: typeof en = {
  "nav.home":         "Startseite",
  "nav.safaris":      "Safaris",
  "nav.destinations": "Ziele",
  "nav.guides":       "Guides",
  "nav.reviews":      "Bewertungen",
  "nav.blog":         "Blog",
  "nav.about":        "Über uns",

  "header.bookNow":    "Jetzt buchen",
  "header.bookSafari": "Safari buchen",
  "header.wildlifeId": "Tier-ID",
  "header.aiPlanner":  "KI-Planer",
  "header.openMenu":   "Menü öffnen",
  "header.closeMenu":  "Menü schließen",
  "header.language":   "Sprache",

  "hero.eyebrow":      "En-KAI · Höchster Himmelsgott der Maasai",
  "hero.badge":        "Kenias erste KI-gestützte Safari-Plattform",
  "hero.headline1":    "Wo der Himmel",
  "hero.headline2":    "die Wildnis trifft",
  "hero.subtext":      "Elefantenherden unter dem Kilimandscharo im Morgengrauen. Löwenrudel in den Mara-Ebenen. Transparente Preise, Sofortbuchung, echte kenianische Guides.",
  "hero.browseSafaris":"Safaris entdecken",
  "hero.aiPlanner":    "Mit KI planen",
  "hero.statRating":   "Ø Gästebewertung",
  "hero.statGuests":   "Safaris abgeschlossen",
  "hero.statDestinations": "Reiseziele",
  "hero.scroll":       "Scrollen",
  "hero.noFees":       "Keine versteckten Gebühren — garantiert",

  "footer.tagline":       "En-KAI · Höchster Himmelsgott der Maasai",
  "footer.taglineQuote":  "\"Wo der Himmel die Wildnis trifft\"",
  "footer.badgeOwned":    "Kenianisch",
  "footer.badgeLicensed": "TRA Lizenziert",
  "footer.badgeGDPR":     "DSGVO Konform",

  "footer.safaris":           "Safaris",
  "footer.classicSafaris":    "Klassische Safaris",
  "footer.luxurySafaris":     "Luxus-Safaris",
  "footer.photographySafaris":"Foto-Safaris",
  "footer.culturalSafaris":   "Kultur-Safaris",
  "footer.corporateSafaris":  "Firmen-Safaris",
  "footer.viewAllPackages":   "Alle Pakete anzeigen",

  "footer.destinations":      "Reiseziele",
  "footer.allDestinations":   "Alle Reiseziele",

  "footer.company":           "Unternehmen",
  "footer.aboutUs":           "Über uns",
  "footer.ourGuides":         "Unsere Guides",
  "footer.guestReviews":      "Gästebewertungen",
  "footer.blog":              "Blog",
  "footer.faq":               "FAQ",
  "footer.contact":           "Kontakt",
  "footer.agentPortal":       "Reisebüro-Portal →",

  "footer.legal":             "Rechtliches",
  "footer.terms":             "AGB",
  "footer.privacy":           "Datenschutz",
  "footer.cancellationPolicy":"Stornierungsbedingungen",

  "footer.builtIn":           "Mit ❤ in Nairobi, Kenia gebaut",
  "footer.allRights":         "Alle Rechte vorbehalten.",

  "common.loading":    "Laden...",
  "common.days":       "Tage",
  "common.person":     "Person",
  "common.people":     "Personen",
  "common.viewAll":    "Alle anzeigen",
  "common.readMore":   "Mehr lesen",
  "common.contactUs":  "Kontaktieren Sie uns",
  "common.perPerson":  "pro Person",
  "common.from":       "Ab",
};

const fr: typeof en = {
  "nav.home":         "Accueil",
  "nav.safaris":      "Safaris",
  "nav.destinations": "Destinations",
  "nav.guides":       "Guides",
  "nav.reviews":      "Avis",
  "nav.blog":         "Blog",
  "nav.about":        "À propos",

  "header.bookNow":    "Réserver",
  "header.bookSafari": "Réserver un safari",
  "header.wildlifeId": "ID Faune",
  "header.aiPlanner":  "Planif. IA",
  "header.openMenu":   "Ouvrir le menu",
  "header.closeMenu":  "Fermer le menu",
  "header.language":   "Langue",

  "hero.eyebrow":      "En-KAI · Dieu suprême du ciel Maasai",
  "hero.badge":        "La première plateforme safari IA du Kenya",
  "hero.headline1":    "Là où le ciel",
  "hero.headline2":    "rencontre le sauvage",
  "hero.subtext":      "Des troupeaux d'éléphants sous le Kilimandjaro à l'aube. Des lions sur les plaines du Mara. Prix transparents, réservation instantanée, vrais guides kényans.",
  "hero.browseSafaris":"Voir les safaris",
  "hero.aiPlanner":    "Planifier avec l'IA",
  "hero.statRating":   "Note moyenne",
  "hero.statGuests":   "Safaris réalisés",
  "hero.statDestinations": "Destinations",
  "hero.scroll":       "Défiler",
  "hero.noFees":       "Aucuns frais cachés — jamais",

  "footer.tagline":       "En-KAI · Dieu suprême du ciel Maasai",
  "footer.taglineQuote":  "\"Là où le ciel rencontre le sauvage\"",
  "footer.badgeOwned":    "Entreprise kényane",
  "footer.badgeLicensed": "Certifié TRA",
  "footer.badgeGDPR":     "Conforme RGPD",

  "footer.safaris":           "Safaris",
  "footer.classicSafaris":    "Safaris classiques",
  "footer.luxurySafaris":     "Safaris de luxe",
  "footer.photographySafaris":"Safaris photo",
  "footer.culturalSafaris":   "Safaris culturels",
  "footer.corporateSafaris":  "Safaris entreprise",
  "footer.viewAllPackages":   "Voir tous les forfaits",

  "footer.destinations":      "Destinations",
  "footer.allDestinations":   "Toutes les destinations",

  "footer.company":           "Société",
  "footer.aboutUs":           "À propos",
  "footer.ourGuides":         "Nos guides",
  "footer.guestReviews":      "Avis clients",
  "footer.blog":              "Blog",
  "footer.faq":               "FAQ",
  "footer.contact":           "Contact",
  "footer.agentPortal":       "Portail agences →",

  "footer.legal":             "Mentions légales",
  "footer.terms":             "CGV",
  "footer.privacy":           "Politique de confidentialité",
  "footer.cancellationPolicy":"Politique d'annulation",

  "footer.builtIn":           "Fait avec ❤ à Nairobi, Kenya",
  "footer.allRights":         "Tous droits réservés.",

  "common.loading":    "Chargement...",
  "common.days":       "jours",
  "common.person":     "personne",
  "common.people":     "personnes",
  "common.viewAll":    "Voir tout",
  "common.readMore":   "Lire plus",
  "common.contactUs":  "Nous contacter",
  "common.perPerson":  "par personne",
  "common.from":       "À partir de",
};

const it: typeof en = {
  "nav.home":         "Home",
  "nav.safaris":      "Safari",
  "nav.destinations": "Destinazioni",
  "nav.guides":       "Guide",
  "nav.reviews":      "Recensioni",
  "nav.blog":         "Blog",
  "nav.about":        "Chi siamo",

  "header.bookNow":    "Prenota ora",
  "header.bookSafari": "Prenota un safari",
  "header.wildlifeId": "ID Fauna",
  "header.aiPlanner":  "Pianif. IA",
  "header.openMenu":   "Apri menu",
  "header.closeMenu":  "Chiudi menu",
  "header.language":   "Lingua",

  "hero.eyebrow":      "En-KAI · Dio supremo del cielo dei Maasai",
  "hero.badge":        "La prima piattaforma safari AI del Kenya",
  "hero.headline1":    "Dove il cielo",
  "hero.headline2":    "incontra la natura",
  "hero.subtext":      "Mandrie di elefanti sotto il Kilimangiaro all'alba. Leoni nelle pianure del Mara. Prezzi trasparenti, prenotazione istantanea, guide keniote vere.",
  "hero.browseSafaris":"Esplora i safari",
  "hero.aiPlanner":    "Pianifica con IA",
  "hero.statRating":   "Valutazione media",
  "hero.statGuests":   "Safari completati",
  "hero.statDestinations": "Destinazioni",
  "hero.scroll":       "Scorri",
  "hero.noFees":       "Nessuna commissione nascosta — mai",

  "footer.tagline":       "En-KAI · Dio supremo del cielo dei Maasai",
  "footer.taglineQuote":  "\"Dove il cielo incontra la natura\"",
  "footer.badgeOwned":    "Azienda keniota",
  "footer.badgeLicensed": "Licenza TRA",
  "footer.badgeGDPR":     "Conforme GDPR",

  "footer.safaris":           "Safari",
  "footer.classicSafaris":    "Safari classici",
  "footer.luxurySafaris":     "Safari di lusso",
  "footer.photographySafaris":"Safari fotografici",
  "footer.culturalSafaris":   "Safari culturali",
  "footer.corporateSafaris":  "Safari aziendali",
  "footer.viewAllPackages":   "Vedi tutti i pacchetti",

  "footer.destinations":      "Destinazioni",
  "footer.allDestinations":   "Tutte le destinazioni",

  "footer.company":           "Azienda",
  "footer.aboutUs":           "Chi siamo",
  "footer.ourGuides":         "Le nostre guide",
  "footer.guestReviews":      "Recensioni ospiti",
  "footer.blog":              "Blog",
  "footer.faq":               "FAQ",
  "footer.contact":           "Contatti",
  "footer.agentPortal":       "Portale agenzie →",

  "footer.legal":             "Note legali",
  "footer.terms":             "Termini e condizioni",
  "footer.privacy":           "Privacy policy",
  "footer.cancellationPolicy":"Politica di cancellazione",

  "footer.builtIn":           "Fatto con ❤ a Nairobi, Kenya",
  "footer.allRights":         "Tutti i diritti riservati.",

  "common.loading":    "Caricamento...",
  "common.days":       "giorni",
  "common.person":     "persona",
  "common.people":     "persone",
  "common.viewAll":    "Vedi tutto",
  "common.readMore":   "Leggi di più",
  "common.contactUs":  "Contattaci",
  "common.perPerson":  "a persona",
  "common.from":       "Da",
};

export type TranslationKey = keyof typeof en;

const TRANSLATIONS: Record<Locale, typeof en> = { en, de, fr, it };

export function t(locale: Locale, key: TranslationKey): string {
  return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.en[key] ?? key;
}
