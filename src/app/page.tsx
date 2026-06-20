import Link from 'next/link';
import { ArrowRight, Heart, Shield, Stethoscope, Baby, Activity, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-40">
        {/* Animated Mesh Gradients Background */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#fce4ec] opacity-60 blur-[120px] animate-blob"></div>
          <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-60 blur-[140px] animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[50%] rounded-full bg-[#fdf8e1] opacity-50 blur-[120px] animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-20 items-center">
          <div className="z-10 relative max-w-2xl animate-fade-in-up">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 text-emerald-900 font-medium text-sm mb-10 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]"></span>
              Жоғары санатты гинекология орталығы
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-slate-900 mb-10 leading-[1.05] tracking-tight font-serif">
              Әйелдер денсаулығына <br/>
              <span className="text-emerald-800 italic font-medium tracking-normal">сенімді қамқорлық</span>
            </h1>
            
            <p className="text-2xl text-slate-600 mb-12 leading-relaxed font-light max-w-xl">
              Жоғары санатты дәрігерлер, заманауи диагностика және әрбір науқасқа премиум деңгейдегі жеке көзқарас. "MedeuMed" – сіздің сенімді таңдауыңыз.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <Link href="/booking" className="bg-emerald-800 text-white px-10 py-5 rounded-full text-center hover:bg-emerald-900 hover:-translate-y-2 transition-all duration-500 ease-in-out font-semibold flex items-center justify-center gap-3 shadow-[0_20px_40px_-10px_rgb(4,120,87,0.4)] text-lg">
                Қабылдауға жазылу <ArrowRight size={22} />
              </Link>
              <Link href="/services" className="bg-white/40 backdrop-blur-xl text-emerald-900 border border-white/60 px-10 py-5 rounded-full text-center hover:bg-white hover:-translate-y-2 transition-all duration-500 ease-in-out font-semibold shadow-sm text-lg">
                Қызметтерді көру
              </Link>
            </div>
          </div>
          
          <div className="relative h-[600px] lg:h-[800px] w-full rounded-[3rem] overflow-hidden shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Image 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
              alt="MedeuMed дәрігері"
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
            
            {/* Floating Glassmorphism Cards */}
            <div className="absolute bottom-10 left-10 glass px-6 py-4 rounded-2xl flex items-center gap-4 animate-float">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-yellow-500 shadow-sm">
                <Star className="fill-current" size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 font-serif">5.0</p>
                <p className="text-slate-600 text-sm font-medium">Пациенттер рейтингі</p>
              </div>
            </div>

            <div className="absolute top-10 right-10 glass px-6 py-4 rounded-2xl flex items-center gap-4 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 shadow-sm">
                <Shield size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800 font-serif">15+ жыл</p>
                <p className="text-slate-600 text-sm font-medium">Орташа жұмыс өтілі</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Неге бізді таңдайды?</h2>
            <p className="text-xl text-slate-600 font-light">Біз әрбір пациенттің жайлылығы мен қауіпсіздігіне баса назар аудара отырып, медициналық қызметтің ең жоғары стандартын ұсынамыз.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { icon: <Stethoscope size={32} />, title: 'Тәжірибелі дәрігерлер', desc: 'Біздің мамандардың орташа жұмыс өтілі 15 жылдан асады. Үнемі Еуропа мен АҚШ-та біліктіліктерін арттырады.' },
              { icon: <Activity size={32} />, title: 'Заманауи жабдықтар', desc: 'Дәлдігі жоғары сараптамалық кластағы УДЗ аппараттары және соңғы үлгідегі зертханалық құрылғылар.' },
              { icon: <Heart size={32} />, title: 'Премиум көзқарас', desc: 'Әрбір науқасқа ерекше назар аударамыз. Құпиялылыққа және толық жайлылыққа 100% кепілдік береміз.' }
            ].map((feature, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm p-10 rounded-[2rem] hover:-translate-y-2 hover:shadow-soft transition-all duration-500 border border-white shadow-sm group">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-8 group-hover:bg-emerald-700 group-hover:text-white transition-colors duration-500 shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed font-light text-lg">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-white relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 animate-fade-in-up">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Танымал қызметтер</h2>
              <p className="text-xl text-slate-600 font-light">Орталығымызда көрсетілетін негізгі медициналық бағыттар</p>
            </div>
            <Link href="/services" className="mt-6 md:mt-0 px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2 group">
              Барлық каталогты ашу <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Акушерлік", desc: "Жүктілікті жоспарлау және премиум сүйемелдеу", icon: <Baby size={28} /> },
              { title: "Гинекология", desc: "Ауруларды заманауи тәсілмен емдеу", icon: <Heart size={28} /> },
              { title: "УДЗ (УЗИ)", desc: "Сараптамалық деңгейдегі ультрадыбыстық зерттеу", icon: <Activity size={28} /> },
              { title: "Анализдер", desc: "Зертханалық диагностиканың барлық түрлері", icon: <Shield size={28} /> },
            ].map((service, i) => (
              <div key={i} className="bg-[#FAF9F6] p-8 rounded-[2rem] hover:bg-emerald-700 hover:shadow-soft transition-all duration-500 group cursor-pointer border border-transparent hover:border-emerald-600">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-emerald-700 mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 font-serif group-hover:text-white transition-colors duration-300">{service.title}</h3>
                <p className="text-slate-600 font-light group-hover:text-emerald-50 transition-colors duration-300 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=2080&auto=format&fit=crop" 
            alt="Clinic Interior"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-emerald-900/80 backdrop-blur-sm"></div>
        </div>

        <div className="container mx-auto px-4 md:px-8 text-center relative z-10 animate-fade-in-up">
          <div className="max-w-3xl mx-auto glass p-12 md:p-16 rounded-[3rem] border border-white/20">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-serif">Денсаулығыңызды бізге сеніп тапсырыңыз</h2>
            <p className="text-slate-700 mb-10 text-xl font-light leading-relaxed">
              Кезексіз, өзіңізге ыңғайлы уақытқа онлайн жазылыңыз. Біздің мамандар сізге жоғары деңгейде қызмет көрсетуге әрқашан дайын.
            </p>
            <Link href="/booking" className="inline-flex bg-emerald-700 text-white px-10 py-5 rounded-full hover:bg-emerald-800 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(4,120,87,0.4)] transition-all duration-300 font-bold text-lg items-center gap-3">
              Қабылдауға жазылу <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
