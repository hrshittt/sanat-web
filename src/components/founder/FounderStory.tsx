"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOUNDER } from "@/lib/constants";
import { RedStreak } from "@/components/ui/RedStreak";

gsap.registerPlugin(ScrollTrigger);

export function FounderStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      sectionRef.current?.querySelectorAll(".story-line").forEach((line) => {
        gsap.from(line, {
          opacity: 0.15,
          x: -40,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 50%",
            scrub: 1,
          },
        });
        gsap.to(line, {
          opacity: 1,
          x: 0,
          ease: "none",
          scrollTrigger: {
            trigger: line,
            start: "top 70%",
            end: "top 45%",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cinema-red py-32 md:py-48 overflow-hidden"
    >
      <RedStreak className="top-0 left-0 right-0 h-1" />

      <div className="section-pad grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="lg:col-span-5 order-2 lg:order-1">
          <p className="text-label text-pure-white/60 mb-8">The Story</p>
          <div className="space-y-10 md:space-y-14">
            {FOUNDER.story.map((line, i) => (
              <p
                key={i}
                className={`story-line text-display leading-tight gpu ${
                  i === 0
                    ? "text-[clamp(1.75rem,4vw,3rem)] text-pure-white"
                    : "text-[clamp(1.25rem,3vw,2rem)] text-pure-white/85"
                }`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 order-1 lg:order-2">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] overflow-hidden light-sweep gpu"
          >
            <Image
              src={FOUNDER.image}
              alt={FOUNDER.name}
              fill
              className="object-cover contrast-[1.05]"
              sizes="(max-width: 1024px) 100vw, 55vw"
              onError={(e) => {
                e.currentTarget.src =
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80";
              }}
            />
            <div className="absolute inset-0 bg-cinema-black/20 mix-blend-multiply" />
          </div>
        </div>
      </div>
    </section>
  );
}
