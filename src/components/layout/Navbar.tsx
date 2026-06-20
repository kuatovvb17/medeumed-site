"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Басты бет", href: "/" },
  { label: "Қызметтер", href: "/services" },
  { label: "Дәрігерлер", href: "/doctors" },
  { label: "Кабинет", href: "/dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "h-20 bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm"
          : "h-24 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-3xl font-bold tracking-tight">
            <span className="text-[#0F4C3A]">Medeu</span>
            <span className="text-slate-800">Med</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-10 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#0F4C3A]"
                    : "text-slate-500 hover:text-[#0F4C3A]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#0F4C3A]" />
                )}
              </Link>
            );
          })}

          <Link
            href="/booking"
            className="rounded-full bg-[#0F4C3A] px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-900/20"
          >
            Жазылу
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-10 rounded-xl p-2 text-slate-700 transition-all duration-300 hover:bg-white/50 lg:hidden"
          aria-label={isMobileMenuOpen ? "Мәзірді жабу" : "Мәзірді ашу"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 pb-8 px-8">
          <div className="flex flex-col gap-4 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-2xl px-5 py-4 text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-emerald-50/80 text-[#0F4C3A]"
                      : "text-slate-500 hover:bg-slate-50 hover:text-[#0F4C3A]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F4C3A]" />
                    )}
                    {link.label}
                  </span>
                </Link>
              );
            })}

            <div className="mt-8">
              <Link
                href="/booking"
                className="block w-full rounded-full bg-[#0F4C3A] px-7 py-4 text-center text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-emerald-900/20"
              >
                Қабылдауға жазылу
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
