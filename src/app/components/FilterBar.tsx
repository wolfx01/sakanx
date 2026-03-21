"use client";

import { Search, SlidersHorizontal } from "lucide-react";

interface FilterBarProps {
  city: string;
  setCity: (c: string) => void;
  category: string;
  setCategory: (c: string) => void;
}

const cities = ["All", "Rabat", "Casablanca", "Tangier", "Fes", "Marrakech", "Agadir"];
const categories = [
  { value: "all", label: "All Properties" },
  { value: "room", label: "Private Room" },
  { value: "studio", label: "Studio" },
  { value: "apartment", label: "Shared Apartment" },
  { value: "house", label: "Full House" },
];

export default function FilterBar({ city, setCity, category, setCategory }: FilterBarProps) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm shadow-sakanx-navy/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between gap-4">
        
        {/* Left Side: Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setCategory(cat.value)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer border ${
                category === cat.value
                  ? "bg-sakanx-navy border-sakanx-navy text-white shadow-md shadow-sakanx-navy/20"
                  : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Right Side: Quick Filters & Search */}
        <div className="hidden lg:flex items-center gap-3">
          {/* City Dropdown */}
          <div className="relative">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="appearance-none bg-sakanx-light border border-gray-200 rounded-full h-11 pl-5 pr-10 text-sm font-bold text-sakanx-navy focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 outline-none cursor-pointer"
            >
              {cities.map((c) => (
                <option key={c} value={c === "All" ? "all" : c}>
                  {c === "All" ? "Everywhere in Morocco" : c}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
              ▼
            </div>
          </div>

          {/* More Filters Button */}
          <button className="h-11 px-5 rounded-full border border-gray-200 flex items-center gap-2 text-sm font-bold text-sakanx-navy hover:bg-gray-50 transition-colors cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>
    </div>
  );
}
