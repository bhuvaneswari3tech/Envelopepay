import React from 'react';
import { Bell, HelpCircle } from 'lucide-react';
import { BrandLogo } from './common/BrandLogo';
import { SubScreenType } from '../types';

interface HeaderProps {
  onOpenNotifications: () => void;
  onOpenHelp: () => void;
  unreadCount?: number;
  currentSubScreen?: SubScreenType;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNotifications,
  onOpenHelp,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 flex items-center justify-between shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
      <div className="flex items-center gap-2">
        <BrandLogo size="md" showTagline={true} />
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpenHelp}
          className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Help and Support"
          title="Help & Support"
        >
          <HelpCircle className="w-5 h-5" />
        </button>

        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-slate-600 hover:text-indigo-600 hover:bg-slate-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
              {unreadCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
