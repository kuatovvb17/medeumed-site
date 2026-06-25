import { useState, useEffect } from 'react';
import { ProfileFieldSkeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';

interface ProfileSettingsProps {
  loading?: boolean;
}

export function ProfileSettings({ loading = false }: ProfileSettingsProps) {
  const [profile, setProfile] = useState({
    fullName: '',
    phone: '',
    iin: '',
    birthDate: '',
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('medeu_patient_profile');
    if (saved) {
      try {
        setProfile(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({
      ...profile,
      [e.target.id]: e.target.value,
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Strict Validation
    const phoneDigits = profile.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      toast.error('Телефон нөмірі 11 саннан тұруы керек');
      return;
    }

    const iinDigits = profile.iin.replace(/\D/g, '');
    if (iinDigits.length !== 12) {
      toast.error('ЖСН (ИИН) дәл 12 саннан тұруы керек');
      return;
    }

    localStorage.setItem('medeu_patient_profile', JSON.stringify(profile));
    localStorage.setItem('medeu_patient_phone', profile.phone);
    toast.success('Мәліметтер сәтті сақталды');
  };

  if (loading || !isLoaded) {
    return (
      <div className="animate-fade-in-up max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 tracking-wide mb-8">
          Жеке <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">ақпарат</span>
        </h2>
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-slate-200 shadow-lg shadow-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 tracking-wide mb-8">
        Жеке <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">ақпарат</span>
      </h2>
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 md:p-10 border border-slate-200 shadow-lg shadow-slate-100 relative overflow-hidden">
        {/* Neon glow effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <form onSubmit={handleSave} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-emerald-400 font-medium text-sm tracking-wide">
                Аты-жөні
              </label>
              <input
                id="fullName"
                type="text"
                value={profile.fullName}
                onChange={handleChange}
                placeholder="Мысалы: Ахметов Асқар"
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900 placeholder-slate-400 transition-all duration-500 ease-in-out shadow-inner hover:border-emerald-500/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-emerald-400 font-medium text-sm tracking-wide">
                Телефон нөмірі (11 сан)
              </label>
              <input
                id="phone"
                type="tel"
                value={profile.phone}
                onChange={handleChange}
                placeholder="87001234567"
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900 placeholder-slate-400 transition-all duration-500 ease-in-out shadow-inner hover:border-emerald-500/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="iin" className="block text-emerald-400 font-medium text-sm tracking-wide">
                ЖСН (12 сан)
              </label>
              <input
                id="iin"
                type="text"
                value={profile.iin}
                onChange={handleChange}
                maxLength={12}
                placeholder="000000000000"
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900 placeholder-slate-400 transition-all duration-500 ease-in-out shadow-inner hover:border-emerald-500/50"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="block text-emerald-400 font-medium text-sm tracking-wide">
                Туған күні
              </label>
              <input
                id="birthDate"
                type="date"
                value={profile.birthDate}
                onChange={handleChange}
                className="w-full p-4 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none text-slate-900 placeholder-slate-400 transition-all duration-500 ease-in-out shadow-inner hover:border-emerald-500/50 [color-scheme:light]"
              />
            </div>
          </div>
          <div className="pt-8 border-t border-slate-200 flex justify-end">
            <button
              type="submit"
              className="bg-emerald-500 text-slate-950 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-emerald-400 transition-all duration-500 ease-in-out shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:-translate-y-1"
            >
              Сақтау
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
