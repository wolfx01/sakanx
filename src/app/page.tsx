import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  ShieldCheck,
  BadgeDollarSign,
  Building2,
  ArrowRight,
  Star,
  Home as HomeIcon,
  MapPin,
  GraduationCap,
  Sparkles,
  Instagram,
  Twitter,
  Linkedin,
  Menu,
} from "lucide-react";
import ScrollReveal from "./components/ScrollReveal";
import CountUp from "./components/CountUp";
import HeroBackground from "./components/HeroBackground";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* ========== NAVBAR ========== */}
      <header className="fixed top-0 left-0 right-0 glass z-50 border-b border-white/20">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/sakanx-logo.png"
                alt="SakanX Logo"
                width={220}
                height={64}
                className="w-auto h-14 object-contain"
                priority
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-8 font-semibold text-gray-500">
            <Link
              href="#"
              className="text-sakanx-navy hover:text-sakanx-blue transition-colors"
            >
              Home
            </Link>
            <Link
              href="#listings"
              className="hover:text-sakanx-blue transition-colors"
            >
              Browse
            </Link>
            <Link
              href="#features"
              className="hover:text-sakanx-blue transition-colors"
            >
              Why Us
            </Link>
            <Link
              href="#how-it-works"
              className="hover:text-sakanx-blue transition-colors"
            >
              How It Works
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/signin"
              className="hidden sm:block text-sakanx-navy font-semibold hover:text-sakanx-blue transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="#"
              className="bg-sakanx-navy text-white px-6 py-2.5 rounded-full font-bold hover:bg-sakanx-blue transition-all duration-300 shadow-lg shadow-sakanx-navy/20 hover:shadow-sakanx-blue/30 hover:scale-105 active:scale-95"
            >
              Post a Listing
            </Link>
            <button className="md:hidden text-sakanx-navy">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-36 overflow-hidden bg-sakanx-light">
        {/* Animated Canvas Background */}
        <HeroBackground />
        {/* Decorative blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-sakanx-light via-sakanx-blue/5 to-white -z-10" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-sakanx-blue/10 rounded-full blur-3xl -z-10 animate-float" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sakanx-navy/5 rounded-full blur-3xl -z-10" />
        <div className="absolute top-40 left-1/3 w-60 h-60 bg-sakanx-gold/10 rounded-full blur-3xl -z-10 animate-float delay-300" />

        <div className="container mx-auto px-6 text-center relative z-10">
          {/* Badge */}
          <ScrollReveal variant="fade-down" duration={600}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full border border-sakanx-blue/20 mb-8 shadow-sm">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-sakanx-navy">
                Trusted by 2,000+ students across Morocco
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-sakanx-navy mb-6 leading-tight">
              Find Your Perfect
              <br />
              <span className="text-gradient">Student Housing.</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={200}>
            <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-3xl mx-auto leading-relaxed">
              Morocco&apos;s first student-first housing platform. Discover
              rooms, studios, and shared apartments — safely, affordably, and
              broker-free.
            </p>
          </ScrollReveal>

          {/* Search Box */}
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
        </div>
      </section>

      {/* ========== STATS BAR ========== */}
      <section className="relative -mt-8 z-10">
        <div className="container mx-auto px-6">
          <ScrollReveal variant="fade-up" duration={900}>
            <div className="bg-white rounded-2xl shadow-xl shadow-sakanx-navy/5 border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                {
                  end: 1500,
                  suffix: "+",
                  label: "Active Listings",
                  icon: <HomeIcon className="w-7 h-7 text-sakanx-blue" />,
                },
                {
                  end: 15,
                  suffix: "+",
                  label: "Cities Covered",
                  icon: <MapPin className="w-7 h-7 text-rose-500" />,
                },
                {
                  end: 2000,
                  suffix: "+",
                  label: "Happy Students",
                  icon: (
                    <GraduationCap className="w-7 h-7 text-sakanx-navy" />
                  ),
                },
                {
                  end: 98,
                  suffix: "%",
                  label: "Satisfaction Rate",
                  icon: <Sparkles className="w-7 h-7 text-sakanx-gold" />,
                },
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <div className="w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-3xl md:text-4xl font-extrabold text-sakanx-navy mb-1">
                    <CountUp
                      end={stat.end}
                      suffix={stat.suffix}
                      duration={2200}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FEATURES SECTION ========== */}
      <section
        id="features"
        className="py-28 bg-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-sakanx-blue/5 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-sakanx-gold/5 rounded-full blur-3xl -z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <ScrollReveal variant="zoom-in">
              <span className="inline-block text-sakanx-blue font-bold text-sm uppercase tracking-widest mb-3 bg-sakanx-blue/10 px-4 py-1.5 rounded-full">
                Why SakanX
              </span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-sakanx-navy mb-4 tracking-tight">
                Built Different. Built for{" "}
                <span className="text-gradient">Students.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="blur-in" delay={200}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                A platform made by real students, designed to fit your needs and
                your budget.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8" strokeWidth={2} />,
                title: "Verified & Safe",
                desc: "Every listing is reviewed for authenticity. We verify owners and provide transparent details so you can book with total confidence.",
                gradient: "from-sakanx-gold to-amber-400",
                textColor: "text-sakanx-navy",
                shadow: "shadow-sakanx-gold/20",
              },
              {
                icon: <BadgeDollarSign className="w-8 h-8" strokeWidth={2} />,
                title: "Zero Broker Fees",
                desc: "Connect directly with property owners. No middlemen, no hidden costs — just transparent pricing and straightforward agreements.",
                gradient: "from-sakanx-navy to-indigo-800",
                textColor: "text-white",
                shadow: "shadow-sakanx-navy/30",
              },
              {
                icon: <Building2 className="w-8 h-8" strokeWidth={2} />,
                title: "Huge Variety",
                desc: "From budget-friendly rooms to cozy studios and shared apartments — find the perfect match for your lifestyle and budget.",
                gradient: "from-sakanx-blue to-blue-500",
                textColor: "text-white",
                shadow: "shadow-sakanx-blue/30",
              },
            ].map((feature, i) => (
              <ScrollReveal
                key={i}
                variant={
                  i === 0
                    ? "fade-right"
                    : i === 1
                      ? "fade-up"
                      : "fade-left"
                }
                delay={i * 150}
                duration={800}
              >
                <div className="group bg-gradient-to-br from-sakanx-light to-white p-8 rounded-3xl border border-gray-100 hover:-translate-y-3 hover:shadow-2xl hover:border-sakanx-blue/30 transition-all duration-500 h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} ${feature.textColor} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${feature.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-sakanx-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section
        id="how-it-works"
        className="py-28 bg-gradient-to-b from-sakanx-light to-white relative overflow-hidden"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <ScrollReveal variant="zoom-in">
              <span className="inline-block text-sakanx-gold font-bold text-sm uppercase tracking-widest mb-3 bg-sakanx-gold/10 px-4 py-1.5 rounded-full">
                Simple Process
              </span>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={100}>
              <h2 className="text-4xl md:text-5xl font-extrabold text-sakanx-navy mb-4 tracking-tight">
                Three Steps to Your{" "}
                <span className="text-gradient">New Home.</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal variant="blur-in" delay={200}>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Finding student housing has never been this easy.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop) */}
            <div className="hidden md:block absolute top-24 left-[16.5%] right-[16.5%] h-0.5 bg-gradient-to-r from-sakanx-blue/20 via-sakanx-navy/20 to-sakanx-gold/20" />

            {[
              {
                title: "Search & Explore",
                desc: "Enter your city or university and browse verified listings with photos, prices, and details.",
                icon: <Search className="w-8 h-8 text-sakanx-blue" />,
                borderColor:
                  "border-sakanx-blue/20 group-hover:border-sakanx-blue",
              },
              {
                title: "Book Securely",
                desc: "Contact the owner directly through our platform. Ask questions, negotiate, and confirm your booking.",
                icon: <ShieldCheck className="w-8 h-8 text-sakanx-navy" />,
                borderColor:
                  "border-sakanx-navy/20 group-hover:border-sakanx-navy",
              },
              {
                title: "Move In & Thrive",
                desc: "Pack your bags and settle into your new home. Focus on your studies — we handled the hard part.",
                icon: <HomeIcon className="w-8 h-8 text-sakanx-gold" />,
                borderColor:
                  "border-sakanx-gold/30 group-hover:border-sakanx-gold",
              },
            ].map((item, i) => (
              <ScrollReveal
                key={i}
                variant="flip-up"
                delay={i * 200}
                duration={900}
              >
                <div className="relative text-center group">
                  <div
                    className={`w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl border-4 ${item.borderColor} transition-all duration-500 relative z-10 group-hover:scale-110 group-hover:shadow-2xl`}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-sakanx-navy mb-3">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 font-medium max-w-xs mx-auto">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CTA SECTION ========== */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sakanx-navy via-sakanx-dark to-sakanx-navy" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-sakanx-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-sakanx-gold/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <ScrollReveal variant="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Have a Property Near a University?
            </h2>
          </ScrollReveal>
          <ScrollReveal variant="blur-in" delay={150}>
            <p className="text-xl text-blue-200/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of property owners already earning on SakanX. List
              your property for free and connect with students looking for their
              next home.
            </p>
          </ScrollReveal>
          <ScrollReveal variant="zoom-in" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="inline-flex items-center justify-center px-10 py-4 bg-sakanx-gold text-sakanx-navy font-bold rounded-full text-lg hover:bg-amber-400 transition-all duration-300 shadow-xl shadow-sakanx-gold/20 hover:shadow-sakanx-gold/40 hover:scale-105 active:scale-95"
              >
                List Your Property — Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="#"
                className="inline-flex items-center justify-center px-10 py-4 bg-white/10 text-white font-bold rounded-full text-lg border border-white/20 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Learn More
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-sakanx-navy pt-16 pb-8 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sakanx-blue/30 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <ScrollReveal variant="fade-right">
              <div className="md:col-span-1">
                <Image
                  src="/sakanx-logo.png"
                  alt="SakanX"
                  width={180}
                  height={52}
                  className="w-auto h-12 object-contain mb-4 brightness-0 invert"
                />
                <p className="text-blue-200/60 font-medium leading-relaxed text-sm">
                  The #1 student housing platform in Morocco. Safe, affordable,
                  and broker-free.
                </p>
              </div>
            </ScrollReveal>

            {/* Quick Links */}
            <ScrollReveal variant="fade-up" delay={100}>
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Platform
                </h4>
                <ul className="space-y-3">
                  {[
                    "Browse Listings",
                    "Post a Listing",
                    "How It Works",
                    "Pricing",
                  ].map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-blue-200/60 hover:text-sakanx-gold transition-colors font-medium text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Company */}
            <ScrollReveal variant="fade-up" delay={200}>
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Company
                </h4>
                <ul className="space-y-3">
                  {["About Us", "Contact", "Careers", "Blog"].map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-blue-200/60 hover:text-sakanx-gold transition-colors font-medium text-sm"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            {/* Social */}
            <ScrollReveal variant="fade-left" delay={300}>
              <div>
                <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Stay Connected
                </h4>
                <p className="text-blue-200/60 text-sm mb-4 font-medium">
                  Follow us for updates and new listings.
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      name: "Instagram",
                      icon: <Instagram className="w-5 h-5" />,
                    },
                    {
                      name: "Twitter",
                      icon: <Twitter className="w-5 h-5" />,
                    },
                    {
                      name: "LinkedIn",
                      icon: <Linkedin className="w-5 h-5" />,
                    },
                  ].map((social) => (
                    <Link
                      key={social.name}
                      href="#"
                      className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-sakanx-blue transition-all duration-300 hover:scale-110 hover:rotate-6"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Bottom bar */}
          <ScrollReveal variant="fade-up" delay={100}>
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-blue-200/40 text-sm font-medium">
                © {new Date().getFullYear()}{" "}
                <span className="text-sakanx-gold font-bold">SakanX</span>. All
                rights reserved.
              </p>
              <div className="flex gap-6 text-blue-200/40 text-sm font-medium">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  );
}
