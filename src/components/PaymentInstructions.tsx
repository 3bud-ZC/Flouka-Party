"use client";

import React, { useState } from "react";
import { Copy, Check, Smartphone, Building2, HelpCircle } from "lucide-react";
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
    { num: "01", title: "Transfer", desc: "Send total amount for your party via InstaPay or Cash wallet." },
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

        {/* Vertical Mobile-First Selectable Printed Payment Cards */}
        <div className="bg-parchment-light border-3 border-ink p-5 sm:p-7 shadow-vintage-lg rounded-xs">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink/20 mb-4">
            <div>
              <h3 className="font-heading text-lg sm:text-xl text-ink font-bold uppercase">
                Choose Payment Channel
              </h3>
              <p className="font-mono text-xs text-ink/70">
                Tap to select your preferred method & copy account details
              </p>
            </div>
            <PosterLabel variant="green" size="sm">
              VERIFIED
            </PosterLabel>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {/* InstaPay */}
            <div
              onClick={() => setSelectedMethod(0)}
              className={`border-2 p-4 sm:p-5 rounded-xs transition-all cursor-pointer ${
                selectedMethod === 0
                  ? "border-terracotta bg-terracotta/10 shadow-vintage-terracotta"
                  : "border-ink bg-parchment hover:bg-parchment-300/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-parchment border-2 border-ink rounded shadow-stamp flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-terracotta" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                        InstaPay
                      </h4>
                      {selectedMethod === 0 && (
                        <span className="px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-bold rounded">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-ink/70 mt-0.5">
                      Account: <strong>{eventConfig.paymentMethods[0].accountName}</strong>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <div className="flex-1 sm:flex-initial p-2.5 bg-parchment-light border border-ink font-mono text-xs sm:text-sm font-bold text-ink select-all break-all">
                    {eventConfig.paymentMethods[0].accountIdentifier}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(eventConfig.paymentMethods[0].accountIdentifier, 0);
                    }}
                    className="min-h-[44px] px-3.5 py-2 bg-ink text-parchment hover:bg-terracotta font-mono text-xs font-bold uppercase transition-colors shadow-stamp flex items-center gap-1 flex-shrink-0"
                  >
                    {copiedIndex === 0 ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Vodafone Cash */}
            <div
              onClick={() => setSelectedMethod(1)}
              className={`border-2 p-4 sm:p-5 rounded-xs transition-all cursor-pointer ${
                selectedMethod === 1
                  ? "border-terracotta bg-terracotta/10 shadow-vintage-terracotta"
                  : "border-ink bg-parchment hover:bg-parchment-300/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-parchment border-2 border-ink rounded shadow-stamp flex-shrink-0">
                    <Smartphone className="w-6 h-6 text-egyptian-green" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                        Vodafone Cash Wallet
                      </h4>
                      {selectedMethod === 1 && (
                        <span className="px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-bold rounded">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-ink/70 mt-0.5">
                      Wallet: <strong>{eventConfig.paymentMethods[1].accountName}</strong>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <div className="flex-1 sm:flex-initial p-2.5 bg-parchment-light border border-ink font-mono text-xs sm:text-sm font-bold text-ink select-all break-all">
                    {eventConfig.paymentMethods[1].accountIdentifier}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(eventConfig.paymentMethods[1].accountIdentifier, 1);
                    }}
                    className="min-h-[44px] px-3.5 py-2 bg-ink text-parchment hover:bg-terracotta font-mono text-xs font-bold uppercase transition-colors shadow-stamp flex items-center gap-1 flex-shrink-0"
                  >
                    {copiedIndex === 1 ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bank Transfer */}
            <div
              onClick={() => setSelectedMethod(2)}
              className={`border-2 p-4 sm:p-5 rounded-xs transition-all cursor-pointer ${
                selectedMethod === 2
                  ? "border-terracotta bg-terracotta/10 shadow-vintage-terracotta"
                  : "border-ink bg-parchment hover:bg-parchment-300/40"
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-parchment border-2 border-ink rounded shadow-stamp flex-shrink-0">
                    <Building2 className="w-6 h-6 text-ink" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading text-base sm:text-lg font-bold text-ink uppercase">
                        Bank Transfer (IBAN)
                      </h4>
                      {selectedMethod === 2 && (
                        <span className="px-2 py-0.5 bg-terracotta text-white font-mono text-[10px] font-bold rounded">
                          SELECTED
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-xs text-ink/70 mt-0.5">
                      Beneficiary: <strong>{eventConfig.paymentMethods[2].accountName}</strong>
                    </p>
                  </div>
                </div>

                <div className="w-full sm:w-auto flex items-center gap-2">
                  <div className="flex-1 sm:flex-initial p-2.5 bg-parchment-light border border-ink font-mono text-xs sm:text-sm font-bold text-ink select-all break-all">
                    {eventConfig.paymentMethods[2].accountIdentifier}
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(eventConfig.paymentMethods[2].accountIdentifier, 2);
                    }}
                    className="min-h-[44px] px-3.5 py-2 bg-ink text-parchment hover:bg-terracotta font-mono text-xs font-bold uppercase transition-colors shadow-stamp flex items-center gap-1 flex-shrink-0"
                  >
                    {copiedIndex === 2 ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
