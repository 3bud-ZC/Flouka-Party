import React from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import PosterLabel from "./PosterLabel";
import { NileWaveLines, VintageStar } from "./EgyptianDecorations";

export default function FinalCTA() {
  return (
    <section className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-parchment-light border-t-3 border-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-halftone opacity-35 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <VintageStar className="w-4 h-4 text-terracotta animate-spin-slow" />
          <PosterLabel variant="terracotta" size="md" rotate="left">
            SEPTEMBER 1ST • CAIRO
          </PosterLabel>
          <VintageStar className="w-4 h-4 text-terracotta animate-spin-slow" />
        </div>

        {/* Large Poster Statement */}
        <h2 className="font-display text-4xl sm:text-6xl md:text-7xl text-ink uppercase tracking-tight leading-[0.95] text-ink-shadow mb-3">
          The Nile.
          <span className="block text-terracotta text-terracotta-shadow">
            The Music.
          </span>
          <span className="block text-egyptian-green">
            The Night.
          </span>
        </h2>

        {/* Big Date and Capacity */}
        <div className="my-3 flex flex-wrap items-center justify-center gap-3">
          <span className="font-display text-3xl sm:text-4xl text-ink tracking-tight bg-parchment px-3 py-1 border-2 border-ink shadow-stamp rounded-xs">
            01 / 09
          </span>
          <span className="font-heading text-lg sm:text-xl text-terracotta font-bold uppercase tracking-wider">
            11 PM – 3 AM
          </span>
          <PosterLabel variant="green" size="sm" rotate="right">
            LIMITED GUESTS
          </PosterLabel>
        </div>

        <NileWaveLines className="w-36 sm:w-48 h-4 text-terracotta mx-auto my-3" />

        {/* Big Final CTA Button */}
        <div className="pt-1">
          <a
            href="#reservation"
            className="inline-flex items-center justify-center gap-2.5 min-h-[50px] py-3.5 sm:py-4 px-7 sm:px-10 bg-terracotta text-parchment-50 border-3 border-ink shadow-vintage-lg hover:bg-terracotta-dark hover:shadow-vintage active:translate-y-0.5 transition-all font-display text-xl sm:text-2xl uppercase tracking-wider group"
          >
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span>Get On The List</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
