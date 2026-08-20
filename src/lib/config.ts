import { EventConfig } from "./types";

/**
 * Centralized Event Configuration for Flukah Party
 * 
 * Single source of truth for event parameters, pricing, contact numbers, and payment details.
 */
export const eventConfig: EventConfig = {
  eventName: "Flukah Party",
  tagline: "The Nile. The Music. The Night.",
  date: "01 / 09",
  dateNumber: "1/9",
  fullDate: "Sunday, September 1st",
  time: "11 PM – 5 AM",
  duration: "6 Hours After Dark",
  locationText: "Private Dock on the Nile (Exact boarding location sent upon confirmation)",
  locationCity: "Cairo, Egypt",
  djName: "DJ Virus",
  soundTagline: "SOUND BY DJ VIRUS",
  musicGenre: "Mixed Arabic & English",
  partyType: "Felucca River Party",
  capacityText: "Limited Guests",
  drinksPolicy: "Grab Your Drink (BYOB - Bring Your Own Beverage)",
  
  ticketPrice: {
    amount: 550, // 550 EGP per guest
    currency: "EGP",
    formatted: "550 EGP",
    note: "Per guest • Includes Nile cruise, sound setup, ice & mixers",
    isConfigured: true,
  },

  paymentMethods: [
    {
      id: "instapay",
      name: "INSTAPAY",
      instructions: "Transfer to official InstaPay address",
      accountIdentifier: "abyio99@instapay",
      accountName: "abyio99@instapay",
      copyValue: "abyio99@instapay",
      isConfigured: true,
    },
    {
      id: "vodafone_cash",
      name: "VODAFONE CASH",
      instructions: "Transfer to official Vodafone Cash wallet",
      accountIdentifier: "011 05317095",
      accountName: "Vodafone Cash Wallet",
      copyValue: "01105317095",
      isConfigured: true,
    },
  ],

  contact: {
    whatsappNumber: "+201000000000", // Update with organizers WhatsApp (E.164 format)
    whatsappDisplay: "+20 100 000 0000",
    phoneContact: "+20 100 000 0000",
    instagramHandle: "@flukahparty",
    instagramUrl: "https://instagram.com/flukahparty",
    isConfigured: false,
  },

  // Developer Checklist: Unresolved business parameters that must be set before live launch
  unresolvedFields: [
    "contact.whatsappNumber",
    "contact.instagramUrl",
  ],
};

/**
 * Generates a clean, clickable WhatsApp deep-link with prefilled text
 */
export function getWhatsAppLink(bookingRef?: string): string {
  const cleanNumber = eventConfig.contact.whatsappNumber.replace(/[^0-9]/g, "");
  const message = bookingRef
    ? `Ahlan! I just reserved my spot for Flukah Party (Ref: ${bookingRef}). Here is my payment info.`
    : `Ahlan! I have a question regarding Flukah Party on 01/09.`;
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}
