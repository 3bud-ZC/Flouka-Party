"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";
import { ReservationRecord, ReservationStatus } from "@/lib/types";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminMetrics from "@/components/admin/AdminMetrics";
import AdminReservationCard from "@/components/admin/AdminReservationCard";
import ScreenshotModal from "@/components/admin/ScreenshotModal";

export default function AdminPage() {
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  const [reservations, setReservations] = useState<ReservationRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | ReservationStatus>("all");

  const [selectedScreenshotReservation, setSelectedScreenshotReservation] =
    useState<ReservationRecord | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      setLoadingSession(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoadingSession(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchReservations = useCallback(async () => {
    if (!session?.access_token) return;
    setLoadingData(true);

    try {
      const res = await fetch("/api/admin/reservations", {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setReservations(json.reservations || []);
      }
    } catch {
      // Handled quietly
    } finally {
      setLoadingData(false);
    }
  }, [session]);

  useEffect(() => {
    if (session) {
      fetchReservations();
    }
  }, [session, fetchReservations]);

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    setSession(null);
  };

  const handleUpdateStatus = async (id: string, status: ReservationStatus) => {
    if (!session?.access_token) return;
    setUpdatingId(id);

    try {
      const res = await fetch("/api/admin/reservations", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ id, status }),
      });

      const json = await res.json();
      if (res.ok && json.success) {
        setReservations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status } : r))
        );
        if (selectedScreenshotReservation?.id === id) {
          setSelectedScreenshotReservation((prev) =>
            prev ? { ...prev, status } : null
          );
        }
      } else {
        alert(json.message || "Failed to update status.");
      }
    } catch {
      alert("Error updating reservation status.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    if (reservations.length === 0) {
      alert("No reservations to export.");
      return;
    }

    const headers = [
      "Booking Reference",
      "Full Name",
      "Phone",
      "WhatsApp",
      "Instagram",
      "Guest Count",
      "Payment Method",
      "Transaction Ref",
      "Status",
      "Notes",
      "Created At",
      "Screenshot Storage Path",
    ];

    const rows = reservations.map((r) => [
      `"${r.booking_reference}"`,
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.phone}"`,
      `"${r.whatsapp}"`,
      `"${r.instagram || ""}"`,
      r.guest_count,
      `"${r.payment_method}"`,
      `"${r.transaction_reference || ""}"`,
      `"${r.status}"`,
      `"${(r.notes || "").replace(/"/g, '""')}"`,
      `"${new Date(r.created_at).toLocaleString()}"`,
      `"${r.payment_screenshot_url}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `Flukah_Party_Reservations_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredReservations = reservations.filter((r) => {
    const matchesStatus =
      statusFilter === "all" ? true : r.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      r.booking_reference.toLowerCase().includes(q) ||
      r.full_name.toLowerCase().includes(q) ||
      r.phone.includes(q) ||
      r.whatsapp.includes(q) ||
      (r.instagram && r.instagram.toLowerCase().includes(q)) ||
      (r.transaction_reference &&
        r.transaction_reference.toLowerCase().includes(q)) ||
      (r.notes && r.notes.toLowerCase().includes(q));

    return matchesStatus && matchesSearch;
  });

  if (loadingSession) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-parchment p-4 font-mono text-sm">
        <Loader2 className="w-6 h-6 animate-spin text-terracotta mr-2" />
        <span>Authenticating Organizer Deck...</span>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={(newSession) => setSession(newSession)} />;
  }

  const totalBookings = reservations.length;
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const confirmedCount = reservations.filter((r) => r.status === "confirmed").length;
  const rejectedCount = reservations.filter((r) => r.status === "rejected").length;

  return (
    <div className="min-h-screen bg-parchment text-ink pb-16">
      <AdminHeader
        userEmail={session.user?.email}
        loading={loadingData}
        onRefresh={fetchReservations}
        onExportCSV={handleExportCSV}
        onLogout={handleLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-6">
        {/* KPI Metrics */}
        <AdminMetrics reservations={reservations} />

        {/* Filter and Search Bar */}
        <div className="bg-parchment-light border-2 border-ink p-3.5 sm:p-4 shadow-vintage rounded-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 sm:gap-4">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink/50" />
            <input
              type="text"
              placeholder="Search Name, FLK-XXXX, Phone, WhatsApp..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 bg-parchment border-2 border-ink font-mono text-base text-ink placeholder:text-ink/40 focus:outline-none focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {[
              { id: "all", label: "All", count: totalBookings },
              { id: "pending", label: "Pending", count: pendingCount },
              { id: "confirmed", label: "Confirmed", count: confirmedCount },
              { id: "rejected", label: "Rejected", count: rejectedCount },
            ].map((tab) => {
              const isSelected = statusFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setStatusFilter(tab.id as any)}
                  className={`px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider border-2 border-ink rounded-xs transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    isSelected
                      ? "bg-ink text-white shadow-stamp"
                      : "bg-parchment hover:bg-parchment-300 text-ink"
                  }`}
                >
                  <span>{tab.label}</span>
                  <span className="px-1.5 py-0.2 bg-white/20 text-[10px] rounded">
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Reservations List */}
        {loadingData ? (
          <div className="py-16 text-center font-mono text-sm flex flex-col items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-terracotta mb-2" />
            <span>Loading reservations...</span>
          </div>
        ) : filteredReservations.length === 0 ? (
          <div className="p-12 text-center bg-parchment-light border-2 border-dashed border-ink/40 rounded-xs">
            <p className="font-heading text-lg text-ink font-bold">
              No reservations found.
            </p>
            <p className="font-mono text-xs text-ink/60 mt-1">
              {searchQuery
                ? "Try clearing your search query."
                : "New reservations will appear here live."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {filteredReservations.map((res) => (
              <AdminReservationCard
                key={res.id}
                reservation={res}
                onViewScreenshot={(r) => setSelectedScreenshotReservation(r)}
                onUpdateStatus={handleUpdateStatus}
                updating={updatingId === res.id}
              />
            ))}
          </div>
        )}
      </main>

      {/* Screenshot Modal */}
      {selectedScreenshotReservation && (
        <ScreenshotModal
          reservation={selectedScreenshotReservation}
          accessToken={session.access_token}
          onClose={() => setSelectedScreenshotReservation(null)}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </div>
  );
}
