import Link from "next/link";
import { MapPin } from "lucide-react";
import { LOCATIONS } from "@/lib/constants";

export function LocationStrip() {
  return (
    <section className="py-16 bg-bone/30 border-t border-bone/40">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-champagne" />
            <span className="font-sans text-label-sm uppercase tracking-[0.2em] text-smoke">
              Proudly Serving
            </span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {LOCATIONS.map((loc) => (
            <Link
              key={loc.slug}
              href={`/locations/${loc.slug}`}
              className="font-sans text-body-sm text-charcoal/70 hover:text-rosewood transition-colors px-4 py-2 border border-bone/60 hover:border-dusty-rose/40 bg-cream"
            >
              {loc.city}
            </Link>
          ))}
          <span className="font-sans text-body-sm text-charcoal/40 px-4 py-2">
            & surrounding GTA
          </span>
        </div>
      </div>
    </section>
  );
}
