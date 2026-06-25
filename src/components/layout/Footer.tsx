"use client";

import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  if (pathname?.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Logo & Description */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-bold font-sans tracking-tight">
                <span className="text-emerald-500">Medeu</span>
                <span className="text-white">Med</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Жоғары стандартты медициналық қызметтер. Біздің басты құндылығымыз – сіздің денсаулығыңыз.
            </p>
          </div>

          {/* Column 2 — Навигация */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Басты бет
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Қызметтер
                </Link>
              </li>
              <li>
                <Link href="/doctors" className="hover:text-emerald-400 transition-colors">
                  Дәрігерлер
                </Link>
              </li>
              <li>
                <Link href="/booking" className="hover:text-emerald-400 transition-colors">
                  Қабылдауға жазылу
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Қызметтер */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Қызметтер</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Терапия және ЖТД
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Неврология
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Кардиология
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Педиатрия
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  УДЗ Диагностика
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Зертхана
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Байланыс */}
          <div>
            <h4 className="text-white font-bold text-base mb-6 uppercase tracking-wider">Байланыс</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-500 shrink-0 mt-0.5" size={18} />
                <span>Алматы қ., пр. Рыскулова, 43В</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-500 shrink-0" size={18} />
                <a href="tel:+77759575780" className="hover:text-emerald-400 transition-colors">
                  +7 (775) 957-57-80
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-500 shrink-0" size={18} />
                <a href="mailto:info@medeumed.kz" className="hover:text-emerald-400 transition-colors">
                  info@medeumed.kz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>© {year} MedeuMed ЖШС. Барлық құқықтар қорғалған.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-emerald-400 transition-colors">Құпиялылық саясаты</Link>
            <Link href="#" className="hover:text-emerald-400 transition-colors">Қызмет көрсету шарттары</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
