import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { EventService } from "@/types";

export function EventCard({ event }: { event: EventService }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-card transition-shadow hover:shadow-card-hover"
    >
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={event.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <h3 className="font-display text-base font-bold text-gray-900">{event.name}</h3>
        <p className="line-clamp-2 text-sm text-gray-500">{event.description}</p>
        <span className="mt-2 flex items-center gap-1 text-sm font-semibold text-brand-600">
          Learn more <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </div>
    </Link>
  );
}
