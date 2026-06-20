import Image from "next/image";
import { Award, Clock, Star } from "lucide-react";

const doctors = [
  {
    name: "Ахметова Айнұр Серікқызы",
    specialty: "Акушер-гинеколог",
    bio: "Жоғары санатты дәрігер. Гинекологиялық аурулар мен жүктілікті жүргізу саласында 20 жылдық тәжірибе.",
    experience: 20,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
  },
  {
    name: "Оспанова Динара Маратқызы",
    specialty: "Гинеколог-эндокринолог",
    bio: "Эндокриндік бұзылыстар мен гормоналдық терапия саласының маманы. Халықаралық сертификаттар иесі.",
    experience: 15,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1594824436998-ddedefa66268?w=600",
  },
  {
    name: "Сүлейменова Әлия Қанатқызы",
    specialty: "УДЗ дәрігері",
    bio: "Ультрадыбыстық диагностика бойынша жоғары білікті маман. Жамбас мүшелерінің УДЗ-сі.",
    experience: 12,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600",
  },
];

export default function DoctorsPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen relative overflow-hidden">
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
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-4">
          Біздің дәрігерлер
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Тәжірибелі және білікті мамандар сіздің денсаулығыңыз үшін қамқорлық
          жасайды
        </p>
      </section>

      {/* Doctors Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.name}
              className="bg-white/70 backdrop-blur-md rounded-3xl overflow-hidden border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group"
            >
              {/* Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                {/* Specialty badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-[#0F4C3A] text-xs font-semibold px-3 py-1.5 rounded-full">
                    {doctor.specialty}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-7">
                <h3 className="text-xl font-bold font-serif text-slate-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-[#0F4C3A] text-sm font-medium mb-3">
                  {doctor.specialty}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {doctor.bio}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-5 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4 text-[#0F4C3A]" />
                    <span className="text-sm font-medium">
                      {doctor.experience} жыл
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-medium">
                      {doctor.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Award className="w-4 h-4 text-[#0F4C3A]" />
                    <span className="text-sm font-medium">Жоғары санат</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
