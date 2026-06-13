"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CinematicVideoPlayer } from "@/components/ui/CinematicVideoPlayer";
import { FOUNDER } from "@/lib/constants";
import { RedStreak } from "@/components/ui/RedStreak";

gsap.registerPlugin(ScrollTrigger);

export function FounderFilm() {
  const sectionRef = useRef<HTMLElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(playerRef.current, {
        scale: 0.92,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: playerRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cinema-black py-32 md:py-40 overflow-hidden"
    >
      <RedStreak className="top-1/2 -translate-y-1/2 left-0 w-full h-32 opacity-30" />

      <div className="section-pad relative z-10">
        <p className="text-label-red mb-4">Founder Film</p>
        <h2 className="text-display text-[clamp(2rem,5vw,4rem)] text-pure-white mb-4">
          Behind the Vision
        </h2>
        <p className="text-warm-muted text-sm md:text-base max-w-lg mb-12">
          A short documentary piece — not a clip, not a reel. A story.
        </p>

        <div ref={playerRef} className="gpu">
          <CinematicVideoPlayer
            src={FOUNDER.video}
            title="Sanat Arora — Founder Film"
          />
        </div>
      </div>
    </section>
  );
}
