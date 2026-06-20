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
  Star,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* ═══════════════════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-32 pb-40">
        {/* Animated Mesh Gradient Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#fce4ec] opacity-60 blur-[140px] animate-blob" />
          <div
            className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-50 blur-[140px] animate-blob"
            style={{ animationDelay: '2s' }}
          />
          <div
            className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#fdf8e1] opacity-50 blur-[140px] animate-blob"
            style={{ animationDelay: '4s' }}
          />
        </div>

        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-20 items-center">
          {/* ── Left Side ── */}
          <div className="z-10 relative max-w-2xl animate-fade-in-up">
            {/* Badge Pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-xl border border-white/50 text-emerald-900 font-medium text-sm mb-10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Жоғары санатты гинекология орталығы
            </div>

            {/* Heading */}
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-serif font-bold tracking-tight leading-[1.05] text-slate-900 mb-10">
              Әйелдер денсаулығына
              <br />
              <span className="italic text-[#0F4C3A] font-medium">
                сенімді қамқорлық
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-slate-500 font-light max-w-xl mb-12 leading-relaxed">
              Жоғары санатты дәрігерлер, заманауи диагностика және әрбір
              науқасқа премиум деңгейдегі жеке көзқарас. &quot;MedeuMed&quot; –
              сіздің сенімді таңдауыңыз.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/booking"
                className="bg-[#0F4C3A] text-white rounded-full px-10 py-5 text-lg text-center font-semibold flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgb(4,120,87,0.4)] hover:scale-105 transition-all duration-500 ease-in-out"
              >
                Қабылдауға жазылу <ArrowRight size={22} />
              </Link>
              <Link
                href="/services"
                className="bg-white/40 backdrop-blur-xl border border-white/50 text-emerald-900 rounded-full px-10 py-5 text-lg text-center font-semibold hover:bg-white hover:-translate-y-1 transition-all duration-500 ease-in-out shadow-sm"
              >
                Қызметтерді көру
              </Link>
            </div>
          </div>

          {/* ── Right Side — Image ── */}
          <div
            className="relative h-[600px] lg:h-[750px] w-full rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <Image
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=2070&auto=format&fit=crop"
              alt="MedeuMed заманауи клиникасы"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />

            {/* Floating Card — Rating */}
            <div className="absolute bottom-8 left-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl px-5 py-4 flex items-center gap-4 animate-float">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-500 shadow-sm">
                <Star className="fill-current" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 font-serif">
                  5.0
                </p>
                <p className="text-slate-600 text-sm font-medium">Рейтинг</p>
              </div>
            </div>

            {/* Floating Card — Experience */}
            <div
              className="absolute top-12 right-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-lg rounded-2xl px-5 py-4 flex items-center gap-4 animate-float"
              style={{ animationDelay: '1.5s' }}
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shadow-sm">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 font-serif">
                  20+ жыл
                </p>
                <p className="text-slate-600 text-sm font-medium">тәжірибе</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          WHY US SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-8">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Неге MedeuMed?
            </h2>
            <p className="text-xl text-slate-400 font-light">
              Біз әрбір пациенттің жайлылығы мен қауіпсіздігіне баса назар
              аудара отырып, медициналық қызметтің ең жоғары стандартын ұсынамыз.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Heart size={28} />,
                title: 'Жеке көзқарас',
                desc: 'Әрбір науқасқа ерекше назар аударамыз. Құпиялылыққа және толық жайлылыққа 100% кепілдік береміз.',
              },
              {
                icon: <Shield size={28} />,
                title: 'Қауіпсіздік кепілдігі',
                desc: 'Халықаралық стандарттарға сай стерильдік пен қауіпсіздік хаттамалары. Әрбір қадам бақылауда.',
              },
              {
                icon: <Stethoscope size={28} />,
                title: 'Тәжірибелі мамандар',
                desc: 'Біздің мамандардың орташа жұмыс өтілі 20 жылдан асады. Үнемі Еуропа мен АҚШ-та біліктіліктерін арттырады.',
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="bg-white/60 backdrop-blur-md rounded-3xl p-10 border border-white/40 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-8 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-500 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SERVICES PREVIEW
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-white/40">
        <div className="container mx-auto px-4 md:px-8">
          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
              Біздің қызметтер
            </h2>
            <p className="text-xl text-slate-400 font-light">
              Орталығымызда көрсетілетін негізгі медициналық бағыттар
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Baby size={28} />,
                title: 'Акушерлік',
                desc: 'Жүктілікті жоспарлау, сүйемелдеу және босануға дайындау бағдарламалары.',
                price: '15 000 ₸',
              },
              {
                icon: <Activity size={28} />,
                title: 'Гинекология',
                desc: 'Ауруларды заманауи тәсілмен диагностикалау, емдеу және алдын алу.',
                price: '12 000 ₸',
              },
              {
                icon: <Search size={28} />,
                title: 'Диагностика',
                desc: 'Сараптамалық деңгейдегі УДЗ, зертханалық зерттеулер және скрининг.',
                price: '8 000 ₸',
              },
            ].map((service, i) => (
              <div
                key={i}
                className="bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-slate-100/50 hover:-translate-y-2 transition-all duration-500 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:bg-emerald-700 group-hover:text-white transition-all duration-500 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-serif">
                  {service.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-light mb-6">
                  {service.desc}
                </p>
                <p className="text-lg font-semibold text-[#0F4C3A] mb-4">
                  бастап {service.price}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-emerald-700 font-medium hover:gap-3 transition-all duration-500 group-hover:text-emerald-900"
                >
                  Толығырақ <ArrowRight size={18} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA SECTION
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="bg-gradient-to-br from-[#0F4C3A] to-emerald-950 rounded-[2.5rem] p-16 text-white text-center">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Қабылдауға жазылу
            </h2>
            <p className="text-xl text-emerald-100/80 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Кезексіз, өзіңізге ыңғайлы уақытқа онлайн жазылыңыз. Біздің
              мамандар сізге жоғары деңгейде қызмет көрсетуге әрқашан дайын.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-white text-[#0F4C3A] rounded-full px-12 py-5 text-lg font-bold hover:scale-105 hover:shadow-[0_20px_40px_-10px_rgba(255,255,255,0.3)] transition-all duration-500 ease-in-out"
            >
              Қабылдауға жазылу <ArrowRight size={22} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
