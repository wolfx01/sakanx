"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import FilterBar from "../components/FilterBar";
import PropertyCard, { Residence } from "../components/PropertyCard";
import { Loader2, Search } from "lucide-react";

export default function BrowsePage() {
  const [listings, setListings] = useState<Residence[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (city && city !== "all") queryParams.append("city", city);
        if (category && category !== "all") queryParams.append("category", category);

        const res = await fetch(`/api/listings?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch");
        
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [city, category]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pt-20">
      <Navbar />

      {/* Sticky Filter Bar */}
      <div className="sticky top-20 z-30">
        <FilterBar 
          city={city} 
          setCity={setCity} 
          category={category} 
          setCategory={setCategory} 
        />
      </div>

      {/* Main Browse Area - Full Width */}
      <div className="container mx-auto flex-1 px-6 py-8">
        <div className="mb-6 flex items-baseline justify-between">
          <h1 className="text-2xl font-extrabold text-sakanx-navy">
            {city === "all" ? "Morocco" : city} Stays
          </h1>
          <p className="text-gray-500 font-medium">
            {listings.length} {listings.length === 1 ? 'property' : 'properties'} found
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 text-sakanx-blue">
            <Loader2 className="w-10 h-10 animate-spin mb-4" />
            <p className="text-sakanx-navy font-bold">Finding perfect homes...</p>
          </div>
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-sakanx-navy mb-2">No properties found</h2>
            <p className="text-gray-500 max-w-sm">
              Try adjusting your filters or searching in a different city to see more results.
            </p>
            <button 
              onClick={() => { setCity("all"); setCategory("all"); }}
              className="mt-6 text-sakanx-blue font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-20">
            {listings.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
