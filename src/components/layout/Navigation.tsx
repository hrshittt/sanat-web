"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { NAV_LINKS } from "@/lib/constants";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleCinematicScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Always close the mobile menu on any navigation click
    setMenuOpen(false);
    
    const isHashLink = href.includes('#');
    if (!isHashLink) return;

    const hashIndex = href.indexOf('#');
    const pathPart = href.substring(0, hashIndex);
    const hashPart = href.substring(hashIndex);

    if (pathPart === "" || pathPart === pathname || (pathPart === "/" && pathname === "/")) {
      e.preventDefault();
      
      gsap.to(window, {
        duration: 2.5,
        scrollTo: { y: hashPart, autoKill: false },
        ease: "expo.inOut",
      });
    }
  };

  useEffect(() => {
    const show = () => setVisible(true);
    if (sessionStorage.getItem("9111-intro-seen")) {
      setVisible(true);
    } else {
      window.addEventListener("9111-intro-complete", show);
      const t = setTimeout(show, 2200);
      return () => {
        window.removeEventListener("9111-intro-complete", show);
        clearTimeout(t);
      };
    }
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  if (!visible) return null;

  const isHome = pathname === "/";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
            ? "bg-cinema-red/95 backdrop-blur-md py-4 border-b border-pure-white/10"
            : "bg-cinema-black/40 backdrop-blur-sm py-6 md:py-8"
          }`}
      >
        <nav className="section-pad flex items-center justify-between">
          <Link
            href="/"
            className="hover:opacity-80 transition-opacity duration-500 flex items-center"
          >
            <Image
              src={scrolled ? "/logo1.ico" : "/logo2.ico"}
              alt="91-11 Productions Logo"
              width={100}
              height={100}
              className="w-16 h-auto md:w-20 object-contain"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-8 xl:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={(e) => handleCinematicScroll(e, link.href)}
                  className="text-sm font-bold tracking-[0.2em] uppercase text-pure-white/70 hover:text-pure-white transition-colors duration-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={isHome ? "#contact" : "/#contact"}
            onClick={(e) => handleCinematicScroll(e, isHome ? "#contact" : "/#contact")}
            className="hidden md:inline-flex text-sm font-bold tracking-[0.2em] uppercase text-pure-white bg-cinema-red px-6 py-3 hover:bg-cinema-red-glow transition-all duration-500 red-glow"
          >
            Start a Project
          </Link>

          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden flex flex-col gap-1.5 w-8"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`block h-px bg-pure-white transition-all duration-500 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
            />
            <span
              className={`block h-px bg-pure-white transition-all duration-500 ${menuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block h-px bg-pure-white transition-all duration-500 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
            />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-cinema-red flex flex-col items-center justify-center lg:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleCinematicScroll(e, link.href)}
                    className="text-display text-5xl font-bold text-pure-white"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
