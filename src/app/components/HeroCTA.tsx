"use client";

import Link from "next/link";
import { Search, ChevronDown, Star, ArrowRight, UserPlus } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useAuth } from "../context/AuthContext";

export default function HeroCTA() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    // ------- LOGGED IN: Show search box + trending cities -------
    return (
      <>
        <ScrollReveal variant="zoom-in" delay={350} duration={800}>
          <div className="max-w-4xl mx-auto bg-white p-3 md:p-4 rounded-2xl shadow-xl shadow-sakanx-navy/5 border border-gray-100 flex flex-col md:flex-row gap-3 animate-pulse-glow">
            <div className="flex-[1.5] relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-sakanx-navy/40" />
              <input
                type="text"
                placeholder="Where are you studying? (e.g. Rabat, Agadir...)"
                className="w-full h-14 pl-12 pr-4 rounded-xl bg-sakanx-light border-transparent focus:bg-white focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/30 transition-all outline-none text-base placeholder-gray-400 font-medium text-sakanx-navy"
              />
            </div>
            <div className="flex-1 relative">
              <select className="w-full h-14 pl-4 pr-10 rounded-xl bg-sakanx-light border-transparent focus:bg-white focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/30 transition-all outline-none text-base font-medium text-sakanx-navy appearance-none cursor-pointer">
                <option value="">Property Type</option>
                <option value="room">Private Room</option>
                <option value="studio">Studio</option>
                <option value="apartment">Shared Apartment</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronDown className="w-5 h-5 text-sakanx-navy/40" />
              </div>
            </div>
            <button className="h-14 md:w-48 bg-sakanx-navy text-white rounded-xl font-bold text-lg hover:bg-sakanx-blue hover:shadow-lg hover:shadow-sakanx-blue/30 transition-all duration-300 active:scale-95 cursor-pointer flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </ScrollReveal>

        {/* Trending Cities */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-3 font-semibold text-gray-500 text-sm">
          <ScrollReveal variant="fade-right" delay={500}>
            <span className="font-medium mr-2 text-gray-400">
              Trending cities:
            </span>
          </ScrollReveal>
          {["Rabat", "Tangier", "Casablanca", "Agadir", "Fes"].map(
            (city, i) => (
              <ScrollReveal key={city} variant="fade-up" delay={550 + i * 80}>
                <button className="px-5 py-2.5 bg-white text-sakanx-navy rounded-full shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 hover:border-sakanx-blue hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer">
                  <Star className="w-3.5 h-3.5 text-sakanx-gold fill-sakanx-gold" />
                  {city}
                </button>
              </ScrollReveal>
            )
          )}
        </div>
      </>
    );
  }

  // ------- NOT LOGGED IN: Show CTA buttons -------
  return (
    <ScrollReveal variant="zoom-in" delay={350} duration={800}>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Link
          href="/signup"
          className="inline-flex items-center justify-center px-10 py-4 bg-sakanx-navy text-white font-bold rounded-full text-lg hover:bg-sakanx-blue transition-all duration-300 shadow-xl shadow-sakanx-navy/20 hover:shadow-sakanx-blue/40 hover:scale-105 active:scale-95 gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Create Your Account
        </Link>
        <Link
          href="/signin"
          className="inline-flex items-center justify-center px-10 py-4 bg-white text-sakanx-navy font-bold rounded-full text-lg border-2 border-gray-200 hover:border-sakanx-blue/30 hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 gap-2"
        >
          Sign In
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <p className="text-center mt-6 text-gray-400 text-sm font-medium">
        Create an account as a <span className="text-sakanx-navy font-semibold">Student</span> or{" "}
        <span className="text-sakanx-gold font-semibold">Property Owner</span> to get started
      </p>
    </ScrollReveal>
  );
}
