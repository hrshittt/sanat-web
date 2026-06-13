"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./tunnel-intro.css";

const INTRO_KEY = "9111-intro-seen";

interface CinematicPreloaderProps {
  onComplete: () => void;
}

export function CinematicPreloader({ onComplete }: CinematicPreloaderProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY)) {
      setVisible(false);
      onComplete();
      return;
    }

    const root = rootRef.current;
    if (!root) return;

    const tunnel = root.querySelector(".tunnel-intro__tunnel");
    const mover = root.querySelector(".tunnel-intro__mover");
    const mega = root.querySelector(".tunnel-intro__mega");
    const megaMask = root.querySelector(".tunnel-intro__mega-mask");

    document.body.style.overflow = "hidden";

    const finish = () => {
      sessionStorage.setItem(INTRO_KEY, "1");
      window.dispatchEvent(new Event("9111-intro-complete"));
      gsap.to(root, {
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          setVisible(false);
          document.body.style.overflow = "";
          onComplete();
        },
      });
    };

    gsap.set(mega, { opacity: 0, scale: 0.85 });
    gsap.set(megaMask, { clipPath: "inset(0 100% 0 0)" });

    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      mover,
      { z: 0 },
      { z: "140vmin", duration: 0.85, ease: "none" },
      0
    )
      .to(tunnel, { opacity: 0.3, duration: 0.3 }, 0.55)
      .to(megaMask, { clipPath: "inset(0 0% 0 0)", duration: 0.45 }, 0.7)
      .to(
        mega,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
          textShadow:
            "0 0 80px rgba(255,59,59,0.8), 0 0 160px rgba(214,31,38,0.5)",
        },
        0.75
      )
      .to(mega, { scale: 1.02, duration: 0.25 }, 1.35)
      .to({}, { duration: 0.25 });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div ref={rootRef} className="tunnel-intro" aria-hidden>
      <div className="tunnel-intro__viewport">
        <div className="tunnel-intro__tunnel">
          <div className="tunnel-intro__mover">
            {(["floor", "ceiling", "left", "right"] as const).map((side) => (
              <div
                key={side}
                className={`tunnel-intro__face tunnel-intro__face--${side}`}
              >
                <div className="tunnel-intro__texture tunnel-intro__texture--a">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span key={i} className="tunnel-intro__cell">
                      91-11
                    </span>
                  ))}
                </div>
                <div className="tunnel-intro__texture tunnel-intro__texture--b">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <span key={i} className="tunnel-intro__cell">
                      91-11
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tunnel-intro__mega-wrap">
        <div className="tunnel-intro__mega-mask">
          <h1 className="tunnel-intro__mega">91-11</h1>
        </div>
      </div>

      <div className="film-grain !z-[10001] opacity-40" />
    </div>
  );
}
