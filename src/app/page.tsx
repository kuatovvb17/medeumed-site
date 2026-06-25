"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Heart,
  Shield,
  Stethoscope,
  Baby,
  Activity,
  Search,
  Star,
  Users,
  Award,
  CalendarCheck,
  X,
  MapPin,
  Phone
} from 'lucide-react';

const FADE_UP_ANIMATION_VARIANTS: any = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
};

const directionsData: Record<string, string> = {
  'Терапия және ЖТД': 'Дене қысымын, температураны өлшеу, кешенді бастапқы тексеру және жеке емдеу жоспарын құру.',
  'Неврология': 'Жүйке жүйесін, рефлекстерді тексеру, мигрень, ұйқысыздық және омыртқа ауруларын емдеу.',
  'Кардиология': 'Жүрек-қан тамырлары жүйесін тексеру, ЭКГ және артериялық қан қысымын холтерлік мониторингтеу.',
  'Педиатрия': '0-18 жас аралығындағы балалар денсаулығын бақылау, жоспарлы скрининг және дамуын бағалау.',
  'УДЗ Диагностика': 'Іш қуысы, бүйрек, жүрек (ЭхоКГ) және қалқанша безді ультрадыбыстық зерттеу.',
  'Зертхана': 'Кеңейтілген жалпы қан анализі, биохимиялық талдаулар және гормоналды панель зерттеуі.'
};

export default function Home() {
  const [selectedDirection, setSelectedDirection] = useState<string | null>(null);

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative overflow-hidden">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] z-0 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 z-0 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 z-0 pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 z-10">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.15 } }
            }}
            className="z-10 relative"
          >
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-sky-200 text-sky-600 font-semibold text-sm mb-6 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <SparklesIcon className="w-4 h-4 text-sky-600" />
              <span>Алматыдағы жетекші көпсалалы отбасылық емхана</span>
            </motion.div>
            
            <motion.h1 variants={FADE_UP_ANIMATION_VARIANTS} className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Сіздің және отбасыңыздың денсаулығына <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-teal-600">кәсіби қамқорлық</span>
            </motion.h1>
            
            <motion.p variants={FADE_UP_ANIMATION_VARIANTS} className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed font-light">
              Дәл диагностика, тәжірибелі дәрігерлер және халықаралық стандарттарға сай заманауи емдеу тәсілдері. Бізбен бірге өзіңізді сенімді сезініңіз.
            </motion.p>
            
            <motion.div variants={FADE_UP_ANIMATION_VARIANTS} className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="group bg-sky-600 text-slate-900 rounded-full px-8 py-4 text-center font-bold text-lg flex items-center justify-center gap-2 hover:bg-sky-600 hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
              >
                Қабылдауға жазылу 
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="bg-white/5 backdrop-blur-md border border-slate-300 text-slate-900 rounded-full px-8 py-4 text-center font-bold text-lg hover:bg-white/10 hover:border-white/40 transition-all duration-300"
              >
                Барлық қызметтер
              </Link>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[650px] w-full"
          >
            <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(0,240,255,0.15)] border border-slate-200">
              <Image
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=2000&auto=format&fit=crop"
                alt="Дәрігер мен пациент"
                fill
                priority
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>

            {/* Floating Glass Badges */}
            <motion.div 
              className="absolute top-10 -left-6 md:-left-12 bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-2xl flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]"
            >
              <div className="bg-sky-600/20 p-3 rounded-xl text-sky-600 shadow-[0_0_10px_rgba(0,240,255,0.3)]">
                <Award size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">15+ Жыл</p>
                <p className="text-xs text-slate-600">Тәжірибе</p>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-10 -right-6 md:-right-12 bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-2xl flex items-center gap-4 animate-[float_6s_ease-in-out_infinite]"
              style={{ animationDelay: '2s' }}
            >
              <div className="bg-sky-600/30 p-3 rounded-xl text-sky-600 shadow-[0_0_10px_rgba(0,68,255,0.5)]">
                <Users size={24} />
              </div>
              <div>
                <p className="font-bold text-slate-900">5000+</p>
                <p className="text-xs text-slate-600">Сенім білдіргендер</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="py-12 z-10 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10 shadow-xl shadow-slate-100">
            {[
              { num: '15+', label: 'Жыл тәжірибе' },
              { num: '5000+', label: 'Пациенттер' },
              { num: '10+', label: 'Білікті дәрігерлер' },
              { num: '100%', label: 'Құпиялылық' },
            ].map((stat, i) => (
              <div key={i} className="text-center px-4">
                <h3 className="text-4xl md:text-5xl font-bold text-sky-600 mb-2 drop-shadow-[0_0_8px_rgba(0,240,255,0.5)]">{stat.num}</h3>
                <p className="text-slate-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Негізгі бағыттар
              </h2>
              <p className="text-lg text-slate-600 font-light">
                Біздің клиника ересектер мен балалар денсаулығын сақтау және қалпына келтіру үшін кешенді медициналық шешімдерді ұсынады.
              </p>
            </div>
            <Link href="/services" className="hidden md:flex items-center gap-2 text-sky-600 font-bold text-lg hover:gap-4 transition-all bg-sky-600/10 border border-sky-100 px-6 py-3 rounded-full hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              Барлығын көру <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Activity size={32} />,
                title: 'Терапия және ЖТД',
                desc: 'Дене қысымын өлшеу, бастапқы тексеру және амбулаторлық емдеу жоспарын құру.',
                color: 'bg-sky-50 text-sky-600 border border-sky-100',
              },
              {
                icon: <Shield size={32} />,
                title: 'Неврология',
                desc: 'Жүйке жүйесі ауруларын, мигреньді және омыртқа патологияларын емдеу.',
                color: 'bg-teal-50 text-teal-600 border border-teal-100',
              },
              {
                icon: <Heart size={32} />,
                title: 'Кардиология',
                desc: 'Жүрек жұмысын ЭКГ және Холтер арқылы зерттеу, гипертонияны емдеу.',
                color: 'bg-rose-50 text-rose-600 border border-rose-100',
              },
              {
                icon: <Baby size={32} />,
                title: 'Педиатрия',
                desc: '0-18 жас аралығындағы балалар денсаулығын бақылау және даму скринингі.',
                color: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
              },
              {
                icon: <Search size={32} />,
                title: 'УДЗ Диагностика',
                desc: 'Сараптамалық деңгейдегі УДЗ аппараттарымен барлық мүшелерді дәл көру.',
                color: 'bg-purple-50 text-purple-600 border border-purple-100',
              },
              {
                icon: <Stethoscope size={32} />,
                title: 'Зертхана',
                desc: 'Жалпы және биохимиялық қан талдаулары, гормоналды панель тексерістері.',
                color: 'bg-amber-50 text-amber-600 border border-amber-100',
              },
              {
                icon: <Award size={32} />,
                title: 'Отоларингология (ЛОР)',
                desc: 'Құлақ, тамақ және мұрын жолдарын эндоскопиялық заманауи тексеру.',
                color: 'bg-cyan-50 text-cyan-600 border border-cyan-100',
              },
              {
                icon: <CalendarCheck size={32} />,
                title: 'Урология',
                desc: 'Бүйрек және зәр шығару жүйесін кешенді диагностикалау мен емдеу.',
                color: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
              },
            ].map((service, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-10 rounded-3xl border border-slate-200 shadow-lg group hover:shadow-[0_0_20px_rgba(0,240,255,0.15)] hover:border-sky-200 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${service.color} transition-transform group-hover:scale-110 shadow-inner`}>
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed mb-8 font-light text-lg">
                    {service.desc}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedDirection(service.title)}
                  className="text-slate-900 font-semibold flex items-center gap-2 group-hover:text-sky-600 transition-colors self-start"
                >
                  Толығырақ <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US SECTION */}
      <section className="py-24 bg-white border-y border-slate-100 relative z-10 overflow-hidden">
        <div className="absolute right-0 top-1/2 w-[600px] h-[600px] bg-sky-600/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 z-0 pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Неліктен бізді таңдайды?
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Біз пациенттерімізге ең жоғары сапалы медициналық қызметті және жайлылықты ұсынамыз.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Heart size={28} />,
                title: 'Толық құпиялылық',
                desc: 'Әрбір пациенттің ақпараты 100% құпия сақталады. Бізбен бірге өзіңізді еркін әрі қауіпсіз сезінесіз.',
              },
              {
                icon: <Shield size={28} />,
                title: 'Халықаралық хаттамалар',
                desc: 'Тек қана дәлелді медицина (EBM) хаттамаларымен жұмыс істейміз. Дәл диагностика және ең тиімді ем.',
              },
              {
                icon: <Stethoscope size={28} />,
                title: 'Тәжірибелі мамандар',
                desc: 'Біздің дәрігерлердің орташа жұмыс өтілі 15 жылдан асады. Шетелдік тәжірибе алмасулардан өтеді.',
              },
            ].map((feature, i) => (
              <motion.div 
                key={i} 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                variants={FADE_UP_ANIMATION_VARIANTS}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-sky-600/10 border border-sky-100 text-sky-600 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="py-24 relative z-10 bg-[#F8FAFC]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Пациенттер пікірі
            </h2>
            <p className="text-xl text-slate-600 font-light">
              Бізге сенім білдірген мыңдаған пациенттердің шынайы пікірлері
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Айдана С.",
                text: "Данияр Оспанов өте білікті невролог маман. Көптен бері мазалаған бас ауруымның себебін тез анықтап, дұрыс ем тағайындады. Рақмет!",
                rating: 5
              },
              {
                name: "Марат Н.",
                text: "Отбасымызбен үнемі осы емханаға қараламыз. Терапевт пен педиатр дәрігерлері өте білікті әрі мұқият. УДЗ аппараттары да жап-жаңа.",
                rating: 5
              },
              {
                name: "Гүлмира О.",
                text: "Онлайн жазылу өте ыңғайлы екен. Кезек күтпейсің, дәл өз уақытында кіресің. Дәрігерлер өте сыпайы әрі өз ісінің нағыз шеберлері. Рақмет!",
                rating: 5
              }
            ].map((review, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:border-sky-200 transition-all duration-300"
              >
                <div className="flex gap-1 text-sky-600 mb-6 drop-shadow-[0_0_5px_rgba(0,240,255,0.5)]">
                  {[...Array(review.rating)].map((_, idx) => (
                    <Star key={idx} fill="currentColor" size={20} />
                  ))}
                </div>
                <p className="text-slate-700 mb-8 italic text-lg leading-relaxed">
                  "{review.text}"
                </p>
                <div className="font-bold text-slate-900 text-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-sky-600/30 border border-sky-200 flex items-center justify-center text-sky-600">
                    {review.name.charAt(0)}
                  </div>
                  {review.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP / CONTACT SECTION */}
      <section className="py-24 relative z-10 border-t border-slate-100 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Бізбен байланыс
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
              <p className="text-xl text-slate-600 font-light flex items-center justify-center gap-2">
                <MapPin className="text-sky-600 w-5 h-5" />
                Алматы, пр. Рыскулова, 43В
              </p>
              <a href="tel:+77759575780" className="text-xl text-slate-600 font-light flex items-center justify-center gap-2 hover:text-sky-600 transition-colors">
                <Phone className="text-sky-600 w-5 h-5" />
                +7 (775) 957-57-80
              </a>
            </div>
          </div>
          <div className="w-full h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden border border-slate-200 shadow-[0_0_40px_rgba(0,240,255,0.05)] relative group">
            <div className="absolute inset-0 pointer-events-none rounded-[3rem] shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] z-10" />
            <iframe 
              src="https://yandex.ru/map-widget/v1/?ll=76.900000%2C43.250000&z=16&text=Алматы,%20пр.%20Рыскулова,%2043В" 
              width="100%" 
              height="100%" 
              frameBorder="0" 
              allowFullScreen={true}
              className="w-full h-full grayscale-[0.8] contrast-125 opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
            />
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 relative z-10 px-4 bg-[#F8FAFC]">
        <div className="container mx-auto max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-sky-600 to-teal-700 border border-sky-400 rounded-[3rem] p-12 md:p-20 text-white text-center shadow-2xl relative overflow-hidden"
          >
            {/* Decorative background shapes for CTA */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />

            <div className="relative z-10">
              <CalendarCheck className="w-16 h-16 mx-auto mb-8 text-white drop-shadow-md" />
              <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                Өз денсаулығыңызды бізге сеніп тапсырыңыз
              </h2>
              <p className="text-xl text-sky-100 max-w-2xl mx-auto mb-12 font-light">
                Онлайн жазылу арқылы өзіңізге ыңғайлы уақытты таңдап, кезексіз қабылдауға келіңіз.
              </p>
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 bg-white text-sky-700 rounded-full px-12 py-5 font-bold text-lg hover:bg-sky-50 hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Қазір жазылу <ArrowRight size={22} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL FOR DIRECTIONS */}
      <AnimatePresence>
        {selectedDirection && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedDirection(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-3xl p-8 max-w-md w-full shadow-[0_0_50px_rgba(0,240,255,0.15)] relative"
            >
              <button 
                onClick={() => setSelectedDirection(null)}
                className="absolute top-6 right-6 text-slate-600 hover:text-slate-900 transition-colors bg-white/5 rounded-full p-2 hover:bg-white/10"
              >
                <X size={20} />
              </button>
              <h3 className="text-3xl font-bold text-slate-900 mb-4 pr-10">
                {selectedDirection}
              </h3>
              <p className="text-slate-700 leading-relaxed text-lg mb-8 font-light">
                {directionsData[selectedDirection]}
              </p>
              <Link
                href="/booking"
                className="flex items-center justify-center w-full gap-2 bg-white/5 border border-slate-200 text-slate-900 rounded-full px-6 py-4 font-bold hover:bg-sky-600 hover:text-black hover:border-[#00F0FF] transition-all duration-300"
              >
                Қабылдауға жазылу <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-component for icons
function SparklesIcon(props: any) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  );
}
