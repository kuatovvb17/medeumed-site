import { Calendar, Clock } from 'lucide-react';
import type { Appointment } from '@/types/models';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { AppointmentCardSkeleton } from '@/components/ui/Skeleton';

interface AppointmentListProps {
  appointments: Appointment[];
  loading: boolean;
}

function AppointmentCard({ appointment }: { appointment: Appointment }) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-soft transition-all group hover:-translate-y-1 cursor-pointer">
      <div className="flex justify-between items-start mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Clock size={20} />
        </div>
        <StatusBadge status={appointment.status} />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-1">
        {appointment.service_type || 'Қызмет түрі'}
      </h3>
      <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">
        {appointment.doctors?.full_name
          ? `Дәрігер: ${appointment.doctors.full_name}`
          : 'Дәрігер белгіленбеген'}
      </p>

      <div className="flex items-center justify-between text-sm font-medium">
        <div className="flex items-center gap-2 text-slate-700">
          <Calendar size={16} className="text-slate-400" />
          {appointment.appointment_date}
        </div>
        <div className="flex items-center gap-2 text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg">
          <Clock size={16} className="text-emerald-500" />
          {appointment.appointment_time?.substring(0, 5)}
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-16 flex flex-col items-center justify-center border border-white shadow-soft text-center">
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-6">
        <Calendar size={32} />
      </div>
      <h3 className="text-2xl font-bold font-serif text-slate-800 mb-2">
        Сізде белсенді жазылулар жоқ
      </h3>
      <p className="text-slate-500 mb-8 max-w-md mx-auto">
        Жаңа қабылдауға қазір-ақ жазылып, өзіңізге ыңғайлы уақытты таңдай аласыз.
      </p>
      <a
        href="/booking"
        className="bg-emerald-700 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-800 hover:-translate-y-1 hover:shadow-lg transition-all"
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
  return (
    <div className="animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold font-serif text-slate-900">Алдағы қабылдаулар</h2>
        <button className="text-emerald-600 font-medium hover:text-emerald-700 hover:underline transition-all">
          Барлық тарихты көру
        </button>
      </div>

      {loading ? (
        <LoadingSkeleton />
      ) : appointments.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} />
          ))}
        </div>
      )}
    </div>
  );
}
