"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

export default function BookingCard({
  residenceId,
  price,
  ownerId,
}: {
  residenceId: string;
  price: any;
  ownerId: string;
}) {
  const { user, token } = useAuth();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [hasBooked, setHasBooked] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");

  const formattedPrice = new Intl.NumberFormat("en-US").format(price);

  // Check if already booked
  useEffect(() => {
    const checkBookingStatus = async () => {
      if (!token || !user || user.role === "owner") return;

      try {
        const res = await fetch(`/api/bookings?residenceId=${residenceId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setHasBooked(true);
          }
        }
      } catch (error) {
        console.error("Failed to check booking status", error);
      }
    };

    checkBookingStatus();
  }, [residenceId, token, user]);

  const handleBook = async () => {
    if (!user || !token) {
      router.push("/signin");
      return;
    }

    setIsLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          residenceId,
          message: bookingMessage.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to book");
      }

      setHasBooked(true);
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // If the user checking is the owner of the property
  if (user?.id === ownerId) {
    return (
      <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-2xl shadow-sakanx-navy/10 border border-gray-100">
        <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-100">
          <div>
            <span className="text-3xl font-extrabold text-sakanx-navy">{formattedPrice}</span>
            <span className="text-gray-500 font-medium ml-2 uppercase text-sm">MAD / month</span>
          </div>
        </div>
        <div className="bg-sakanx-light/50 p-4 rounded-xl text-center">
          <p className="text-sakanx-navy font-bold text-lg">This is your property</p>
          <p className="text-sm text-gray-500 mt-1">You cannot book your own listing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-32 bg-white rounded-3xl p-6 shadow-2xl shadow-sakanx-navy/10 border border-gray-100">
      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-100">
        <div>
          <span className="text-3xl font-extrabold text-sakanx-navy">{formattedPrice}</span>
          <span className="text-gray-500 font-medium ml-2 uppercase text-sm">MAD / month</span>
        </div>
      </div>

      {/* Booking Form / CTA */}
      <div className="space-y-4">
        {hasBooked ? (
          <div className="w-full h-14 bg-green-50 text-green-600 rounded-xl font-bold text-lg flex items-center justify-center gap-2 border border-green-200">
            <CheckCircle className="w-5 h-5" />
            Request Sent
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              placeholder="Hi, I'm a student looking for a place..."
              value={bookingMessage}
              onChange={(e) => setBookingMessage(e.target.value)}
              disabled={isLoading || user?.role === "owner"}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl text-sakanx-navy placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sakanx-blue/50 focus:border-sakanx-blue transition-all disabled:opacity-50 min-h-[100px] resize-y"
            />
            <button
              onClick={handleBook}
              disabled={isLoading || user?.role === "owner"}
              className="w-full h-14 bg-sakanx-navy text-white rounded-xl font-bold text-lg hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : user?.role === "owner" ? "Owners cannot book" : "Request to Book"}
            </button>
          </div>
        )}

        <button className="w-full h-14 bg-white text-sakanx-navy rounded-xl font-bold border-2 border-gray-200 hover:border-sakanx-blue/30 transition-all duration-300 active:scale-[0.98]">
          Message Owner
        </button>
      </div>

      {errorMsg && <p className="mt-4 text-center text-sm font-medium text-rose-500">{errorMsg}</p>}

      {!hasBooked && (
        <div className="mt-6 text-center text-sm font-medium text-gray-400">
          You won't be charged yet.
        </div>
      )}
    </div>
  );
}
