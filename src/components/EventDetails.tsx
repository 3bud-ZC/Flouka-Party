import React from "react";
import { Clock, Music2, Anchor, Users, GlassWater } from "lucide-react";
import { eventConfig } from "@/lib/config";
import PosterLabel from "./PosterLabel";
import { NileWaveLines, VintageStar } from "./EgyptianDecorations";

export default function EventDetails() {
  return (
    <section id="details" className="w-full py-6 sm:py-8 px-4 sm:px-6 lg:px-8 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto">
        {/* Section Stamp Header */}
        <div className="text-center mb-5 sm:mb-6">
          <div className="inline-flex items-center gap-2 mb-1.5">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="green" size="sm" rotate="left">
              EVENT SPECIFICATIONS
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            The Blueprint
          </h2>
          <NileWaveLines className="w-28 h-3 text-terracotta mx-auto mt-2" />
        </div>

        {/* Asymmetrical Poster-Style Layout */}
        <div className="bg-parchment-light border-3 border-ink shadow-vintage-lg p-5 sm:p-7 rounded-xs relative overflow-hidden">
          <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

          {/* Top Banner Row: Giant 01/09 + Sound Highlight Box */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center pb-5 border-b-2 border-dashed border-ink/30">
            {/* Left: Giant 01 / 09 Monument */}
            <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-ink/70">
                Official Date
              </span>
              <div className="my-1">
                <span className="font-display text-6xl sm:text-7xl md:text-8xl text-terracotta text-terracotta-shadow leading-none tracking-tight">
                  01 / 09
                </span>
              </div>
              <p className="font-heading text-lg sm:text-xl text-ink font-bold">
                Sunday Night • {eventConfig.fullDate}
              </p>
              <p className="font-mono text-xs text-egyptian-green font-semibold mt-0.5">
                Cairo, Nile River • Secret Pier
              </p>
            </div>

            {/* Right: Sound & Night Highlight Box */}
            <div className="lg:col-span-7 bg-parchment border-2 border-ink p-4 sm:p-5 rounded-xs shadow-stamp space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <PosterLabel variant="terracotta" size="sm">
                  SOUND CURATION
                </PosterLabel>
                <span className="font-mono text-xs font-bold text-ink uppercase">
                  {eventConfig.time}
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl sm:text-3xl text-ink uppercase">
                  {eventConfig.soundTagline}
                </h3>
                <p className="font-mono text-xs text-ink/80 mt-1">
                  Mixed Arabic Nostalgia & Deep Melodic Grooves all night.
                </p>
              </div>

              <div className="pt-2 border-t border-ink/20 flex flex-wrap items-center justify-between gap-2 font-mono text-xs">
                <span className="text-terracotta font-bold">
                  ✓ 4 Hours Sailing (11 PM – 3 AM)
                </span>
                <span className="text-egyptian-green font-bold">
                  ✓ BYOB (Ice & Cups Provided)
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Information Strips */}
          <div className="relative z-10 pt-5 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {/* Hours */}
            <div className="border-l-3 border-terracotta pl-3 py-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60 block">
                TIMING
              </span>
              <span className="font-heading text-base sm:text-lg font-bold text-ink block">
                11:00 PM – 3:00 AM
              </span>
              <span className="font-mono text-xs text-ink/70">
                Boarding starts 10:30 PM
              </span>
            </div>

            {/* Capacity */}
            <div className="border-l-3 border-egyptian-green pl-3 py-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60 block">
                CAPACITY
              </span>
              <span className="font-heading text-base sm:text-lg font-bold text-ink block">
                Limited Guests Only
              </span>
              <span className="font-mono text-xs text-ink/70">
                Curated guest list
              </span>
            </div>

            {/* Drinks Policy */}
            <div className="border-l-3 border-ink pl-3 py-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink/60 block">
                BEVERAGES
              </span>
              <span className="font-heading text-base sm:text-lg font-bold text-ink block">
                Grab Your Drink (BYOB)
              </span>
              <span className="font-mono text-xs text-ink/70">
                Mixers & ice on deck
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
