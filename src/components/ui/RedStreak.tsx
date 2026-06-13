"use client";

export function RedStreak({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="red-streak-line" />
    </div>
  );
}

export function SectionDivider() {
  return (
    <div className="section-pad py-0" aria-hidden>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-cinema-red to-transparent opacity-60" />
    </div>
  );
}
