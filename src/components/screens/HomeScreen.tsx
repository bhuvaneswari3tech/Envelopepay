import React, { useState } from 'react';
import {
  ArrowRight,
  QrCode,
  Send,
  Plus,
  History,
  Coins,
  Sparkles,
  ChevronRight,
  Copy,
  Check,
  Percent,
  TrendingUp,
  ShieldCheck,
} from 'lucide-react';
import { UserProfile, Transaction, ServiceItem, SubScreenType, TabType } from '../../types';
import { billPayServices, additionalServices } from '../../data/mockData';
import { IconRenderer } from '../common/IconRenderer';

interface HomeScreenProps {
  user: UserProfile;
  recentTransactions: Transaction[];
  onNavigateTab: (tab: TabType) => void;
  onOpenSubScreen: (sub: SubScreenType, data?: any) => void;
  onSelectService: (service: ServiceItem) => void;
  onSelectTransaction: (tx: Transaction) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  recentTransactions,
  onNavigateTab,
  onOpenSubScreen,
  onSelectService,
  onSelectTransaction,
}) => {
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(user.upiId);
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const displayedServices = showAllServices
    ? [...billPayServices, ...additionalServices]
    : billPayServices;

  // Approximate live gold price: ₹8,250 per gram = ₹8.25 per mg
  const goldValueInInr = (user.goldBalanceMg * 8.25).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* User Greeting & UPI ID chip */}
      <div className="flex items-center justify-between bg-slate-50 border border-slate-200/80 rounded-2xl px-3.5 py-2.5 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-indigo-900 text-white font-bold flex items-center justify-center text-sm ring-2 ring-indigo-200/60 shadow-xs">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Welcome back,</div>
            <div className="text-sm font-bold text-slate-900 leading-tight">
              {user.name}
            </div>
          </div>
        </div>

        <button
          onClick={handleCopyUpi}
          className="flex items-center gap-1.5 bg-white border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 transition-all active:scale-95"
          title="Click to copy UPI ID"
        >
          <span className="font-mono text-[11px] text-slate-600">{user.upiId}</span>
          {copiedUpi ? (
            <Check className="w-3.5 h-3.5 text-emerald-600" />
          ) : (
            <Copy className="w-3.5 h-3.5 text-slate-400" />
          )}
        </button>
      </div>

      {/* GOLD REWARDS CARD */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-amber-600/15 border border-amber-300/60 p-4 shadow-sm">
        {/* Subtle gold coin watermark illustration */}
        <div className="absolute -right-3 -bottom-3 w-28 h-28 opacity-20 pointer-events-none text-amber-600">
          <Coins className="w-full h-full" />
        </div>

        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Gold Rewards
              </span>
              <p className="text-[11px] text-amber-800/80 font-medium">
                Earn rewards on every bill payment
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-200/60 border border-amber-300 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 text-amber-700" />
            24K 99.9%
          </span>
        </div>

        <div className="mt-3.5 flex items-baseline justify-between">
          <div>
            <div className="text-[11px] font-medium text-amber-900/70">
              Your Gold Balance
            </div>
            <div className="text-2xl font-black tracking-tight text-amber-950 flex items-baseline gap-1.5">
              <span>{user.goldBalanceMg.toFixed(2)}</span>
              <span className="text-sm font-bold text-amber-800">mg</span>
              <span className="text-xs font-semibold text-amber-700/90 ml-1">
                (≈ ₹{goldValueInInr})
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab('rewards')}
            className="inline-flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>View Rewards</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            Quick Actions
          </h2>
          <span className="text-[11px] font-medium text-slate-500">
            Instant Transfer & Utility
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2.5">
          {/* Scan & Pay */}
          <button
            onClick={() => onOpenSubScreen('scan')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all shadow-xs group"
          >
            <div className="w-11 h-11 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-1.5 shadow-2xs">
              <QrCode className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
              Scan & Pay
            </span>
          </button>

          {/* Send Money */}
          <button
            onClick={() => onOpenSubScreen('send_money')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all shadow-xs group"
          >
            <div className="w-11 h-11 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors mb-1.5 shadow-2xs">
              <Send className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
              Send Money
            </span>
          </button>

          {/* Add Money */}
          <button
            onClick={() => onOpenSubScreen('add_money')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all shadow-xs group"
          >
            <div className="w-11 h-11 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-1.5 shadow-2xs">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
              Add Money
            </span>
          </button>

          {/* Transaction History */}
          <button
            onClick={() => onNavigateTab('history')}
            className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-white border border-slate-200/90 hover:border-indigo-400 hover:bg-indigo-50/20 active:scale-95 transition-all shadow-xs group"
          >
            <div className="w-11 h-11 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-800 group-hover:text-white transition-colors mb-1.5 shadow-2xs">
              <History className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-semibold text-slate-800 text-center leading-tight">
              History
            </span>
          </button>
        </div>
      </section>

      {/* OFFERS FOR YOU (Subtle Green Promotional Card) */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/40 border border-emerald-200/80 p-3.5 shadow-xs flex items-center justify-between">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <Percent className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                Offers for You
              </span>
              <span className="text-[9px] bg-emerald-200/80 text-emerald-900 font-bold px-1.5 py-0.2 rounded">
                NEW
              </span>
            </div>
            <p className="text-xs font-bold text-slate-900 mt-0.5">
              Flat ₹50 Cashback
            </p>
            <p className="text-[11px] text-slate-600">
              On your first mobile recharge or electricity bill
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            const mobileService = billPayServices.find((s) => s.id === 'mobile') || billPayServices[0];
            onSelectService(mobileService);
          }}
          className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-3 py-2 rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
        >
          Claim Now →
        </button>
      </div>

      {/* PAY & RECHARGE (2-COLUMN GRID) */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Pay & Recharge
            </h2>
            <p className="text-[11px] text-slate-500">
              Instant Bharat BillPay (BBPS) integration
            </p>
          </div>

          <button
            onClick={() => setShowAllServices(!showAllServices)}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 cursor-pointer"
          >
            <span>{showAllServices ? 'Show Less' : 'View All'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {displayedServices.map((service) => (
            <button
              key={service.id}
              onClick={() => onSelectService(service)}
              className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-sm transition-all text-left group active:scale-[0.98]"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${service.color}`}
                >
                  <IconRenderer name={service.icon} className="w-4 h-4" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate group-hover:text-indigo-700 transition-colors">
                    {service.name}
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Pay instantly
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
            </button>
          ))}
        </div>
      </section>

      {/* RECENT PAYMENTS */}
      <section>
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Recent Payments
            </h2>
            <p className="text-[11px] text-slate-500">Fast one-tap repeat</p>
          </div>

          <button
            onClick={() => onNavigateTab('history')}
            className="text-xs font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-0.5 cursor-pointer"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {recentTransactions.slice(0, 3).map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelectTransaction(tx)}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 text-slate-700 flex items-center justify-center shrink-0">
                  <IconRenderer name={tx.serviceIconName} className="w-4 h-4 text-indigo-700" />
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-slate-900 truncate">
                    {tx.name}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <span>{tx.category}</span>
                    <span>·</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-2">
                <div className="text-xs font-bold text-slate-900">
                  ₹{tx.amount.toLocaleString('en-IN')}
                </div>
                <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-md">
                  Success
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Security & NPCI Assurance Footer Banner */}
      <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 py-1">
        <ShieldCheck className="w-4 h-4 text-emerald-600" />
        <span>256-bit Encrypted · NPCI & BBPS Authorized Partner</span>
      </div>
    </div>
  );
};
