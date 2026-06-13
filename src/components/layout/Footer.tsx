import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="section-pad py-16 bg-cinema-black border-t border-cinema-red/40">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
        <div>
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/logo.png"
              alt="91-11 Productions Logo"
              width={120}
              height={120}
              className="w-24 h-auto md:w-32 object-contain bg-white/5 rounded-xl p-2"
            />
          </Link>
          <p className="text-pure-white/60 text-sm max-w-sm">{SITE.tagline}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm">
          <div>
            <p className="text-label-red mb-3">Contact</p>
            <a
              href={`mailto:${SITE.email}`}
              className="text-pure-white hover:text-cinema-red-glow transition-colors block mb-1"
            >
              {SITE.email}
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s/g, "")}`}
              className="text-pure-white/60 hover:text-pure-white transition-colors block"
            >
              {SITE.phone}
            </a>
          </div>
          <div>
            <p className="text-label-red mb-3">Explore</p>
            <Link
              href="/founder"
              className="text-pure-white/60 hover:text-pure-white transition-colors block mb-1"
            >
              Founder
            </Link>
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pure-white/60 hover:text-pure-white transition-colors"
            >
              {SITE.instagram}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-cinema-red/30 flex flex-col sm:flex-row justify-between gap-4 text-xs text-silver-dim">
        <p>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
        <p>
          Founded by{" "}
          <Link
            href="/founder"
            className="text-cinema-red hover:text-cinema-red-glow transition-colors"
          >
            {SITE.founder}
          </Link>
        </p>
      </div>
    </footer>
  );
}
