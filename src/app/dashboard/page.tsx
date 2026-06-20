"use client";

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useAppointments } from '@/hooks/useAppointments';
import { CabinetTabs } from '@/components/cabinet/CabinetTabs';
import { AppointmentList } from '@/components/cabinet/AppointmentList';
import { MedicalHistory } from '@/components/cabinet/MedicalHistory';
import { ProfileSettings } from '@/components/cabinet/ProfileSettings';
import type { Appointment, CabinetTab } from '@/types/models';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<CabinetTab>('appointments');
  const { fetchPatientAppointments } = useAppointments();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAppointments = async () => {
      setLoading(true);
      const data = await fetchPatientAppointments();
      setAppointments(data);
      setLoading(false);
    };

    loadAppointments();
  }, [fetchPatientAppointments]);

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-32 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#fdf8e1] opacity-50 blur-[120px] -z-10 animate-blob" />
      <div className="absolute bottom-[20%] left-[-10%] w-[40%] h-[60%] rounded-full bg-[#e8f5e9] opacity-40 blur-[120px] -z-10 animate-blob animation-delay-4000" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 pt-32 pb-12 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="animate-fade-in-up">
              <h1 className="text-4xl md:text-5xl font-bold font-serif text-slate-900 mb-2">
                Жеке кабинет
              </h1>
              <p className="text-slate-500 font-light text-lg">
                Сіздің денсаулығыңызға қатысты барлық ақпарат осында
              </p>
            </div>

            <div className="flex gap-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <button
                className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:shadow-md transition-all"
                aria-label="Хабарламалар"
              >
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

          <CabinetTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </header>

      {/* Tab Content */}
      <main className="container mx-auto px-4 md:px-8 mt-12">
        {activeTab === 'appointments' && (
          <AppointmentList appointments={appointments} loading={loading} />
        )}
        {activeTab === 'medical-records' && <MedicalHistory />}
        {activeTab === 'profile' && <ProfileSettings />}
      </main>
    </div>
  );
}
