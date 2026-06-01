"use client";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0C0806] text-[#E8DCCF]">
      {/* Sleek warm glowing backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(176,122,79,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Glowing elegant custom spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border border-[#B07A4F]/10" />
          <div className="absolute inset-0 rounded-full border-t border-r border-[#B07A4F] animate-spin" />
        </div>

        {/* Brand Text */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-serif text-2xl font-light italic tracking-wider text-[#B07A4F] animate-pulse">
            Etno Konak
          </p>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#B07A4F]/40 to-transparent" />
          <p className="font-sans text-[9px] font-semibold uppercase tracking-[0.24em] text-[#A99380]">
            Učitavanje...
          </p>
        </div>
      </div>
    </div>
  );
}
