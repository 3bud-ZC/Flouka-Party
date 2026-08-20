import React from "react";
import { eventConfig } from "@/lib/config";
import { EyeOfHorus, NileWaveLines, VintageStar } from "./EgyptianDecorations";

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-parchment-200 border-t-3 border-ink pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Halftone texture overlay */}
      <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-parchment/20">
          {/* Col 1: Brand & Poster Title */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <EyeOfHorus className="w-7 h-5 text-terracotta" />
              <span className="font-display text-2xl sm:text-3xl text-parchment-50 tracking-wider uppercase">
                Flukah Party
              </span>
            </div>

            <p className="font-body text-xs text-parchment-300/80 max-w-sm leading-relaxed">
              An authentic Egyptian psychedelic Felucca party experience on the River Nile. Sound curated by DJ Virus.
            </p>

            <NileWaveLines className="w-32 h-3 text-terracotta" />
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-2 font-mono text-xs uppercase tracking-wider">
            <h4 className="font-bold text-terracotta mb-2">Navigation</h4>
            <ul className="space-y-1.5 text-parchment-300">
              <li>
                <a href="#the-night" className="hover:text-parchment-50 transition-colors">
                  The Experience
                </a>
              </li>
              <li>
                <a href="#details" className="hover:text-parchment-50 transition-colors">
                  Event Specs
                </a>
              </li>
              <li>
                <a href="#payment-guide" className="hover:text-parchment-50 transition-colors">
                  Payment Guide
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-terracotta transition-colors text-terracotta font-bold">
                  Reserve Spot
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Guidelines & Disclaimer */}
          <div className="space-y-2 font-mono text-xs">
            <h4 className="font-bold text-egyptian-gold uppercase tracking-wider mb-2">Important Notice</h4>
            <p className="text-parchment-400 text-[11px] leading-relaxed">
              • Strictly 21+ event.<br />
              • BYOB: Bring your favorite drinks.<br />
              • Felucca departs promptly at 11:00 PM.<br />
              • Boarding dock coordinates sent on WhatsApp.
            </p>
          </div>
        </div>

        {/* Bottom copyright & stamp */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-parchment-400/70">
          <div className="flex items-center gap-2">
            <VintageStar className="w-3.5 h-3.5 text-terracotta" />
            <span>© 2026 Flukah Party. All rights reserved. Cairo, Egypt.</span>
          </div>

          <div className="flex items-center gap-4 uppercase tracking-wider">
            <span className="border border-parchment/20 px-2 py-0.5 rounded text-egyptian-gold">
              01 / 09 • Cairo
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
