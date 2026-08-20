import { EventConfig } from "./types";

/**
 * Centralized Event Configuration for Flukah Party
 * 
 * IMPORTANT: All event parameters, pricing, contact numbers, and payment details
 * are managed in this single file. Any unconfigured fields are flagged in `unresolvedFields`.
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
    amount: 500, // Configurable ticket price amount
    currency: "EGP",
    formatted: "500 EGP",
    note: "Per guest • Includes Nile cruise, sound setup, ice & mixers",
    isConfigured: false, // Set to true when final pricing is locked
  },

  paymentMethods: [
    {
      id: "instapay",
      name: "InstaPay",
      instructions: "Transfer to InstaPay IPA address or mobile number",
      accountIdentifier: "flukahparty@instapay", // Placeholder - Update with actual InstaPay handle
      accountName: "Flukah Event Organizers",
      isConfigured: false,
    },
    {
      id: "vodafone_cash",
      name: "Vodafone Cash",
      instructions: "Transfer to the official Vodafone Cash wallet",
      accountIdentifier: "+20 10X XXX XXXX", // Placeholder - Update with actual wallet number
      accountName: "Flukah Wallet",
      isConfigured: false,
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      instructions: "Direct bank transfer (CIB / QNB / NBE)",
      accountIdentifier: "EG00 0000 0000 0000 0000 0000 00", // Placeholder - Update with IBAN
      accountName: "Flukah Events",
      isConfigured: false,
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
    "ticketPrice.amount",
    "paymentMethods[0].accountIdentifier (InstaPay)",
    "paymentMethods[1].accountIdentifier (Vodafone Cash)",
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
