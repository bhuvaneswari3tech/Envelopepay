import React, { useState } from 'react';
import {
  ArrowLeft,
  CheckCheck,
  CreditCard,
  Coins,
  Tag,
  ShieldCheck,
  Bell,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { NotificationItem, SubScreenType } from '../../types';

interface NotificationScreenProps {
  notifications: NotificationItem[];
  onBack: () => void;
  onMarkAllRead: () => void;
  onNotificationClick: (notif: NotificationItem) => void;
}

export const NotificationScreen: React.FC<NotificationScreenProps> = ({
  notifications,
  onBack,
  onMarkAllRead,
  onNotificationClick,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const categories = ['All', 'Payments', 'Rewards', 'Offers', 'Security'];

  const filtered = notifications.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.category === selectedFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Payments':
        return <CreditCard className="w-4 h-4 text-indigo-700" />;
      case 'Rewards':
        return <Coins className="w-4 h-4 text-amber-600" />;
      case 'Offers':
        return <Tag className="w-4 h-4 text-emerald-600" />;
      case 'Security':
        return <ShieldCheck className="w-4 h-4 text-blue-600" />;
      default:
        return <Bell className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              Notifications
            </h1>
            <p className="text-[11px] text-slate-500">
              Alerts, cashback updates and receipts
            </p>
          </div>
        </div>

        <button
          onClick={onMarkAllRead}
          className="text-xs font-semibold text-indigo-700 hover:text-indigo-900 flex items-center gap-1 cursor-pointer"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          <span>Mark all read</span>
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-4 px-4">
        {categories.map((cat) => {
          const isActive = selectedFilter === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Notification Cards List */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onNotificationClick(item)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer shadow-xs ${
              item.read
                ? 'bg-white border-slate-200 opacity-90'
                : 'bg-indigo-50/30 border-indigo-200 ring-1 ring-indigo-100'
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                  item.category === 'Rewards'
                    ? 'bg-amber-50 border-amber-200'
                    : item.category === 'Offers'
                    ? 'bg-emerald-50 border-emerald-200'
                    : item.category === 'Security'
                    ? 'bg-blue-50 border-blue-200'
                    : 'bg-indigo-50 border-indigo-200'
                }`}
              >
                {getCategoryIcon(item.category)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {item.title}
                    </span>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {item.actionText && (
                  <div className="mt-2.5 flex items-center gap-1 text-[11px] font-bold text-indigo-700 hover:text-indigo-900">
                    <span>{item.actionText}</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <div className="text-xs font-bold text-slate-800">
              No notifications here
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              You are all caught up with your updates!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
