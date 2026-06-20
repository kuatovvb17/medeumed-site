"use client";

import { useState, useEffect } from 'react';
import { Calendar, FileText, User, Clock, CheckCircle, Search, Settings, Shield, Activity, Bell } from 'lucide-react';
import { useAppointments, Appointment } from '@/hooks/useAppointments';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('appointments');
  const { fetchPatientAppointments } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    setLoading(true);
    const data = await fetchPatientAppointments();
    setAppointments(data);
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Күтілуде</span>;
      case 'confirmed':
      case 'approved':
        return <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Расталды</span>;
      case 'completed':
        return <span className="bg-blue-50 text-blue-600 border border-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Аяқталды</span>;
      default:
        return <span className="bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{status}</span>;
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#fdf8e1] opacity-50 blur-[120px] -z-10 animate-blob"></div>
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-40 blur-[120px] -z-10 animate-blob animation-delay-4000"></div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 pt-32 pb-12 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-2">Жеке кабинет</h1>
              <p className="text-slate-500 font-light text-lg">Сіздің денсаулығыңызға қатысты барлық ақпарат осында</p>
            </div>
            
            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <button className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md transition-all">
                <Bell size={20} />
              </button>
              <div className="h-12 pl-2 pr-6 rounded-full bg-white border border-slate-200 flex items-center gap-3 shadow-sm cursor-pointer hover:border-emerald-200 transition-all">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  П
                </div>
                <span className="font-medium text-slate-700 text-sm">Пациент</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex overflow-x-auto hide-scrollbar gap-2 mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {[
              { id: 'appointments', label: 'Менің жазылуларым', icon: <Calendar size={18} /> },
              { id: 'medical-records', label: 'Медициналық карта', icon: <FileText size={18} /> },
              { id: 'profile', label: 'Профиль', icon: <User size={18} /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' 
                    : 'bg-transparent text-slate-500 hover:bg-slate-100'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        {/* TAB 1: Appointments */}
        {activeTab === 'appointments' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold font-serif text-slate-900">Алдағы қабылдаулар</h2>
              <button className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline transition-all">Барлық тарихты көру</button>
            </div>

            {loading ? (
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-16 flex flex-col items-center justify-center border border-white shadow-soft">
                <div className="w-12 h-12 border-4 border-slate-200 border-t-emerald-600 rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-medium">Деректер жүктелуде...</p>
              </div>
            ) : appointments.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-md rounded-3xl p-16 flex flex-col items-center justify-center border border-white shadow-soft text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
                  <Calendar size={32} />
                </div>
                <h3 className="text-2xl font-bold font-serif text-slate-800 mb-2">Сізде белсенді жазылулар жоқ</h3>
                <p className="text-slate-500 mb-8 max-w-md mx-auto">Жаңа қабылдауға қазір-ақ жазылып, өзіңізге ыңғайлы уақытты таңдай аласыз.</p>
                <a href="/booking" className="bg-emerald-700 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-800 hover:-translate-y-1 hover:shadow-lg transition-all">
                  Қабылдауға жазылу
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-soft transition-all group hover:-translate-y-1 cursor-pointer">
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Clock size={20} />
                      </div>
                      {getStatusBadge(apt.status)}
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-800 mb-1">{apt.service_type || 'Қызмет түрі'}</h3>
                    <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
                      {apt.doctors?.full_name ? `Дәрігер: ${apt.doctors.full_name}` : 'Дәрігер белгіленбеген'}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center gap-2 text-slate-700">
                        <Calendar size={16} className="text-slate-400" />
                        {apt.appointment_date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg">
                        <Clock size={16} className="text-emerald-500" />
                        {apt.appointment_time?.substring(0, 5)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Medical Records (Mock) */}
        {activeTab === 'medical-records' && (
          <div className="animate-fade-in-up grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">Соңғы сараптамалар</h2>
              
              {[
                { title: 'Жалпы қан анализі', date: '15 Маусым 2026', doctor: 'Ахметова А.С.', status: 'Қалыпты' },
                { title: 'Жамбас қуысының УДЗ', date: '02 Маусым 2026', doctor: 'Сүлейменова Ә.Қ.', status: 'Ескертулер бар' }
              ].map((record, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-soft transition-all cursor-pointer">
                  <div className="flex gap-4 items-center">
                    <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Activity size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800">{record.title}</h3>
                      <p className="text-slate-500 text-sm">{record.date} • Дәрігер: {record.doctor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${record.status === 'Қалыпты' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                      {record.status}
                    </span>
                    <button className="text-slate-400 hover:text-slate-800 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">Ұсыныстар</h2>
              <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2"></div>
                <Shield className="text-emerald-300 mb-4" size={32} />
                <h3 className="text-xl font-bold mb-2">Дәрігердің қорытындысы</h3>
                <p className="text-emerald-100 font-light leading-relaxed mb-6">
                  Барлық көрсеткіштер қалыпты. Келесі жоспарлы тексеріс 6 айдан кейін ұсынылады. Витамин D қабылдауды жалғастырыңыз.
                </p>
                <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white w-full py-3 rounded-xl font-medium transition-all">
                  Толық көшірмені жүктеу
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Profile Settings */}
        {activeTab === 'profile' && (
          <div className="animate-fade-in-up max-w-3xl">
            <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6">Жеке ақпарат</h2>
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100 shadow-sm">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-sm">Аты-жөні</label>
                    <input type="text" defaultValue="Пациент" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-sm">Телефон нөмірі</label>
                    <input type="tel" defaultValue="+7 (___) ___-__-__" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-sm">ИИН</label>
                    <input type="text" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-2 text-sm">Туған күні</label>
                    <input type="date" className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all" />
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button type="button" className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                    Сақтау
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
