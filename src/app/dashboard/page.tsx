'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  FileText,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
} from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import { AppointmentList } from '@/components/cabinet/AppointmentList';
import { MedicalHistory } from '@/components/cabinet/MedicalHistory';
import { ProfileSettings } from '@/components/cabinet/ProfileSettings';
import type { Appointment, CabinetTab } from '@/types/models';

const navItems: { id: CabinetTab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'appointments', label: 'Менің жазылуларым', icon: LayoutDashboard },
  { id: 'medical-records', label: 'Медициналық карта', icon: FileText },
  { id: 'profile', label: 'Профиль', icon: User },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<CabinetTab>('appointments');
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPhone, setLoginPhone] = useState('');
  const [authLoading, setAuthLoading] = useState(true);

  const { fetchPatientAppointments } = useAppointments();

  useEffect(() => {
    const phone = localStorage.getItem('medeu_patient_phone');
    if (phone) {
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, []);

  const formatPhone = (val: string) => {
    const digits = val.replace(/\D/g, '');
    if (!digits) return '';
    let res = '+7';
    if (digits.length > 1) res += ` (${digits.substring(1, 4)}`;
    if (digits.length >= 5) res += `) ${digits.substring(4, 7)}`;
    if (digits.length >= 8) res += `-${digits.substring(7, 9)}`;
    if (digits.length >= 10) res += `-${digits.substring(9, 11)}`;
    return res;
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const load = async () => {
      setLoading(true);
      const data = await fetchPatientAppointments();
      setAppointments(data);
      setLoading(false);
    };
    load();
  }, [fetchPatientAppointments, isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginPhone.replace(/\D/g, '').length >= 10) {
      localStorage.setItem('medeu_patient_phone', loginPhone);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('medeu_patient_phone');
    setIsAuthenticated(false);
    setLoginPhone('');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-emerald-400 font-sans">
        Жүктелуде...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Neon glowing orbs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0F4C3A]/40 rounded-full blur-[120px]" />
        </div>
        
        <div className="z-10 bg-white/80 backdrop-blur-xl p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 w-full max-w-md transition-all duration-500 ease-in-out hover:border-sky-300 hover:shadow-[0_0_60px_rgba(16,185,129,0.15)]">
          <div className="text-center mb-10">
            <Shield className="w-16 h-16 text-emerald-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
            <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">Жүйеге кіру</h1>
            <p className="text-slate-600 font-sans text-sm">Жалғастыру үшін телефон нөміріңізді енгізіңіз</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-emerald-400 text-sm font-medium mb-3">
                Телефон нөмірі
              </label>
              <input 
                type="tel"
                value={loginPhone}
                onChange={(e) => setLoginPhone(formatPhone(e.target.value))}
                placeholder="+7 (700) 123-45-67"
                className="w-full bg-slate-50 border border-slate-300 rounded-2xl px-5 py-4 text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 transition-all duration-500 ease-in-out"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-lg py-4 rounded-2xl transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:-translate-y-0.5"
            >
              Кіру
            </button>
          </form>
        </div>
      </div>
    );
  }

  const confirmedCount = appointments.filter(
    (a) => a.status === 'confirmed' || a.status === 'approved'
  ).length;

  const nextAppointment = appointments
    .filter((a) => a.status !== 'cancelled' && a.status !== 'completed')
    .sort(
      (a, b) =>
        new Date(a.appointment_date).getTime() -
        new Date(b.appointment_date).getTime()
    )[0];

  const nextDateDisplay = nextAppointment
    ? `${nextAppointment.appointment_date}`
    : '—';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans selection:bg-emerald-500/30">
      {/* ─── Left Sidebar ─── */}
      <aside className="hidden md:flex w-72 bg-white/90 backdrop-blur-xl border-r border-slate-100 flex-col fixed h-screen pt-28 pb-8 px-6 z-30">
        {/* Logo */}
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">
            <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">Medeu</span>Med
          </h2>
          <p className="text-xs text-emerald-500/70 uppercase tracking-widest mt-1">
            Жеке кабинет
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-3 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-500 ease-in-out ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-slate-300 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'text-slate-600 hover:bg-slate-800/50 hover:text-emerald-300'
                }`}
              >
                <Icon size={20} className={isActive ? 'drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : ''} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="space-y-3">
          <div className="border-t border-slate-100" />

          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 text-slate-500 hover:text-red-400 transition-all duration-500 ease-in-out text-sm font-medium px-2 py-2"
          >
            <LogOut size={18} />
            Шығу
          </button>
        </div>
      </aside>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-xl border-t border-slate-100 px-4 py-3 flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-500 ease-in-out ${
                isActive ? 'text-emerald-400' : 'text-slate-500'
              }`}
            >
              <Icon size={22} className={isActive ? 'drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]' : ''} />
              <span className="truncate max-w-[72px]">{item.label}</span>
            </button>
          );
        })}
        {/* Logout Mobile Button */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-500 ease-in-out text-slate-500 hover:text-red-400"
        >
          <LogOut size={22} />
          <span className="truncate max-w-[72px]">Шығу</span>
        </button>
      </nav>

      {/* ─── Main Content ─── */}
      <main className="md:ml-72 flex-1 pt-28 pb-24 px-6 md:px-12 relative">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-1/2 h-96 bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-wide">
            Қош келдіңіз 👋
          </h1>
          <p className="text-emerald-400/80 text-lg mt-3">
            Денсаулығыңызға қатысты ақпарат
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 relative z-10">
          {/* Total appointments */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 transition-all duration-500 ease-in-out hover:border-sky-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-slate-200 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all duration-500 ease-in-out">
                <Calendar size={20} />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                Барлық жазылулар
              </p>
            </div>
            <p className="text-4xl font-bold text-slate-900 font-serif tracking-wider">
              {loading ? '...' : appointments.length}
            </p>
          </div>

          {/* Confirmed */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 transition-all duration-500 ease-in-out hover:border-sky-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-500 ease-in-out">
                <FileText size={20} />
              </div>
              <p className="text-sm text-slate-600 font-medium">Расталған</p>
            </div>
            <p className="text-4xl font-bold text-slate-900 font-serif tracking-wider">
              {loading ? '...' : confirmedCount}
            </p>
          </div>

          {/* Next appointment */}
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-6 border border-slate-200 transition-all duration-500 ease-in-out hover:border-sky-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-all duration-500 ease-in-out">
                <Calendar size={20} />
              </div>
              <p className="text-sm text-slate-600 font-medium">
                Келесі қабылдау
              </p>
            </div>
            <p className="text-xl font-bold text-slate-900 font-serif tracking-wide truncate">
              {loading ? '...' : nextDateDisplay}
            </p>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-12 relative z-10">
          {activeTab === 'appointments' && (
            <AppointmentList appointments={appointments} loading={loading} />
          )}
          {activeTab === 'medical-records' && (
            <MedicalHistory loading={loading} />
          )}
          {activeTab === 'profile' && <ProfileSettings loading={loading} />}
        </div>
      </main>
    </div>
  );
}
