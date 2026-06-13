"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectGalleryProps {
  images: string[];
  title: string;
}

export function ProjectGallery({ images, title }: ProjectGalleryProps) {
  if (!images.length) return null;

  return (
    <section className="section-pad py-16 md:py-24">
      <p className="text-label mb-12">{title}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {images.map((src, i) => (
          <motion.div
            key={src}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{
              duration: 1,
              delay: i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative overflow-hidden bg-cinema-charcoal ${
              i === 0 && images.length > 1 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
            }`}
          >
            <Image
              src={src}
              alt={`${title} ${i + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
