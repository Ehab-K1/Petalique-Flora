import { Truck, Star, Shield, RefreshCw, Phone } from "lucide-react";

const TRUST_ITEMS = [
  {
    icon: Star,
    label: "5.0 Google Rating",
    sub: "200+ verified reviews",
  },
  {
    icon: Truck,
    label: "GTA Delivery",
    sub: "Same-day available",
  },
  {
    icon: Shield,
    label: "Premium Quality",
    sub: "100% satisfaction guarantee",
  },
  {
    icon: RefreshCw,
    label: "Easy Returns",
    sub: "Within 48 hours",
  },
  {
    icon: Phone,
    label: "Expert Consultation",
    sub: "Free design advice",
  },
];

export function TrustBar() {
  return (
    <div className="bg-ivory border-y border-bone/40">
      <div className="max-w-9xl mx-auto px-6 lg:px-12">
        <div className="flex overflow-x-auto scrollbar-hide">
          {TRUST_ITEMS.map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3 py-4 px-6 flex-shrink-0 border-r border-bone/40 last:border-r-0 first:pl-0"
            >
              <item.icon className="w-4 h-4 text-champagne flex-shrink-0" />
              <div>
                <p className="font-sans text-body-sm font-medium text-charcoal whitespace-nowrap">
                  {item.label}
                </p>
                <p className="font-sans text-label-sm text-smoke whitespace-nowrap">
                  {item.sub}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
