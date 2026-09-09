import { EventService } from "@/types";

// Local mock event-services catalog. No admin overlay for this file today —
// see services/events.ts for why (spec's admin section doesn't call out an
// events manager, so this stays seeded config edited directly here).

export const eventServices: EventService[] = [
  {
    id: "evt-birthday",
    slug: "birthday",
    name: "Birthday Events",
    description:
      "From first birthdays to milestone celebrations, our team helps you plan a party the whole family will remember.",
    image: "https://picsum.photos/seed/event-birthday/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-birthday-1/800/600",
      "https://picsum.photos/seed/event-birthday-2/800/600",
      "https://picsum.photos/seed/event-birthday-3/800/600",
    ],
    servicesOffered: ["Themed decor & setup", "Party favors & gift bags", "Entertainment coordination", "Cake table styling"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-weddings",
    slug: "weddings",
    name: "Weddings",
    description: "Elegant styling and thoughtful touches for the celebration of a lifetime.",
    image: "https://picsum.photos/seed/event-weddings/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-weddings-1/800/600",
      "https://picsum.photos/seed/event-weddings-2/800/600",
      "https://picsum.photos/seed/event-weddings-3/800/600",
    ],
    servicesOffered: ["Guest favor gifting", "Ceremony & reception decor", "Custom gift registries", "Day-of coordination support"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-corporate",
    slug: "corporate",
    name: "Corporate Events",
    description: "Client gifting, team celebrations, and branded event experiences.",
    image: "https://picsum.photos/seed/event-corporate/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-corporate-1/800/600",
      "https://picsum.photos/seed/event-corporate-2/800/600",
    ],
    servicesOffered: ["Bulk corporate gifting", "Branded gift wrapping", "Employee appreciation events", "Holiday party planning"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-school",
    slug: "school",
    name: "School Events",
    description: "Fun, safe, and organized events for classrooms, fairs, and school celebrations.",
    image: "https://picsum.photos/seed/event-school/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-school-1/800/600",
      "https://picsum.photos/seed/event-school-2/800/600",
    ],
    servicesOffered: ["Classroom party kits", "Book fair & carnival prizes", "Graduation celebrations", "Teacher appreciation gifts"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-holiday",
    slug: "holiday",
    name: "Holiday Celebrations",
    description: "Seasonal decor, gifting, and party planning for every holiday on the calendar.",
    image: "https://picsum.photos/seed/event-holiday/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-holiday-1/800/600",
      "https://picsum.photos/seed/event-holiday-2/800/600",
    ],
    servicesOffered: ["Seasonal decor packages", "Family gift coordination", "Themed party supplies", "Custom gift bundles"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-new-year",
    slug: "new-year",
    name: "New Year Celebrations",
    description: "Ring in the new year with a celebration styled from top to bottom.",
    image: "https://picsum.photos/seed/event-new-year/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-new-year-1/800/600",
      "https://picsum.photos/seed/event-new-year-2/800/600",
    ],
    servicesOffered: ["Countdown party decor", "Party favor bundles", "Family activity stations", "Custom gifting"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-special-occasions",
    slug: "special-occasions",
    name: "Special Occasions",
    description: "Anniversaries, reunions, baby showers, and every other reason to celebrate.",
    image: "https://picsum.photos/seed/event-special/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-special-1/800/600",
      "https://picsum.photos/seed/event-special-2/800/600",
    ],
    servicesOffered: ["Custom decor consultation", "Gift table styling", "Personalized gifting", "Event-day support"],
    requiresQuote: true,
    active: true,
  },
  {
    id: "evt-fireworks",
    slug: "fireworks-effects",
    name: "Fireworks & Special Effects",
    description:
      "Professionally coordinated fireworks and special-effects displays for eligible venues and events. Our events team handles every detail — from permits to placement — with a licensed provider network.",
    image: "https://picsum.photos/seed/event-fireworks/1200/800",
    gallery: [
      "https://picsum.photos/seed/event-fireworks-1/800/600",
      "https://picsum.photos/seed/event-fireworks-2/800/600",
    ],
    servicesOffered: [
      "Licensed pyrotechnic display coordination",
      "Low-noise & indoor-safe special effects options",
      "Permit & venue-compliance handling",
      "On-site licensed operator staffing",
    ],
    requiresQuote: true,
    eligibilityNotice:
      "Fireworks and special-effects services are subject to local permitting, venue approval, and jurisdiction-specific eligibility requirements, and are performed only by licensed, insured operators. Availability varies by location. Submit an inquiry and our events team will confirm what's possible for your venue and date — we do not sell fireworks or effects equipment for self-use.",
    active: true,
  },
];
