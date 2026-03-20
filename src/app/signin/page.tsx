"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import HeroBackground from "../components/HeroBackground";
import { useAuth } from "../context/AuthContext";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      // Login with real token
      login(
        {
          id: data.user.id,
          full_name: data.user.full_name,
          email: data.user.email,
          role: data.user.role as "student" | "owner",
        },
        data.token
      );

      // Redirect to home
      router.push("/");
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* ========== LEFT BRAND PANEL ========== */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-sakanx-navy via-[#0f1654] to-sakanx-dark">
        {/* Animated Background */}
        <HeroBackground />

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-sakanx-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-sakanx-gold/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-sakanx-blue/5 rounded-full blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Logo */}
          <div>
            <Link href="/">
              <Image
                src="/sakanx-logo.png"
                alt="SakanX"
                width={180}
                height={52}
                className="w-auto h-12 object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* Center tagline */}
          <div className="space-y-6">
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight">
              Welcome Back
              <br />
              <span className="bg-gradient-to-r from-sakanx-gold to-amber-300 bg-clip-text text-transparent">
                to SakanX.
              </span>
            </h1>
            <p className="text-blue-200/70 text-lg max-w-md leading-relaxed">
              Sign in to manage your listings, bookings, and find your perfect
              student housing in Morocco.
            </p>

            {/* Stats row */}
            <div className="flex gap-8 pt-4">
              {[
                { value: "2,000+", label: "Students" },
                { value: "1,500+", label: "Listings" },
                { value: "98%", label: "Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-extrabold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-blue-200/50 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom testimonial */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-blue-100/80 italic text-sm leading-relaxed mb-3">
              &ldquo;SakanX made finding a safe room near my university so easy.
              I moved in within a week — no broker fees, no stress!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sakanx-gold to-amber-400 flex items-center justify-center text-sakanx-navy font-bold text-sm">
                SA
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Sara A.
                </div>
                <div className="text-blue-200/50 text-xs">
                  Student at UM5, Rabat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT FORM PANEL ========== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-sakanx-light relative">
        {/* Mobile logo */}
        <div className="absolute top-6 left-6 lg:hidden">
          <Link href="/">
            <Image
              src="/sakanx-logo.png"
              alt="SakanX"
              width={140}
              height={40}
              className="w-auto h-10 object-contain"
            />
          </Link>
        </div>

        <div className="w-full max-w-md px-8 py-12">
          <ScrollReveal variant="fade-down" duration={500}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-sakanx-navy mb-2">
                Sign In
              </h2>
              <p className="text-gray-500 font-medium">
                Enter your credentials to access your account
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-sakanx-navy"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full h-13 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-sakanx-navy"
                  >
                    Password
                  </label>
                  <Link
                    href="#"
                    className="text-sm font-semibold text-sakanx-blue hover:text-sakanx-navy transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-13 pl-12 pr-12 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sakanx-navy transition-colors cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-sakanx-blue focus:ring-sakanx-blue/30 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="text-sm text-gray-500 font-medium cursor-pointer"
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-13 bg-sakanx-navy text-white rounded-xl font-bold text-lg hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-sakanx-light text-gray-400 font-medium">
                  or continue with
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* Social login */}
          <ScrollReveal variant="fade-up" delay={250}>
            <button className="w-full h-13 bg-white text-sakanx-navy rounded-xl font-semibold border border-gray-200 hover:border-sakanx-blue/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <Chrome className="w-5 h-5 text-sakanx-blue" />
              Sign in with Google
            </button>
          </ScrollReveal>

          {/* Sign up link */}
          <ScrollReveal variant="blur-in" delay={300}>
            <p className="text-center mt-8 text-gray-500 font-medium text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-sakanx-blue font-bold hover:text-sakanx-navy transition-colors"
              >
                Create an account
              </Link>
            </p>
          </ScrollReveal>

          {/* Back to home */}
          <ScrollReveal variant="blur-in" delay={350}>
            <p className="text-center mt-4">
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-sakanx-navy transition-colors font-medium"
              >
                ← Back to Home
              </Link>
            </p>
          </ScrollReveal>
        </div>
      </div>
    </main>
  );
}
