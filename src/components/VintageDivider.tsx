import React from "react";
import { VintageStar, EyeOfHorus, NileWaveLines } from "./EgyptianDecorations";

interface VintageDividerProps {
  label?: string;
  variant?: "wave" | "hieroglyph" | "terracotta" | "minimal";
  className?: string;
}

export default function VintageDivider({
  label,
  variant = "wave",
  className = "",
}: VintageDividerProps) {
  return (
    <div className={`w-full py-3 sm:py-5 flex items-center justify-center ${className}`}>
      <div className="relative w-full max-w-4xl flex items-center justify-center px-4">
        {/* Left decorative line */}
        <div className="flex-1 flex items-center space-x-2">
          <div className="h-[2px] w-full bg-ink/25 border-b border-dashed border-ink/40" />
          <VintageStar className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
          <NileWaveLines className="w-12 h-2.5 text-egyptian-green hidden sm:block flex-shrink-0" />
        </div>

        {/* Center element */}
        {label ? (
          <div className="mx-3 px-3 py-1 border-2 border-ink bg-parchment-light shadow-stamp -rotate-1 rounded-xs flex items-center space-x-1.5 flex-shrink-0">
            <EyeOfHorus className="w-4 h-3.5 text-egyptian-green" />
            <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase text-ink">
              {label}
            </span>
            <VintageStar className="w-3 h-3 text-terracotta" />
          </div>
        ) : (
          <div className="mx-3 flex items-center space-x-2">
            <VintageStar className="w-3.5 h-3.5 text-egyptian-green" />
            <EyeOfHorus className="w-5 h-4 text-ink" />
            <VintageStar className="w-3.5 h-3.5 text-terracotta" />
          </div>
        )}

        {/* Right decorative line */}
        <div className="flex-1 flex items-center space-x-2">
          <NileWaveLines className="w-12 h-2.5 text-egyptian-green hidden sm:block flex-shrink-0" />
          <VintageStar className="w-3.5 h-3.5 text-terracotta flex-shrink-0" />
          <div className="h-[2px] w-full bg-ink/25 border-b border-dashed border-ink/40" />
        </div>
      </div>
    </div>
  );
}
