import Link from 'next/link';
import { ArrowRight, Heart, Shield, Stethoscope, Baby, Activity, Star } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-emerald-50 py-20 overflow-hidden">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="z-10 relative">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight font-serif">
              Әйелдер денсаулығына <br/><span className="text-emerald-600">сенімді қамқорлық</span>
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Жоғары санатты дәрігерлер, заманауи диагностика және әрбір науқасқа жеке көзқарас. "MedeuMed" – сіздің денсаулығыңыздың кепілі.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="bg-emerald-600 text-white px-8 py-4 rounded-full text-center hover:bg-emerald-700 transition-all font-semibold flex items-center justify-center gap-2 shadow-lg shadow-emerald-200">
                Қабылдауға жазылу <ArrowRight size={20} />
              </Link>
              <Link href="/services" className="bg-white text-emerald-700 border border-emerald-200 px-8 py-4 rounded-full text-center hover:bg-emerald-50 transition-all font-semibold">
                Қызметтерді көру
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-emerald-800/10 mix-blend-multiply z-10 rounded-2xl"></div>
            <Image 
              src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop" 
              alt="MedeuMed дәрігері"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        
        {/* Декоративные элементы */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-50 z-0"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif">Неге бізді таңдайды?</h2>
            <p className="text-slate-600">Біз әрбір пациенттің жайлылығы мен қауіпсіздігіне баса назар аударамыз</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Stethoscope className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">Тәжірибелі дәрігерлер</h3>
              <p className="text-slate-600 leading-relaxed">
                Біздің мамандардың орташа жұмыс өтілі 15 жылдан асады. Үнемі біліктіліктерін арттырады.
              </p>
            </div>
            
            <div className="bg-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Activity className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">Заманауи жабдықтар</h3>
              <p className="text-slate-600 leading-relaxed">
                Дәлдігі жоғары сараптамалық кластағы УДЗ (УЗИ) аппараттары және жаңа зертханалық құрылғылар.
              </p>
            </div>
            
            <div className="bg-emerald-50 p-8 rounded-2xl hover:shadow-lg transition-shadow border border-emerald-100">
              <div className="bg-emerald-100 w-14 h-14 rounded-full flex items-center justify-center mb-6">
                <Heart className="text-emerald-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3 font-serif">Жеке көзқарас</h3>
              <p className="text-slate-600 leading-relaxed">
                Әрбір науқасқа ерекше назар аударамыз. Құпиялылыққа және толық жайлылыққа кепілдік береміз.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 font-serif">Танымал қызметтер</h2>
              <p className="text-slate-600">Клиникамызда көрсетілетін негізгі медициналық қызметтер</p>
            </div>
            <Link href="/services" className="mt-4 md:mt-0 text-emerald-600 font-semibold hover:text-emerald-700 flex items-center gap-1 group">
              Барлығын көру <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Акушерлік", desc: "Жүктілікті жоспарлау және жүргізу", icon: <Baby size={24} /> },
              { title: "Гинекология", desc: "Ауруларды диагностикалау және емдеу", icon: <Heart size={24} /> },
              { title: "УДЗ (УЗИ)", desc: "Барлық органдарды ультрадыбыстық зерттеу", icon: <Activity size={24} /> },
              { title: "Анализдер", desc: "Зертханалық диагностиканың барлық түрлері", icon: <Shield size={24} /> },
            ].map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all group cursor-pointer border border-slate-100">
                <div className="bg-emerald-50 w-12 h-12 rounded-lg flex items-center justify-center text-emerald-600 mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2 font-serif">{service.title}</h3>
                <p className="text-slate-500 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-emerald-700 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-serif">Денсаулығыңызды бізге сеніп тапсырыңыз</h2>
          <p className="text-emerald-100 mb-10 max-w-2xl mx-auto text-lg">
            Кезексіз, өзіңізге ыңғайлы уақытқа онлайн жазылыңыз. Біздің мамандар сізге көмектесуге әрқашан дайын.
          </p>
          <Link href="/booking" className="inline-flex bg-white text-emerald-700 px-8 py-4 rounded-full hover:bg-emerald-50 transition-all font-bold text-lg items-center gap-2 shadow-xl">
            Қабылдауға жазылу <ArrowRight size={20} />
          </Link>
        </div>
        
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
      </section>
    </div>
  );
}
