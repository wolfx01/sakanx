"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { CheckCircle, XCircle, Clock, Home, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import BookingChat from "./BookingChat";

type Booking = {
  id: string;
  status: string;
  created_at: string;
  message: string;
  residence: {
    title: string;
    city: string;
    price_per_month: any;
  };
  student: {
    full_name: string;
    email: string;
    phone: string | null;
  };
  _count?: {
    messages: number;
  };
};

export default function OwnerDashboard() {
  const { token, user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChatBookingId, setActiveChatBookingId] = useState<string | null>(null);

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

  const updateStatus = async (id: string, newStatus: "accepted" | "rejected") => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        // Update local state
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
        );
      } else {
         alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <div className="text-gray-500">Loading your dashboard...</div>;
  }

  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sakanx-navy">Incoming Requests</h2>
        <p className="text-gray-500 mt-1">
          You have {pendingCount} {pendingCount === 1 ? 'student' : 'students'} waiting for your approval.
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-100 shadow-sm">
          <Home className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-sakanx-navy">No requests yet</h3>
          <p className="text-gray-500">When students request your properties, they will appear here.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${
                    booking.status === "pending" ? "bg-amber-100 text-amber-700" :
                    booking.status === "accepted" ? "bg-green-100 text-green-700" :
                    "bg-rose-100 text-rose-700"
                  }`}>
                    {booking.status}
                  </span>
                  <span className="text-gray-400 text-sm">
                    {new Date(booking.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-sakanx-navy mb-1">
                  {booking.student.full_name} wants to book
                </h3>
                <div className="flex items-center gap-2 text-sakanx-blue font-semibold mb-4">
                  <Home className="w-4 h-4" />
                  {booking.residence.title} 
                  <span className="text-gray-400 font-normal">in {booking.residence.city}</span>
                </div>

                <div className="bg-sakanx-light p-4 rounded-xl space-y-2">
                   <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                     <Mail className="w-4 h-4 text-gray-400" /> {booking.student.email}
                   </div>
                   {booking.student.phone && (
                     <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                       <Phone className="w-4 h-4 text-gray-400" /> {booking.student.phone}
                     </div>
                   )}
                   <p className="text-gray-600 mt-2 italic text-sm">"{booking.message}"</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 min-w-[140px]">
                {booking.status === "pending" && (
                  <>
                    <button 
                      onClick={() => updateStatus(booking.id, "accepted")}
                      className="flex items-center justify-center gap-2 bg-sakanx-navy text-white px-4 py-3 rounded-xl font-bold hover:bg-sakanx-blue transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" /> Accept
                    </button>
                    <button 
                      onClick={() => updateStatus(booking.id, "rejected")}
                      className="flex items-center justify-center gap-2 bg-white text-rose-500 border-2 border-rose-100 px-4 py-3 rounded-xl font-bold hover:bg-rose-50 transition-colors"
                    >
                      <XCircle className="w-5 h-5" /> Reject
                    </button>
                  </>
                )}
                
                <button 
                  onClick={() => {
                    setActiveChatBookingId(booking.id);
                    if (booking._count) booking._count.messages = 0;
                  }}
                  className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold transition-colors ${
                    booking.status === "pending" 
                      ? "bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100"
                      : "bg-sakanx-navy text-white hover:bg-sakanx-blue"
                  }`}
                >
                  <MessageCircle className="w-5 h-5" /> Chat
                  {booking._count && booking._count.messages > 0 && (
                    <span className="absolute -top-3 -right-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border-2 border-white shadow-sm">
                      {booking._count.messages}
                    </span>
                  )}
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {activeChatBookingId && user && token && (
        <BookingChat 
          bookingId={activeChatBookingId} 
          token={token} 
          currentUserId={user.id} 
          onClose={() => setActiveChatBookingId(null)} 
        />
      )}
    </div>
  );
}
