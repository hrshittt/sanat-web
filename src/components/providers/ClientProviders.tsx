"use client";

import { useState, useCallback } from "react";
import { SmoothScroll } from "./SmoothScroll";
import { CinematicPreloader } from "@/components/intro/CinematicPreloader";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  const [introDone, setIntroDone] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && <CinematicPreloader onComplete={handleIntroComplete} />}
      <SmoothScroll introDone={introDone}>{children}</SmoothScroll>
    </>
  );
}
