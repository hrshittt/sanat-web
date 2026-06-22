"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import { TextReveal } from "@/components/ui/TextReveal";
import { CinematicButton } from "@/components/ui/CinematicButton";
import { SITE, HERO_VIDEO } from "@/lib/constants";
import { SECTIONS } from "@/lib/sections";

gsap.registerPlugin(ScrollTrigger);

const HeroAmbient = dynamic(
  () => import("@/components/three/HeroAmbient").then((m) => m.HeroAmbient),
  { ssr: false }
);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.5, duration: 2, delay: 0.3, ease: "power2.out" }
      );

      // Removed the intensive scrub animation on the background video to improve performance

      gsap.to(contentRef.current, {
        opacity: 0,
        y: -80,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTIONS.about.id}
      ref={sectionRef}
      data-cursor-section="about"
      className="relative h-[100svh] min-h-[600px] w-full overflow-hidden z-10 bg-cinema-black"
    >
      <div ref={videoWrapRef} className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 bg-cinema-black/60 z-[1]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-cinema-black/60 via-transparent to-cinema-black z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/80 via-transparent to-transparent z-[1]" />

      {/* HeroAmbient disabled to drastically improve video playback performance */}
      {/* <HeroAmbient /> */}

      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end section-pad pb-16 md:pb-28"
      >
        <p className="text-label text-pure-white/80 mb-4">
          {SECTIONS.about.title}
        </p>

        <TextReveal
          as="h1"
          className="text-display text-[clamp(2.5rem,8vw,6.5rem)] text-pure-white max-w-5xl mb-6 md:mb-8"
          delay={0.2}
        >
          {SITE.tagline}
        </TextReveal>

        <p className="text-warm-muted text-sm md:text-base max-w-xl leading-relaxed mb-10 md:mb-12">
          {SITE.description}
        </p>

        <div className="flex flex-wrap gap-4">
          <CinematicButton href="#work" variant="primary">
            View Work
          </CinematicButton>
          <CinematicButton href="#contact" variant="outline">
            Start a Project
          </CinematicButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-label text-cinema-red">Scroll</span>
        <span className="block w-px h-14 bg-gradient-to-b from-cinema-red to-transparent" />
      </div>
    </section>
  );
}
