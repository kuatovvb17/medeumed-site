"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { href: '/', label: 'Басты бет' },
    { href: '/services', label: 'Қызметтер' },
    { href: '/doctors', label: 'Дәрігерлер' },
    { href: '/dashboard', label: 'Кабинет' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-xl border-b border-white/40 shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 md:px-8">
        <div className={`flex justify-between items-center transition-all duration-300 ${scrolled ? 'h-20' : 'h-24'}`}>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl font-serif font-bold tracking-tight text-slate-800 transition-transform group-hover:scale-[1.02]">
              <span className="text-emerald-700">Medeu</span>Med
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-10">
            <div className="flex space-x-8">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group font-medium text-[15px]"
                  >
                    <span className={`transition-colors duration-300 ${isActive ? 'text-emerald-700' : 'text-slate-600 group-hover:text-emerald-700'}`}>
                      {link.label}
                    </span>
                    <span className={`absolute -bottom-1 left-0 h-[2px] bg-emerald-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                  </Link>
                );
              })}
            </div>
            <Link 
              href="/booking" 
              className="bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-800 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-700/30 transition-all duration-300"
            >
              Жазылу
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl animate-in slide-in-from-top-2 duration-300">
            <div className="flex flex-col p-6 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium p-3 rounded-xl transition-colors ${
                    pathname === link.href 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/booking" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-emerald-700 text-white px-6 py-4 rounded-xl font-bold text-center mt-4 shadow-md"
              >
                Қабылдауға жазылу
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
