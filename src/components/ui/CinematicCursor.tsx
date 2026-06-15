"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorState =
  | "default"
  | "about"
  | "work"
  | "founder"
  | "contact"
  | "project"
  | "video"
  | "magnetic";

export function CinematicCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorState, setCursorState] = useState<CursorState>("default");
  const [isClicking, setIsClicking] = useState(false);
  const [isIdle, setIsIdle] = useState(false);
  
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const targetRef = useRef<HTMLElement | null>(null);

  // Framer Motion values for smooth tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring configuration for cinematic weighted feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device uses a touch screen (coarse pointer)
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const manageMouseMove = (e: MouseEvent) => {
      // Clear idle timeout
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      setIsIdle(false);

      // Set new idle timeout (3 seconds)
      idleTimeoutRef.current = setTimeout(() => {
        setIsIdle(true);
      }, 3000);

      // Check for custom cursor attributes
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement;
      const sectionEl = target.closest("[data-cursor-section]") as HTMLElement;

      let newState: CursorState = "default";

      if (cursorEl) {
        newState = cursorEl.getAttribute("data-cursor") as CursorState;
        targetRef.current = cursorEl;
      } else if (sectionEl) {
        newState = sectionEl.getAttribute("data-cursor-section") as CursorState;
        targetRef.current = null;
      } else {
        targetRef.current = null;
      }

      setCursorState(newState);

      // Magnetic interaction logic
      if (newState === "magnetic" && targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        // Move towards the center of the magnetic element
        mouseX.set(centerX + (e.clientX - centerX) * 0.2);
        mouseY.set(centerY + (e.clientY - centerY) * 0.2);
      } else if (newState === "project" || newState === "video") {
        // slightly lag behind for cinematic feel
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      } else {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    const manageMouseDown = () => setIsClicking(true);
    const manageMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mousedown", manageMouseDown);
    window.addEventListener("mouseup", manageMouseUp);

    return () => {
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mousedown", manageMouseDown);
      window.removeEventListener("mouseup", manageMouseUp);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <AnimatePresence mode="wait">
        {/* EASTER EGG: Idle state */}
        {isIdle && cursorState === "default" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <span className="text-cinema-red font-display tracking-widest text-xl opacity-50 blur-[0.5px]">
              91-11
            </span>
          </motion.div>
        )}

        {/* DEFAULT & WORK SECTION (Autofocus Brackets) */}
        {!isIdle && (cursorState === "default" || cursorState === "work" || cursorState === "magnetic") && (
          <motion.div
            key="autofocus"
            className="relative flex items-center justify-center w-12 h-12"
            animate={{
              scale: isClicking ? 0.8 : cursorState === "magnetic" ? 1.5 : 1,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Brackets */}
            <div className={cn(
              "absolute inset-0 border border-pure-white/40 transition-all duration-500",
              isClicking ? "border-cinema-red/80 shadow-[0_0_15px_rgba(214,31,38,0.5)]" : ""
            )}>
               {/* Create the corner bracket effect by hiding the middle parts using clip-path or masks */}
               <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-pure-white/80" />
               <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-pure-white/80" />
               <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-pure-white/80" />
               <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-pure-white/80" />
            </div>
            
            {/* Center Focus Point */}
            <motion.div 
              className="w-1 h-1 bg-cinema-red rounded-full"
              animate={{ 
                scale: isClicking ? 2 : 1,
                opacity: isClicking ? 1 : 0.6
              }}
              transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            />
          </motion.div>
        )}

        {/* ABOUT SECTION (Camera Lens) */}
        {!isIdle && cursorState === "about" && (
          <motion.div
            key="about"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative flex items-center justify-center w-16 h-16 rounded-full border border-pure-white/20 bg-cinema-black/10 backdrop-blur-[1px]"
            style={{
              boxShadow: "inset 0 0 20px rgba(255,255,255,0.05), 0 0 15px rgba(214,31,38,0.1)"
            }}
          >
            <div className="w-10 h-10 rounded-full border border-pure-white/10 flex items-center justify-center">
               <motion.div 
                 className="w-1.5 h-1.5 bg-cinema-red/80 rounded-full"
                 animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                 transition={{ duration: 2, repeat: Infinity }}
               />
            </div>
            {/* Lens Reflection */}
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-pure-white/20 blur-[2px]" />
          </motion.div>
        )}

        {/* PROJECT HOVER (View Story) */}
        {!isIdle && cursorState === "project" && (
          <motion.div
            key="project"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="relative flex items-center justify-center w-32 h-32"
          >
            <div className="absolute inset-0">
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cinema-red" />
               <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cinema-red" />
               <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cinema-red" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cinema-red" />
            </div>
            <span className="text-pure-white text-[10px] tracking-widest font-bold uppercase drop-shadow-[0_0_10px_rgba(214,31,38,0.8)]">
              View Story
            </span>
            <motion.div 
              className="absolute -top-6 text-cinema-red text-[8px] tracking-widest font-bold opacity-0"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.5, times: [0, 0.2, 1] }}
            >
              FOCUS LOCK
            </motion.div>
          </motion.div>
        )}

        {/* VIDEO HOVER (Play Reel) */}
        {!isIdle && cursorState === "video" && (
          <motion.div
            key="video"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="relative flex items-center justify-center w-24 h-24 rounded-full bg-cinema-red/90 text-pure-white backdrop-blur-sm"
            style={{ boxShadow: "0 0 30px rgba(214,31,38,0.5)" }}
          >
            <motion.div 
              className="absolute inset-0 rounded-full border-2 border-cinema-red"
              animate={{ scale: [1, 1.2, 1], opacity: [0.8, 0, 0.8] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[10px] font-bold tracking-widest flex items-center gap-2">
              <span className="text-xs">▶</span> PLAY REEL
            </span>
          </motion.div>
        )}

        {/* FOUNDER PAGE (Portrait Frame) */}
        {!isIdle && cursorState === "founder" && (
          <motion.div
            key="founder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center w-16 h-24 border border-pure-white/30"
          >
            {/* Rule of thirds grid lines */}
            <div className="absolute top-1/3 left-0 w-full border-t border-pure-white/10" />
            <div className="absolute top-2/3 left-0 w-full border-t border-pure-white/10" />
            <div className="absolute left-1/3 top-0 h-full border-l border-pure-white/10" />
            <div className="absolute left-2/3 top-0 h-full border-l border-pure-white/10" />
            <div className="w-1 h-1 bg-cinema-red rounded-full" />
          </motion.div>
        )}

        {/* CONTACT SECTION (Create) */}
        {!isIdle && cursorState === "contact" && (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative flex items-center justify-center w-20 h-20 rounded-full border border-cinema-red/50"
          >
            <span className="text-pure-white text-[10px] tracking-widest font-light uppercase">
              Create
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click Ripple Effect */}
      {isClicking && (
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-pure-white mix-blend-screen"
          initial={{ scale: 0.5, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
