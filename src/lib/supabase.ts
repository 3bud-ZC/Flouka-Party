import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabasePublicKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";
const supabaseServerKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  "";
const designatedAdminEmail = (process.env.ADMIN_EMAIL || "abud@admin.fun").trim().toLowerCase();

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(supabaseUrl) &&
    Boolean(supabasePublicKey) &&
    !supabaseUrl.includes("your-project-id")
  );
};

export const isSupabaseAdminConfigured = (): boolean => {
  return isSupabaseConfigured() && Boolean(supabaseServerKey);
};

/**
 * Public client for client-side queries and Supabase Auth.
 * Supports the modern publishable key and the legacy anon key.
 */
export const getSupabaseClient = () => {
  if (!isSupabaseConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabasePublicKey);
};

/**
 * Server-side client with elevated capabilities for private Storage and organizer APIs.
 * A real server-only Supabase secret/service-role key is mandatory. Never fall back to a public key.
 */
export const getSupabaseAdminClient = () => {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServerKey, {
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
