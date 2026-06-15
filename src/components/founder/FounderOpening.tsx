"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "@/components/ui/TextReveal";
import { FOUNDER } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function FounderOpening() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { scale: 1.08 },
        {
          scale: 1,
          duration: 2.5,
          ease: "power2.out",
        }
      );

      gsap.to(imageRef.current, {
        scale: 1.12,
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.from(contentRef.current?.children ?? [], {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 1.2,
        delay: 0.4,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-cursor-section="founder"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden"
    >
      <div ref={imageRef} className="absolute inset-0 gpu">
        <Image
          src={FOUNDER.heroImage}
          alt={FOUNDER.name}
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
          onError={(e) => {
            const img = e.currentTarget;
            img.src =
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80";
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-cinema-black/90 via-cinema-black/50 to-cinema-red/20 z-[1]" />
      <div
        ref={contentRef}
        className="relative z-10 h-full flex flex-col justify-end section-pad pt-32 pb-16 md:pb-24 max-w-4xl"
      >
        <div className="mb-auto mt-8">
          <Link
            href="/"
            className="text-label text-silver-dim hover:text-pure-white transition-colors flex items-center gap-4 group w-fit"
          >
            <span className="w-8 h-[1px] bg-cinema-red group-hover:w-12 transition-all duration-300" />
            RETURN TO HOME
          </Link>
        </div>

        <p className="text-label-red mb-6">Founder</p>
        <TextReveal
          as="h1"
          className="text-display text-[clamp(3rem,10vw,7rem)] text-pure-white uppercase tracking-tight mb-8"
        >
          {FOUNDER.name}
        </TextReveal>
        <div className="space-y-2 mb-10">
          {FOUNDER.roles.map((role) => (
            <p
              key={role}
              className="text-lg md:text-xl text-pure-white/90 font-light"
            >
              {role}
            </p>
          ))}
        </div>
        <blockquote className="text-display text-xl md:text-2xl text-pure-white/80 border-l-2 border-cinema-red pl-6 max-w-xl italic">
          &ldquo;{FOUNDER.openingQuote}&rdquo;
        </blockquote>
      </div>
    </section>
  );
}
