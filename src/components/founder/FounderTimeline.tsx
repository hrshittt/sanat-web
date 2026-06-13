"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";
import { FOUNDER } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function FounderTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        x: () => -(trackRef.current!.scrollWidth - window.innerWidth + 80),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${trackRef.current!.scrollWidth}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cinema-red min-h-screen overflow-hidden"
    >
      <div className="section-pad pt-24 pb-8">
        <p className="text-label text-pure-white/70 mb-4">Timeline</p>
        <h2 className="text-display text-4xl md:text-5xl text-pure-white">
          The Journey
        </h2>
      </div>

      <div ref={trackRef} className="flex gap-8 md:gap-12 section-pad pb-32 w-max">
        {FOUNDER.timeline.map((item, i) => (
          <article
            key={item.year}
            className="timeline-card shrink-0 w-[min(85vw,380px)] border border-pure-white/20 p-8 md:p-10 bg-cinema-black/30 backdrop-blur-sm"
          >
            <span className="text-label text-pure-white/50">
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className="text-cinema-red-glow text-sm font-medium mt-4 mb-2">
              {item.year}
            </p>
            <h3 className="text-display text-2xl md:text-3xl text-pure-white mb-4">
              {item.title}
            </h3>
            <p className="text-pure-white/75 text-sm leading-relaxed">
              {item.desc}
            </p>
          </article>
        ))}
        <div className="shrink-0 w-[min(85vw,380px)] flex flex-col justify-center p-8 border border-cinema-red bg-cinema-black">
          <p className="text-label-red mb-4">Next Chapter</p>
          <p className="text-display text-2xl text-pure-white mb-6">
            Your story could be here.
          </p>
          <Link
            href="/#contact"
            className="text-label inline-flex border border-pure-white px-6 py-3 hover:bg-pure-white hover:text-cinema-black transition-all duration-500 w-fit"
          >
            Start a Project
          </Link>
        </div>
      </div>
    </section>
  );
}
