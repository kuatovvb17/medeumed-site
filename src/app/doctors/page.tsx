"use client";

import Image from "next/image";
import Link from "next/link";
import { Award, Clock, Star, CalendarDays } from "lucide-react";
import { useAppointments } from "@/hooks/useAppointments";
import { Skeleton } from "@/components/ui/Skeleton";

// Image mapping for specific doctors
const doctorImages: Record<string, string> = {
  "Алия Султанова": "https://images.unsplash.com/photo-1594824813573-246434de83fb?q=80&w=600&auto=format&fit=crop",
  "Зарина Ахметова": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop",
  "Мадина Ибраева": "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
};

const defaultImage = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&auto=format&fit=crop";

export default function DoctorsPage() {
  const { doctors, loading } = useAppointments();

  return (
    <main className="bg-gradient-to-br from-[#FDFBF7] to-[#F5F2EA] min-h-screen relative overflow-hidden">
      {/* Animated mesh gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-200/40 blur-[120px] animate-pulse"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-rose-200/30 blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-[450px] h-[450px] rounded-full bg-amber-200/30 blur-[120px] animate-pulse"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Header */}
      <section className="relative z-10 pt-36 pb-16 text-center px-6">
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-4 tracking-tight">
          Біздің дәрігерлер
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-light">
          Тәжірибелі және білікті мамандар сіздің денсаулығыңыз үшін қамқорлық жасайды
        </p>
      </section>

      {/* Doctors Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 shadow-sm p-4">
                  <Skeleton className="h-64 w-full rounded-2xl mb-4" />
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2 mb-4" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex gap-4 pt-4 border-t border-slate-100">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              ))
            : doctors.map((doctor) => {
                // Try to find a matching image by checking if doctor.full_name contains the key
                const matchedKey = Object.keys(doctorImages).find(name => doctor.full_name.includes(name));
                const imageUrl = matchedKey ? doctorImages[matchedKey] : defaultImage;

                return (
                  <div
                    key={doctor.id}
                    className="bg-white/70 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-300 ease-in-out group flex flex-col"
                  >
                    {/* Image */}
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={imageUrl}
                        alt={doctor.full_name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {/* Specialty badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm text-[#0F4C3A] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm">
                          {doctor.specialty}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-7 flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold font-serif text-slate-900 mb-1">
                        {doctor.full_name}
                      </h3>
                      <p className="text-[#0F4C3A] text-sm font-semibold mb-4">
                        {doctor.specialty}
                      </p>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-light flex-1">
                        Жоғары білікті маман. Әйелдер денсаулығын сақтау және емдеу бағытында кәсіби кеңес береді.
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 border-t border-slate-100/80 mb-6">
                        <div className="flex items-center gap-2 text-slate-600">
                          <Clock className="w-4 h-4 text-[#0F4C3A]" />
                          <span className="text-sm font-medium">10+ жыл</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-medium">4.9</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                          <Award className="w-4 h-4 text-[#0F4C3A]" />
                          <span className="text-sm font-medium">Жоғары санат</span>
                        </div>
                      </div>

                      <Link 
                        href="/booking" 
                        className="w-full flex items-center justify-center gap-2 bg-[#0F4C3A] text-white py-3.5 rounded-2xl font-semibold hover:bg-emerald-900 transition-colors shadow-md shadow-emerald-900/10"
                      >
                        <CalendarDays size={18} />
                        Қабылдауға жазылу
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
