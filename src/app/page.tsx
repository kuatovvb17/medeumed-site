import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  Heart,
  Shield,
  Stethoscope,
  Baby,
  Activity,
  Search,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 relative">
            <div className="inline-block px-4 py-1.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-sm mb-6 border border-emerald-100">
              Сенімді гинекологиялық орталық
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Әйелдер денсаулығына <span className="text-[#0F4C3A]">кәсіби қамқорлық</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
              Дәл диагностика, тәжірибелі дәрігерлер және халықаралық стандарттарға сай заманауи емдеу тәсілдері. Біздің басты мақсатымыз – сіздің денсаулығыңыз.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="bg-[#0F4C3A] text-white rounded-md px-8 py-4 text-center font-semibold flex items-center justify-center gap-2 hover:bg-emerald-900 transition-colors"
              >
                Қабылдауға жазылу <ArrowRight size={20} />
              </Link>
              <Link
                href="/services"
                className="bg-white border border-slate-300 text-slate-700 rounded-md px-8 py-4 text-center font-semibold hover:bg-slate-50 transition-colors"
              >
                Қызметтерді көру
              </Link>
            </div>
          </div>

          <div className="relative h-[500px] lg:h-[600px] w-full rounded-xl overflow-hidden shadow-medical">
            <Image
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop"
              alt="MedeuMed Clinic"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-24 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Неліктен бізді таңдайды?
            </h2>
            <p className="text-lg text-slate-600">
              Біз пациенттерімізге ең жоғары сапалы медициналық қызметті ұсынамыз
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Heart size={24} />,
                title: 'Сенімділік пен құпиялылық',
                desc: 'Әрбір пациенттің ақпараты 100% құпия сақталады. Бізбен бірге өзіңізді еркін сезінесіз.',
              },
              {
                icon: <Shield size={24} />,
                title: 'Халықаралық стандарттар',
                desc: 'Тек қана дәлелді медицина хаттамаларымен жұмыс істейміз. Дәл диагностика және тиімді ем.',
              },
              {
                icon: <Stethoscope size={24} />,
                title: 'Тәжірибелі мамандар',
                desc: 'Біздің дәрігерлердің орташа жұмыс өтілі 15 жылдан асады. Біліктілікті үнемі арттырудамыз.',
              },
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-xl border border-slate-200 shadow-soft">
                <div className="w-12 h-12 rounded-lg bg-emerald-50 text-[#0F4C3A] flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Негізгі бағыттар
              </h2>
              <p className="text-lg text-slate-600">
                Заманауи диагностика және емдеу қызметтері
              </p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-[#0F4C3A] font-semibold hover:underline">
              Барлық қызметтер <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Activity size={24} />,
                title: 'Гинекология',
                desc: 'Ауруларды диагностикалау, емдеу және алдын алу.',
              },
              {
                icon: <Baby size={24} />,
                title: 'Акушерлік',
                desc: 'Жүктілікті жоспарлау және толық медициналық сүйемелдеу.',
              },
              {
                icon: <Search size={24} />,
                title: 'Ультрадыбыстық зерттеу',
                desc: 'Сараптамалық деңгейдегі УДЗ (УЗИ) аппараттары.',
              },
            ].map((service, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-xl border border-slate-200 hover:border-[#0F4C3A] transition-colors">
                <div className="w-12 h-12 rounded-lg bg-white text-[#0F4C3A] flex items-center justify-center mb-6 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-slate-600 mb-6">
                  {service.desc}
                </p>
                <Link
                  href="/services"
                  className="text-[#0F4C3A] font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  Толығырақ <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/services" className="inline-flex items-center gap-2 text-[#0F4C3A] font-semibold">
              Барлық қызметтер <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-[#0F4C3A] rounded-2xl p-12 md:p-16 text-white text-center shadow-medical">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Қабылдауға қазір жазылыңыз
            </h2>
            <p className="text-lg text-emerald-50 max-w-2xl mx-auto mb-10">
              Онлайн жазылу арқылы өзіңізге ыңғайлы уақытты таңдаңыз. Біздің мамандар сізді күтуде.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 bg-white text-[#0F4C3A] rounded-md px-10 py-4 font-bold hover:bg-slate-100 transition-colors"
            >
              Онлайн жазылу <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
