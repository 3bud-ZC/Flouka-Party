export type PaymentMethodType = "instapay" | "vodafone_cash";

export interface PaymentMethodConfig {
  id: PaymentMethodType;
  name: string;
  instructions: string;
  accountIdentifier: string; // E.g. InstaPay address or formatted phone number
  accountName: string;
  copyValue?: string; // Exact normalized string to copy to clipboard
  isConfigured: boolean; // Flag to indicate if real credentials are set
}

export interface EventConfig {
  eventName: string;
  tagline: string;
  date: string;
  dateNumber: string;
  fullDate: string;
  time: string;
  duration: string;
  locationText: string;
  locationCity: string;
  djName: string;
  soundTagline: string;
  musicGenre: string;
  partyType: string;
  capacityText: string;
  drinksPolicy: string;
  ticketPrice: {
    amount: number;
    currency: string;
    formatted: string;
    note: string;
    isConfigured: boolean;
  };
  paymentMethods: PaymentMethodConfig[];
  contact: {
    whatsappNumber: string;
    whatsappDisplay: string;
    phoneContact: string;
    instagramHandle: string;
    instagramUrl: string;
    isConfigured: boolean;
  };
  unresolvedFields: string[];
}

export interface ReservationSubmission {
  fullName: string;
  phone: string;
  whatsapp: string;
  instagram?: string;
  guestCount: number;
  paymentMethod: PaymentMethodType;
  transactionReference?: string;
  paymentScreenshot?: File | null;
  paymentScreenshotUrl?: string;
  notes?: string;
  confirmedAccuracy: boolean;
}

export type ReservationStatus = "pending" | "confirmed" | "rejected";

export interface ReservationRecord {
  id: string;
  booking_reference: string;
  full_name: string;
  phone: string;
  whatsapp: string;
  instagram: string | null;
  guest_count: number;
  payment_method: string;
  transaction_reference: string | null;
  payment_screenshot_url: string;
  notes: string | null;
  status: ReservationStatus;
  created_at: string;
}

export interface ReservationApiResponse {
  success: boolean;
  message: string;
  bookingReference?: string;
  reservation?: Partial<ReservationRecord>;
  errors?: Record<string, string>;
}
