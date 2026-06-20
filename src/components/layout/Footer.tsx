import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
        <div className="md:col-span-4">
          <h3 className="text-3xl font-serif font-bold text-white mb-6">
            <span className="text-emerald-500">Medeu</span>Med
          </h3>
          <p className="mb-8 leading-relaxed text-slate-400 max-w-sm">
            Әйелдер денсаулығына жоғары деңгейде қамқорлық жасайтын мамандандырылған акушерлік және гинекологиялық орталық.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-600 transition-all duration-300 text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
          </div>
        </div>
        
        <div className="md:col-span-2 md:col-start-6">
          <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Навигация</h4>
          <ul className="space-y-4">
            <li><Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors">Басты бет</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">Қызметтер</Link></li>
            <li><Link href="/doctors" className="text-slate-400 hover:text-emerald-400 transition-colors">Дәрігерлер</Link></li>
            <li><Link href="/booking" className="text-slate-400 hover:text-emerald-400 transition-colors">Жазылу</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Қызметтер</h4>
          <ul className="space-y-4">
            <li><Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">Акушерлік</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">Гинекология</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">УДЗ (УЗИ)</Link></li>
            <li><Link href="/services" className="text-slate-400 hover:text-emerald-400 transition-colors">Анализдер</Link></li>
          </ul>
        </div>
        
        <div className="md:col-span-3">
          <h4 className="text-white font-bold mb-6 text-lg tracking-wide">Байланыс</h4>
          <ul className="space-y-5">
            <li className="flex items-start gap-4">
              <MapPin className="text-emerald-500 mt-1 shrink-0" size={22} />
              <span className="text-slate-400 leading-relaxed">Алматы қ., Достық даңғылы, 123</span>
            </li>
            <li className="flex items-center gap-4">
              <Phone className="text-emerald-500 shrink-0" size={22} />
              <span className="text-slate-400">+7 (727) 123 45 67</span>
            </li>
            <li className="flex items-center gap-4">
              <Mail className="text-emerald-500 shrink-0" size={22} />
              <span className="text-slate-400">info@medeumed.kz</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 mt-20 pt-8 border-t border-white/10 text-center text-sm text-slate-500 relative z-10">
        <p>&copy; {new Date().getFullYear()} MedeuMed ЖШС. Барлық құқықтар қорғалған.</p>
      </div>
    </footer>
  );
}
