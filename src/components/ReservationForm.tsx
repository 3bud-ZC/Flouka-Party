"use client";

import React, { useState } from "react";
import { Loader2, AlertCircle, Sparkles } from "lucide-react";
import { eventConfig } from "@/lib/config";
import { PaymentMethodType, ReservationApiResponse } from "@/lib/types";
import ScreenshotUploader from "./ScreenshotUploader";
import ConfirmationView from "./ConfirmationView";
import PosterLabel from "./PosterLabel";
import { NileWaveLines, VintageStar } from "./EgyptianDecorations";

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    instagram: "",
    guestCount: 1,
    paymentMethod: "instapay" as PaymentMethodType,
    transactionReference: "",
    notes: "",
    confirmedAccuracy: false,
  });

  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successResponse, setSuccessResponse] = useState<ReservationApiResponse | null>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      phone: val,
      whatsapp: sameAsPhone ? val : prev.whatsapp,
    }));
  };

  const toggleSameAsPhone = () => {
    setSameAsPhone((prev) => {
      const next = !prev;
      if (next) {
        setFormData((curr) => ({ ...curr, whatsapp: curr.phone }));
      }
      return next;
    });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required.";
    if (!formData.phone.trim()) errs.phone = "Phone number is required.";
    if (!formData.whatsapp.trim()) errs.whatsapp = "WhatsApp number is required.";
    if (!screenshotFile) errs.paymentScreenshot = "Payment transfer screenshot is required.";
    if (!formData.confirmedAccuracy) {
      errs.confirmedAccuracy = "Please confirm that your information is correct.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();
      data.append("fullName", formData.fullName);
      data.append("phone", formData.phone);
      data.append("whatsapp", formData.whatsapp);
      if (formData.instagram) data.append("instagram", formData.instagram);
      data.append("guestCount", formData.guestCount.toString());
      data.append("paymentMethod", formData.paymentMethod);
      if (formData.transactionReference) {
        data.append("transactionReference", formData.transactionReference);
      }
      if (formData.notes) data.append("notes", formData.notes);
      data.append("confirmedAccuracy", formData.confirmedAccuracy ? "true" : "false");
      if (screenshotFile) {
        data.append("paymentScreenshot", screenshotFile);
      }

      const res = await fetch("/api/reservations", {
        method: "POST",
        body: data,
      });

      const json: ReservationApiResponse = await res.json();

      if (!res.ok || !json.success) {
        if (json.errors) {
          setErrors(json.errors);
        }
        setServerError(json.message || "Failed to submit reservation. Please try again.");
        setIsSubmitting(false);
        return;
      }

      setSuccessResponse(json);
      setIsSubmitting(false);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Network error. Please check your connection.";
      setServerError(errorMsg);
      setIsSubmitting(false);
    }
  };

  const totalPrice = formData.guestCount * eventConfig.ticketPrice.amount;

  if (successResponse && successResponse.bookingReference) {
    return (
      <div id="reservation" className="w-full py-8 sm:py-12 px-4 scroll-mt-12">
        <ConfirmationView
          bookingReference={successResponse.bookingReference}
          fullName={formData.fullName}
          guestCount={formData.guestCount}
          paymentMethod={formData.paymentMethod}
          onReset={() => {
            setSuccessResponse(null);
            setFormData({
              fullName: "",
              phone: "",
              whatsapp: "",
              instagram: "",
              guestCount: 1,
              paymentMethod: "instapay",
              transactionReference: "",
              notes: "",
              confirmedAccuracy: false,
            });
            setScreenshotFile(null);
          }}
        />
      </div>
    );
  }

  return (
    <section id="reservation" className="w-full max-w-3xl mx-auto py-8 sm:py-12 px-4 sm:px-6 scroll-mt-12">
      <div className="bg-parchment-light border-3 border-ink shadow-vintage-lg p-5 sm:p-8 rounded-xs relative overflow-hidden">
        {/* Background Halftone */}
        <div className="absolute inset-0 bg-halftone opacity-30 pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="terracotta" size="sm" rotate="right">
              RESERVATION TICKET
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>

          <h2 className="font-display text-3xl sm:text-5xl text-ink uppercase tracking-tight text-ink-shadow">
            Get On The Boat
          </h2>
          <p className="font-heading text-sm sm:text-base text-terracotta font-semibold mt-1">
            Limited guests. Complete registration to secure your spot.
          </p>

          <NileWaveLines className="w-28 h-3.5 text-egyptian-green mx-auto mt-2" />
        </div>

        {serverError && (
          <div className="mb-5 p-3.5 bg-terracotta/10 border-2 border-terracotta rounded-xs flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm font-mono text-ink">
              <strong className="block text-terracotta uppercase font-bold mb-0.5">
                Notice:
              </strong>
              {serverError}
            </div>
          </div>
        )}

        {/* Clean Single-Column Form on Mobile */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-4 sm:space-y-5">
          {/* 1. Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1"
            >
              Full Name <span className="text-terracotta">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="e.g. Youssef Nabil"
              value={formData.fullName}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className={`w-full px-3.5 py-3 bg-parchment border-2 ${
                errors.fullName ? "border-terracotta" : "border-ink"
              } font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all`}
            />
            {errors.fullName && (
              <p className="mt-1 font-mono text-xs text-terracotta font-semibold">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* 2. Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1"
            >
              Phone Number <span className="text-terracotta">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="e.g. 01012345678"
              value={formData.phone}
              onChange={handlePhoneChange}
              className={`w-full px-3.5 py-3 bg-parchment border-2 ${
                errors.phone ? "border-terracotta" : "border-ink"
              } font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all`}
            />
            {errors.phone && (
              <p className="mt-1 font-mono text-xs text-terracotta font-semibold">
                {errors.phone}
              </p>
            )}
          </div>

          {/* 3. WhatsApp Number */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label
                htmlFor="whatsapp"
                className="font-mono text-xs uppercase tracking-wider font-bold text-ink"
              >
                WhatsApp Number <span className="text-terracotta">*</span>
              </label>
              <button
                type="button"
                onClick={toggleSameAsPhone}
                className="font-mono text-xs text-egyptian-green underline hover:text-ink font-semibold"
              >
                {sameAsPhone ? "✓ Same as phone" : "Same as phone?"}
              </button>
            </div>
            <input
              type="tel"
              id="whatsapp"
              name="whatsapp"
              placeholder="e.g. 01012345678"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, whatsapp: e.target.value }))
              }
              className={`w-full px-3.5 py-3 bg-parchment border-2 ${
                errors.whatsapp ? "border-terracotta" : "border-ink"
              } font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all`}
            />
            {errors.whatsapp && (
              <p className="mt-1 font-mono text-xs text-terracotta font-semibold">
                {errors.whatsapp}
              </p>
            )}
          </div>

          {/* 4. Instagram (Optional) */}
          <div>
            <label
              htmlFor="instagram"
              className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1"
            >
              Instagram Handle <span className="text-ink/50 text-[11px]">(Optional)</span>
            </label>
            <input
              type="text"
              id="instagram"
              name="instagram"
              placeholder="@username"
              value={formData.instagram}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, instagram: e.target.value }))
              }
              className="w-full px-3.5 py-3 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all"
            />
          </div>

          {/* 5. Number of Guests (Thumb-Friendly Counter) */}
          <div className="bg-parchment border-2 border-ink p-4 shadow-stamp rounded-xs">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider font-bold text-ink">
                  Number of Guests
                </span>
                <span className="font-mono text-xs text-ink/70">
                  {eventConfig.ticketPrice.formatted} / guest
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border-2 border-ink bg-parchment-light shadow-stamp">
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        guestCount: Math.max(1, prev.guestCount - 1),
                      }))
                    }
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono font-bold text-xl hover:bg-ink hover:text-white transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-mono font-bold text-lg min-w-[2.5rem] text-center">
                    {formData.guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        guestCount: Math.min(10, prev.guestCount + 1),
                      }))
                    }
                    className="min-w-[44px] min-h-[44px] flex items-center justify-center font-mono font-bold text-xl hover:bg-ink hover:text-white transition-colors"
                  >
                    +
                  </button>
                </div>

                <div className="text-right pl-2">
                  <span className="font-mono text-[11px] text-ink/60 block uppercase">Total:</span>
                  <span className="font-display text-xl sm:text-2xl text-terracotta leading-none">
                    {totalPrice} EGP
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Payment Method Selector */}
          <div>
            <label className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1.5">
              Payment Method Used <span className="text-terracotta">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              {[
                { id: "instapay", label: "InstaPay" },
                { id: "vodafone_cash", label: "Vodafone Cash" },
                { id: "bank_transfer", label: "Bank Transfer" },
              ].map((m) => {
                const isSelected = formData.paymentMethod === m.id;
                return (
                  <label
                    key={m.id}
                    className={`min-h-[44px] border-2 p-3 rounded-xs cursor-pointer flex items-center gap-2.5 transition-all ${
                      isSelected
                        ? "border-terracotta bg-terracotta/10 shadow-stamp"
                        : "border-ink bg-parchment hover:bg-parchment-light"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={isSelected}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentMethod: m.id as PaymentMethodType,
                        }))
                      }
                      className="accent-terracotta w-4 h-4"
                    />
                    <span className="font-heading text-sm font-bold text-ink uppercase">
                      {m.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* 7. Transaction Reference (Optional) */}
          <div>
            <label
              htmlFor="transactionReference"
              className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1"
            >
              Transaction Reference / Ref Number <span className="text-ink/50 text-[11px]">(Optional)</span>
            </label>
            <input
              type="text"
              id="transactionReference"
              name="transactionReference"
              placeholder="e.g. TXN-948102 or InstaPay Ref"
              value={formData.transactionReference}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, transactionReference: e.target.value }))
              }
              className="w-full px-3.5 py-3 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all"
            />
          </div>

          {/* 8. Screenshot Uploader */}
          <ScreenshotUploader
            onFileSelect={(file) => setScreenshotFile(file)}
            error={errors.paymentScreenshot}
          />

          {/* 9. Notes (Optional) */}
          <div>
            <label
              htmlFor="notes"
              className="block font-mono text-xs uppercase tracking-wider font-bold text-ink mb-1"
            >
              Special Requests or Notes <span className="text-ink/50 text-[11px]">(Optional)</span>
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              placeholder="Arrival notes, song requests for DJ Virus, etc."
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              className="w-full px-3.5 py-2.5 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp transition-all resize-none"
            />
          </div>

          {/* 10. Confirmation Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={formData.confirmedAccuracy}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, confirmedAccuracy: e.target.checked }))
                }
                className="mt-1 w-5 h-5 accent-terracotta rounded-none cursor-pointer flex-shrink-0"
              />
              <span className="font-mono text-xs text-ink leading-relaxed">
                I confirm that I have transferred <strong>{totalPrice} EGP</strong> for <strong>{formData.guestCount} {formData.guestCount === 1 ? "guest" : "guests"}</strong> and that all submitted details are accurate.
              </span>
            </label>
            {errors.confirmedAccuracy && (
              <p className="mt-1 font-mono text-xs text-terracotta font-semibold">
                {errors.confirmedAccuracy}
              </p>
            )}
          </div>

          {/* 11. Big Reserve Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full min-h-[52px] py-4 px-6 bg-terracotta text-parchment-50 border-3 border-ink shadow-vintage-lg hover:bg-terracotta-dark hover:shadow-vintage active:translate-y-0.5 disabled:opacity-60 transition-all flex items-center justify-center gap-2.5 font-display text-xl sm:text-2xl uppercase tracking-wider"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Processing Reservation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span>Reserve My Spot</span>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
