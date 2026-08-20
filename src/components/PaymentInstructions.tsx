"use client";

import React, { useState } from "react";
import { Copy, Check, Smartphone, Sparkles } from "lucide-react";
import { eventConfig } from "@/lib/config";
import PosterLabel from "./PosterLabel";
import { NileWaveLines, VintageStar } from "./EgyptianDecorations";

export default function PaymentInstructions() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<number>(0);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const steps = [
    { num: "01", title: "Transfer", desc: "Send total amount for your party via InstaPay or Vodafone Cash." },
    { num: "02", title: "Screenshot", desc: "Save screenshot of successful payment confirmation." },
    { num: "03", title: "Register", desc: "Fill in guest details below and upload your transfer screenshot." },
    { num: "04", title: "Confirm", desc: "Receive your booking code (FLK-XXXX) & dock info via WhatsApp." },
  ];

  return (
    <section id="payment-guide" className="w-full py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative scroll-mt-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="terracotta" size="sm" rotate="left">
              PAYMENT & TICKETS
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            Secure Your Spot
          </h2>

          <div className="mt-2 inline-flex items-center gap-2 bg-parchment-light border-2 border-ink px-4 py-1.5 shadow-stamp">
            <span className="font-mono text-xs uppercase font-bold text-ink/70">Ticket:</span>
            <span className="font-display text-xl sm:text-2xl text-terracotta">{eventConfig.ticketPrice.formatted}</span>
            <span className="font-mono text-xs text-ink/70">/ guest</span>
          </div>

          <NileWaveLines className="w-28 h-3.5 text-egyptian-green mx-auto mt-3" />
        </div>

        {/* 4 Steps Quick Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mb-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-parchment-light border-2 border-ink p-3 sm:p-4 shadow-stamp rounded-xs flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-display text-xl sm:text-2xl text-terracotta">
                  {step.num}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-egyptian-green" />
              </div>
              <h3 className="font-heading text-sm sm:text-base font-bold text-ink uppercase">
                {step.title}
              </h3>
              <p className="font-body text-xs text-ink/80 leading-relaxed mt-0.5">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 2-Column Intentional Editorial Layout on Desktop / Stacked on Mobile */}
        <div className="bg-parchment-light border-3 border-ink p-5 sm:p-7 shadow-vintage-lg rounded-xs">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink/20 mb-4 sm:mb-6">
            <div>
              <h3 className="font-heading text-lg sm:text-xl text-ink font-bold uppercase">
                Official Payment Channels
              </h3>
              <p className="font-mono text-xs text-ink/70">
                Choose your method and copy account details with one tap
              </p>
            </div>
            <PosterLabel variant="green" size="sm">
              VERIFIED
            </PosterLabel>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
            {/* 1. InstaPay Ticket */}
            <div
              onClick={() => setSelectedMethod(0)}
              className={`border-2 p-4 sm:p-5 rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                selectedMethod === 0
                  ? "border-terracotta bg-terracotta/10 shadow-vintage-terracotta"
                  : "border-ink bg-parchment hover:bg-parchment-300/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-parchment border-2 border-ink rounded shadow-stamp flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-terracotta" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                        {eventConfig.paymentMethods[0].name}
                      </h4>
                      <p className="font-mono text-xs text-ink/70">
                        {eventConfig.paymentMethods[0].instructions}
                      </p>
                    </div>
                  </div>

                  {selectedMethod === 0 && (
                    <span className="px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-bold rounded flex-shrink-0">
                      SELECTED
                    </span>
                  )}
                </div>

                <div className="bg-parchment-light border-2 border-ink p-3 rounded-xs my-2 font-mono text-sm sm:text-base font-bold text-ink select-all break-all text-center">
                  {eventConfig.paymentMethods[0].accountIdentifier}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-ink/60">
                  Tap to copy address
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const valToCopy = eventConfig.paymentMethods[0].copyValue || eventConfig.paymentMethods[0].accountIdentifier;
                    handleCopy(valToCopy, 0);
                  }}
                  className="min-h-[44px] px-5 py-2 bg-ink text-parchment hover:bg-terracotta font-mono text-xs font-bold uppercase transition-colors shadow-stamp flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedIndex === 0 ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* 2. Vodafone Cash Ticket */}
            <div
              onClick={() => setSelectedMethod(1)}
              className={`border-2 p-4 sm:p-5 rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                selectedMethod === 1
                  ? "border-terracotta bg-terracotta/10 shadow-vintage-terracotta"
                  : "border-ink bg-parchment hover:bg-parchment-300/40"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-parchment border-2 border-ink rounded shadow-stamp flex-shrink-0">
                      <Smartphone className="w-5 h-5 text-egyptian-green" />
                    </div>
                    <div>
                      <h4 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                        {eventConfig.paymentMethods[1].name}
                      </h4>
                      <p className="font-mono text-xs text-ink/70">
                        {eventConfig.paymentMethods[1].instructions}
                      </p>
                    </div>
                  </div>

                  {selectedMethod === 1 && (
                    <span className="px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-bold rounded flex-shrink-0">
                      SELECTED
                    </span>
                  )}
                </div>

                <div className="bg-parchment-light border-2 border-ink p-3 rounded-xs my-2 font-mono text-sm sm:text-base font-bold text-ink select-all break-all text-center tracking-wider">
                  {eventConfig.paymentMethods[1].accountIdentifier}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-ink/20 flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] text-ink/60">
                  Tap to copy number
                </span>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    const valToCopy = eventConfig.paymentMethods[1].copyValue || eventConfig.paymentMethods[1].accountIdentifier;
                    handleCopy(valToCopy, 1);
                  }}
                  className="min-h-[44px] px-5 py-2 bg-ink text-parchment hover:bg-terracotta font-mono text-xs font-bold uppercase transition-colors shadow-stamp flex items-center gap-1.5 flex-shrink-0"
                >
                  {copiedIndex === 1 ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
