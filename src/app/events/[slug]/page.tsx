import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AlertTriangle, Phone } from "lucide-react";
import { eventServices } from "@/data/events";
import { getEventServiceBySlug } from "@/services/events";
import { EventServiceCard } from "@/components/events/EventServiceCard";
import { Button } from "@/components/ui/Button";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return eventServices.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventServiceBySlug(params.slug);
  if (!event) return { title: "Event Service Not Found" };
  return { title: event.name, description: event.description };
}

export default async function EventServicePage({ params }: Props) {
  const event = await getEventServiceBySlug(params.slug);
  if (!event) notFound();

  return (
    <div>
      <div className="relative h-64 w-full overflow-hidden sm:h-80">
        <Image src={event.image} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-8 text-white sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{event.name}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <p className="text-base text-gray-600">{event.description}</p>

        {event.eligibilityNotice && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-sunny-200 bg-sunny-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-sunny-600" />
            <p className="text-sm text-gray-700">{event.eligibilityNotice}</p>
          </div>
        )}

        <h2 className="mt-10 font-display text-lg font-bold text-gray-900">Available Services</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {event.servicesOffered.map((service) => (
            <EventServiceCard key={service} label={service} />
          ))}
        </div>

        <h2 className="mt-10 font-display text-lg font-bold text-gray-900">Gallery</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {event.gallery.map((image) => (
            <div key={image} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
              <Image src={image} alt="" fill sizes="(min-width: 640px) 33vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border border-gray-100 bg-gray-50 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-base font-bold text-gray-900">
              {event.requiresQuote ? "Every event is unique — let's talk details." : "Ready to get started?"}
            </p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <Phone className="h-4 w-4" /> Contact Our Events Team
            </p>
          </div>
          <Link href={`/events/request?service=${event.slug}`}>
            <Button size="lg">Request a Quote</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
