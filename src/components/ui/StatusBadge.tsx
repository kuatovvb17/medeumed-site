import type { Appointment } from '@/types/models';

interface StatusBadgeProps {
  status: Appointment['status'];
}

const statusConfig: Record<string, { label: string; classes: string }> = {
  pending: {
    label: 'Күтілуде',
    classes: 'bg-orange-50 text-orange-600 border-orange-200',
  },
  confirmed: {
    label: 'Расталды',
    classes: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  approved: {
    label: 'Расталды',
    classes: 'bg-emerald-50 text-emerald-600 border-emerald-200',
  },
  completed: {
    label: 'Аяқталды',
    classes: 'bg-blue-50 text-blue-600 border-blue-200',
  },
  cancelled: {
    label: 'Бас тартылды',
    classes: 'bg-red-50 text-red-500 border-red-200',
  },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status] ?? {
    label: status,
    classes: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <span
      className={`border px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.classes}`}
    >
      {config.label}
    </span>
  );
}
