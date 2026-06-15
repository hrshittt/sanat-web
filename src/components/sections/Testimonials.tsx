"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { SECTIONS } from "@/lib/sections";

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      id={SECTIONS.testimonials.id}
      ref={sectionRef}
      className="relative bg-cinema-black h-[70vh] min-h-[500px] overflow-hidden z-20 flex items-center justify-center group"
    >
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y: parallaxY, scale: 1.15 }}
      >
        <div className="absolute inset-0 bg-cinema-black/70 group-hover:bg-cinema-black/40 transition-colors duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,31,38,0.2),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-out pointer-events-none" />
      </motion.div>

      <div className="relative z-10 text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-[clamp(3rem,8vw,8rem)] text-pure-white leading-none uppercase mb-6 tracking-tight drop-shadow-2xl mix-blend-overlay group-hover:mix-blend-normal transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
            {SECTIONS.testimonials.title}
          </h2>
          <div className="mx-auto h-[2px] w-0 group-hover:w-32 bg-cinema-red mb-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <div className="inline-block relative z-20 overflow-hidden">
            <span className="block text-warm-muted group-hover:text-pure-white text-lg md:text-2xl font-light tracking-[0.3em] uppercase transition-colors duration-500 delay-100">
              Hear From Our Clients
            </span>
          </div>
        </motion.div>
      </div>
      
      <Link href="/testimonials" className="absolute inset-0 z-10">
        <span className="sr-only">Read Testimonials</span>
      </Link>
    </section>
  );
}
