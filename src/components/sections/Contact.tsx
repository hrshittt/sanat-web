"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { TextReveal } from "@/components/ui/TextReveal";
import {
  SITE,
  PROJECT_TYPES,
  BUDGET_RANGES,
} from "@/lib/constants";
import { SECTIONS } from "@/lib/sections";

gsap.registerPlugin(ScrollTrigger);

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

export function Contact() {
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const fields = formRef.current?.querySelectorAll(".form-field");
      if (fields?.length) {
        gsap.from(fields, {
          opacity: 0,
          y: 32,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    const formspreeUrl = process.env.NEXT_PUBLIC_FORMSPREE_URL;

    try {
      const res = await fetch(formspreeUrl || `${API_URL}/api/inquiry`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setMessage("Thank you. We'll be in touch shortly.");
      form.reset();
    } catch {
      if (!formspreeUrl) {
        try {
          const fallback = await fetch("/api/inquiry", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify(data),
          });
          if (fallback.ok) {
            setStatus("success");
            setMessage("Thank you. We'll be in touch shortly.");
            form.reset();
            return;
          }
        } catch {
          /* fallback failed */
        }
      }
      setStatus("error");
      setMessage("Something went wrong. Please email us directly.");
    }
  }

  const inputClass =
    "form-field w-full bg-cinema-charcoal/50 border border-cinema-charcoal rounded-md py-4 px-4 text-pure-white placeholder:text-silver-dim focus:border-cinema-red outline-none transition-colors duration-500 text-sm";

  return (
    <section
      id={SECTIONS.contact.id}
      ref={sectionRef}
      data-cursor-section="contact"
      className="relative bg-gradient-to-b from-cinema-black via-cinema-red/90 to-cinema-red py-32 md:py-48 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,59,59,0.2),transparent_45%)] pointer-events-none" />

      <div className="section-pad relative z-10">
        <p className="text-label text-pure-white/80 mb-4">
          {SECTIONS.contact.subtitle}
        </p>
        <TextReveal
          as="h2"
          className="text-display text-[clamp(2rem,5vw,4rem)] text-pure-white max-w-4xl mb-6"
        >
          {SECTIONS.contact.title}
        </TextReveal>
        <p className="text-warm-muted text-base leading-relaxed max-w-lg mb-16">
          Whether it&apos;s a brand, artist, campaign, or story — we&apos;d love
          to hear what you&apos;re building.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-8">
            {[
              { label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
              {
                label: "Phone",
                value: SITE.phone,
                href: `tel:${SITE.phone.replace(/\s/g, "")}`,
              },
              {
                label: "Instagram",
                value: SITE.instagram,
                href: SITE.instagramUrl,
                external: true,
              },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-label mb-2">{item.label}</p>
                <a
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="text-pure-white text-lg hover:text-cinema-red transition-colors duration-500"
                >
                  {item.value}
                </a>
              </div>
            ))}
          </div>

          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="form-field">
                <label htmlFor="name" className="text-label block mb-2">
                  Name
                </label>
                <input id="name" name="name" required className={inputClass} placeholder="Your name" />
              </div>
              <div className="form-field">
                <label htmlFor="email" className="text-label block mb-2">
                  Email
                </label>
                <input id="email" name="email" type="email" required className={inputClass} placeholder="you@brand.com" />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="phone" className="text-label block mb-2">
                Phone
              </label>
              <input id="phone" name="phone" type="tel" className={inputClass} placeholder="+91" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="form-field">
                <label htmlFor="projectType" className="text-label block mb-2">
                  Project Type
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  className={`${inputClass} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-cinema-deep">
                    Select type
                  </option>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-cinema-deep">
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="budget" className="text-label block mb-2">
                  Budget
                </label>
                <select
                  id="budget"
                  name="budget"
                  className={`${inputClass} cursor-pointer`}
                  defaultValue=""
                >
                  <option value="" disabled className="bg-cinema-deep">
                    Select range
                  </option>
                  {BUDGET_RANGES.map((b) => (
                    <option key={b} value={b} className="bg-cinema-deep">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="timeline" className="text-label block mb-2">
                Timeline
              </label>
              <input id="timeline" name="timeline" className={inputClass} placeholder="e.g. Q3 2025" />
            </div>

            <div className="form-field">
              <label htmlFor="vision" className="text-label block mb-2">
                Project Vision
              </label>
              <textarea
                id="vision"
                name="vision"
                required
                rows={4}
                className={`${inputClass} resize-none`}
                placeholder="Tell us about the story you want to tell..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              data-cursor="magnetic"
              className="w-full text-label bg-cinema-black border border-pure-white/20 rounded-md text-pure-white px-10 py-5 mt-4 hover:bg-pure-white hover:text-cinema-black transition-all duration-500 disabled:opacity-50 shadow-2xl relative z-50"
            >
              {status === "loading" ? "Sending..." : "Submit Inquiry"}
            </button>

            {message && (
              <p
                className={`text-sm ${
                  status === "error" ? "text-cinema-red-glow" : "text-warm-muted"
                }`}
              >
                {message}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
