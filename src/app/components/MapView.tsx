"use client";

import { Map as MapIcon } from "lucide-react";

export default function MapView() {
  return (
    <div className="w-full h-full bg-sakanx-light rounded-3xl overflow-hidden relative border border-gray-200">
      {/* 
        For a production app, you would integrate Leaflet, Google Maps, or Mapbox here.
        For now, we use a beautiful stylized placeholder that gives a premium feel.
      */}
      <div className="absolute inset-0 bg-[#e7ebed] flex flex-col items-center justify-center p-8 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-80 mix-blend-multiply">
        <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-4 text-sakanx-blue">
          <MapIcon className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-sakanx-navy mb-2">Interactive Map Area</h3>
        <p className="text-gray-500 font-medium max-w-[200px]">
          Map integration will display properties here as you scroll.
        </p>
      </div>

      {/* Floating Mock Pin */}
      <div className="absolute top-1/3 left-1/3 w-12 h-12 bg-white rounded-full shadow-lg border-2 border-sakanx-blue flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer">
        <span className="font-bold text-sakanx-navy text-sm">2.5k</span>
      </div>
      
      <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-sakanx-navy rounded-full shadow-lg border-2 border-white flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer text-white">
        <span className="font-bold text-sm">1.2k</span>
      </div>
    </div>
  );
}
