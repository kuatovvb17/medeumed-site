import { Calendar, FileText, User } from 'lucide-react';
import type { CabinetTab } from '@/types/models';
import type { ReactNode } from 'react';

interface TabDefinition {
  id: CabinetTab;
  label: string;
  icon: ReactNode;
}

interface CabinetTabsProps {
  activeTab: CabinetTab;
  onTabChange: (tab: CabinetTab) => void;
}

const tabs: TabDefinition[] = [
  { id: 'appointments', label: 'Менің жазылуларым', icon: <Calendar size={18} /> },
  { id: 'medical-records', label: 'Медициналық карта', icon: <FileText size={18} /> },
  { id: 'profile', label: 'Профиль', icon: <User size={18} /> },
];

export function CabinetTabs({ activeTab, onTabChange }: CabinetTabsProps) {
  return (
    <div className="flex overflow-x-auto hide-scrollbar gap-2 mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-2 px-6 py-3.5 rounded-full font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? 'bg-white text-slate-900 shadow-lg shadow-slate-900/20'
              : 'bg-transparent text-slate-500 hover:bg-slate-100'
          }`}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}
