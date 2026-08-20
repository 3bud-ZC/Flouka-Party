import { NextRequest, NextResponse } from "next/server";
import {
  getSupabaseAdminClient,
  verifyAdminToken,
  isSupabaseConfigured,
  isSupabaseAdminConfigured,
} from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: "Supabase public configuration is missing." },
        { status: 503 }
      );
    }

    const authHeader = req.headers.get("authorization");
    const user = await verifyAdminToken(authHeader);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized. Admin session required." },
        { status: 401 }
      );
    }

    if (!isSupabaseAdminConfigured()) {
      return NextResponse.json(
        { success: false, message: "Supabase server secret is not configured." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { screenshotPath } = body;

    if (!screenshotPath) {
      return NextResponse.json(
        { success: false, message: "Screenshot path is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient();
    if (!supabase) {
      return NextResponse.json(
        { success: false, message: "Supabase admin client could not be initialized." },
        { status: 503 }
      );
    }

    const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || "payment-screenshots";

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUrl(screenshotPath, 60);

    if (error || !data?.signedUrl) {
      return NextResponse.json(
        { success: false, message: error?.message || "Failed to generate signed URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      signedUrl: data.signedUrl,
      expiresIn: 60,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
