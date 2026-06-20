import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-28 pb-12 relative overflow-hidden">
      {/* Decorative blob */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/20 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Column 1 — Logo & Description */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block mb-6">
              <span className="text-3xl font-serif">
                <span className="text-emerald-500">Medeu</span>
                <span className="text-white">Med</span>
              </span>
            </Link>

            <p className="text-slate-400 leading-relaxed mb-8">
              Әйелдер денсаулығына арналған заманауи клиника. Біз сіздің
              денсаулығыңыз бен жайлылығыңызды бірінші орынға қоямыз.
            </p>

            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-[#0F4C3A] hover:border-[#0F4C3A] transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-[#0F4C3A] hover:border-[#0F4C3A] transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-white"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2 — Навигация */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="text-white font-bold text-lg mb-6">Навигация</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Басты бет
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Қызметтер
                </Link>
              </li>
              <li>
                <Link
                  href="/doctors"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Дәрігерлер
                </Link>
              </li>
              <li>
                <Link
                  href="/appointment"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Жазылу
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 — Қызметтер */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-lg mb-6">Қызметтер</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/services#obstetrics"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Акушерлік
                </Link>
              </li>
              <li>
                <Link
                  href="/services#gynecology"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Гинекология
                </Link>
              </li>
              <li>
                <Link
                  href="/services#ultrasound"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  УДЗ (УЗИ)
                </Link>
              </li>
              <li>
                <Link
                  href="/services#analysis"
                  className="text-slate-400 hover:text-emerald-400 transition-colors"
                >
                  Анализдер
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 — Байланыс */}
          <div className="md:col-span-3">
            <h4 className="text-white font-bold text-lg mb-6">Байланыс</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-500 shrink-0 mt-0.5" size={22} />
                <span>Алматы қ., Достық даңғылы, 123</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-500 shrink-0" size={22} />
                <a
                  href="tel:+77271234567"
                  className="hover:text-emerald-400 transition-colors"
                >
                  +7 (727) 123 45 67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-500 shrink-0" size={22} />
                <a
                  href="mailto:info@medeumed.kz"
                  className="hover:text-emerald-400 transition-colors"
                >
                  info@medeumed.kz
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-20 pt-8 text-center text-sm">
          © {year} MedeuMed ЖШС. Барлық құқықтар қорғалған.
        </div>
      </div>
    </footer>
  );
}
