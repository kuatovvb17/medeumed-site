import Image from "next/image";
import {
  ArrowRight,
  Stethoscope,
  Baby,
  Activity,
  Microscope,
  Heart,
  FlaskConical,
} from "lucide-react";

const services = [
  {
    title: "Акушер-гинекологтың қабылдауы",
    category: "Консультация",
    price: "15 000₸",
    duration: 45,
    icon: Stethoscope,
    color: "text-emerald-600",
  },
  {
    title: "Гинеколог-эндокринолог",
    category: "Консультация",
    price: "18 000₸",
    duration: 45,
    icon: Activity,
    color: "text-rose-500",
  },
  {
    title: "Жамбас УДЗ",
    category: "Диагностика",
    price: "10 000₸",
    duration: 30,
    icon: Microscope,
    color: "text-violet-500",
  },
  {
    title: "Жүктілікті жүргізу",
    category: "Бағдарлама",
    price: "150 000₸",
    duration: 60,
    icon: Baby,
    color: "text-amber-500",
  },
  {
    title: "Жатыр мойны эрозиясы",
    category: "Емдеу",
    price: "35 000₸",
    duration: 60,
    icon: Heart,
    color: "text-pink-500",
  },
  {
    title: "Жалпы қан анализі",
    category: "Зертханалық",
    price: "3 500₸",
    duration: 15,
    icon: FlaskConical,
    color: "text-sky-500",
  },
];

export default function ServicesPage() {
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
          Қызметтер мен бағалар
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Заманауи медициналық технологиялар мен тәжірибелі мамандар көмегімен
          сіздің денсаулығыңызға қамқорлық
        </p>
      </section>

      {/* Services Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group cursor-pointer"
              >
                {/* Icon */}
                <div className="w-[60px] h-[60px] rounded-2xl bg-emerald-50 flex items-center justify-center mb-5">
                  <Icon className={`w-7 h-7 ${service.color}`} />
                </div>

                {/* Category */}
                <p className="text-sm text-slate-400 uppercase tracking-wider mb-2">
                  {service.category}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 mb-4 font-serif">
                  {service.title}
                </h3>

                {/* Price & Duration */}
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-slate-100">
                  <span className="text-2xl font-bold text-[#0F4C3A]">
                    {service.price}
                  </span>
                  <span className="text-sm text-slate-400">
                    {service.duration} мин
                  </span>
                </div>

                {/* Arrow */}
                <div className="mt-5 flex items-center gap-2 text-[#0F4C3A] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-1">
                  <span className="text-sm font-medium">Толығырақ</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
