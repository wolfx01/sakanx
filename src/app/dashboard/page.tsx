"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import OwnerDashboard from "@/app/components/OwnerDashboard";
import StudentDashboard from "@/app/components/StudentDashboard";

export default function DashboardPage() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isHydrated) return;
    if (!user) {
      router.replace("/signin");
    }
  }, [user, isHydrated, router]);

  if (!isHydrated || !user) {
    return (
      <div className="min-h-screen bg-sakanx-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sakanx-navy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sakanx-light">
      <Navbar />
      
      <main className="container mx-auto px-6 pt-28 pb-20 max-w-7xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-sakanx-navy mb-2">
            Welcome back, {user.full_name.split(' ')[0]} 👋
          </h1>
          <p className="text-gray-500">
            {user.role === "owner" 
              ? "Manage your properties and review student requests." 
              : "Track your homestay requests and saved properties."}
          </p>
        </div>

        {user.role === "owner" ? (
          <OwnerDashboard />
        ) : (
          <StudentDashboard />
        )}
      </main>
    </div>
  );
}
