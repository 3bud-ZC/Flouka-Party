import React from "react";

interface PosterLabelProps {
  children: React.ReactNode;
  variant?: "terracotta" | "green" | "ink" | "sand" | "stamp";
  rotate?: "left" | "right" | "none";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function PosterLabel({
  children,
  variant = "terracotta",
  rotate = "none",
  size = "md",
  className = "",
}: PosterLabelProps) {
  const variantStyles = {
    terracotta: "bg-terracotta text-parchment-50 border-2 border-ink shadow-vintage",
    green: "bg-egyptian-green text-parchment-50 border-2 border-ink shadow-vintage",
    ink: "bg-ink text-parchment-50 border-2 border-terracotta shadow-vintage-terracotta",
    sand: "bg-parchment-300 text-ink border-2 border-ink shadow-vintage",
    stamp: "bg-parchment-light text-ink border-2 border-dashed border-ink shadow-stamp",
  };

  const rotateStyles = {
    left: "-rotate-2 hover:rotate-0 transition-transform duration-200",
    right: "rotate-2 hover:rotate-0 transition-transform duration-200",
    none: "",
  };

  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs font-mono tracking-wider font-bold",
    md: "px-4 py-1.5 text-sm font-mono tracking-wider font-bold",
    lg: "px-6 py-2.5 text-base md:text-lg font-mono tracking-widest font-bold",
  };

  return (
    <div
      className={`inline-flex items-center justify-center uppercase select-none rounded-xs ${variantStyles[variant]} ${rotateStyles[rotate]} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </div>
  );
}
