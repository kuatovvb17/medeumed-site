import { Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import type { Appointment } from '@/types/models';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AppointmentCardSkeleton } from '@/components/ui/Skeleton';

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] transition-all duration-500 group hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
          <Clock size={20} />
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <h3 className="text-xl font-bold text-white font-serif mb-1">
        {(!appointment.service_type || !isNaN(Number(appointment.service_type))) ? 'Медициналық қабылдау' : appointment.service_type}
      </h3>
      <p className="text-slate-400 text-sm mb-6 pb-6 border-b border-white/10">
        {appointment.doctors?.full_name
          ? `Дәрігер: ${appointment.doctors.full_name}`
          : 'Дәрігер белгіленбеген'}
      </p>

      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar size={16} className="text-emerald-500/70" />
          {appointment.appointment_date}
        </div>
        <div className="flex items-center gap-2 text-white bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
          <Clock size={16} className="text-emerald-400" />
          {appointment.appointment_time?.substring(0, 5)}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-slate-900/60 backdrop-blur-xl rounded-3xl p-16 flex flex-col items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] text-center">
      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center text-slate-500 mb-6 border border-white/10">
        <Calendar size={32} />
      </div>
      <h3 className="text-2xl font-bold font-serif text-white mb-2">
        Сізде белсенді жазылулар жоқ
      </h3>
      <p className="text-slate-400 mb-8 max-w-md mx-auto">
        Жаңа қабылдауға қазір-ақ жазылып, өзіңізге ыңғайлы уақытты таңдай аласыз.
      </p>
      <a
        href="/booking"
        className="bg-[#0044FF] text-white px-8 py-4 rounded-full font-bold hover:bg-[#00F0FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all duration-300"
      >
        Қабылдауға жазылу
      </a>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <AppointmentCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function AppointmentList({ appointments, loading }: AppointmentListProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedAppointments = showAll ? appointments : appointments.slice(0, 3);
  const hasMore = appointments.length > 3;

  return (
    <div className="animate-fade-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-bold font-serif text-white tracking-wide">
          Алдағы қабылдаулар
        </h2>
        
        {hasMore && (
          <button 
            onClick={() => setShowAll(!showAll)}
            className="flex items-center gap-2 text-[#00F0FF] font-medium hover:text-white transition-colors bg-[#00F0FF]/10 px-4 py-2 rounded-xl border border-[#00F0FF]/20 self-start sm:self-auto"
          >
            {showAll ? (
              <>Тарихты жасыру <ChevronUp size={16} /></>
            ) : (
              <>Барлық тарихты көру <ChevronDown size={16} /></>
            )}
          </button>
        )}
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : appointments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedAppointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      )}
    </div>
  );
}
