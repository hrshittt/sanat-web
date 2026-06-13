"use client";

import { motion } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";
import { CinematicVideoPlayer } from "@/components/ui/CinematicVideoPlayer";

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

      {/* Main Video */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32 z-10 relative">
         <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
         >
           <CinematicVideoPlayer src="/testimonials-bg.MP4" title="Client Testimonial Reel" />
         </motion.div>
      </div>

      {/* Filmreel Marquee */}
      <div className="relative z-10 w-full overflow-hidden mt-20 group">
        {/* Container that pauses animation on hover */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-10">
          {marqueeItems.map((testimonial, index) => (
            <div 
              key={index} 
              className="relative flex-none w-[85vw] md:w-[60vw] lg:w-[45vw] flex flex-col items-center justify-center text-center px-10 md:px-20 film-frame py-24 mx-2 transition-transform duration-500 hover:scale-[1.02]"
            >
              <span
                className="text-display text-[6rem] md:text-[10rem] leading-none text-cinema-red/10 absolute top-8 left-1/2 -translate-x-1/2 select-none pointer-events-none mix-blend-screen"
                aria-hidden
              >
                &ldquo;
              </span>
              <blockquote className="relative z-10 text-display text-[clamp(1.25rem,2vw,2.25rem)] text-pure-white leading-relaxed mb-12 mt-8 max-w-3xl italic">
                {testimonial.quote}
              </blockquote>
              <footer className="mt-auto relative z-10">
                <p className="text-cinema-red tracking-[0.2em] uppercase font-medium text-sm mb-2">{testimonial.author}</p>
                {testimonial.brand && (
                  <p className="text-warm-muted font-light text-base">{testimonial.brand}</p>
                )}
              </footer>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
