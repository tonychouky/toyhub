import type { Metadata } from "next";
import { getEventServices, getEventServiceBySlug } from "@/services/events";
import { EventRequestForm } from "@/components/events/EventRequestForm";
import { SectionHeading } from "@/components/home/CategoryGrid";

export const metadata: Metadata = { title: "Request a Quote" };

interface Props {
  searchParams: { service?: string };
}

export default async function EventRequestPage({ searchParams }: Props) {
  const services = await getEventServices();
  const preselected = searchParams.service ? await getEventServiceBySlug(searchParams.service) : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Events" title="Request a Quote" />
      <p className="mt-2 text-sm text-gray-500">
        Tell us about your event and our team will follow up with availability and pricing.
      </p>
      <div className="mt-8">
        <EventRequestForm services={services} defaultServiceName={preselected?.name} />
      </div>
    </div>
  );
}
