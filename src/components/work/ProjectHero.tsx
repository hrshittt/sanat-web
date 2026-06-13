"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import type { Project } from "@/types/project";

interface ProjectHeroProps {
  project: Project;
}

export function ProjectHero({ project }: ProjectHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });
      gsap.from(".project-hero-title", {
        y: 80,
        opacity: 0,
        duration: 1.4,
        delay: 0.3,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[75vh] md:h-[90vh] w-full overflow-hidden"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover scale-105"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={project.poster}
      >
        <source src={project.heroVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/40 to-cinema-red/10" />

      <div className="relative z-10 h-full flex flex-col justify-end section-pad pb-16 md:pb-24">
        <p className="text-label-red mb-4">{project.category}</p>
        <h1 className="project-hero-title text-display text-[clamp(3rem,10vw,7rem)] text-pure-white red-glow-text">
          {project.title}
        </h1>
        <p className="text-warm-muted mt-4 text-sm md:text-base">
          {project.year} · {project.client}
        </p>
      </div>
    </section>
  );
}
