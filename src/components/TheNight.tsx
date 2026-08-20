import React from "react";
import { Disc3, Moon, Eye, Anchor } from "lucide-react";
import PosterLabel from "./PosterLabel";
import {
  EyeOfHorus,
  NileWaveLines,
  VintageStar,
  FeluccaSilhouette,
} from "./EgyptianDecorations";

export default function TheNight() {
  const experiences = [
    {
      id: "music",
      title: "Mixed Music",
      subtitle: "Arabic & English Beats",
      desc: "Curated soundscapes from classic oriental grooves to deep modern electronic anthems by DJ Virus.",
      badge: "DJ VIRUS",
      badgeVariant: "green" as const,
      rotate: "left" as const,
      icon: <Disc3 className="w-6 h-6 text-terracotta" />,
    },
    {
      id: "nile",
      title: "On The Nile",
      subtitle: "Felucca Atmosphere",
      desc: "An open-air wooden Felucca gliding through Cairo’s river currents under the warm night breeze.",
      badge: "RIVER CRUISE",
      badgeVariant: "terracotta" as const,
      rotate: "right" as const,
      icon: <FeluccaSilhouette className="w-7 h-7 text-ink" />,
    },
    {
      id: "time",
      title: "11 PM — 5 AM",
      subtitle: "Six Hours After Dark",
      desc: "Boarding at midnight, sailing until first light. 6 continuous hours of uninterrupted music and energy.",
      badge: "ALL NIGHT",
      badgeVariant: "stamp" as const,
      rotate: "left" as const,
      icon: <Moon className="w-6 h-6 text-egyptian-green" />,
    },
    {
      id: "capacity",
      title: "Limited Guests",
      subtitle: "Curated Capacity",
      desc: "Strictly limited guest list to ensure intimate vibe, space to dance, and comfortable sailing.",
      badge: "LIMITED",
      badgeVariant: "ink" as const,
      rotate: "right" as const,
      icon: <EyeOfHorus className="w-7 h-5 text-terracotta" />,
    },
  ];

  return (
    <section id="the-night" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="sand" size="sm">
              THE EXPERIENCE
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            The Night
          </h2>

          <p className="font-heading text-lg sm:text-xl text-terracotta font-semibold mt-1">
            “Music. Nile air. A felucca. One long summer night.”
          </p>

          <NileWaveLines className="w-28 h-3.5 text-egyptian-green mx-auto mt-2" />
        </div>

        {/* Asymmetrical 2x2 Ticket Stamps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative bg-parchment-light border-3 border-ink p-5 sm:p-6 shadow-vintage rounded-xs overflow-hidden"
            >
              <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

              <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-parchment border-2 border-ink shadow-stamp rounded-xs">
                    {exp.icon}
                  </div>
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl text-ink uppercase leading-tight">
                      {exp.title}
                    </h3>
                    <span className="font-mono text-xs font-bold text-terracotta uppercase">
                      {exp.subtitle}
                    </span>
                  </div>
                </div>

                <PosterLabel variant={exp.badgeVariant} size="sm" rotate={exp.rotate}>
                  {exp.badge}
                </PosterLabel>
              </div>

              <p className="relative z-10 font-body text-sm sm:text-base text-ink/80 leading-relaxed pt-2 border-t border-dashed border-ink/20">
                {exp.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
