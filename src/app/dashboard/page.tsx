'use client';

import { useState, useEffect } from 'react';
import {
  Calendar,
  FileText,
  User,
  Bell,
  LogOut,
  LayoutDashboard,
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

  const { fetchPatientAppointments } = useAppointments();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await fetchPatientAppointments();
      setAppointments(data);
      setLoading(false);
    };
    load();
  }, [fetchPatientAppointments]);

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
    <div className="min-h-screen bg-[#FDFBF7] flex">
      {/* ─── Left Sidebar ─── */}
      <aside className="hidden md:flex w-72 bg-white/80 backdrop-blur-xl border-r border-slate-100/80 flex-col fixed h-screen pt-28 pb-8 px-6 z-30">
        {/* Logo */}
        <div>
          <h2 className="font-serif text-2xl font-bold">
            <span className="text-[#0F4C3A]">Medeu</span>Med
          </h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest mt-1">
            Жеке кабинет
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-10 space-y-2 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3.5 w-full px-4 py-3.5 rounded-2xl text-[15px] font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#0F4C3A] text-white shadow-lg shadow-emerald-900/20'
                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="space-y-3">
          <button className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-all duration-300">
            <Bell size={20} />
          </button>

          <div className="border-t border-slate-100" />

          <button className="flex items-center gap-3 text-slate-400 hover:text-red-500 transition-all duration-300 text-sm font-medium px-1">
            <LogOut size={18} />
            Шығу
          </button>
        </div>
      </aside>

      {/* ─── Mobile Bottom Nav ─── */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/90 backdrop-blur-xl border-t border-slate-100/80 px-4 py-2 flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-300 ${
                isActive ? 'text-[#0F4C3A]' : 'text-slate-400'
              }`}
            >
              <Icon size={20} />
              <span className="truncate max-w-[72px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* ─── Main Content ─── */}
      <main className="md:ml-72 flex-1 pt-28 pb-20 px-6 md:px-12">
        {/* Header */}
        <div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900">
            Қош келдіңіз 👋
          </h1>
          <p className="text-slate-400 text-lg mt-2">
            Денсаулығыңызға қатысты ақпарат
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
          {/* Total appointments */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-slate-100/50 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Барлық жазылулар
              </p>
            </div>
            <p className="text-3xl font-bold text-slate-900 font-serif">
              {loading ? '...' : appointments.length}
            </p>
          </div>

          {/* Confirmed */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-slate-100/50 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileText size={18} />
              </div>
              <p className="text-sm text-slate-400 font-medium">Расталған</p>
            </div>
            <p className="text-3xl font-bold text-slate-900 font-serif">
              {loading ? '...' : confirmedCount}
            </p>
          </div>

          {/* Next appointment */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-slate-100/50 transition-all duration-500 ease-in-out hover:shadow-lg hover:-translate-y-0.5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Calendar size={18} />
              </div>
              <p className="text-sm text-slate-400 font-medium">
                Келесі қабылдау
              </p>
            </div>
            <p className="text-xl font-bold text-slate-900 font-serif">
              {loading ? '...' : nextDateDisplay}
            </p>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-10">
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
