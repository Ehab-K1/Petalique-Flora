import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { StorySection } from "@/components/home/StorySection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WeddingShowcase } from "@/components/home/WeddingShowcase";
import { SignatureCollection } from "@/components/home/SignatureCollection";
import { Testimonials } from "@/components/home/Testimonials";
import { ConsultationFunnel } from "@/components/home/ConsultationFunnel";
import { TrustBar } from "@/components/shared/TrustBar";
import { LocationStrip } from "@/components/shared/LocationStrip";

export const metadata: Metadata = {
  title: "Petalique Flora — Luxury Floral Design, GTA",
  description:
    "Luxury wedding florals, event décor, and handcrafted floral gifting across the Greater Toronto Area. South Asian wedding specialists serving Mississauga, Toronto, Brampton, Oakville & Milton.",
  openGraph: {
    title: "Petalique Flora — Luxury Floral Design, GTA",
    description:
      "Luxury wedding florals, event décor, and handcrafted floral gifting across the Greater Toronto Area.",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <StorySection />
      <CategoryGrid />
      <WeddingShowcase />
      <SignatureCollection />
      <Testimonials />
      <ConsultationFunnel />
      <LocationStrip />
    </>
  );
}
