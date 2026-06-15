"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CinematicButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
}

export function CinematicButton({
  href,
  children,
  variant = "primary",
}: CinematicButtonProps) {
  const base =
    "relative inline-flex items-center justify-center px-8 py-4 text-label overflow-hidden group gpu";
  const styles =
    variant === "primary"
      ? "bg-cinema-red text-pure-white hover:bg-cinema-red-glow red-glow"
      : "border border-pure-white/30 text-pure-white hover:border-cinema-red hover:text-cinema-red";

  return (
    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <Link href={href} className={`${base} ${styles}`} data-cursor="magnetic">
        <span className="relative z-10">{children}</span>
        {variant === "primary" && (
          <span className="absolute inset-0 bg-cinema-red-glow translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
        )}
      </Link>
    </motion.div>
  );
}
