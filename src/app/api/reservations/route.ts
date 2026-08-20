import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient, isSupabaseConfigured } from "@/lib/supabase";
import { ReservationApiResponse } from "@/lib/types";

function generateBookingReference(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let randomPart = "";
  for (let i = 0; i < 4; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `FLK-${randomPart}`;
}

export async function POST(req: NextRequest): Promise<NextResponse<ReservationApiResponse>> {
  try {
    const formData = await req.formData();

    const fullName = (formData.get("fullName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const whatsapp = (formData.get("whatsapp") as string)?.trim();
    const instagram = (formData.get("instagram") as string)?.trim() || null;
    const guestCountRaw = formData.get("guestCount") as string;
    const paymentMethod = (formData.get("paymentMethod") as string)?.trim();
    const transactionReference = (formData.get("transactionReference") as string)?.trim() || null;
    const notes = (formData.get("notes") as string)?.trim() || null;
    const screenshotFile = formData.get("paymentScreenshot") as File | null;
    const confirmedAccuracy = formData.get("confirmedAccuracy") === "true";

    const errors: Record<string, string> = {};

    if (!fullName) errors.fullName = "Full Name is required.";
    if (!phone) errors.phone = "Phone number is required.";
    if (!whatsapp) errors.whatsapp = "WhatsApp number is required.";
    if (!confirmedAccuracy) errors.confirmedAccuracy = "You must confirm that the information is correct.";

    const guestCount = parseInt(guestCountRaw, 10);
    if (isNaN(guestCount) || guestCount < 1 || guestCount > 10) {
      errors.guestCount = "Guest count must be between 1 and 10.";
    }

    if (!paymentMethod) {
      errors.paymentMethod = "Please select a payment method.";
    }

    if (!screenshotFile || screenshotFile.size === 0) {
      errors.paymentScreenshot = "Payment transfer screenshot is required.";
    } else {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowedTypes.includes(screenshotFile.type)) {
        errors.paymentScreenshot = "Invalid file type. Only JPG, PNG, or WEBP images are accepted.";
      }
      const maxSizeBytes = 10 * 1024 * 1024; // 10MB
      if (screenshotFile.size > maxSizeBytes) {
        errors.paymentScreenshot = "File size exceeds 10MB limit.";
      }
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fix the validation errors before submitting.",
          errors,
        },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Database connection is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to enable reservation storage.",
        },
        { status: 503 }
      );
    }

    const supabase = getSupabaseAdminClient()!;
    const bookingRef = generateBookingReference();

    // 1. Upload screenshot to private Supabase Storage
    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "payment-screenshots";
    const fileExt = screenshotFile!.name.split(".").pop() || "jpg";
    const filePath = `${bookingRef}/${Date.now()}.${fileExt}`;
    const fileBuffer = Buffer.from(await screenshotFile!.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from(bucketName)
      .upload(filePath, fileBuffer, {
        contentType: screenshotFile!.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Private storage upload error:", uploadError);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to upload payment screenshot: ${uploadError.message}`,
        },
        { status: 500 }
      );
    }

    // 2. Insert record into Supabase PostgreSQL table `reservations`
    // We store the storage relative filePath in payment_screenshot_url for secure signed URL retrieval
    const { data: reservationData, error: dbError } = await supabase
      .from("reservations")
      .insert({
        booking_reference: bookingRef,
        full_name: fullName,
        phone,
        whatsapp,
        instagram,
        guest_count: guestCount,
        payment_method: paymentMethod,
        transaction_reference: transactionReference,
        payment_screenshot_url: filePath,
        notes,
        status: "pending",
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database insert error:", dbError);
      return NextResponse.json(
        {
          success: false,
          message: `Failed to save reservation: ${dbError.message}`,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your booking request has been received and is pending review.",
        bookingReference: bookingRef,
        reservation: reservationData,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "An unexpected server error occurred.";
    console.error("Reservation API Error:", err);
    return NextResponse.json(
      {
        success: false,
        message: errorMessage,
      },
      { status: 500 }
    );
  }
}
