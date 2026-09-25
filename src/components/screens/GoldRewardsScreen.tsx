import React, { useState } from 'react';
import {
  Coins,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Gift,
  ArrowDownLeft,
  ArrowUpRight,
  Info,
} from 'lucide-react';
import { UserProfile, GoldRewardTransaction } from '../../types';

interface GoldRewardsScreenProps {
  user: UserProfile;
  goldHistory: GoldRewardTransaction[];
  onOpenScratchReward?: () => void;
  onOpenPayment?: () => void;
}

export const GoldRewardsScreen: React.FC<GoldRewardsScreenProps> = ({
  user,
  goldHistory,
  onOpenPayment,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'history'>('overview');
  const [showClaimSuccess, setShowClaimSuccess] = useState(false);

  // 1 mg = ₹8.25 at ₹8,250 / gram 24K pure digital gold rate
  const livePricePerGram = 8250;
  const currentTotalValuation = (user.goldBalanceMg * 8.25).toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });

  const handleClaimBonus = () => {
    setShowClaimSuccess(true);
    setTimeout(() => {
      setShowClaimSuccess(false);
    }, 3000);
  };

  return (
    <div className="space-y-4 pb-24 px-4 pt-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Gold Rewards Vault
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            24 Karat 99.9% Pure Insured Digital Gold
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 border border-amber-300 px-2.5 py-1 rounded-full">
          <TrendingUp className="w-3.5 h-3.5 text-amber-700" />
          ₹{livePricePerGram}/g Live
        </span>
      </div>

      {/* Main Gold Balance Hero Card */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/15 via-amber-200/35 to-amber-600/25 border border-amber-300/80 p-5 shadow-sm">
        {/* Floating Coin Pattern */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-15 text-amber-700 pointer-events-none">
          <Coins className="w-full h-full" />
        </div>

        <div className="flex items-center justify-between text-xs font-bold text-amber-950">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Sparkles className="w-4 h-4 text-amber-600" />
            Total Gold Balance
          </span>
          <span className="bg-white/80 border border-amber-300 text-amber-900 text-[10px] px-2 py-0.5 rounded-full font-bold">
            Secured by MMTC-PAMP
          </span>
        </div>

        <div className="mt-3">
          <div className="text-3xl font-black text-amber-950 tracking-tight flex items-baseline gap-2">
            <span>{user.goldBalanceMg.toFixed(2)}</span>
            <span className="text-base font-extrabold text-amber-800">mg Gold</span>
          </div>
          <div className="text-xs font-semibold text-amber-900/80 mt-1 flex items-center gap-1.5">
            <span>Estimated Value: ₹{currentTotalValuation}</span>
            <span>·</span>
            <span className="text-emerald-700 font-bold">+1.8% this week</span>
          </div>
        </div>

        {/* 2-Column Stats Pill Breakdown */}
        <div className="mt-4 pt-3.5 border-t border-amber-300/40 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white/70 rounded-xl p-2.5 border border-amber-200/60">
            <div className="text-[10px] text-amber-900/70 font-semibold">
              Earned This Month
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              42.50 mg
            </div>
          </div>
          <div className="bg-white/70 rounded-xl p-2.5 border border-amber-200/60">
            <div className="text-[10px] text-amber-900/70 font-semibold">
              From Bill Payments
            </div>
            <div className="text-sm font-bold text-slate-900 mt-0.5">
              83.10 mg
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            onClick={onOpenPayment}
            className="flex items-center justify-center gap-1.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <span>Pay Bills & Earn</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleClaimBonus}
            className="flex items-center justify-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Daily Gold Spin</span>
          </button>
        </div>

        {showClaimSuccess && (
          <div className="mt-2.5 p-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>🎉 +1.50 mg Gold unlocked & added to your balance!</span>
          </div>
        )}
      </div>

      {/* Segmented View: How It Works vs Gold History */}
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'overview'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          How It Works
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Gold History ({goldHistory.length})
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-4">
          {/* How Gold Rewards Work Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-900 flex items-center gap-2 mb-3">
              <Award className="w-4 h-4 text-indigo-700" />
              How Gold Rewards Work
            </h3>

            <div className="space-y-3.5">
              {/* Step 1 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Pay your bills
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Recharge mobile, settle electricity, DTH, or credit card bills via EnvelopePay.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Earn 24K Pure Gold
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Receive guaranteed digital gold credited instantly into your secure insured vault.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Track your rewards & Redeem
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Hold as an inflation hedge, redeem for bank cash, or request minted gold coin delivery.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust & Guarantee Banner */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-3.5 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-600 shrink-0" />
            <div className="text-[11px] text-slate-600">
              <span className="font-bold text-slate-900">100% Insured Custody:</span>{' '}
              Stored in Brink's Grade-V high security vaults with independent trusteeship.
            </div>
          </div>
        </div>
      ) : (
        /* Gold Transaction History */
        <div className="bg-white rounded-2xl border border-slate-200 divide-y divide-slate-100 shadow-xs overflow-hidden">
          {goldHistory.map((item) => (
            <div
              key={item.id}
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                    <span>{item.source}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-xs font-extrabold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-full inline-flex items-center gap-0.5">
                  +{item.amountMg.toFixed(2)} mg
                </span>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  ≈ ₹{(item.amountMg * 8.25).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
