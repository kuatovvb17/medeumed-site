import { ProfileFieldSkeleton } from '@/components/ui/Skeleton';

interface ProfileSettingsProps {
  loading?: boolean;
}

export function ProfileSettings({ loading = false }: ProfileSettingsProps) {
  if (loading) {
    return (
      <div className="animate-fade-in-up max-w-3xl">
        <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6">Жеке ақпарат</h2>
        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProfileFieldSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up max-w-3xl">
      <h2 className="text-2xl font-bold font-serif text-slate-900 mb-6">Жеке ақпарат</h2>
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-slate-100 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-slate-700 font-medium mb-2 text-sm">
                Аты-жөні
              </label>
              <input
                id="fullName"
                type="text"
                defaultValue="Пациент"
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-slate-700 font-medium mb-2 text-sm">
                Телефон нөмірі
              </label>
              <input
                id="phone"
                type="tel"
                defaultValue="+7 (___) ___-__-__"
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
            </div>
            <div>
              <label htmlFor="iin" className="block text-slate-700 font-medium mb-2 text-sm">
                ИИН
              </label>
              <input
                id="iin"
                type="text"
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
            </div>
            <div>
              <label htmlFor="birthDate" className="block text-slate-700 font-medium mb-2 text-sm">
                Туған күні
              </label>
              <input
                id="birthDate"
                type="date"
                className="w-full p-4 rounded-xl border-2 border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 outline-none text-slate-800 transition-all"
              />
            </div>
          </div>
          <div className="pt-6 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
            >
              Сақтау
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
