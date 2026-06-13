"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FOUNDER } from "@/lib/constants";

gsap.registerPlugin(ScrollTrigger);

export function FounderPhilosophy() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRef.current?.querySelectorAll(".philosophy-line").forEach((line, i) => {
        gsap.from(line, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: line,
            start: "top 85%",
          },
          delay: i * 0.08,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-gradient-to-b from-cinema-black via-cinema-deep to-cinema-black py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,31,38,0.15),transparent_65%)]" />

      <div className="section-pad relative z-10 max-w-5xl mx-auto text-center">
        <p className="text-label-red mb-12">Philosophy</p>
        <div className="space-y-8 md:space-y-12">
          {FOUNDER.philosophy.map((line, i) => (
            <p
              key={i}
              className={`philosophy-line text-display leading-tight ${
                i === FOUNDER.philosophy.length - 1
                  ? "text-[clamp(2rem,6vw,4.5rem)] text-cinema-red red-glow-text"
                  : "text-[clamp(1.5rem,4vw,3rem)] text-pure-white/90"
              }`}
            >
              {i === FOUNDER.philosophy.length - 1 ? (
                <>&ldquo;{line}&rdquo;</>
              ) : (
                line
              )}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
