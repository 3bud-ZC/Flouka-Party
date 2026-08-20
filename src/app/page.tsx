import React from "react";
import Hero from "@/components/Hero";
import TheNight from "@/components/TheNight";
import EventDetails from "@/components/EventDetails";
import AtmosphereVisual from "@/components/AtmosphereVisual";
import PaymentInstructions from "@/components/PaymentInstructions";
import ReservationForm from "@/components/ReservationForm";
import ContactActions from "@/components/ContactActions";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import VintageDivider from "@/components/VintageDivider";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-parchment relative">
      {/* 01: Hero / Opening Scene */}
      <Hero />

      {/* Divider */}
      <VintageDivider label="Music • Nile • Felucca" />

      {/* 02: The Night (Storytelling) */}
      <TheNight />

      {/* Divider */}
      <VintageDivider label="01 / 09 • DJ Virus" />

      {/* 03: Event Details */}
      <EventDetails />

      {/* Divider */}
      <VintageDivider label="River Atmosphere" />

      {/* 04: Visual & Atmosphere Transition */}
      <AtmosphereVisual />

      {/* Divider */}
      <VintageDivider label="Secure Your Spot" />

      {/* 05: Payment Flow & Instructions */}
      <PaymentInstructions />

      {/* 06: Reservation Form (Primary Conversion) */}
      <ReservationForm />

      {/* Divider */}
      <VintageDivider label="Questions & WhatsApp" />

      {/* 07: Direct Contact Actions */}
      <ContactActions />

      {/* 08: Final Poster CTA */}
      <FinalCTA />

      {/* 09: Vintage Egyptian Poster Footer */}
      <Footer />

      {/* Sticky Mobile Reservation Trigger */}
      <StickyMobileCTA />
    </main>
  );
}
