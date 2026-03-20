"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Chrome,
  User,
  Phone,
  GraduationCap,
  Building2,
} from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import HeroBackground from "../components/HeroBackground";
import { useAuth } from "../context/AuthContext";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "student",
    agreeTerms: false,
  });

  const update = (field: string, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.fullName,
          email: form.email,
          password: form.password,
          phone: form.phone || undefined,
          role: form.role,
        }),
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

      // Redirect based on role
      if (form.role === "owner") {
        router.push("/create-listing");
      } else {
        router.push("/");
      }
    } catch {
      setError("Network error. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex">
      {/* ========== LEFT BRAND PANEL ========== */}
      <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden bg-gradient-to-br from-sakanx-navy via-[#0f1654] to-sakanx-dark">
        <HeroBackground />

        <div className="absolute top-20 right-10 w-72 h-72 bg-sakanx-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-60 h-60 bg-sakanx-gold/10 rounded-full blur-3xl" />

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
              Join the
              <br />
              <span className="bg-gradient-to-r from-sakanx-gold to-amber-300 bg-clip-text text-transparent">
                SakanX Community.
              </span>
            </h1>
            <p className="text-blue-200/70 text-lg max-w-md leading-relaxed">
              Create your account and start discovering safe, affordable student
              housing across Morocco — completely broker-free.
            </p>

            {/* Benefits list */}
            <div className="space-y-4 pt-2">
              {[
                { icon: "🔍", text: "Browse 1,500+ verified listings" },
                { icon: "🛡️", text: "Safe, transparent & broker-free" },
                { icon: "⚡", text: "Book your room in minutes" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-blue-100/80"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium text-sm">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-blue-100/80 italic text-sm leading-relaxed mb-3">
              &ldquo;I found a great shared apartment near my university in just
              two days. SakanX is a game changer for students!&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sakanx-blue to-blue-400 flex items-center justify-center text-white font-bold text-sm">
                YM
              </div>
              <div>
                <div className="text-white font-semibold text-sm">
                  Youssef M.
                </div>
                <div className="text-blue-200/50 text-xs">
                  Student at UIR, Rabat
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== RIGHT FORM PANEL ========== */}
      <div className="w-full lg:w-[55%] flex items-center justify-center bg-sakanx-light relative overflow-y-auto">
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

        <div className="w-full max-w-lg px-8 py-12">
          <ScrollReveal variant="fade-down" duration={500}>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-extrabold text-sakanx-navy mb-2">
                Create Account
              </h2>
              <p className="text-gray-500 font-medium">
                Fill in your details to get started
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium text-center">
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="text-sm font-semibold text-sakanx-navy"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    id="fullName"
                    type="text"
                    value={form.fullName}
                    onChange={(e) => update("fullName", e.target.value)}
                    placeholder="Ahmed El Amrani"
                    required
                    className="w-full h-13 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Email & Phone row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full h-13 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="phone"
                    className="text-sm font-semibold text-sakanx-navy"
                  >
                    Phone{" "}
                    <span className="text-gray-400 font-normal">
                      (optional)
                    </span>
                  </label>
                  <div className="relative">
                    <Phone className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+212 6XX XXX XXX"
                      className="w-full h-13 pl-12 pr-4 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                  </div>
                </div>
              </div>

              {/* Role selector */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-sakanx-navy">
                  I am a
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => update("role", "student")}
                    className={`h-13 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      form.role === "student"
                        ? "border-sakanx-blue bg-sakanx-blue/5 text-sakanx-navy shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    Student
                  </button>
                  <button
                    type="button"
                    onClick={() => update("role", "owner")}
                    className={`h-13 rounded-xl border-2 font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                      form.role === "owner"
                        ? "border-sakanx-gold bg-sakanx-gold/5 text-sakanx-navy shadow-sm"
                        : "border-gray-200 bg-white text-gray-500 hover:border-gray-300"
                    }`}
                  >
                    <Building2 className="w-5 h-5" />
                    Property Owner
                  </button>
                </div>
              </div>

              {/* Password & Confirm row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="password"
                    className="text-sm font-semibold text-sakanx-navy"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={(e) => update("password", e.target.value)}
                      placeholder="Min. 8 characters"
                      required
                      minLength={8}
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

                {/* Confirm */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-semibold text-sakanx-navy"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      id="confirmPassword"
                      type={showConfirm ? "text" : "password"}
                      value={form.confirmPassword}
                      onChange={(e) =>
                        update("confirmPassword", e.target.value)
                      }
                      placeholder="Re-enter password"
                      required
                      minLength={8}
                      className="w-full h-13 pl-12 pr-12 rounded-xl bg-white border border-gray-200 focus:border-sakanx-blue focus:ring-2 focus:ring-sakanx-blue/20 transition-all outline-none text-base font-medium text-sakanx-navy placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sakanx-navy transition-colors cursor-pointer"
                    >
                      {showConfirm ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="terms"
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  required
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-sakanx-blue focus:ring-sakanx-blue/30 cursor-pointer"
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-500 font-medium cursor-pointer"
                >
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-sakanx-blue hover:text-sakanx-navy font-semibold transition-colors"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-sakanx-blue hover:text-sakanx-navy font-semibold transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-13 bg-sakanx-navy text-white rounded-xl font-bold text-lg hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </ScrollReveal>

          {/* Divider */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="relative my-6">
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

          {/* Social */}
          <ScrollReveal variant="fade-up" delay={250}>
            <button className="w-full h-13 bg-white text-sakanx-navy rounded-xl font-semibold border border-gray-200 hover:border-sakanx-blue/30 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer hover:scale-[1.02] active:scale-[0.98]">
              <Chrome className="w-5 h-5 text-sakanx-blue" />
              Sign up with Google
            </button>
          </ScrollReveal>

          {/* Sign in link */}
          <ScrollReveal variant="blur-in" delay={300}>
            <p className="text-center mt-6 text-gray-500 font-medium text-sm">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-sakanx-blue font-bold hover:text-sakanx-navy transition-colors"
              >
                Sign In
              </Link>
            </p>
          </ScrollReveal>

          <ScrollReveal variant="blur-in" delay={350}>
            <p className="text-center mt-3">
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
