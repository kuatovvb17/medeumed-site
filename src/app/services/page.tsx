import Link from 'next/link';
import { ArrowRight, Info, Shield } from 'lucide-react';

export const metadata = {
  title: 'Қызметтер мен бағалар | MedeuMed',
  description: 'MedeuMed клиникасының акушерлік және гинекологиялық қызметтері мен бағалары.',
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
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Header */}
      <div className="bg-emerald-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold font-serif mb-4">Қызметтер мен Бағалар</h1>
          <p className="text-emerald-100 max-w-2xl mx-auto text-lg">
            Толық әрі ашық бағалар каталогы. Сіздің денсаулығыңызға қажетті барлық қызметтер бір жерде.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content: Pricing Catalog */}
          <div className="w-full lg:w-2/3 space-y-12">
            {categories.map((category, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-emerald-50 px-8 py-5 border-b border-emerald-100">
                  <h2 className="text-2xl font-bold text-emerald-800 font-serif">{category.title}</h2>
                </div>
                <div className="p-0">
                  {category.services.map((service, sIdx) => (
                    <div 
                      key={sIdx} 
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-slate-50 transition-colors ${
                        sIdx !== category.services.length - 1 ? 'border-b border-slate-100' : ''
                      }`}
                    >
                      <div className="mb-4 sm:mb-0 pr-4">
                        <h3 className="font-bold text-slate-800 text-lg mb-1">{service.name}</h3>
                        <p className="text-slate-500 text-sm flex items-center gap-1">
                          <Info size={14} /> Ұзақтығы: {service.duration}
                        </p>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="text-xl font-bold text-emerald-600 whitespace-nowrap">{service.price}</span>
                        <Link 
                          href="/booking" 
                          className="bg-slate-100 text-slate-700 hover:bg-emerald-600 hover:text-white px-6 py-2 rounded-full font-medium transition-colors"
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
          <div className="w-full lg:w-1/3 sticky top-28 space-y-6">
            <div className="bg-emerald-600 rounded-3xl p-8 text-white shadow-lg">
              <h3 className="text-2xl font-bold font-serif mb-4">Сұрақтарыңыз бар ма?</h3>
              <p className="mb-6 text-emerald-50 leading-relaxed">
                Қай қызмет түрін таңдау керектігін білмесеңіз, бізге хабарласыңыз. Біздің әкімші сізге көмектеседі.
              </p>
              <div className="space-y-4 mb-8">
                <div className="bg-emerald-700/50 p-4 rounded-xl">
                  <p className="text-sm text-emerald-200 mb-1">Байланыс телефоны</p>
                  <p className="text-xl font-bold">+7 (727) 123 45 67</p>
                </div>
                <div className="bg-emerald-700/50 p-4 rounded-xl">
                  <p className="text-sm text-emerald-200 mb-1">Жұмыс уақыты</p>
                  <p className="font-medium">Дүйсенбі - Жұма: 08:00 - 20:00</p>
                  <p className="font-medium">Сенбі: 09:00 - 15:00</p>
                </div>
              </div>
              <Link 
                href="/booking" 
                className="block w-full bg-white text-emerald-600 text-center py-4 rounded-xl font-bold text-lg hover:bg-emerald-50 transition-colors shadow-md"
              >
                Онлайн жазылу
              </Link>
            </div>
            
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-blue-500" size={32} />
              </div>
              <h3 className="font-bold text-slate-800 mb-2">МӘМС бойынша қызметтер</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Біздің клиникада кейбір қызметтерді Мемлекеттік әлеуметтік медициналық сақтандыру (МӘМС) арқылы тегін алуға болады. Толық ақпаратты тіркеу бөлімінен біле аласыз.
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
