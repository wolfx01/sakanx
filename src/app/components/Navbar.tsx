"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, LogOut, User, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user, isOwner, isLoggedIn, logout, token } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!isLoggedIn || !token) {
      setUnreadCount(0);
      return;
    }

    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/messages/unread", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.count || 0);
        }
      } catch (err) {
        console.error("Failed to fetch unread count", err);
      }
    };

    fetchUnread();
    const intervalId = setInterval(fetchUnread, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [isLoggedIn, token]);

  return (
    <header className="fixed top-0 left-0 right-0 glass z-50 border-b border-white/20">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/">
            <Image
              src="/sakanx-logo.png"
              alt="SakanX Logo"
              width={220}
              height={64}
              className="w-auto h-14 object-contain"
              priority
            />
          </Link>
        </div>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-500">
          <Link
            href="/"
            className="text-sakanx-navy hover:text-sakanx-blue transition-colors"
          >
            Home
          </Link>
          {isLoggedIn && (
            <Link
              href="/browse"
              className="hover:text-sakanx-blue transition-colors"
            >
              Browse
            </Link>
          )}
          <Link
            href="#features"
            className="hover:text-sakanx-blue transition-colors"
          >
            Why Us
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-sakanx-blue transition-colors"
          >
            How It Works
          </Link>
        </nav>

        {/* Right side buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              {/* Post a Listing — ONLY for owners */}
              {isOwner && (
                <Link
                  href="/create-listing"
                  className="hidden sm:inline-block bg-sakanx-navy text-white px-6 py-2.5 rounded-full font-bold hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-105 active:scale-95"
                >
                  Post a Listing
                </Link>
              )}

              {/* Notification Bell */}
              <Link href="/dashboard" className="relative p-2 text-sakanx-navy hover:text-sakanx-blue transition-colors hover:bg-sakanx-light rounded-full" title="Notifications">
                <Bell className="w-6 h-6" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>

              {/* User menu */}
              <div className="flex items-center gap-3 ml-2 border-l pl-4 border-gray-200">
                <Link href="/dashboard" className="hidden sm:flex items-center gap-2 hover:opacity-80 transition-opacity" title="Go to Dashboard">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sakanx-blue to-sakanx-navy flex items-center justify-center text-white font-bold text-sm shadow-md">
                    {user?.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <span className="text-sm font-semibold text-sakanx-navy max-w-[120px] truncate hover:text-sakanx-blue transition-colors">
                    {user?.full_name}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer p-1"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Not logged in */}
              <Link
                href="/signin"
                className="hidden sm:block text-sakanx-navy font-semibold hover:text-sakanx-blue transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="bg-sakanx-navy text-white px-6 py-2.5 rounded-full font-bold hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
          <button className="md:hidden text-sakanx-navy">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
