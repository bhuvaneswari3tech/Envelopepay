import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Share2,
  ArrowLeft,
  Sparkles,
  Coins,
  Check,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Transaction } from '../../types';

interface PaymentSuccessModalProps {
  transaction: Transaction;
  onBackToHome: () => void;
  onViewReceipt: () => void;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  transaction,
  onBackToHome,
  onViewReceipt,
}) => {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [sharedSuccess, setSharedSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Payment Receipt: ${transaction.name}`,
        text: `Paid ₹${transaction.amount} successfully via EnvelopePay. Txn ID: ${transaction.id}`,
      }).catch(() => {});
    } else {
      setSharedSuccess(true);
      setTimeout(() => setSharedSuccess(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[95vh] relative">
        {/* Celebratory Emerald Top Accent */}
        <div className="bg-gradient-to-b from-emerald-600 to-teal-700 p-6 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-24 h-24 rounded-full bg-white/10 blur-xl pointer-events-none" />

          {/* Animated Green Checkmark */}
          <div className="w-16 h-16 rounded-full bg-white text-emerald-600 mx-auto flex items-center justify-center shadow-lg ring-8 ring-emerald-500/40 mb-3 animate-bounce">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>

          <h2 className="text-xl font-extrabold tracking-tight text-white">
            Payment Successful!
          </h2>
          <p className="text-xs text-emerald-100 mt-0.5">
            Biller confirmation generated instantly
          </p>

          <div className="mt-3 text-3xl font-black text-white tracking-tight">
            ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3.5 overflow-y-auto no-scrollbar">
          {/* Gold Reward Celebration Banner */}
          {transaction.goldEarnedMg && (
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/15 via-amber-200/40 to-amber-600/20 border border-amber-300 p-3 flex items-center justify-between shadow-2xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-xs">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-black text-amber-900 tracking-wider">
                    🎉 Gold Reward Earned!
                  </div>
                  <div className="text-xs font-bold text-amber-950">
                    +{transaction.goldEarnedMg} mg 24K Digital Gold
                  </div>
                </div>
              </div>
              <span className="text-[10px] font-bold text-amber-900 bg-white/80 border border-amber-300 px-2 py-0.5 rounded-full">
                Vault Credited
              </span>
            </div>
          )}

          {/* Transaction Metadata Grid */}
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between items-center text-slate-600">
              <span>Service / Merchant:</span>
              <span className="font-bold text-slate-900 truncate max-w-[200px]">
                {transaction.name}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>Date & Time:</span>
              <span className="font-bold text-slate-900">
                {transaction.date} · {transaction.time}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>Payment Mode:</span>
              <span className="font-bold text-slate-900">
                {transaction.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>Transaction ID:</span>
              <span className="font-mono font-bold text-slate-900">
                {transaction.id}
              </span>
            </div>

            <div className="flex justify-between items-center text-slate-600">
              <span>NPCI / BBPS Ref:</span>
              <span className="font-mono text-slate-500 text-[11px]">
                {transaction.referenceId}
              </span>
            </div>
          </div>

          {/* Feedback toasts */}
          {downloadSuccess && (
            <div className="p-2 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Receipt downloaded successfully (PDF)!</span>
            </div>
          )}
          {sharedSuccess && (
            <div className="p-2 bg-indigo-100 border border-indigo-300 text-indigo-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1.5 animate-in fade-in">
              <Check className="w-3.5 h-3.5" />
              <span>Receipt link copied to clipboard!</span>
            </div>
          )}

          {/* 2 Action Buttons: Download Receipt & Share Receipt */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Download Receipt</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2.5 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 text-slate-600" />
              <span>Share Receipt</span>
            </button>
          </div>

          {/* Back to Home Primary CTA */}
          <button
            onClick={onBackToHome}
            className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-md transition-all active:scale-98 cursor-pointer text-center"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
