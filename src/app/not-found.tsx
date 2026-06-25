'use client';

import Link from 'next/link';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-sky-50/50 flex flex-col items-center justify-center p-6 text-center font-sans selection:bg-cyan-500/30">
      <div className="bg-white/90 backdrop-blur-2xl p-12 rounded-[3rem] border border-slate-200 shadow-2xl shadow-sky-100 max-w-lg w-full transition-all duration-500 hover:border-cyan-400 hover:shadow-[0_0_50px_rgba(0,240,255,0.15)] animate-fade-in-up">
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-8 border border-red-100 shadow-inner">
          <ShieldAlert size={48} className="animate-pulse" />
        </div>
        
        <h1 className="text-6xl font-serif font-black text-slate-900 mb-4 tracking-tight">404</h1>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Бет табылмады</h2>
        
        <p className="text-slate-500 text-base mb-10 leading-relaxed font-medium">
          Кешіріңіз, сіз іздеген парақша өшірілген, орны ауысқан немесе сілтемесі қате терілген.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-black font-bold text-lg px-8 py-4 rounded-2xl shadow-[0_10px_25px_rgba(0,240,255,0.3)] transition-all duration-300 hover:-translate-y-0.5"
          >
            <Home size={20} />
            Басты бетке оралу
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-4 rounded-2xl transition-all duration-300"
          >
            <ArrowLeft size={18} />
            Артқа
          </button>
        </div>
      </div>
    </div>
  );
}
