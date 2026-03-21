"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { Home, MapPin, Search } from "lucide-react";
import Link from "next/link";

type Booking = {
  id: string;
  status: string;
  created_at: string;
  residence: {
    title: string;
    city: string;
    price_per_month: any;
  };
};

export default function StudentDashboard() {
  const { token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        const res = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          setBookings(data);
        }
      } catch (error) {
        console.error("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  const cancelBooking = async (id: string) => {
    if (!confirm("Are you sure you want to cancel this request?")) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: "cancelled" }),
      });

      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
        );
      } else {
        alert("Failed to cancel booking");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading your profile...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sakanx-navy">Your Booking Requests</h2>
        <p className="text-gray-500 mt-1">Track the status of your homestay applications.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 shadow-sm">
          <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-sakanx-navy mb-2">No bookings yet</h3>
          <p className="text-gray-500 mb-6">You haven't requested any properties yet.</p>
          <Link href="/browse" className="inline-flex items-center justify-center gap-2 bg-sakanx-navy text-white px-6 py-3 rounded-xl font-bold hover:bg-sakanx-blue transition-colors">
            <Search className="w-5 h-5" /> Start Browsing
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              
              <div>
                 <div className="flex justify-between items-start mb-4">
                   <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                      booking.status === "pending" ? "bg-amber-100 text-amber-700" :
                      booking.status === "accepted" ? "bg-green-100 text-green-700" :
                      "bg-rose-100 text-rose-700"
                    }`}>
                      {booking.status}
                   </span>
                 </div>
                 
                 <h3 className="text-lg font-bold text-sakanx-navy leading-tight mb-2">
                   {booking.residence.title}
                 </h3>
                 <div className="flex items-center gap-1 text-gray-500 text-sm font-medium mb-4">
                   <MapPin className="w-4 h-4 text-sakanx-blue" />
                   {booking.residence.city}
                 </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-4 flex items-center justify-between">
                 <span className="text-xl font-extrabold text-sakanx-navy">
                   {new Intl.NumberFormat("en-US").format(booking.residence.price_per_month as any)}
                 </span>
                 <span className="text-gray-400 text-sm font-medium text-right uppercase">MAD</span>
              </div>

              {booking.status === "pending" && (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="mt-4 w-full py-2 bg-white text-rose-500 border border-rose-200 rounded-xl font-bold hover:bg-rose-50 transition-colors"
                >
                  Cancel Request
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
