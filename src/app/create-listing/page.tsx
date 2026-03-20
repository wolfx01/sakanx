"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  MapPin,
  DollarSign,
  FileText,
  ImagePlus,
  ArrowRight,
  Tag,
  X,
  Upload,
  CheckCircle,
  Star
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";

const cities = [
  "Rabat",
  "Casablanca",
  "Tangier",
  "Fes",
  "Marrakech",
  "Agadir",
  "Meknes",
  "Oujda",
  "Kenitra",
  "Tetouan",
  "Mohammedia",
  "El Jadida",
  "Settat",
  "Beni Mellal",
];

const categories = [
  { value: "room", label: "Private Room", icon: "🛏️" },
  { value: "studio", label: "Studio", icon: "🏠" },
  { value: "apartment", label: "Shared Apartment", icon: "🏢" },
  { value: "house", label: "Full House", icon: "🏡" },
];

const availableAmenities = [
  { name: "Fast Wi-Fi", icon: "📶" },
  { name: "Air Conditioning", icon: "❄️" },
  { name: "Heating", icon: "🔥" },
  { name: "Kitchen Access", icon: "🍳" },
  { name: "Furnished", icon: "🛋️" },
  { name: "Washing Machine", icon: "🧺" },
  { name: "Parking", icon: "🚗" },
  { name: "Near University", icon: "🎓" },
];

export default function CreateListingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const { token } = useAuth();

  const [form, setForm] = useState({
    title: "",
    description: "",
    city: "",
    address: "",
    pricePerMonth: "",
    category: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleAmenity = (name: string) => {
    setAmenities((prev) =>
      prev.includes(name) ? prev.filter((a) => a !== name) : [...prev, name]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newPreviews: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newPreviews.push(ev.target.result as string);
          if (newPreviews.length === files.length) {
            setImagePreview((prev) => [...prev, ...newPreviews]);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImagePreview((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description || undefined,
          city: form.city,
          address: form.address || undefined,
          price_per_month: parseFloat(form.pricePerMonth),
          category: form.category || undefined,
          amenities,
          images: imagePreview,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      setSuccess("Listing published successfully! Redirecting...");
      setIsLoading(false);
      setTimeout(() => router.push("/"), 2000);
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-sakanx-light pt-28 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <ScrollReveal variant="fade-down" duration={500}>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-sakanx-gold/10 px-4 py-1.5 rounded-full mb-4">
                <CheckCircle className="w-4 h-4 text-sakanx-gold" />
                <span className="text-sm font-bold text-sakanx-gold">
                  Account Created Successfully!
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-sakanx-navy mb-3">
                List Your Property
              </h1>
              <p className="text-gray-500 font-medium text-lg max-w-xl mx-auto">
                Fill in the details below to publish your listing and connect
                with students looking for housing.
              </p>
            </div>
          </ScrollReveal>

          {/* Form */}
          <ScrollReveal variant="fade-up" delay={100}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl text-green-600 text-sm font-medium text-center">
                {success}
              </div>
            )}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-3xl shadow-xl shadow-sakanx-navy/5 border border-gray-100 p-8 md:p-10 space-y-8"
            >
              {/* Section: Basic Info */}
              <div>
                <h2 className="text-lg font-bold text-sakanx-navy mb-4 flex items-center gap-2">
                  <Home className="w-5 h-5 text-sakanx-blue" />
                  Basic Information
                </h2>

                <div className="space-y-4">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="title"
                      className="text-sm font-semibold text-sakanx-navy"
                    >
                      Listing Title
                    </label>
                    <input
                      id="title"
                      type="text"
                      value={form.title}
                      onChange={(e) => update("title", e.target.value)}
                      placeholder="e.g. Cozy room near UM5 campus"
                      required
                      className="w-full h-13 px-4 rounded-xl bg-sakanx-light border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="description"
                      className="text-sm font-semibold text-sakanx-navy"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => update("description", e.target.value)}
                      placeholder="Describe your property — size, furniture, nearby facilities, rules, etc."
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-sakanx-light border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400 resize-none"
                    />
                  </div>

                  {/* Category */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-sakanx-navy flex items-center gap-1.5">
                      <Tag className="w-4 h-4 text-sakanx-blue" />
                      Property Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => update("category", cat.value)}
                          className={`h-14 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer text-sm ${
                            form.category === cat.value
                              ? "border-sakanx-blue bg-sakanx-blue/5 text-sakanx-navy shadow-sm"
                              : "border-gray-200 bg-sakanx-light text-gray-500 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-lg">{cat.icon}</span>
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Section: Location */}
              <div>
                <h2 className="text-lg font-bold text-sakanx-navy mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-rose-500" />
                  Location
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="city"
                      className="text-sm font-semibold text-sakanx-navy"
                    >
                      City
                    </label>
                    <select
                      id="city"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      required
                      className="w-full h-13 px-4 rounded-xl bg-sakanx-light border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy appearance-none cursor-pointer"
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="address"
                      className="text-sm font-semibold text-sakanx-navy"
                    >
                      Address{" "}
                      <span className="text-gray-400 font-normal">
                        (optional)
                      </span>
                    </label>
                    <input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => update("address", e.target.value)}
                      placeholder="e.g. Hay Riad, near Marjane"
                      className="w-full h-13 px-4 rounded-xl bg-sakanx-light border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Section: Amenities */}
              <div>
                <h2 className="text-lg font-bold text-sakanx-navy mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  What this place offers
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  Select all the features and amenities available at your property.
                </p>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {availableAmenities.map((amenity) => {
                    const isSelected = amenities.includes(amenity.name);
                    return (
                      <button
                        key={amenity.name}
                        type="button"
                        onClick={() => toggleAmenity(amenity.name)}
                        className={`h-14 px-4 rounded-xl border font-semibold flex items-center gap-3 transition-all duration-200 cursor-pointer text-sm text-left ${
                          isSelected
                            ? "border-sakanx-blue bg-sakanx-blue/10 text-sakanx-navy"
                            : "border-gray-200 bg-sakanx-light text-gray-500 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-xl">{amenity.icon}</span>
                        <span className="leading-tight">{amenity.name}</span>
                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-sakanx-blue ml-auto shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Section: Pricing */}
              <div>
                <h2 className="text-lg font-bold text-sakanx-navy mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-500" />
                  Pricing
                </h2>

                <div className="max-w-sm space-y-1.5">
                  <label
                    htmlFor="price"
                    className="text-sm font-semibold text-sakanx-navy"
                  >
                    Monthly Rent (MAD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
                      MAD
                    </span>
                    <input
                      id="price"
                      type="number"
                      min="0"
                      step="100"
                      value={form.pricePerMonth}
                      onChange={(e) => update("pricePerMonth", e.target.value)}
                      placeholder="e.g. 2500"
                      required
                      className="w-full h-13 pl-16 pr-4 rounded-xl bg-sakanx-light border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                  </div>
                  <p className="text-xs text-gray-400 font-medium">
                    Set a competitive price to attract more students
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Section: Photos */}
              <div>
                <h2 className="text-lg font-bold text-sakanx-navy mb-4 flex items-center gap-2">
                  <ImagePlus className="w-5 h-5 text-purple-500" />
                  Photos
                </h2>

                {/* Image upload area */}
                <label className="flex flex-col items-center justify-center w-full h-40 rounded-2xl border-2 border-dashed border-gray-200 bg-sakanx-light hover:border-sakanx-blue/40 hover:bg-sakanx-blue/5 transition-all duration-300 cursor-pointer group">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-sakanx-blue transition-colors mb-2" />
                  <span className="text-sm font-semibold text-gray-500 group-hover:text-sakanx-navy transition-colors">
                    Click to upload photos
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    JPG, PNG up to 5MB each
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>

                {/* Preview grid */}
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mt-4">
                    {imagePreview.map((src, i) => (
                      <div
                        key={i}
                        className="relative group rounded-xl overflow-hidden aspect-square"
                      >
                        <img
                          src={src}
                          alt={`Preview ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {i === 0 && (
                          <span className="absolute bottom-1.5 left-1.5 bg-sakanx-navy text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Main
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100" />

              {/* Submit */}
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <p className="text-sm text-gray-400 font-medium">
                  Your listing will be reviewed before going live.
                </p>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full sm:w-auto px-10 h-13 bg-sakanx-navy text-white rounded-xl font-bold text-lg hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Publish Listing
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>

          {/* Skip for now */}
          <ScrollReveal variant="blur-in" delay={200}>
            <p className="text-center mt-6">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-sakanx-navy transition-colors font-medium"
              >
                Skip for now → Go to Dashboard
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </main>
    </>
  );
}
