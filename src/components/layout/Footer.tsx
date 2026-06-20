import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <h3 className="text-2xl font-serif font-bold text-white mb-6">
            <span className="text-emerald-500">Medeu</span>Med
          </h3>
          <p className="mb-6 leading-relaxed">
            Әйелдер денсаулығына жоғары деңгейде қамқорлық жасайтын мамандандырылған акушерлік және гинекологиялық орталық.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-emerald-600 transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="bg-slate-800 p-2 rounded-full hover:bg-emerald-600 transition-colors text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Навигация</h4>
          <ul className="space-y-3">
            <li><Link href="/" className="hover:text-emerald-400 transition-colors">Басты бет</Link></li>
            <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Қызметтер мен бағалар</Link></li>
            <li><Link href="/doctors" className="hover:text-emerald-400 transition-colors">Біздің дәрігерлер</Link></li>
            <li><Link href="/booking" className="hover:text-emerald-400 transition-colors">Жазылу</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Қызметтер</h4>
          <ul className="space-y-3">
            <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Акушерлік</Link></li>
            <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Гинекология</Link></li>
            <li><Link href="/services" className="hover:text-emerald-400 transition-colors">УДЗ (УЗИ) диагностикасы</Link></li>
            <li><Link href="/services" className="hover:text-emerald-400 transition-colors">Зертханалық анализдер</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-bold mb-6 text-lg">Байланыс</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <MapPin className="text-emerald-500 mt-1 shrink-0" size={20} />
              <span>Алматы қ., Достық даңғылы, 123</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-emerald-500 shrink-0" size={20} />
              <span>+7 (727) 123 45 67</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-emerald-500 shrink-0" size={20} />
              <span>info@medeumed.kz</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} MedeuMed ЖШС. Барлық құқықтар қорғалған.</p>
      </div>
    </footer>
  );
}
