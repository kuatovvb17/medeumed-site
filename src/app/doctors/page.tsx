import Link from 'next/link';
import { Award, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Біздің дәрігерлер | MedeuMed',
  description: 'MedeuMed клиникасының жоғары білікті мамандары мен дәрігерлері.',
};

export default function DoctorsPage() {
  const doctors = [
    {
      id: 1,
      name: "Ахметова Айнұр Серікқызы",
      specialty: "Акушер-гинеколог, Репродуктолог",
      experience: "20 жыл",
      description: "Бейдеулікті емдеу және күрделі жүктілікті жүргізу бойынша жоғары санатты маман.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Оспанова Динара Маратқызы",
      specialty: "Гинеколог-эндокринолог",
      experience: "15 жыл",
      description: "Гормоналды бұзылыстарды, жатыр миомасын және эндометриозды консервативті емдеу сарапшысы.",
      image: "https://images.unsplash.com/photo-1594824436998-ddedefa66268?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Сүлейменова Әлия Қанатқызы",
      specialty: "УДЗ (УЗИ) дәрігері",
      experience: "12 жыл",
      description: "Пренатальды скрининг және ұрық дамуының патологияларын ерте анықтау маманы.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Болатов Руслан Талғатұлы",
      specialty: "Операциялық гинеколог",
      experience: "18 жыл",
      description: "Лапароскопиялық және гистероскопиялық аз инвазивті операциялардың жетекші хирург-гинекологы.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=600&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pb-32 overflow-hidden">
      {/* Header */}
      <div className="relative pt-32 pb-24 text-center">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[150%] rounded-full bg-[#fdf8e1] opacity-60 blur-[120px] -z-10 animate-blob"></div>
        <div className="absolute top-[10%] right-[10%] w-[40%] h-[100%] rounded-full bg-[#e8f5e9] opacity-50 blur-[100px] -z-10 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 md:px-8 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 mb-6">Біздің Дәрігерлер</h1>
          <p className="text-slate-600 max-w-3xl mx-auto text-xl font-light leading-relaxed">
            Сіздің денсаулығыңыз – өз ісінің нағыз кәсіпқойларының сенімді қолында. Біздің мамандар халықаралық хаттамалармен жұмыс істейді.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-8">
        <div className="grid md:grid-cols-2 gap-12">
          {doctors.map((doctor, idx) => (
            <div 
              key={doctor.id} 
              className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-soft border border-white overflow-hidden flex flex-col xl:flex-row group hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="xl:w-2/5 h-80 xl:h-auto relative overflow-hidden">
                <Image 
                  src={doctor.image} 
                  alt={doctor.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  sizes="(max-width: 1280px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <div className="xl:w-3/5 p-8 md:p-10 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 font-serif leading-tight">{doctor.name}</h3>
                  <p className="text-emerald-700 font-medium mb-5 text-lg">{doctor.specialty}</p>
                  <p className="text-slate-600 mb-8 text-[1.05rem] font-light leading-relaxed">{doctor.description}</p>
                  
                  <div className="flex items-center gap-3 text-slate-700 mb-10 bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <Award size={20} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Жұмыс өтілі</p>
                      <p className="font-bold text-slate-800 text-lg">{doctor.experience}</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  href="/booking" 
                  className="flex items-center justify-center gap-2 w-full bg-white text-emerald-800 border-2 border-emerald-100 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 hover:border-emerald-700 hover:text-white transition-all duration-300 group/btn"
                >
                  Қабылдауға жазылу <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
