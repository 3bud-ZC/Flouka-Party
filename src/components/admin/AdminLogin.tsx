"use client";

import React, { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import PosterLabel from "@/components/PosterLabel";
import { VintageStar } from "@/components/EgyptianDecorations";

interface AdminLoginProps {
  onLoginSuccess: (session: any) => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = getSupabaseClient();
    if (!supabase) {
      setError("Supabase backend is not configured in .env.local.");
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
      } else if (data.session) {
        onLoginSuccess(data.session);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Authentication error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-parchment p-4 relative">
      <div className="w-full max-w-md bg-parchment-light border-3 border-ink p-6 sm:p-8 shadow-vintage-lg rounded-xs relative">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <VintageStar className="w-4 h-4 text-terracotta" />
            <PosterLabel variant="terracotta" size="sm">
              ORGANIZER ACCESS
            </PosterLabel>
            <VintageStar className="w-4 h-4 text-terracotta" />
          </div>
          <h1 className="font-display text-3xl text-ink uppercase tracking-tight text-ink-shadow">
            Flukah Deck
          </h1>
          <p className="font-mono text-xs text-ink/70 mt-1">
            Private Reservation Administration
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-terracotta/10 border-2 border-terracotta rounded-xs text-xs font-mono text-terracotta font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block font-mono text-xs uppercase font-bold text-ink mb-1"
            >
              Organizer Email
            </label>
            <input
              type="email"
              id="email"
              required
              placeholder="abud@admin.fun"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block font-mono text-xs uppercase font-bold text-ink mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white focus:shadow-stamp"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-ink text-parchment hover:bg-terracotta text-sm font-mono font-bold uppercase tracking-wider transition-colors shadow-stamp flex items-center justify-center gap-2 mt-6"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Lock className="w-4 h-4 text-egyptian-gold" />
                <span>Enter Organizer Deck</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-ink/20 text-center font-mono text-[11px] text-ink/60">
          Protected with Supabase Auth & Row Level Security.
        </div>
      </div>
    </div>
  );
}
