"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, MapPin, Tag } from "lucide-react";
import { useState } from "react";

export interface Residence {
  id: string;
  title: string;
  city: string;
  price_per_month: number;
  category: string | null;
  owner: { full_name: string };
  images?: { image_url: string; is_main: boolean }[];
}

export default function PropertyCard({ listing }: { listing: Residence }) {
  const [isSaved, setIsSaved] = useState(false);

  const placeholderImages = [
    "/property-1.png",
    "/property-2.png",
  ];

  // Pick the real image if it exists, otherwise use a placeholder
  const displayImage = 
    listing.images && listing.images.length > 0 
      ? listing.images[0].image_url 
      : placeholderImages[Math.floor(Math.random() * placeholderImages.length)];

  // Basic localized formatting
  const formattedPrice = new Intl.NumberFormat("en-US").format(listing.price_per_month);

  return (
    <Link 
      href={`/residence/${listing.id}`}
      className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-sakanx-navy/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={displayImage}
          alt={listing.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Transparent Gradient Overlay */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent" />
        
        {/* Heart icon */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setIsSaved(!isSaved);
          }}
          className="absolute top-4 right-4 text-white hover:scale-110 transition-transform cursor-pointer"
        >
          <Heart className={`w-7 h-7 drop-shadow-md ${isSaved ? "fill-rose-500 text-rose-500" : ""}`} />
        </button>

        {/* Category Badge */}
        {listing.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-sakanx-navy font-bold text-xs px-3 py-1.5 rounded-full capitalize shadow-sm">
            {listing.category.replace("-", " ")}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <div className="space-y-1 pr-4">
            <h3 className="font-bold text-sakanx-navy text-lg line-clamp-1 leading-tight">
              {listing.title}
            </h3>
            <div className="flex items-center text-sm font-medium text-gray-500 gap-1">
              <MapPin className="w-4 h-4 text-sakanx-blue" />
              {listing.city}
            </div>
          </div>
        </div>

        {/* Price & Owner Footer */}
        <div className="mt-auto pt-4 flex items-end justify-between border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400 font-medium mb-0.5">Monthly Rent</p>
            <p className="font-extrabold text-sakanx-navy text-lg">
              {formattedPrice} <span className="text-sm font-semibold text-gray-400">MAD</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
             <div className="h-8 w-8 rounded-full bg-sakanx-blue/10 flex items-center justify-center border border-sakanx-blue/20">
               <span className="text-xs font-bold text-sakanx-navy">
                 {listing.owner?.full_name?.charAt(0) || "U"}
               </span>
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
