"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Project } from "@/types/project";

interface WorkArchiveProps {
  projects: Project[];
}

export function WorkArchive({ projects }: WorkArchiveProps) {
  return (
    <div className="bg-cinema-black min-h-screen text-pure-white overflow-hidden selection:bg-cinema-red selection:text-pure-white">
      {/* Subtle Cinematic Grain & Glow */}
      <div className="fixed inset-0 film-grain pointer-events-none z-50 opacity-40 mix-blend-overlay" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(214,31,38,0.1),transparent_70%)] pointer-events-none" />

      {/* Hero Header */}
      <header className="relative pt-40 pb-20 md:pt-56 md:pb-32 px-6 md:px-12 max-w-[1600px] mx-auto z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-display text-[clamp(4rem,10vw,12rem)] leading-[0.85] uppercase tracking-tighter relative z-10">
            The <br className="hidden md:block" /> Archive
          </h1>
          <div className="h-[2px] w-32 bg-cinema-red mt-12 mb-8" />
          <p className="text-warm-muted text-xl md:text-3xl max-w-2xl font-light leading-relaxed">
            A curated selection of cinematic storytelling, brand campaigns, and creative collaborations.
          </p>
        </motion.div>
      </header>

      {/* Alternating Project List */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pb-32 md:pb-64 relative z-10">
        {projects.map((project, index) => (
          <ProjectItem key={project.slug} project={project} index={index} />
        ))}
      </div>
    </div>
  );
}

function ProjectItem({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgParallax = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div 
      ref={containerRef}
      className={`relative w-full flex flex-col items-center gap-12 md:gap-24 my-32 md:my-56 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Media Side */}
      <Link 
        href={`/work/${project.slug}`}
        className="w-full md:w-[60%] relative group cursor-none block"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(e) => {
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
          }
        }}
      >
        {/* Set to aspect-[4/5] everywhere to enforce portrait orientation */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cinema-charcoal shadow-2xl">
          {/* Custom Cursor */}
          <motion.div 
            className="absolute z-50 pointer-events-none flex items-center justify-center bg-cinema-red text-pure-white rounded-full text-[10px] font-bold tracking-widest uppercase text-center mix-blend-screen shadow-[0_0_30px_rgba(214,31,38,0.5)]"
            animate={{ 
              x: mousePos.x - 50,
              y: mousePos.y - 50,
              opacity: isHovered ? 1 : 0, 
              scale: isHovered ? 1 : 0,
            }}
            transition={{
              x: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
              y: { type: "spring", stiffness: 150, damping: 15, mass: 0.1 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.2 }
            }}
            style={{ width: "100px", height: "100px" }}
          >
            VIEW
          </motion.div>

          <motion.div 
            className="absolute inset-0 w-full h-full origin-center"
            style={{ y: imgParallax, scale: 1.15 }}
          >
            <Image
              src={project.poster}
              alt={project.title}
              fill
              className="object-cover transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-cinema-black/30 group-hover:bg-cinema-black/10 transition-colors duration-700" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_center,rgba(214,31,38,0.15)_0%,transparent_70%)] transition-opacity duration-1000 pointer-events-none" />
          </motion.div>
        </div>
        
        {/* Subtle decorative number */}
        <div className={`absolute top-[-2rem] md:top-[-4rem] ${isEven ? 'right-[-1rem] md:right-[-4rem]' : 'left-[-1rem] md:left-[-4rem]'} text-[8rem] md:text-[15rem] font-bold text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] pointer-events-none z-[-1]`}>
          {(index + 1).toString().padStart(2, '0')}
        </div>
      </Link>

      {/* Text Side */}
      <motion.div 
        className="w-full md:w-[40%] flex flex-col justify-center"
        style={{ y: textY }}
      >
        <motion.div
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-[1px] w-12 bg-cinema-red" />
            <span className="text-cinema-red text-sm font-medium tracking-[0.3em] uppercase">
              {project.category}
            </span>
          </div>
          
          <h2 className="text-display text-5xl md:text-7xl lg:text-8xl text-pure-white leading-none uppercase mb-8 hover:text-silver-dim transition-colors duration-500 group-hover:text-silver-dim">
            <Link href={`/work/${project.slug}`}>
              {project.title}
            </Link>
          </h2>
          
          <p className="text-warm-muted text-lg md:text-xl font-light leading-relaxed mb-10 whitespace-pre-wrap line-clamp-4">
            {project.overview}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
