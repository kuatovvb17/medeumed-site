"use client";

import Link from "next/link";
import { Award, Clock, Star, CalendarDays, User, BookOpen } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DoctorsPage() {
  const { doctors, loading } = useAppointments();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 text-center px-6 border-b border-slate-200 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
          Біздің мамандар
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Жоғары санатты дәрігерлер сіздің денсаулығыңызға кәсіби қамқорлық жасайды.
        </p>
      </section>

      {/* Doctors List */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-lg shadow-slate-100 flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-1/2 mb-2 bg-white/10" />
                    <Skeleton className="h-5 w-1/3 mb-6 bg-white/10" />
                    <Skeleton className="h-4 w-full mb-2 bg-white/10" />
                    <Skeleton className="h-4 w-5/6 mb-6 bg-white/10" />
                    <div className="flex gap-4">
                      <Skeleton className="h-6 w-20 bg-white/10" />
                      <Skeleton className="h-6 w-20 bg-white/10" />
                    </div>
                  </div>
                  <div className="md:w-48 flex items-center justify-center">
                    <Skeleton className="h-12 w-full rounded-md bg-white/10" />
                  </div>
                </div>
              ))
            : doctors.map((doctor) => {
                return (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-cyan-500/50 transition-all duration-300 shadow-lg shadow-slate-100 hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] flex flex-col md:flex-row gap-8 items-center md:items-stretch group"
                  >
                    {/* Left: Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-cyan-400 transition-colors">
                          {doctor.full_name}
                        </h3>
                      </div>
                      
                      <p className="text-cyan-400 font-semibold text-sm uppercase tracking-wider mb-6 ml-13 drop-shadow-[0_0_5px_rgba(0,240,255,0.3)]">
                        {doctor.specialty}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-slate-900 font-semibold flex items-center gap-2 mb-2">
                          <BookOpen size={18} className="text-blue-500" />
                          Дәрігер туралы
                        </h4>
                        <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-200 group-hover:border-blue-500/50 transition-colors">
                          {doctor.bio || "Медициналық қызметті халықаралық стандарттар бойынша көрсететін жоғары білікті маман. Пациенттерге жеке көзқараспен қарап, дәл диагностика мен тиімді ем тағайындайды."}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-6 mt-auto">
                        <div className="flex items-center gap-2 text-slate-700 bg-white/5 border border-slate-100 px-3 py-1.5 rounded-md backdrop-blur-sm">
                          <Clock className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm font-medium">{doctor.experience_years ? `${doctor.experience_years}+ жыл тәжірибе` : '10+ жыл тәжірибе'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 bg-white/5 border border-slate-100 px-3 py-1.5 rounded-md backdrop-blur-sm">
                          <Award className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm font-medium">Жоғары санат</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-700 bg-white/5 border border-slate-100 px-3 py-1.5 rounded-md backdrop-blur-sm">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]" />
                          <span className="text-sm font-medium">4.9 рейтинг</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="w-full md:w-56 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-6 md:pt-0 md:pl-8 group-hover:border-cyan-500/20 transition-colors">
                      <Link 
                        href="/booking" 
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-slate-900 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-all duration-300 shadow-[0_0_20px_rgba(0,68,255,0.4)] hover:shadow-[0_0_25px_rgba(0,240,255,0.6)]"
                      >
                        <CalendarDays size={18} />
                        Жазылу
                      </Link>
                    </div>
                  </div>
                );
              })}
        </div>
      </section>
    </main>
  );
}
