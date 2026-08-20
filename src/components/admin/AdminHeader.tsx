"use client";

import React from "react";
import { RefreshCw, Download, LogOut } from "lucide-react";
import { EyeOfHorus } from "@/components/EgyptianDecorations";

interface AdminHeaderProps {
  userEmail?: string;
  loading: boolean;
  onRefresh: () => void;
  onExportCSV: () => void;
  onLogout: () => void;
}

export default function AdminHeader({
  userEmail,
  loading,
  onRefresh,
  onExportCSV,
  onLogout,
}: AdminHeaderProps) {
  return (
    <header className="bg-parchment-light border-b-3 border-ink px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-stamp">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <EyeOfHorus className="w-8 h-6 text-terracotta flex-shrink-0" />
          <div>
            <span className="font-display text-xl sm:text-2xl text-ink uppercase leading-none">
              Flukah Deck
            </span>
            <span className="font-mono text-[11px] text-ink/70 block">
              Organizer: <strong>{userEmail}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={onRefresh}
            disabled={loading}
            className="p-2 sm:px-3 bg-parchment border-2 border-ink shadow-stamp hover:bg-ink hover:text-white transition-colors text-xs font-mono font-bold flex items-center gap-1.5"
            title="Refresh Data"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={onExportCSV}
            className="p-2 sm:px-3 bg-egyptian-green text-white border-2 border-ink shadow-stamp hover:bg-egyptian-green-dark transition-colors text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 sm:px-3 bg-terracotta text-white border-2 border-ink shadow-stamp hover:bg-terracotta-dark transition-colors text-xs font-mono font-bold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
