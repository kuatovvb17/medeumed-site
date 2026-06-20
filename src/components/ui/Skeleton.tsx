/** Reusable skeleton components for loading states */

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-slate-200/60 rounded-xl ${className}`} />
  );
}

export function AppointmentCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-6">
        <Skeleton className="w-12 h-12 rounded-2xl" />
        <Skeleton className="w-20 h-6 rounded-full" />
      </div>
      <Skeleton className="w-3/4 h-6 mb-2" />
      <Skeleton className="w-1/2 h-4 mb-6" />
      <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
        <Skeleton className="w-28 h-5" />
        <Skeleton className="w-20 h-8 rounded-lg" />
      </div>
    </div>
  );
}

export function MedicalRecordSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex gap-4 items-center">
        <Skeleton className="w-14 h-14 rounded-2xl" />
        <div className="space-y-2">
          <Skeleton className="w-48 h-5" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
      <Skeleton className="w-24 h-7 rounded-full" />
    </div>
  );
}

export function ProfileFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="w-24 h-4" />
      <Skeleton className="w-full h-14 rounded-xl" />
    </div>
  );
}
