import Link from 'next/link';
import { ArrowRight, Info, Shield, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Қызметтер мен бағалар | MedeuMed',
  description: 'MedeuMed клиникасының премиум акушерлік және гинекологиялық қызметтері мен бағалары.',
};

export default function ServicesPage() {
  const categories = [
    {
      title: 'Акушерлік',
      services: [
        { name: 'Акушер-гинекологтың алғашқы қабылдауы', price: '15 000 ₸', duration: '45 мин' },
        { name: 'Акушер-гинекологтың қайталама қабылдауы', price: '12 000 ₸', duration: '30 мин' },
        { name: 'Жүктілікті жүргізу (I триместр)', price: '150 000 ₸', duration: 'Кешенді' },
        { name: 'Жүктілікті жүргізу (II-III триместр)', price: '200 000 ₸', duration: 'Кешенді' },
        { name: 'Босанудан кейінгі тексеріс', price: '15 000 ₸', duration: '45 мин' },
      ]
    },
    {
      title: 'Гинекология',
      services: [
        { name: 'Гинеколог-эндокринологтың қабылдауы', price: '18 000 ₸', duration: '45 мин' },
        { name: 'Жатыр мойны эрозиясын радио толқынмен емдеу', price: '35 000 ₸', duration: '60 мин' },
        { name: 'Кольпоскопия (кеңейтілген)', price: '10 000 ₸', duration: '20 мин' },
        { name: 'Жатыр ішілік спиральды (ЖІС) салу', price: '25 000 ₸', duration: '30 мин' },
        { name: 'ЖІС алып тастау', price: '15 000 ₸', duration: '20 мин' },
      ]
    },
    {
      title: 'УДЗ (УЗИ) Диагностика',
      services: [
        { name: 'Жамбас қуысы ағзаларының УДЗ', price: '10 000 ₸', duration: '30 мин' },
        { name: 'Жүктілік кезіндегі УДЗ (I триместр)', price: '12 000 ₸', duration: '30 мин' },
        { name: 'Жүктілік кезіндегі УДЗ (II-III триместр + Допплер)', price: '15 000 ₸', duration: '45 мин' },
        { name: 'Сүт бездерінің УДЗ', price: '8 000 ₸', duration: '20 мин' },
        { name: 'Қалқанша безінің УДЗ', price: '8 000 ₸', duration: '20 мин' },
      ]
    },
    {
      title: 'Зертханалық анализдер',
      services: [
        { name: 'Жалпы қан анализі (ЖҚА)', price: '3 500 ₸', duration: '1 күн' },
        { name: 'Жатыр мойны жағындысы (микрофлора)', price: '4 000 ₸', duration: '1-2 күн' },
        { name: 'Онкоцитология (РАР-тест)', price: '7 500 ₸', duration: '3-5 күн' },
        { name: 'Гормоналды панель (1 көрсеткіш)', price: '4 500 ₸', duration: '1-2 күн' },
        { name: 'ПТР диагностикасы (ЖЖБИ - 12 инфекция)', price: '22 000 ₸', duration: '2-3 күн' },
      ]
    }
  ];

  return (
    <div className="pb-32 overflow-hidden">
      {/* Header */}
      <div className="relative pt-32 pb-24 text-center">
        <div className="absolute top-[-20%] left-[20%] w-[50%] h-[150%] rounded-full bg-[#e8f5e9] opacity-60 blur-[120px] -z-10 animate-blob"></div>
        <div className="container mx-auto px-4 md:px-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 font-medium text-sm mb-6 border border-emerald-100">
            <Sparkles size={16} /> Ашық баға саясаты
          </div>
          <h1 className="text-5xl md:text-6xl font-bold font-serif text-slate-900 mb-6">Қызметтер мен Бағалар</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-xl font-light leading-relaxed">
            Сіздің денсаулығыңызға қажетті барлық премиум қызметтер бір жерде. Біз сапаға және толық жайлылыққа кепілдік береміз.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Main Content: Pricing Catalog */}
          <div className="w-full lg:w-2/3 space-y-12">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-white/80 backdrop-blur-md rounded-[2.5rem] shadow-soft border border-white overflow-hidden">
                <div className="bg-[#FAF9F6] px-10 py-8 border-b border-slate-100/50">
                  <h2 className="text-3xl font-bold text-slate-900 font-serif">{category.title}</h2>
                </div>
                <div className="p-4 md:p-6">
                  {category.services.map((service, sIdx) => (
                    <div 
                      key={sIdx} 
                      className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl hover:bg-emerald-50/50 transition-colors duration-300"
                    >
                      <div className="mb-4 md:mb-0 pr-4">
                        <h3 className="font-semibold text-slate-800 text-lg mb-2">{service.name}</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-1.5 font-light">
                          <Info size={16} className="text-emerald-500" /> Ұзақтығы: {service.duration}
                        </p>
                      </div>
                      <div className="flex items-center justify-between md:justify-end gap-8">
                        <span className="text-2xl font-serif font-bold text-emerald-800 whitespace-nowrap">{service.price}</span>
                        <Link 
                          href="/booking" 
                          className="opacity-0 md:opacity-100 bg-white text-emerald-700 border border-emerald-200 px-6 py-2.5 rounded-full font-medium hover:bg-emerald-700 hover:text-white hover:border-emerald-700 transition-all shadow-sm group-hover:opacity-100"
                        >
                          Жазылу
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 sticky top-32 space-y-8">
            <div className="bg-emerald-800 rounded-[2.5rem] p-10 text-white shadow-soft relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold font-serif mb-6 leading-tight">Сұрақтарыңыз <br/> бар ма?</h3>
                <p className="mb-8 text-emerald-100 font-light leading-relaxed text-lg">
                  Қай қызмет түрін таңдау керектігін білмесеңіз, бізге хабарласыңыз. Біздің әкімші сізге қуана көмектеседі.
                </p>
                <div className="space-y-4 mb-10">
                  <div className="bg-emerald-900/40 backdrop-blur-md p-5 rounded-2xl border border-emerald-700/50">
                    <p className="text-sm text-emerald-300/80 mb-2 font-medium tracking-wide uppercase">Байланыс телефоны</p>
                    <p className="text-2xl font-bold tracking-tight">+7 (727) 123 45 67</p>
                  </div>
                  <div className="bg-emerald-900/40 backdrop-blur-md p-5 rounded-2xl border border-emerald-700/50">
                    <p className="text-sm text-emerald-300/80 mb-2 font-medium tracking-wide uppercase">Жұмыс уақыты</p>
                    <p className="font-medium text-lg">Дүйсенбі - Жұма: 08:00 - 20:00</p>
                    <p className="font-medium text-emerald-100">Сенбі: 09:00 - 15:00</p>
                  </div>
                </div>
                <Link 
                  href="/booking" 
                  className="flex items-center justify-center gap-2 w-full bg-white text-emerald-800 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Онлайн жазылу <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-10 border border-white shadow-soft text-center group hover:bg-white transition-colors duration-500">
              <div className="w-20 h-20 bg-blue-50/80 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                <Shield className="text-blue-500" size={36} />
              </div>
              <h3 className="font-bold text-slate-900 text-xl mb-4 font-serif">МӘМС қызметтері</h3>
              <p className="text-slate-600 font-light leading-relaxed text-lg">
                Біздің клиникада кейбір қызметтерді Мемлекеттік әлеуметтік медициналық сақтандыру (МӘМС) арқылы тегін алуға болады.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
