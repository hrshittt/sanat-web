"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const REEL_VIDEO = "/about-cover.mp4";

export function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="showreel"
      className="relative h-screen min-h-[500px] w-full overflow-hidden bg-cinema-black"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      >
        <source src={REEL_VIDEO} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-cinema-black/40 z-[1]" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center section-pad text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-label mb-6"
        >
          Showreel
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15 }}
          className="text-display text-[clamp(3rem,10vw,8rem)] text-warm-white"
        >
          91-11
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-warm-muted mt-4 text-sm md:text-base"
        >
          Cinematic production. Unforgettable brands.
        </motion.p>

        <button
          type="button"
          onClick={togglePlay}
          className="mt-12 text-label border border-warm-white/30 px-8 py-4 hover:bg-warm-white/10 transition-colors duration-500"
          aria-label={isPlaying ? "Pause showreel" : "Play showreel"}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </section>
  );
}
