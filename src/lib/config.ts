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
  time: "11 PM – 3 AM",
  duration: "4 Hours After Dark",
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
    whatsappNumber: "+201105317095",
    whatsappDisplay: "011 05317095",
    phoneContact: "01105317095",
    instagramHandle: "@1sraa_1",
    instagramUrl: "https://instagram.com/1sraa_1",
    isConfigured: true,
  },

  unresolvedFields: [],
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
