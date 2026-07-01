"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES } from "@/lib/constants";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SECTIONS } from "@/lib/sections";

gsap.registerPlugin(ScrollTrigger);

export function Services() {
  // Start with the first service selected
  const [active, setActive] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-row", {
        x: -60,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      });
      
      gsap.from(".services-sticky-panel", {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id={SECTIONS.whatWeCreate.id}
      ref={sectionRef}
      className="relative bg-gradient-to-b from-cinema-red via-cinema-red to-cinema-black py-32 md:py-48 overflow-visible"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,0,0,0.2)_0%,transparent_50%)] pointer-events-none z-10" />
      <div className="section-pad relative z-10">
        <SectionHeader
          number={SECTIONS.whatWeCreate.number}
          title={SECTIONS.whatWeCreate.title}
          subtitle={SECTIONS.whatWeCreate.subtitle}
          description="Every service is a chapter in a larger cinematic story."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 relative items-start">
          {/* Desktop Left Panel - Sticky */}
          <div className="hidden lg:block lg:col-span-5 sticky top-48 services-sticky-panel pr-8">
            <AnimatePresence mode="wait">
              {active === null ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="flex h-full flex-col justify-center pt-12 opacity-50"
                >
                  <span className="text-display text-[clamp(4rem,6vw,6rem)] text-pure-white/20 tracking-tighter leading-[0.85]">
                    Select
                    <br />
                    a Chapter
                  </span>
                  <div className="mt-8 w-32 h-[2px] bg-gradient-to-r from-cinema-red to-transparent" />
                </motion.div>
              ) : (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <div className="text-label text-pure-white/60 bg-pure-white/5 inline-block px-3 py-1 border border-pure-white/10">
                    {String(active + 1).padStart(2, "0")} {/* {SERVICES[active].title} */}
                  </div>
                  <h3 className="text-display text-[clamp(2.5rem,4vw,4rem)] leading-[1.1] text-pure-white font-light red-glow-text">
                    {SERVICES[active].tagline}
                  </h3>
                  <p className="text-pure-white/80 text-lg leading-relaxed max-w-md">
                    {SERVICES[active].description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Service List */}
          <div className="lg:col-span-7">
            <ul className="border-t border-cinema-charcoal/30">
              {SERVICES.map((service, index) => {
                const isActive = active === index;

                return (
                  <li
                    key={service.title}
                    className="service-row border-b border-cinema-charcoal/30"
                  >
                    <button
                      onClick={() => setActive(index)}
                      className="w-full text-left py-6 md:py-8 flex flex-col group transition-colors duration-300"
                    >
                      {/* Row Header */}
                      <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex items-baseline gap-6 md:gap-10">
                          <span
                            className={`text-label transition-colors duration-500 ${
                              isActive
                                ? "text-pure-white"
                                : "text-pure-white/40 group-hover:text-pure-white/70"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <motion.h3
                            className={`text-display text-2xl md:text-4xl transition-colors duration-500 ${
                              isActive
                                ? "text-pure-white"
                                : "text-pure-white/40 group-hover:text-pure-white/70"
                            }`}
                            animate={{ x: isActive ? 16 : 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {service.title}
                          </motion.h3>
                        </div>
                        <span
                          className={`w-3 h-3 rounded-full bg-pure-white transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.6)] ${
                            isActive ? "scale-100 opacity-100" : "scale-0 opacity-0"
                          }`}
                        />
                      </div>

                      {/* Mobile Accordion Content (Hidden on Desktop) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="lg:hidden overflow-hidden"
                          >
                            <div className="pt-6 pb-2 pl-[4.5rem] md:pl-[6.5rem]">
                              <h4 className="text-xl text-pure-white mb-3 font-medium">
                                {service.tagline}
                              </h4>
                              <p className="text-pure-white/80 text-base leading-relaxed">
                                {service.description}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                    
                    {/* Active State Bottom Border Indicator */}
                    <motion.div
                      className="h-[2px] bg-pure-white origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isActive ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
