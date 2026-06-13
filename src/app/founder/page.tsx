import type { Metadata } from "next";
import { FounderOpening } from "@/components/founder/FounderOpening";
import { FounderStory } from "@/components/founder/FounderStory";
import { FounderFilm } from "@/components/founder/FounderFilm";
import { FounderPhilosophy } from "@/components/founder/FounderPhilosophy";
import { FounderTimeline } from "@/components/founder/FounderTimeline";
import { FOUNDER, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${FOUNDER.name} — Founder`,
  description: `The visual story of ${FOUNDER.name}, founder of ${SITE.name}.`,
  openGraph: {
    title: `${FOUNDER.name} | ${SITE.name}`,
    description: FOUNDER.openingQuote,
    images: [{ url: FOUNDER.image }],
  },
};

export default function FounderPage() {
  return (
    <article className="bg-cinema-black">
      <FounderOpening />
      <FounderFilm />
      <FounderStory />
      <FounderPhilosophy />
      <FounderTimeline />
    </article>
  );
}
