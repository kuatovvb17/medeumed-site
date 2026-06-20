"use client";

import Link from "next/link";
import { ArrowRight, Stethoscope, Activity, Microscope, Baby, Heart, FlaskConical, LayoutGrid } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { Skeleton } from "@/components/ui/Skeleton";

// Helper function to map categories to icons
const getIconForCategory = (category: string | null | undefined) => {
  if (!category) return LayoutGrid;
  const cat = category.toLowerCase();
  if (cat.includes('консультация')) return Stethoscope;
  if (cat.includes('диагностика')) return Microscope;
  if (cat.includes('бағдарлама') || cat.includes('акушер')) return Baby;
  if (cat.includes('емдеу')) return Heart;
  if (cat.includes('зертхана') || cat.includes('анализ')) return FlaskConical;
  if (cat.includes('эндокринолог')) return Activity;
  return LayoutGrid;
};

export default function ServicesPage() {
  const { services, loading } = useAppointments();

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 text-center px-6 border-b border-slate-200 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Қызметтер мен бағалар
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Медициналық қызметтердің толық спектрі. Заманауи технологиялар мен білікті мамандар.
        </p>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
                  <Skeleton className="w-12 h-12 rounded-lg mb-5" />
                  <Skeleton className="h-4 w-24 mb-3" />
                  <Skeleton className="h-6 w-3/4 mb-8" />
                  <div className="flex justify-between border-t border-slate-100 pt-4 mt-auto">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-16" />
                  </div>
                </div>
              ))
            : services.map((service) => {
                const Icon = getIconForCategory(service.category);
                return (
                  <Link
                    href={`/booking`}
                    key={service.id}
                    className="bg-white rounded-xl p-8 border border-slate-200 hover:border-[#0F4C3A] transition-all duration-300 group flex flex-col shadow-soft hover:shadow-medical"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-lg bg-slate-50 text-[#0F4C3A] flex items-center justify-center mb-5 group-hover:bg-[#0F4C3A] group-hover:text-white transition-colors">
                      <Icon size={24} />
                    </div>

                    {/* Category */}
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {service.category}
                    </p>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 mb-6 group-hover:text-[#0F4C3A] transition-colors">
                      {service.title}
                    </h3>

                    {/* Price & Duration */}
                    <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
                      <span className="text-2xl font-bold text-[#0F4C3A]">
                        {service.price} ₸
                      </span>
                      <span className="text-sm text-slate-500 font-medium">
                        {service.duration_minutes ? `${service.duration_minutes} мин` : '45 мин'}
                      </span>
                    </div>

                    {/* Arrow */}
                    <div className="mt-6 flex items-center justify-between text-[#0F4C3A] font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span>Жазылу</span>
                      <ArrowRight size={20} />
                    </div>
                  </Link>
                );
              })}
        </div>
      </section>
    </main>
  );
}
