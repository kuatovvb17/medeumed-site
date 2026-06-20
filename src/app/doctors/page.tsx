"use client";

import Link from "next/link";
import { Award, Clock, Star, CalendarDays, User, BookOpen } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { Skeleton } from "@/components/ui/Skeleton";

export default function DoctorsPage() {
  const { doctors, loading } = useAppointments();

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 text-center px-6 border-b border-slate-200 bg-white">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
          Біздің мамандар
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Жоғары санатты дәрігерлер сіздің денсаулығыңызға кәсіби қамқорлық жасайды.
        </p>
      </section>

      {/* Doctors List */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="flex flex-col gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <Skeleton className="h-8 w-1/2 mb-2" />
                    <Skeleton className="h-5 w-1/3 mb-6" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-6" />
                    <div className="flex gap-4">
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                  </div>
                  <div className="md:w-48 flex items-center justify-center">
                    <Skeleton className="h-12 w-full rounded-md" />
                  </div>
                </div>
              ))
            : doctors.map((doctor) => {
                return (
                  <div
                    key={doctor.id}
                    className="bg-white rounded-2xl border border-slate-200 p-8 hover:border-[#0F4C3A] transition-colors shadow-soft flex flex-col md:flex-row gap-8 items-center md:items-stretch"
                  >
                    {/* Left: Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#0F4C3A] flex items-center justify-center shrink-0 overflow-hidden border-2 border-white shadow-md">
                          {doctor.avatar_url ? (
                            <img src={doctor.avatar_url} alt={doctor.full_name} className="w-full h-full object-cover" />
                          ) : (
                            <User size={24} />
                          )}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900">
                          {doctor.full_name}
                        </h3>
                      </div>
                      
                      <p className="text-[#0F4C3A] font-semibold text-sm uppercase tracking-wider mb-6 ml-13">
                        {doctor.specialty}
                      </p>
                      
                      <div className="mb-6">
                        <h4 className="text-slate-900 font-semibold flex items-center gap-2 mb-2">
                          <BookOpen size={18} className="text-slate-400" />
                          Дәрігер туралы
                        </h4>
                        <p className="text-slate-600 leading-relaxed pl-6 border-l-2 border-slate-100">
                          {doctor.bio || "Медициналық қызметті халықаралық стандарттар бойынша көрсететін жоғары білікті маман. Пациенттерге жеке көзқараспен қарап, дәл диагностика мен тиімді ем тағайындайды."}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-6 mt-auto">
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md">
                          <Clock className="w-4 h-4 text-[#0F4C3A]" />
                          <span className="text-sm font-medium">{doctor.experience_years ? `${doctor.experience_years}+ жыл тәжірибе` : '10+ жыл тәжірибе'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md">
                          <Award className="w-4 h-4 text-[#0F4C3A]" />
                          <span className="text-sm font-medium">Жоғары санат</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600 bg-slate-50 px-3 py-1.5 rounded-md">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium">4.9 рейтинг</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: CTA */}
                    <div className="w-full md:w-56 flex flex-col justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                      <Link 
                        href="/booking" 
                        className="w-full flex items-center justify-center gap-2 bg-[#0F4C3A] text-white py-4 rounded-lg font-semibold hover:bg-emerald-900 transition-colors shadow-sm"
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
