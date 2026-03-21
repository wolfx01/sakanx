import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import BookingCard from "@/app/components/BookingCard";
import { 
  MapPin, 
  Tag, 
  Home, 
  User, 
  CheckCircle,
  Share,
  Heart,
  ChevronLeft
} from "lucide-react";

export default async function PropertyDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. Fetch residence data directly via Prisma (Server Component)
  const residence = await prisma.residence.findUnique({
    where: { id },
    include: {
      owner: {
        select: {
          full_name: true,
          email: true,
        },
      },
      images: {
        select: { image_url: true, is_main: true },
        orderBy: { is_main: "desc" }, // Main image first
      },
    },
  });

  // 2. Handle 404 if not found
  if (!residence) {
    notFound();
  }

  // Formatting
  const formattedPrice = new Intl.NumberFormat("en-US").format(residence.price_per_month);
  
  // Images fallback
  const placeholderImages = ["/property-1.png", "/property-2.png", "/property-1.png"];
  
  // We want to show up to 3 images in the hero gallery
  const displayImages = residence.images.length > 0 
    ? residence.images.map(img => img.image_url) 
    : placeholderImages;

  const mainImage = displayImages[0];
  const sideImages = displayImages.slice(1, 3); // Get max 2 side images

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-7xl">
        
        {/* Top Breadcrumb & Share Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div>
            <Link href="/browse" className="inline-flex items-center text-gray-500 hover:text-sakanx-navy font-medium mb-3 transition-colors">
              <ChevronLeft className="w-5 h-5 mr-1" />
              Back to search
            </Link>
            <h1 className="text-3xl md:text-4xl font-extrabold text-sakanx-navy leading-tight">
              {residence.title}
            </h1>
            <div className="flex items-center gap-3 mt-3 text-sm font-medium text-gray-600">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4 text-sakanx-blue" />
                {residence.city} {residence.address && <span className="text-gray-400 mx-1">•</span>} {residence.address}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors text-sakanx-navy font-semibold text-sm border border-gray-200">
              <Share className="w-4 h-4" /> Share
            </button>
            <button className="flex items-center gap-2 px-4 py-2 hover:bg-rose-50 rounded-lg transition-colors text-sakanx-navy font-semibold text-sm border border-gray-200">
              <Heart className="w-4 h-4 text-rose-500" /> Save
            </button>
          </div>
        </div>

        {/* Image Gallery (Airbnb style) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-[400px] md:h-[500px] mb-12 rounded-3xl overflow-hidden">
          {/* Main Large Image */}
          <div className="relative col-span-1 md:col-span-2 lg:col-span-3 h-full group bg-gray-100">
            <Image
              src={mainImage}
              alt={residence.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
              priority
            />
          </div>
          
          {/* Side Small Images */}
          <div className="hidden md:flex flex-col gap-2 md:gap-4 h-full col-span-1">
            {sideImages.map((src, i) => (
              <div key={i} className="relative flex-1 group bg-gray-100 overflow-hidden rounded-r-3xl md:rounded-r-none last:rounded-br-none">
                <Image
                  src={src}
                  alt={`${residence.title} ${i + 2}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
            ))}
            {/* If there's missing side images, fill with empty gray box */}
            {sideImages.length === 0 && (
              <>
                <div className="relative flex-1 bg-gray-100" />
                <div className="relative flex-1 bg-gray-100" />
              </>
            )}
            {sideImages.length === 1 && (
               <div className="relative flex-1 bg-gray-100" />
            )}
          </div>
        </div>

        {/* Content & Sidebar Split */}
        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Left Content (60%) */}
          <div className="flex-1 lg:w-[60%]">
            
            {/* Hosted By Header */}
            <div className="flex items-center justify-between pb-8 border-b border-gray-200 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-sakanx-navy mb-1">
                  Hosted by {residence.owner.full_name}
                </h2>
                <div className="flex items-center gap-3 text-gray-500 font-medium">
                  <div className="flex items-center gap-1.5 capitalize bg-sakanx-light px-3 py-1 rounded-full text-sm">
                    <Tag className="w-4 h-4 text-sakanx-blue" />
                    {residence.category?.replace("-", " ") || "Property"}
                  </div>
                  <span>•</span>
                  <span>Superhost</span>
                </div>
              </div>
              
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-sakanx-blue to-sakanx-navy flex items-center justify-center text-white font-bold text-xl shadow-lg ring-4 ring-white">
                {residence.owner.full_name.charAt(0)}
              </div>
            </div>

            {/* Description Section */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-sakanx-navy mb-4">About this place</h3>
              <div className="prose prose-lg text-gray-600 leading-relaxed">
                {residence.description ? (
                  <p className="whitespace-pre-line">{residence.description}</p>
                ) : (
                  <p className="italic text-gray-400">The owner hasn't provided a detailed description yet.</p>
                )}
              </div>
            </div>

            {/* What this place offers */}
            <div className="mb-10">
              <h3 className="text-xl font-bold text-sakanx-navy mb-6">What this place offers</h3>
              {residence.amenities && residence.amenities.length > 0 ? (
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {residence.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-4 text-gray-600 font-medium">
                      <CheckCircle className="w-6 h-6 text-green-500" /> {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic">No specific amenities listed by the owner.</p>
              )}
            </div>

          </div>

          {/* Right Sidebar - Sticky Contact/Booking Card (40%) */}
          <div className="w-full lg:w-[40%] xl:w-[35%] relative">
             <BookingCard 
               residenceId={residence.id}
               price={Number(residence.price_per_month)}
               ownerId={residence.owner_id as string}
             />
          </div>
          
        </div>

      </main>
    </div>
  );
}
