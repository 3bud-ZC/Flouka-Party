"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight } from "lucide-react";

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const reservationSection = document.getElementById("reservation");
    if (!reservationSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If reservation form is visible in viewport, hide sticky CTA
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(reservationSection);
    return () => observer.disconnect();
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 px-4 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-parchment/95 backdrop-blur-md border-t-3 border-ink md:hidden shadow-vintage-lg transition-transform duration-300"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        <div className="flex-1 min-w-0">
          <span className="font-mono text-[11px] font-bold text-terracotta uppercase tracking-wider block">
            01 / 09 • LIMITED GUESTS
          </span>
          <span className="font-heading text-sm font-bold text-ink truncate block">
            Flukah Party • DJ Virus
          </span>
        </div>

        <a
          href="#reservation"
          className="min-h-[44px] px-4 py-2 bg-terracotta text-parchment-50 border-2 border-ink shadow-vintage hover:bg-terracotta-dark active:translate-y-0.5 transition-all font-display text-sm uppercase tracking-wider flex items-center gap-1.5 flex-shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          <span>Reserve Spot</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
