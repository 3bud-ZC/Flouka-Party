"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Loader2, AlertTriangle, ExternalLink, CheckCircle2, XCircle } from "lucide-react";
import { ReservationRecord, ReservationStatus } from "@/lib/types";
import { eventConfig } from "@/lib/config";

interface ScreenshotModalProps {
  reservation: ReservationRecord;
  accessToken: string;
  onClose: () => void;
  onUpdateStatus: (id: string, status: ReservationStatus) => Promise<void>;
}

export default function ScreenshotModal({
  reservation,
  accessToken,
  onClose,
  onUpdateStatus,
}: ScreenshotModalProps) {
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function getSignedUrl() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/admin/signed-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            screenshotPath: reservation.payment_screenshot_url,
          }),
        });

        const json = await res.json();
        if (isMounted) {
          if (res.ok && json.success && json.signedUrl) {
            setSignedUrl(json.signedUrl);
          } else {
            setError(json.message || "Failed to load secure signed URL.");
          }
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Error generating URL");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    getSignedUrl();
    return () => {
      isMounted = false;
    };
  }, [reservation, accessToken]);

  const handleStatus = async (status: ReservationStatus) => {
    setUpdating(true);
    await onUpdateStatus(reservation.id, status);
    setUpdating(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-ink/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-parchment-light border-3 border-ink shadow-vintage-lg max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-6 rounded-xs relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-parchment border-2 border-ink shadow-stamp hover:bg-terracotta hover:text-white transition-colors"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-4 pr-12">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-xs font-bold uppercase bg-parchment px-2 py-0.5 border border-ink">
              {reservation.booking_reference}
            </span>
            <span className="font-mono text-xs font-bold text-terracotta uppercase">
              {reservation.payment_method.replace("_", " ")}
            </span>
          </div>
          <h2 className="font-heading text-2xl text-ink font-bold">
            {reservation.full_name}
          </h2>
          <p className="font-mono text-xs text-ink/70">
            Party of {reservation.guest_count} • Due:{" "}
            {reservation.guest_count * eventConfig.ticketPrice.amount} EGP
          </p>
        </div>

        {/* Screenshot Viewer */}
        <div className="my-4 border-2 border-ink bg-ink/5 min-h-[320px] flex items-center justify-center relative rounded-xs overflow-hidden">
          {loading ? (
            <div className="p-12 text-center font-mono text-xs flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-2" />
              <span>Generating secure 60s signed access token...</span>
            </div>
          ) : error ? (
            <div className="p-8 text-center text-terracotta font-mono text-xs">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2" />
              <span>{error}</span>
            </div>
          ) : signedUrl ? (
            <div className="relative w-full h-[380px] sm:h-[450px]">
              <Image
                src={signedUrl}
                alt="Payment Transfer Proof"
                fill
                className="object-contain"
                unoptimized
              />
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-ink/20">
          {signedUrl && (
            <a
              href={signedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-parchment border border-ink text-xs font-mono font-bold text-ink hover:bg-ink hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open Full Resolution</span>
            </a>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatus("confirmed")}
              disabled={updating || reservation.status === "confirmed"}
              className="flex-1 sm:flex-initial px-4 py-2 bg-egyptian-green text-white border-2 border-ink shadow-stamp hover:bg-egyptian-green-dark text-xs font-mono font-bold flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Confirm Booking</span>
            </button>

            <button
              onClick={() => handleStatus("rejected")}
              disabled={updating || reservation.status === "rejected"}
              className="flex-1 sm:flex-initial px-4 py-2 bg-red-700 text-white border-2 border-ink shadow-stamp hover:bg-red-800 text-xs font-mono font-bold flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              <XCircle className="w-4 h-4" />
              <span>Reject</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
