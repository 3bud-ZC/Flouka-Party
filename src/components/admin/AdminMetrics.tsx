import React from "react";
import { ReservationRecord } from "@/lib/types";
import { eventConfig } from "@/lib/config";

interface AdminMetricsProps {
  reservations: ReservationRecord[];
}

export default function AdminMetrics({ reservations }: AdminMetricsProps) {
  const totalBookings = reservations.length;
  const totalGuests = reservations.reduce((acc, r) => acc + r.guest_count, 0);
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const rejectedCount = reservations.filter((r) => r.status === "rejected").length;
  const confirmedGuests = reservations
    .filter((r) => r.status === "confirmed")
    .reduce((acc, r) => acc + r.guest_count, 0);
  const estimatedConfirmedRevenue = confirmedGuests * eventConfig.ticketPrice.amount;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* Total Bookings */}
      <div className="bg-parchment-light border-2 border-ink p-3 shadow-vintage rounded-xs">
        <span className="font-mono text-[11px] uppercase font-bold text-ink/60 block">
          Total Bookings
        </span>
        <span className="font-display text-2xl sm:text-3xl text-ink">
          {totalBookings}
        </span>
      </div>

      {/* Total Guests */}
      <div className="bg-parchment-light border-2 border-ink p-3 shadow-vintage rounded-xs">
        <span className="font-mono text-[11px] uppercase font-bold text-ink/60 block">
          Total Guests
        </span>
        <span className="font-display text-2xl sm:text-3xl text-ink">
          {totalGuests}
        </span>
      </div>

      {/* Pending */}
      <div className="bg-terracotta/10 border-2 border-terracotta p-3 shadow-vintage rounded-xs">
        <span className="font-mono text-[11px] uppercase font-bold text-terracotta block">
          Pending Review
        </span>
        <span className="font-display text-2xl sm:text-3xl text-terracotta">
          {pendingCount}
        </span>
      </div>

      {/* Confirmed */}
      <div className="bg-egyptian-green/10 border-2 border-egyptian-green p-3 shadow-vintage rounded-xs">
        <span className="font-mono text-[11px] uppercase font-bold text-egyptian-green block">
          Confirmed Guests
        </span>
        <span className="font-display text-2xl sm:text-3xl text-egyptian-green">
          {confirmedGuests}
        </span>
      </div>

      {/* Rejected */}
      <div className="bg-parchment-light border-2 border-ink/40 p-3 shadow-vintage rounded-xs">
        <span className="font-mono text-[11px] uppercase font-bold text-ink/60 block">
          Rejected
        </span>
        <span className="font-display text-2xl sm:text-3xl text-ink/50">
          {rejectedCount}
        </span>
      </div>

      {/* Confirmed Revenue */}
      <div className="bg-parchment-light border-2 border-ink p-3 shadow-vintage rounded-xs col-span-2 sm:col-span-1">
        <span className="font-mono text-[11px] uppercase font-bold text-ink/60 block">
          Est. Revenue
        </span>
        <span className="font-display text-lg sm:text-2xl text-terracotta">
          {estimatedConfirmedRevenue.toLocaleString()} EGP
        </span>
      </div>
    </div>
  );
}
