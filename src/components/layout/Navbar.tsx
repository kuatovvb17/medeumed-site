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
          ? "h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm"
          : "h-24 bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <span className="font-serif text-3xl font-bold tracking-tight">
            <span className="text-sky-600">Medeu</span>
            <span className="text-slate-900">Med</span>
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
                    ? "text-sky-600 font-semibold"
                    : "text-slate-600 hover:text-sky-600"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-sky-600" />
                )}
              </Link>
            );
          })}

          <Link
            href="/booking"
            className="rounded-full bg-sky-600 px-7 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:scale-105 hover:bg-teal-600 hover:shadow-lg hover:shadow-sky-600/20"
          >
            Жазылу
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="relative z-[110] rounded-xl p-2 text-slate-900 transition-all duration-300 hover:bg-slate-100 lg:hidden"
          aria-label={isMobileMenuOpen ? "Мәзірді жабу" : "Мәзірді ашу"}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-white transition-all duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen 
            ? "opacity-100 pointer-events-auto" 
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div 
          className={`flex flex-col h-full pt-24 pb-8 px-8 transition-transform duration-500 ease-in-out delay-100 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-8"
          }`}
        >
          <div className="flex flex-col gap-4 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative rounded-2xl px-5 py-4 text-lg font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-sky-50 text-sky-600 font-semibold"
                      : "text-slate-600 hover:bg-slate-50 hover:text-sky-600"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-sky-600" />
                    )}
                    {link.label}
                  </span>
                </Link>
              );
            })}

            <div className="mt-8">
              <Link
                href="/booking"
                className="block w-full rounded-full bg-sky-600 px-7 py-4 text-center text-lg font-semibold text-slate-900 transition-all duration-300 hover:scale-[1.02] hover:bg-sky-600 hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                Қабылдауға жазылу
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
