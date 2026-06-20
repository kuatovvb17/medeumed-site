import { Activity, Shield, ChevronRight } from 'lucide-react';
import type { MedicalRecord } from '@/types/models';
import { MedicalRecordSkeleton } from '@/components/ui/Skeleton';

interface MedicalHistoryProps {
  loading?: boolean;
}

const records: MedicalRecord[] = [
  {
    title: 'Жалпы қан анализі',
    date: '15 Маусым 2026',
    doctor: 'Ахметова А.С.',
    status: 'Қалыпты',
  },
  {
    title: 'Жамбас қуысының УДЗ',
    date: '02 Маусым 2026',
    doctor: 'Сүлейменова Ә.Қ.',
    status: 'Ескертулер бар',
  },
];

function RecordCard({ record }: { record: MedicalRecord }) {
  const isNormal = record.status === 'Қалыпты';

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:shadow-soft transition-all cursor-pointer">
      <div className="flex gap-4 items-center">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Activity size={24} />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-800">{record.title}</h3>
          <p className="text-slate-500 text-sm">
            {record.date} &bull; Дәрігер: {record.doctor}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            isNormal
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-orange-50 text-orange-600'
          }`}
        >
          {record.status}
        </span>
        <button className="text-slate-400 hover:text-slate-800 transition-colors">
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

function DoctorRecommendation() {
  return (
    <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-3xl p-8 text-white shadow-soft relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-[30px] -translate-y-1/2 translate-x-1/2" />
      <Shield className="text-emerald-300 mb-4" size={32} />
      <h3 className="text-xl font-bold mb-2">Дәрігердің қорытындысы</h3>
      <p className="text-emerald-100 font-light leading-relaxed mb-6">
        Барлық көрсеткіштер қалыпты. Келесі жоспарлы тексеріс 6 айдан кейін
        ұсынылады. Витамин D қабылдауды жалғастырыңыз.
      </p>
      <button className="bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/30 text-white w-full py-3 rounded-xl font-medium transition-all">
        Толық көшірмені жүктеу
      </button>
    </div>
  );
}

export function MedicalHistory({ loading = false }: MedicalHistoryProps) {
  return (
    <div className="animate-fade-in-up grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">
          Соңғы сараптамалар
        </h2>

        {loading
          ? Array.from({ length: 2 }).map((_, i) => (
              <MedicalRecordSkeleton key={i} />
            ))
          : records.map((record, i) => <RecordCard key={i} record={record} />)}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold font-serif text-slate-900 mb-4">
          Ұсыныстар
        </h2>
        <DoctorRecommendation />
      </div>
    </div>
  );
}
