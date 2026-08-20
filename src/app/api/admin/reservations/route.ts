import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient, verifyAdminToken, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: "Supabase database is not configured." },
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

    const supabase = getSupabaseAdminClient()!;
    const { data: reservations, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservations: reservations || [],
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!isSupabaseConfigured()) {
      return NextResponse.json(
        { success: false, message: "Supabase database is not configured." },
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

    const body = await req.json();
    const { id, status } = body;

    if (!id || !["pending", "confirmed", "rejected"].includes(status)) {
      return NextResponse.json(
        { success: false, message: "Invalid reservation ID or status." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdminClient()!;
    const { data, error } = await supabase
      .from("reservations")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      reservation: data,
      message: `Reservation status updated to ${status}.`,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ success: false, message: errorMsg }, { status: 500 });
  }
}
