import { useState, useRef, useEffect } from 'react';
import { Activity, Shield, ChevronDown, UploadCloud, File as FileIcon } from 'lucide-react';
import type { MedicalRecord } from '@/types/models';
import { MedicalRecordSkeleton } from '@/components/ui/Skeleton';
import toast from 'react-hot-toast';

interface MedicalHistoryProps {
  loading?: boolean;
}

interface ExtendedMedicalRecord extends MedicalRecord {
  isUploaded?: boolean;
  recommendation?: string;
}

const defaultRecords: ExtendedMedicalRecord[] = [
  {
    title: 'Жалпы қан анализі',
    date: '15 Маусым 2026',
    doctor: 'Ахметова А.С.',
    status: 'Қалыпты',
    recommendation: 'Барлық көрсеткіштер қалыпты. Гемоглобин деңгейі жақсы. Келесі жоспарлы тексеріс 6 айдан кейін ұсынылады. Витамин D қабылдауды жалғастырыңыз.'
  },
  {
    title: 'Жамбас қуысының УДЗ',
    date: '02 Маусым 2026',
    doctor: 'Сүлейменова Ә.Қ.',
    status: 'Ескертулер бар',
    recommendation: 'Шағын өзгерістер байқалады. Қосымша гормоналды анализдер тапсыру қажет. 1 айдан кейін қайта қаралу ұсынылады.'
  },
];

function RecordCard({ record, onUpload }: { record: ExtendedMedicalRecord; onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const isNormal = record.status === 'Қалыпты';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-200 overflow-hidden transition-all duration-500 ease-in-out hover:border-sky-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] mb-4">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
      >
        <div className="flex gap-5 items-center">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ease-in-out group-hover:scale-110 border ${
            record.isUploaded 
              ? 'bg-purple-500/10 text-purple-400 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]' 
              : 'bg-emerald-500/10 text-emerald-400 border-slate-300 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
          }`}>
            {record.isUploaded ? <FileIcon size={24} /> : <Activity size={24} />}
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-emerald-300 transition-colors duration-500 ease-in-out">{record.title}</h3>
            <p className="text-slate-600 text-sm">
              {record.date} {record.doctor ? `• Дәрігер: ${record.doctor}` : ''}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span
            className={`text-sm font-bold px-4 py-1.5 rounded-full border transition-all duration-500 ease-in-out ${
              isNormal
                ? 'bg-emerald-500/10 text-emerald-400 border-slate-300'
                : record.isUploaded
                ? 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
            }`}
          >
            {record.status}
          </span>
          <button 
            className={`text-slate-500 transition-all duration-500 ease-in-out transform ${isOpen ? 'rotate-180 text-emerald-400' : 'group-hover:text-emerald-300'}`}
          >
            <ChevronDown size={24} />
          </button>
        </div>
      </div>

      {/* Accordion Content */}
      <div 
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[500px] opacity-100 border-t border-slate-200' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 sm:px-8 bg-slate-50/50">
          <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-3 text-lg">
            <Shield size={20} className="drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            Дәрігердің қорытындысы
          </h4>
          <p className="text-slate-700 font-light leading-relaxed mb-8 text-[15px]">
            {record.recommendation || 'Медициналық құжат жүктелді. Толық ақпаратты файлдан көре аласыз.'}
          </p>
          
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={onUpload}
            className="hidden" 
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          />
          <div className="flex justify-end">
            <button 
              onClick={handleUploadClick}
              className="flex items-center gap-3 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-slate-300 px-6 py-3.5 rounded-2xl font-medium transition-all duration-500 ease-in-out text-sm shadow-[0_0_15px_rgba(16,185,129,0.1)] hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] hover:-translate-y-0.5"
            >
              <UploadCloud size={20} />
              Көшірмені жүктеу
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MedicalHistory({ loading = false }: MedicalHistoryProps) {
  const [records, setRecords] = useState<ExtendedMedicalRecord[]>(defaultRecords);

  useEffect(() => {
    const saved = localStorage.getItem('medeu_uploaded_documents');
    if (saved) {
      try {
        const uploaded = JSON.parse(saved);
        setRecords([...uploaded, ...defaultRecords]);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const toastId = toast.loading('Файл жүктелуде...');
    
    setTimeout(() => {
      const newRecord: ExtendedMedicalRecord = {
        title: file.name,
        date: new Date().toLocaleDateString('kk-KZ', { day: '2-digit', month: 'long', year: 'numeric' }),
        status: 'Жүктелді',
        isUploaded: true,
        recommendation: 'Файл жүйеге сәтті енгізілді. Дәрігер тексергеннен кейін қорытынды осында пайда болады.'
      };

      const existingSaved = localStorage.getItem('medeu_uploaded_documents');
      const uploadedDocs = existingSaved ? JSON.parse(existingSaved) : [];
      uploadedDocs.unshift(newRecord);
      
      localStorage.setItem('medeu_uploaded_documents', JSON.stringify(uploadedDocs));
      setRecords([newRecord, ...records]);
      
      toast.success('Файл сәтті жүктелді!', { id: toastId });
    }, 1500);
  };

  return (
    <div className="animate-fade-in-up w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-serif text-slate-900 tracking-wide">
          Медициналық <span className="text-emerald-400 drop-shadow-[0_0_10px_rgba(52,211,153,0.3)]">карта</span>
        </h2>
      </div>

      <div className="space-y-2">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-4">
                <MedicalRecordSkeleton />
              </div>
            ))
          : records.map((record, i) => (
              <RecordCard 
                key={i} 
                record={record} 
                onUpload={handleFileUpload} 
              />
            ))}
      </div>
    </div>
  );
}
