import React from 'react';
import { Home, History, Coins, User } from 'lucide-react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  goldMg?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  goldMg,
}) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'history' as TabType, label: 'History', icon: History },
    {
      id: 'rewards' as TabType,
      label: 'Rewards/Gold',
      icon: Coins,
      badge: goldMg ? `${goldMg.toFixed(0)}mg` : undefined,
    },
    { id: 'profile' as TabType, label: 'Profile', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-slate-200/80 px-2 py-1.5 shadow-[0_-4px_20px_rgba(0,0,0,0.04)]">
      <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1.5 px-3 min-w-[72px] rounded-xl transition-all duration-200 focus:outline-none ${
                isActive
                  ? 'text-indigo-900 font-semibold'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <div className="relative">
                <div
                  className={`p-1 rounded-lg transition-transform duration-200 ${
                    isActive ? 'scale-110 text-indigo-700 bg-indigo-50' : ''
                  }`}
                >
                  <Icon className="w-5 h-5 stroke-[2.2]" />
                </div>
                {tab.badge && !isActive && (
                  <span className="absolute -top-1 -right-3 bg-amber-100 text-amber-800 border border-amber-300 text-[9px] font-bold px-1 rounded-full leading-none py-0.5">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span
                className={`text-[11px] mt-0.5 transition-colors ${
                  isActive ? 'font-bold text-indigo-900' : 'font-medium'
                }`}
              >
                {tab.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 w-8 h-1 bg-indigo-700 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
