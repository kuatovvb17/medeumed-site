"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Басты бет' },
    { href: '/services', label: 'Қызметтер' },
    { href: '/doctors', label: 'Дәрігерлер' },
    { href: '/dashboard', label: 'Кабинет' },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-slate-100 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-serif font-bold text-slate-800 tracking-tight">
              <span className="text-emerald-600">Medeu</span>Med
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-medium transition-colors ${
                    pathname === link.href 
                      ? 'text-emerald-600' 
                      : 'text-slate-600 hover:text-emerald-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <Link 
              href="/booking" 
              className="bg-emerald-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-700 transition-colors shadow-md shadow-emerald-200"
            >
              Жазылу
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 animate-in slide-in-from-top-2">
            <div className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`font-medium px-2 py-1 ${
                    pathname === link.href 
                      ? 'text-emerald-600' 
                      : 'text-slate-600'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/booking" 
                onClick={() => setIsMenuOpen(false)}
                className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold text-center mt-2"
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
