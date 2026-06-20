import Link from 'next/link';
import { Star, Award, Calendar } from 'lucide-react';
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">Біздің Дәрігерлер</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Сіздің денсаулығыңыз – өз ісінің нағыз кәсіпқойларының сенімді қолында. Біздің дәрігерлер үнемі халықаралық конгрестерде біліктілігін арттырады.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-16">
        <div className="grid md:grid-cols-2 gap-10">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-md transition-shadow">
              <div className="sm:w-2/5 h-64 sm:h-auto relative">
                <Image 
                  src={doctor.image} 
                  alt={doctor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="sm:w-3/5 p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-1 font-serif">{doctor.name}</h3>
                  <p className="text-emerald-600 font-medium mb-4">{doctor.specialty}</p>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">{doctor.description}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
                    <Award size={16} className="text-emerald-500" />
                    <span>Жұмыс өтілі: <strong className="text-slate-700">{doctor.experience}</strong></span>
                  </div>
                </div>
                <Link href="/booking" className="w-full bg-slate-50 text-emerald-700 py-3 rounded-xl text-center font-semibold hover:bg-emerald-50 transition-colors border border-emerald-100">
                  Қабылдауға жазылу
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
