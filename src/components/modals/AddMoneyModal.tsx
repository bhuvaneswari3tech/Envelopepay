import React, { useState } from 'react';
import { X, Plus, Wallet, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserProfile } from '../../types';

interface AddMoneyModalProps {
  user: UserProfile;
  onClose: () => void;
  onAddSuccess: (addedAmount: number) => void;
}

export const AddMoneyModal: React.FC<AddMoneyModalProps> = ({
  user,
  onClose,
  onAddSuccess,
}) => {
  const [topupAmount, setTopupAmount] = useState('1000');
  const [isProcessing, setIsProcessing] = useState(false);

  const presets = ['500', '1000', '2000', '5000'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(topupAmount);
    if (isNaN(val) || val <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onAddSuccess(val);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Plus className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-900">
                Add Money to Wallet
              </h2>
              <p className="text-[10px] text-slate-500">
                Instant wallet loading via NetBanking/UPI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3.5">
          {/* Current balance */}
          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-200/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-5 h-5 text-blue-700" />
              <div>
                <div className="text-[10px] text-blue-900/70 font-semibold">
                  Current Wallet Balance
                </div>
                <div className="text-sm font-bold text-blue-950">
                  ₹{user.walletBalance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>
            <span className="text-[10px] bg-blue-200/70 text-blue-900 font-bold px-2 py-0.5 rounded-full">
              Zero Fees
            </span>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Enter Amount to Add (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-base">
                ₹
              </span>
              <input
                type="number"
                value={topupAmount}
                onChange={(e) => setTopupAmount(e.target.value)}
                min="10"
                required
                className="w-full text-lg font-black text-slate-900 border border-slate-200 rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
              />
            </div>

            <div className="flex gap-1.5 mt-2">
              {presets.map((preset) => (
                <button
                  type="button"
                  key={preset}
                  onClick={() => setTopupAmount(preset)}
                  className="flex-1 py-1 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 active:scale-95"
                >
                  +₹{preset}
                </button>
              ))}
            </div>
          </div>

          {/* Payment method source */}
          <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold text-slate-700">Autodebit from:</span>
            </div>
            <span className="font-bold text-slate-900">
              {user.linkedBank.bankName} (•••• 4021)
            </span>
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-1.5 transition-all disabled:opacity-75"
          >
            {isProcessing ? (
              <span>Connecting to HDFC Bank...</span>
            ) : (
              <>
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Add ₹{topupAmount || 0} to Wallet</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
