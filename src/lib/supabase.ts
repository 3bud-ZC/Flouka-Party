import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
const designatedAdminEmail = (process.env.ADMIN_EMAIL || "abud@admin.fun").trim().toLowerCase();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabaseAnonKey) &&
    !supabaseUrl.includes("your-project-id")
  );
};

/**
 * Public client for client-side queries and Supabase Auth
 */
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

/**
 * Server-side client with admin/service role capabilities (Private Storage & Full RLS bypass)
 */
export const getSupabaseAdminClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

/**
 * Helper to verify an incoming bearer token from admin requests.
 * Access is restricted to the single designated organizer email.
 */
export const verifyAdminToken = async (authHeader: string | null) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);

  if (error || !user?.email) {
    return null;
  }

  if (user.email.trim().toLowerCase() !== designatedAdminEmail) {
    return null;
  }

  return user;
};
