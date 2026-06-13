"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  splitBy?: "words" | "lines";
}

export function TextReveal({
  children,
  as: Tag = "h2",
  className = "",
  delay = 0,
  splitBy = "words",
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  const parts =
    splitBy === "words" ? children.split(" ") : [children];

  return (
    <Tag ref={ref} className={`overflow-hidden ${className}`}>
      <span className="inline-flex flex-wrap gap-x-[0.28em]">
        {parts.map((part, i) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", opacity: 0 }}
              animate={
                isInView
                  ? { y: 0, opacity: 1 }
                  : { y: "110%", opacity: 0 }
              }
              transition={{
                duration: 1.1,
                delay: delay + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {part}
              {splitBy === "words" && i < parts.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  );
}
