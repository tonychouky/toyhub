import type { Metadata } from "next";
import { getEventServices } from "@/services/events";
import { EventCard } from "@/components/events/EventCard";
import { SectionHeading } from "@/components/home/CategoryGrid";

export const metadata: Metadata = {
  title: "Events",
  description: "Event planning and celebration services — birthdays, weddings, corporate events, and more.",
};

export default async function EventsPage() {
  const events = await getEventServices();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Celebrate with us" title="Event Services" />
      <p className="mt-2 max-w-2xl text-sm text-gray-500">
        Beyond the gift — our events team helps plan and style celebrations of every kind. Browse a
        category to see what&apos;s available and request a quote.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
