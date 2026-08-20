import React from "react";

export function EyeOfHorus({ className = "w-8 h-8 text-ink" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Eye outline */}
      <path d="M 10 30 Q 50 5 90 30 Q 50 55 10 30 Z" fill="currentColor" fillOpacity="0.1" />
      {/* Iris / Pupil */}
      <circle cx="50" cy="30" r="12" fill="currentColor" />
      <circle cx="53" cy="27" r="4" fill="#EFE6D5" />
      {/* Wadjet tear drop & spiral tail */}
      <path d="M 50 42 L 50 58" strokeWidth="5" />
      <path d="M 65 37 Q 75 50 65 58 Q 55 58 60 50" strokeWidth="4" />
      {/* Eyebrow */}
      <path d="M 15 18 Q 50 2 85 18" strokeWidth="4" />
    </svg>
  );
}

export function AnkhSymbol({ className = "w-6 h-10 text-ink" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 50 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Loop */}
      <ellipse cx="25" cy="22" rx="14" ry="16" />
      {/* Crossbar */}
      <line x1="8" y1="42" x2="42" y2="42" />
      {/* Stem */}
      <line x1="25" y1="42" x2="25" y2="76" />
    </svg>
  );
}

export function NileWaveLines({ className = "w-24 h-4 text-terracotta" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M 5 6 Q 15 1 25 6 T 45 6 T 65 6 T 85 6 T 105 6 T 115 6" />
      <path d="M 5 14 Q 15 9 25 14 T 45 14 T 65 14 T 85 14 T 105 14 T 115 14" />
    </svg>
  );
}

export function VintageStar({ className = "w-6 h-6 text-egyptian-green" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="currentColor"
      className={className}
    >
      {/* 4-point star with vintage sharp points */}
      <path d="M 20 2 Q 20 18 38 20 Q 20 22 20 38 Q 20 22 2 20 Q 20 18 20 2 Z" />
    </svg>
  );
}

export function LotusBlossom({ className = "w-10 h-10 text-egyptian-green" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Central petal */}
      <path d="M 30 10 C 25 25 25 45 30 52 C 35 45 35 25 30 10 Z" fill="currentColor" fillOpacity="0.2" />
      {/* Left petal */}
      <path d="M 30 52 C 20 48 10 35 12 20 C 18 30 24 42 30 52 Z" />
      {/* Right petal */}
      <path d="M 30 52 C 40 48 50 35 48 20 C 42 30 36 42 30 52 Z" />
      {/* Outer wings */}
      <path d="M 12 20 C 5 28 6 42 22 52" />
      <path d="M 48 20 C 55 28 54 42 38 52" />
      {/* Base stem */}
      <line x1="30" y1="52" x2="30" y2="58" strokeWidth="4" />
    </svg>
  );
}

export function HorusFalcon({ className = "w-12 h-14 text-ink" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Falcon head with crown */}
      <path d="M 25 8 Q 35 6 42 12 Q 46 16 38 20 Q 30 20 26 24" />
      {/* Beak */}
      <path d="M 42 12 L 48 15 L 42 18 Z" fill="currentColor" />
      {/* Eye mark */}
      <circle cx="34" cy="14" r="2.5" fill="currentColor" />
      <path d="M 34 16 L 34 22" strokeWidth="2" />
      {/* Body & Wing */}
      <path d="M 26 24 C 20 32 18 50 20 62 L 32 62 C 38 52 42 36 38 20" fill="currentColor" fillOpacity="0.15" />
      {/* Tail feathers */}
      <path d="M 20 62 L 16 68 L 26 68 L 24 62" />
      {/* Wing texture lines */}
      <path d="M 24 32 Q 32 40 36 50" />
      <path d="M 22 42 Q 28 48 32 56" />
    </svg>
  );
}

export function HieroglyphicCartoucheStrip({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-between p-3 rounded-full border-2 border-egyptian-green bg-parchment-light/80 shadow-stamp ${className}`}
    >
      <AnkhSymbol className="w-6 h-9 text-egyptian-green my-1" />
      <HorusFalcon className="w-7 h-9 text-ink my-1" />
      <NileWaveLines className="w-8 h-3 text-terracotta my-1" />
      <EyeOfHorus className="w-7 h-5 text-ink my-1" />
      <LotusBlossom className="w-6 h-7 text-egyptian-green my-1" />
    </div>
  );
}

export function FeluccaSilhouette({ className = "w-20 h-20 text-ink" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Main triangular sail (Lateen sail) */}
      <path
        d="M 50 10 Q 52 45 78 68 L 30 68 Q 38 40 50 10 Z"
        fill="currentColor"
        fillOpacity="0.25"
      />
      {/* Mast & Spar */}
      <line x1="50" y1="8" x2="30" y2="70" strokeWidth="4" />
      <line x1="45" y1="6" x2="80" y2="70" strokeWidth="3" />
      {/* Boat Hull */}
      <path
        d="M 12 70 Q 50 82 88 70 Q 82 86 50 86 Q 18 86 12 70 Z"
        fill="currentColor"
      />
      {/* Nile Water Rhythms */}
      <path d="M 5 88 Q 25 84 45 88 T 85 88 T 98 88" strokeWidth="2.5" />
      <path d="M 15 94 Q 35 90 55 94 T 90 94" strokeWidth="2" />
    </svg>
  );
}

export function PalmFrond({ className = "w-16 h-16 text-egyptian-green" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Stem */}
      <path d="M 10 90 Q 50 70 85 15" strokeWidth="4" />
      {/* Left Leaflets */}
      <path d="M 30 73 Q 15 60 10 50" />
      <path d="M 45 60 Q 25 45 20 30" />
      <path d="M 60 45 Q 40 28 35 15" />
      <path d="M 75 30 Q 60 15 55 5" />
      {/* Right Leaflets */}
      <path d="M 35 70 Q 55 60 65 52" />
      <path d="M 50 55 Q 70 45 80 35" />
      <path d="M 65 40 Q 85 30 92 20" />
      <path d="M 78 25 Q 92 18 96 10" />
    </svg>
  );
}
