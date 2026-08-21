"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Copy, Check, MessageCircle, Clock, ArrowRight } from "lucide-react";
import { eventConfig, getWhatsAppLink } from "@/lib/config";
import { NileWaveLines, VintageStar } from "./EgyptianDecorations";
import PosterLabel from "./PosterLabel";

interface ConfirmationViewProps {
  bookingReference: string;
  fullName: string;
  guestCount: number;
  paymentMethod: string;
  onReset?: () => void;
}

export default function ConfirmationView({
  bookingReference,
  fullName,
  guestCount,
  paymentMethod,
  onReset,
}: ConfirmationViewProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D95338", "#45533F", "#171B1E", "#D4A359", "#FAF6ED"],
      });
    } catch {
      // Graceful fallback
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingReference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappUrl = getWhatsAppLink(bookingReference);

  return (
    <div className="w-full max-w-2xl mx-auto my-6 p-6 sm:p-10 bg-parchment-light border-3 border-ink shadow-vintage-lg rounded-xs relative overflow-hidden">
      {/* Halftone texture background */}
      <div className="absolute inset-0 bg-halftone pointer-events-none" />

      {/* Decorative top stamp banner */}
      <div className="relative z-10 flex flex-col items-center text-center space-y-3.5">
        <div className="flex items-center space-x-3">
          <VintageStar className="w-5 h-5 text-terracotta animate-spin-slow" />
          <PosterLabel variant="green" size="sm" rotate="left">
            BOOKING RECEIVED
          </PosterLabel>
          <VintageStar className="w-5 h-5 text-terracotta animate-spin-slow" />
        </div>

        <h2 className="font-display text-4xl sm:text-5xl text-ink leading-tight text-ink-shadow uppercase">
          You&apos;re On The List!
        </h2>

        <p className="font-heading text-lg sm:text-xl text-terracotta font-semibold">
          Flukah Party • 01 / 09 • {eventConfig.time}
        </p>

        <NileWaveLines className="w-32 h-4 text-terracotta my-1.5" />

        {/* Big Booking Reference Ticket */}
        <div className="w-full bg-parchment border-2 border-dashed border-ink p-5 sm:p-6 rounded-xs shadow-stamp my-3 relative">
          <div className="text-xs font-mono font-bold uppercase tracking-widest text-ink/70 mb-1">
            Your Booking Reference
          </div>

          <div className="flex items-center justify-center gap-3 my-2">
            <span className="font-mono text-3xl sm:text-4xl font-bold tracking-widest text-ink bg-parchment-light px-4 py-1.5 border-2 border-ink shadow-stamp rounded-xs">
              {bookingReference}
            </span>

            <button
              onClick={handleCopy}
              className="p-2.5 bg-ink text-parchment hover:bg-terracotta transition-colors border border-ink shadow-stamp rounded-xs flex items-center gap-1.5"
              title="Copy Booking Reference"
              aria-label="Copy Booking Reference"
            >
              {copied ? (
                <Check className="w-5 h-5 text-emerald-400" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </button>
          </div>

          {copied && (
            <p className="font-mono text-xs text-egyptian-green font-bold animate-pulse">
              ✓ Reference copied to clipboard!
            </p>
          )}

          {/* Details summary */}
          <div className="mt-4 pt-4 border-t border-ink/20 grid grid-cols-2 sm:grid-cols-3 gap-2 text-left font-mono text-xs text-ink">
            <div>
              <span className="text-ink/60 block">Guest Name:</span>
              <span className="font-bold">{fullName}</span>
            </div>
            <div>
              <span className="text-ink/60 block">Party Size:</span>
              <span className="font-bold">{guestCount} {guestCount === 1 ? "Guest" : "Guests"}</span>
            </div>
            <div>
              <span className="text-ink/60 block">Payment Method:</span>
              <span className="font-bold capitalize">{paymentMethod.replace("_", " ")}</span>
            </div>
          </div>
        </div>

        {/* Status notice */}
        <div className="w-full bg-egyptian-green/10 border-2 border-egyptian-green p-4 rounded-xs text-left flex items-start gap-3">
          <Clock className="w-5 h-5 text-egyptian-green flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-ink leading-relaxed">
            <strong className="block font-bold text-egyptian-green uppercase tracking-wide mb-0.5">
              Status: Payment Verification Pending
            </strong>
            Please keep your reference number <strong>{bookingReference}</strong> safe.
            Our team is reviewing your transfer screenshot. Confirmation and exact boarding coordinates will be sent directly via WhatsApp.
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="w-full pt-3 space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 px-6 bg-egyptian-green text-parchment-50 border-2 border-ink shadow-vintage hover:shadow-vintage-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 font-mono font-bold text-base sm:text-lg tracking-wider uppercase group"
          >
            <MessageCircle className="w-6 h-6 fill-parchment-50 text-egyptian-green" />
            <span>Confirm On WhatsApp</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>

          {onReset && (
            <button
              onClick={onReset}
              className="text-xs font-mono text-ink/70 hover:text-ink underline uppercase tracking-wider pt-2 block mx-auto"
            >
              Submit Another Reservation
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
