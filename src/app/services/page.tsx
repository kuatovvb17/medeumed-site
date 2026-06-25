"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope, Activity, Microscope, Baby, Heart, FlaskConical, LayoutGrid } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { Skeleton } from "@/components/ui/Skeleton";

// Helper function to map categories to icons
const getIconForCategory = (category: string | null | undefined) => {
  if (!category) return LayoutGrid;
  const cat = category.toLowerCase();
  if (cat.includes('невро')) return Activity;
  if (cat.includes('кардио')) return Heart;
  if (cat.includes('педиатр')) return Baby;
  if (cat.includes('удз') || cat.includes('узи') || cat.includes('диагностика')) return Microscope;
  if (cat.includes('зертхана') || cat.includes('анализ')) return FlaskConical;
  if (cat.includes('терап') || cat.includes('жтд') || cat.includes('консультация')) return Stethoscope;
  return LayoutGrid;
};

export default function ServicesPage() {
  const { services, loading } = useAppointments();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 text-center px-6 border-b border-slate-200 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Қызметтер мен бағалар
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Медициналық қызметтердің толық спектрі. Заманауи технологиялар мен білікті мамандар.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-8 border border-slate-200 shadow-lg shadow-slate-100">
                  <Skeleton className="w-12 h-12 rounded-lg mb-5 bg-white/10" />
                  <Skeleton className="h-4 w-24 mb-3 bg-white/10" />
                  <Skeleton className="h-6 w-3/4 mb-8 bg-white/10" />
                  <div className="flex justify-between border-t border-slate-200 pt-4 mt-auto">
                    <Skeleton className="h-6 w-20 bg-white/10" />
                    <Skeleton className="h-4 w-16 bg-white/10" />
                  </div>
                </div>
              ))
            : services.map((service) => {
                const Icon = getIconForCategory(service.category);
                return (
                  <Link
                    href={`/booking`}
                    key={service.id}
                    className="bg-white rounded-xl p-8 border border-slate-200 hover:border-cyan-500/50 transition-all duration-300 group flex flex-col shadow-lg shadow-slate-100 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)]"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-blue-900/30 text-cyan-400 flex items-center justify-center mb-5 group-hover:bg-cyan-500 group-hover:text-black transition-colors shadow-md shadow-sky-100 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]">
                      <Icon size={24} />
                    </div>

                    {/* Category */}
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 group-hover:text-cyan-200 transition-colors">
                      {service.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    {/* Price & Duration */}
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-200">
                      <span className="text-2xl font-bold text-cyan-400 drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                        {service.price} ₸
                      </span>
                      <span className="text-sm text-slate-600 font-medium">
                        {service.duration_minutes ? `${service.duration_minutes} мин` : '45 мин'}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center justify-between text-blue-400 font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">Жазылу</span>
                      <ArrowRight size={20} className="text-cyan-400" />
                    </div>
                  </Link>
                );
              })}
        </div>
      </section>
    </main>
  );
}
