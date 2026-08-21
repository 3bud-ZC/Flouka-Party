import React from "react";
import Hero from "@/components/Hero";
import TheNight from "@/components/TheNight";
import EventDetails from "@/components/EventDetails";
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
      <VintageDivider label="The Experience • 01 / 09" />

      {/* 02: The Night (Experience & Music) */}
      <TheNight />

      {/* 03: Event Specifications Blueprint */}
      <EventDetails />

      {/* Divider */}
      <VintageDivider label="Tickets & Payment" />

      {/* 04: Payment Flow & Official Channels */}
      <PaymentInstructions />

      {/* 05: Reservation Form (Primary Conversion) */}
      <ReservationForm />

      {/* Divider */}
      <VintageDivider label="Questions & WhatsApp" />

      {/* 06: Direct Contact Actions (WhatsApp, Instagram, Call) */}
      <ContactActions />

      {/* 07: Final Poster Call to Action */}
      <FinalCTA />

      {/* 08: Vintage Egyptian Poster Footer */}
      <Footer />

      {/* Sticky Mobile Reservation Trigger */}
      <StickyMobileCTA />
    </main>
  );
}
