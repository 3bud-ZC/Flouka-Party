"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown, Sparkles, Anchor, Clock, GlassWater } from "lucide-react";
import { eventConfig } from "@/lib/config";
import PosterLabel from "./PosterLabel";
import {
  EyeOfHorus,
  NileWaveLines,
  VintageStar,
  HieroglyphicCartoucheStrip,
  PalmFrond,
} from "./EgyptianDecorations";

export default function Hero() {
  return (
    <section className="relative w-full flex flex-col justify-between overflow-hidden pt-3 sm:pt-6 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 border-b-3 border-ink">
      {/* Background Halftone */}
      <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

      {/* Floating decorative palms */}
      <div className="absolute -top-6 -left-6 opacity-30 sm:opacity-45 pointer-events-none rotate-12">
        <PalmFrond className="w-28 h-28 sm:w-44 sm:h-44 text-egyptian-green" />
      </div>
      <div className="absolute top-1/3 -right-8 opacity-25 sm:opacity-35 pointer-events-none -rotate-45">
        <PalmFrond className="w-32 h-32 sm:w-48 sm:h-48 text-egyptian-green" />
      </div>

      {/* Top Banner Navigation Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between py-2 border-b-2 border-ink/20 mb-4 sm:mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-terracotta animate-pulse" />
          <span className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-ink">
            Nile Edition • Cairo
          </span>
        </div>

        <div className="hidden md:flex items-center space-x-6 font-mono text-xs font-bold uppercase tracking-wider text-ink">
          <a href="#the-night" className="hover:text-terracotta transition-colors">
            The Night
          </a>
          <a href="#details" className="hover:text-terracotta transition-colors">
            Details
          </a>
          <a href="#payment-guide" className="hover:text-terracotta transition-colors">
            Payment
          </a>
          <a href="#contact" className="hover:text-terracotta transition-colors">
            Contact
          </a>
        </div>

        <a
          href="#reservation"
          className="px-3 py-1.5 bg-ink text-parchment-50 border border-ink shadow-stamp hover:bg-terracotta transition-colors font-mono text-xs font-bold uppercase tracking-wider"
        >
          Reserve Spot
        </a>
      </header>

      {/* Main Hero Asymmetrical Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
        {/* Left Column: Expressive Typography */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-3.5 sm:space-y-4">
          {/* Eyebrow Stamp Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <PosterLabel variant="green" size="sm" rotate="left">
              SOUND BY {eventConfig.djName}
            </PosterLabel>

            <PosterLabel variant="stamp" size="sm">
              <span className="flex items-center gap-1">
                <Anchor className="w-3.5 h-3.5 text-ink" />
                {eventConfig.partyType}
              </span>
            </PosterLabel>

            <PosterLabel variant="terracotta" size="sm" rotate="right">
              {eventConfig.capacityText}
            </PosterLabel>
          </div>

          {/* Oversized Custom Poster Typography */}
          <div className="relative">
            <div className="flex items-center gap-2 mb-1">
              <EyeOfHorus className="w-8 h-6 text-ink" />
              <VintageStar className="w-3.5 h-3.5 text-terracotta" />
            </div>

            <h1 className="font-display text-5xl sm:text-7xl md:text-8xl text-ink uppercase tracking-tight leading-[0.9] text-ink-shadow">
              Flukah
              <span className="block text-terracotta text-terracotta-shadow pl-3 sm:pl-6">
                Party
              </span>
            </h1>

            <NileWaveLines className="w-36 sm:w-56 h-4 text-terracotta mt-2.5" />
          </div>

          {/* Editorial Hook */}
          <p className="font-heading text-base sm:text-xl text-ink font-bold leading-snug">
            “Music. Nile air. A felucca. One summer night.”
          </p>

          <p className="font-body text-sm sm:text-base text-ink/80 leading-relaxed max-w-lg">
            Mixed Arabic & English sets by DJ Virus drifting under Cairo stars from 11 PM to 3 AM. Grab your drink, board the boat, and sail the Nile.
          </p>

          {/* Key Facts Pill Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
            <div className="border-2 border-ink bg-parchment-light p-2.5 shadow-stamp flex items-center gap-2">
              <span className="font-display text-2xl text-terracotta font-bold">1/9</span>
              <div className="text-[11px] font-mono leading-tight">
                <strong className="block text-ink uppercase">Date</strong>
                <span className="text-ink/70">Sept 1st</span>
              </div>
            </div>

            <div className="border-2 border-ink bg-parchment-light p-2.5 shadow-stamp flex items-center gap-2">
              <Clock className="w-4 h-4 text-egyptian-green flex-shrink-0" />
              <div className="text-[11px] font-mono leading-tight">
                <strong className="block text-ink uppercase">11 PM – 3 AM</strong>
                <span className="text-ink/70">4 Hours</span>
              </div>
            </div>

            <div className="border-2 border-ink bg-parchment-light p-2.5 shadow-stamp flex items-center gap-2 col-span-2 sm:col-span-1">
              <GlassWater className="w-4 h-4 text-terracotta flex-shrink-0" />
              <div className="text-[11px] font-mono leading-tight">
                <strong className="block text-ink uppercase">BYOB</strong>
                <span className="text-ink/70">Grab Your Drink</span>
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#reservation"
              className="min-h-[48px] py-3.5 px-6 bg-terracotta text-parchment-50 border-3 border-ink shadow-vintage-lg hover:bg-terracotta-dark hover:shadow-vintage active:translate-y-0.5 transition-all font-display text-lg sm:text-xl text-center uppercase tracking-wider flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>Reserve Your Spot</span>
            </a>

            <a
              href="#the-night"
              className="min-h-[44px] py-3 px-5 bg-parchment-light text-ink border-2 border-ink shadow-stamp hover:bg-ink hover:text-white transition-all font-mono text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-1.5"
            >
              <span>Party Details</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Integrated Poster Artwork */}
        <div className="lg:col-span-5 flex justify-center items-center relative pt-2 lg:pt-0">
          <div className="hidden xl:block absolute -left-10 top-6 z-20">
            <HieroglyphicCartoucheStrip className="w-12 h-64" />
          </div>

          <div className="relative w-full max-w-sm">
            <div className="absolute inset-0 bg-terracotta border-3 border-ink translate-x-2.5 translate-y-2.5 rounded-xs" />

            <div className="relative border-3 border-ink bg-parchment-light p-2 sm:p-2.5 shadow-vintage-lg rounded-xs overflow-hidden">
              <div className="relative aspect-[3/4] w-full overflow-hidden border-2 border-ink rounded-xs bg-ink/10">
                <Image
                  src="/poster.png"
                  alt="Flukah Party Official Poster - 01/09 DJ Virus"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-contain sm:object-cover"
                />
              </div>

              <div className="mt-2 pt-1.5 border-t border-dashed border-ink/40 flex items-center justify-between font-mono text-[11px] font-bold text-ink uppercase">
                <span className="flex items-center gap-1">
                  <VintageStar className="w-3 h-3 text-terracotta" />
                  Nile Edition
                </span>
                <span className="text-terracotta">01 / 09</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
