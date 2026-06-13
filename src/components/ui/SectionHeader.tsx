"use client";

import { TextReveal } from "./TextReveal";

interface SectionHeaderProps {
  number: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  accent?: boolean;
}

export function SectionHeader({
  number,
  title,
  subtitle,
  description,
  className = "",
  accent = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-16 md:mb-24 ${className}`}>
      <p className={accent ? "text-label-red mb-4" : "text-label mb-4"}>
        Section {number}
        {subtitle ? ` — ${subtitle}` : ""}
      </p>
      <TextReveal
        as="h2"
        className="text-display text-[clamp(2.25rem,5.5vw,4.5rem)] text-pure-white max-w-4xl"
      >
        {title}
      </TextReveal>
      {description && (
        <p className="text-warm-muted text-sm md:text-base mt-6 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
