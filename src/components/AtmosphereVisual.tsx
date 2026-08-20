import React from "react";
import { EyeOfHorus, NileWaveLines, VintageStar, PalmFrond, FeluccaSilhouette } from "./EgyptianDecorations";
import PosterLabel from "./PosterLabel";

export default function AtmosphereVisual() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-parchment-300/30 border-y-3 border-ink relative overflow-hidden">
      {/* Background Halftone */}
      <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

      {/* Terracotta Sun in background */}
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] rounded-full bg-terracotta/15 border-2 border-terracotta/20 pointer-events-none -z-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Banner Header */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-egyptian-green" />
            <PosterLabel variant="ink" size="sm">
              SUMMER NIGHT VIBES
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-egyptian-green" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            Sailing Under Cairo Stars
          </h2>
          <NileWaveLines className="w-28 h-3.5 text-terracotta mx-auto mt-2" />
        </div>

        {/* Illustrated Graphic Scene */}
        <div className="relative bg-parchment-light border-3 border-ink p-5 sm:p-8 shadow-vintage-lg rounded-xs overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center text-center">
            {/* 01: Sound */}
            <div className="text-left border-l-3 border-terracotta pl-3.5 space-y-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-terracotta">
                01 • THE SOUND
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                Arabic Nostalgia & Modern Electronic
              </h3>
              <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                DJ Virus blends high-energy Arabic classics with groovy electronic tracks drifting across the river.
              </p>
            </div>

            {/* Center Boat Crest */}
            <div className="flex flex-col items-center justify-center p-4 bg-parchment border-2 border-ink rounded-xs shadow-stamp">
              <EyeOfHorus className="w-10 h-7 text-ink" />
              <div className="my-2">
                <FeluccaSilhouette className="w-20 h-20 text-ink mx-auto" />
              </div>
              <NileWaveLines className="w-32 h-3.5 text-terracotta" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink mt-2">
                Cairo River Session
              </span>
            </div>

            {/* 02: BYOB */}
            <div className="text-left border-l-3 border-egyptian-green pl-3.5 space-y-1">
              <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-egyptian-green">
                02 • THE ATMOSPHERE
              </span>
              <h3 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                Grab Your Drink & Set Sail
              </h3>
              <p className="font-body text-xs sm:text-sm text-ink/80 leading-relaxed">
                Bring your favorite beverages. Ice, glassware, mixers, and comfortable seating are all prepared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
