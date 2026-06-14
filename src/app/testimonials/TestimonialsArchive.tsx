"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsArchive() {
  // Duplicate the testimonials to create an infinite seamless loop
  const marqueeItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <div className="bg-cinema-black min-h-screen text-pure-white overflow-hidden selection:bg-cinema-red selection:text-pure-white pb-32">
      {/* Subtle Grain & Glow */}
      <div className="fixed inset-0 film-grain pointer-events-none z-50 opacity-40 mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,31,38,0.08),transparent_70%)] pointer-events-none" />

      {/* Hero Header */}
      <header className="relative pt-40 pb-16 md:pt-56 md:pb-24 px-6 md:px-12 max-w-[1200px] mx-auto z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.85] uppercase tracking-tighter relative z-10">
            Client <br className="hidden md:block" /> Stories
          </h1>
          <div className="h-[2px] w-24 bg-cinema-red mx-auto mt-10 mb-8" />
          <p className="text-warm-muted text-xl md:text-2xl font-light leading-relaxed max-w-2xl mx-auto">
            The experiences and voices of the brands, creators, and visionaries we collaborate with.
          </p>
        </motion.div>
      </header>

      {/* Filmreel Marquee */}
      <div className="relative z-10 w-full overflow-hidden mt-20 group">
        {/* Container that pauses animation on hover */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-10">
          {marqueeItems.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative flex-none w-[75vw] md:w-[45vw] lg:w-[32vw] flex flex-col items-center justify-center text-center px-8 md:px-12 film-frame py-16 mx-4 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.05] hover:-translate-y-2 hover:bg-cinema-black/40 group/card border border-white/5 hover:border-cinema-red/20 hover:shadow-[0_0_40px_rgba(214,31,38,0.15)]"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cinema-red/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              <span
                className="text-display text-[5rem] md:text-[7rem] leading-none text-cinema-red/10 absolute top-4 left-1/2 -translate-x-1/2 select-none pointer-events-none mix-blend-screen transition-colors duration-700 group-hover/card:text-cinema-red/20"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 text-display text-[clamp(1.1rem,1.5vw,1.5rem)] text-pure-white/80 group-hover/card:text-pure-white leading-relaxed mb-8 mt-6 max-w-2xl transition-colors duration-700">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-auto relative z-10 transition-transform duration-700 group-hover/card:translate-y-1">
                <p className="text-cinema-red/80 group-hover/card:text-cinema-red tracking-[0.2em] uppercase font-medium text-xs mb-1.5 transition-colors duration-700">{testimonial.author}</p>
                {testimonial.brand && (
                  <p className="text-warm-muted/70 group-hover/card:text-warm-muted font-light text-sm transition-colors duration-700">{testimonial.brand}</p>
                )}
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
