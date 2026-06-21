"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types/project";
import { SECTIONS } from "@/lib/sections";

interface FeaturedWorkProps {
  projects: Project[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      id={SECTIONS.selectedFrames.id}
      ref={sectionRef}
      data-cursor-section="work"
      className="relative bg-cinema-black h-screen min-h-[600px] overflow-hidden z-20 flex items-center justify-center group"
    >
      {/* Cinematic Red Light Leaks */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden mix-blend-screen">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-[radial-gradient(circle,rgba(214,31,38,0.25)_0%,transparent_70%)] blur-3xl"
          animate={{
            x: ["0%", "40%", "-20%", "0%"],
            y: ["0%", "30%", "50%", "0%"],
            scale: [1, 1.5, 0.8, 1],
            opacity: [0.4, 0.7, 0.3, 0.4]
          }}
          transition={{
            duration: 22,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror"
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[10%] w-[70%] h-[70%] rounded-full bg-[radial-gradient(circle,rgba(255,50,50,0.15)_0%,transparent_70%)] blur-3xl"
          animate={{
            x: ["0%", "-40%", "20%", "0%"],
            y: ["0%", "-50%", "20%", "0%"],
            scale: [1, 0.8, 1.4, 1],
            opacity: [0.3, 0.6, 0.2, 0.3]
          }}
          transition={{
            duration: 28,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "mirror",
            delay: 3
          }}
        />
      </div>

      <motion.div
        className="absolute inset-0 w-full h-full origin-center"
        style={{ y: parallaxY, scale: 1.15 }}
      >
        <img
          src="/selected-work-bg.webp"
          alt="Selected Work Background"
          className="absolute inset-0 h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
        />
        <div className="absolute inset-0 bg-cinema-black/60 group-hover:bg-cinema-black/30 transition-colors duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </motion.div>

      <div className="relative z-10 text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-display text-[clamp(4rem,10vw,12rem)] text-pure-white leading-none uppercase mb-6 tracking-tight drop-shadow-2xl mix-blend-overlay group-hover:mix-blend-normal transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]">
            Selected Work
          </h2>
          <div className="mx-auto h-[2px] w-0 group-hover:w-32 bg-cinema-red mb-8 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
          <div className="inline-block relative z-20 overflow-hidden">
            <span className="block text-warm-muted group-hover:text-pure-white text-lg md:text-2xl font-light tracking-[0.3em] uppercase transition-colors duration-500 delay-100">
              View The Portfolio
            </span>
          </div>
        </motion.div>
      </div>

      {/* Click target over entire section */}
      <Link href="/work" className="absolute inset-0 z-10" data-cursor="project">
        <span className="sr-only">Explore Archive</span>
      </Link>
    </section>
  );
}
