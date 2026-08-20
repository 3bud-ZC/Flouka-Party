"use client";

import React, { useState } from "react";
import { Copy, Check, MessageCircle, Phone, Eye, CheckCircle2, XCircle } from "lucide-react";
import { ReservationRecord, ReservationStatus } from "@/lib/types";

interface AdminReservationCardProps {
  reservation: ReservationRecord;
  onViewScreenshot: (reservation: ReservationRecord) => void;
  onUpdateStatus: (id: string, status: ReservationStatus) => Promise<void>;
  updating: boolean;
}

export default function AdminReservationCard({
  reservation,
  onViewScreenshot,
  onUpdateStatus,
  updating,
}: AdminReservationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reservation.booking_reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanWa = reservation.whatsapp.replace(/[^0-9]/g, "");
  const waChatUrl = `https://wa.me/${cleanWa}?text=${encodeURIComponent(
    `Ahlan ${reservation.full_name}! Regarding your Flukah Party booking (${reservation.booking_reference})...`
  )}`;

  return (
    <div
      className={`bg-parchment-light border-2 ${
        reservation.status === "confirmed"
          ? "border-egyptian-green bg-egyptian-green/5"
          : reservation.status === "rejected"
          ? "border-ink/30 opacity-75"
          : "border-ink shadow-vintage"
      } p-4 sm:p-5 rounded-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 transition-all`}
    >
      {/* Left: Info */}
      <div className="space-y-2 flex-1 min-w-0 w-full">
        <div className="flex flex-wrap items-center gap-2">
          {/* Booking Ref */}
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 bg-parchment border border-ink shadow-stamp font-mono text-xs font-bold text-ink hover:bg-ink hover:text-white transition-colors flex items-center gap-1.5"
            title="Copy Reference"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{reservation.booking_reference}</span>
          </button>

          {/* Status Badge */}
          <span
            className={`px-2.5 py-0.5 font-mono text-xs font-bold uppercase rounded border ${
              reservation.status === "confirmed"
                ? "bg-egyptian-green text-white border-egyptian-green"
                : reservation.status === "rejected"
                ? "bg-red-700 text-white border-red-700"
                : "bg-terracotta text-white border-terracotta animate-pulse"
            }`}
          >
            {reservation.status}
          </span>

          {/* Guest Count */}
          <span className="font-mono text-xs font-bold bg-parchment px-2 py-0.5 border border-ink/40">
            👥 {reservation.guest_count}{" "}
            {reservation.guest_count === 1 ? "Guest" : "Guests"}
          </span>

          {/* Date */}
          <span className="font-mono text-[11px] text-ink/60">
            {new Date(reservation.created_at).toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Guest Name & Notes */}
        <div>
          <h3 className="font-heading text-lg sm:text-xl text-ink font-bold">
            {reservation.full_name}
          </h3>
          {reservation.notes && (
            <p className="font-mono text-xs text-ink/70 mt-0.5 bg-parchment p-1.5 border border-dashed border-ink/30 rounded">
              📝 {reservation.notes}
            </p>
          )}
        </div>

        {/* Contact & Payment Info */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-ink/80 pt-1">
          {/* Phone */}
          <a
            href={`tel:${reservation.phone}`}
            className="flex items-center gap-1 hover:text-terracotta"
          >
            <Phone className="w-3.5 h-3.5 text-ink/60" />
            <span>{reservation.phone}</span>
          </a>

          {/* WhatsApp Direct Link */}
          <a
            href={waChatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-egyptian-green font-bold hover:underline"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>

          {/* Instagram */}
          {reservation.instagram && (
            <span className="text-terracotta">
              IG: {reservation.instagram}
            </span>
          )}

          {/* Payment method */}
          <span className="bg-parchment px-2 py-0.5 border border-ink/30">
            💳 {reservation.payment_method.replace("_", " ")}
            {reservation.transaction_reference
              ? ` (Ref: ${reservation.transaction_reference})`
              : ""}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto justify-end pt-2 lg:pt-0 border-t lg:border-t-0 border-ink/20">
        <button
          onClick={() => onViewScreenshot(reservation)}
          className="px-3 py-2 bg-parchment border-2 border-ink shadow-stamp hover:bg-ink hover:text-white transition-colors text-xs font-mono font-bold flex items-center gap-1.5 flex-1 sm:flex-initial justify-center"
        >
          <Eye className="w-4 h-4 text-terracotta" />
          <span>Screenshot</span>
        </button>

        <button
          onClick={() => onUpdateStatus(reservation.id, "confirmed")}
          disabled={updating || reservation.status === "confirmed"}
          className={`px-3 py-2 border-2 border-ink shadow-stamp text-xs font-mono font-bold transition-all flex items-center gap-1 flex-1 sm:flex-initial justify-center ${
            reservation.status === "confirmed"
              ? "bg-egyptian-green text-white opacity-60 cursor-default"
              : "bg-egyptian-green text-white hover:bg-egyptian-green-dark"
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Confirm</span>
        </button>

        <button
          onClick={() => onUpdateStatus(reservation.id, "rejected")}
          disabled={updating || reservation.status === "rejected"}
          className={`px-3 py-2 border-2 border-ink shadow-stamp text-xs font-mono font-bold transition-all flex items-center gap-1 flex-1 sm:flex-initial justify-center ${
            reservation.status === "rejected"
              ? "bg-red-800 text-white opacity-60 cursor-default"
              : "bg-red-700 text-white hover:bg-red-800"
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Reject</span>
        </button>
      </div>
    </div>
  );
}
