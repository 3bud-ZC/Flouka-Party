import React from "react";
import { MessageCircle, Phone, Instagram, ArrowUpRight } from "lucide-react";
import { eventConfig, getWhatsAppLink } from "@/lib/config";
import PosterLabel from "./PosterLabel";
import { VintageStar, NileWaveLines } from "./EgyptianDecorations";

export default function ContactActions() {
  const whatsappUrl = getWhatsAppLink();

  return (
    <section id="contact" className="w-full py-8 sm:py-10 px-4 sm:px-6 lg:px-8 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="green" size="sm">
              ORGANIZER CONTACT
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            Have Questions?
          </h2>

          <p className="font-body text-sm sm:text-base text-ink/80 max-w-md mx-auto mt-1">
            Reach out directly for booking inquiries, large groups, or VIP boat arrangements.
          </p>

          <NileWaveLines className="w-24 h-3 text-terracotta mx-auto mt-2" />
        </div>

        {/* 3 Balanced Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
          {/* 1. WhatsApp Action Card (Primary) */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[160px] bg-parchment-light border-3 border-ink p-5 shadow-vintage hover:shadow-vintage-lg hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-egyptian-green text-white border-2 border-ink shadow-stamp rounded-xs">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <PosterLabel variant="green" size="sm">
                  PRIMARY
                </PosterLabel>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                WhatsApp Chat
              </h3>
              <p className="font-mono text-xs text-ink/70 mt-1 leading-relaxed">
                Fastest response for confirmations & inquiries.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between font-mono text-xs font-bold text-egyptian-green group-hover:text-ink">
              <span>{eventConfig.contact.whatsappDisplay}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 2. Instagram Card */}
          <a
            href={eventConfig.contact.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[160px] bg-parchment-light border-3 border-ink p-5 shadow-vintage hover:shadow-vintage-lg hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-terracotta text-white border-2 border-ink shadow-stamp rounded-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <PosterLabel variant="terracotta" size="sm">
                  SOCIAL
                </PosterLabel>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                Instagram
              </h3>
              <p className="font-mono text-xs text-ink/70 mt-1 leading-relaxed">
                Party announcements & stories.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between font-mono text-xs font-bold text-terracotta group-hover:text-ink">
              <span>{eventConfig.contact.instagramHandle}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>

          {/* 3. Direct Phone Line */}
          <a
            href={`tel:${eventConfig.contact.phoneContact}`}
            className="min-h-[160px] bg-parchment-light border-3 border-ink p-5 shadow-vintage hover:shadow-vintage-lg hover:-translate-y-1 transition-all rounded-xs flex flex-col justify-between group cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 bg-ink text-white border-2 border-ink shadow-stamp rounded-xs">
                  <Phone className="w-5 h-5 text-yellow-300" />
                </div>
                <PosterLabel variant="stamp" size="sm">
                  PHONE
                </PosterLabel>
              </div>

              <h3 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                Direct Call
              </h3>
              <p className="font-mono text-xs text-ink/70 mt-1 leading-relaxed">
                Urgent boarding coordination on event night.
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between font-mono text-xs font-bold text-ink group-hover:text-terracotta">
              <span>{eventConfig.contact.whatsappDisplay}</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
