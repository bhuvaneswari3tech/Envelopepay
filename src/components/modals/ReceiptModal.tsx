import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';
import { Transaction } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface ReceiptModalProps {
  transaction: Transaction;
  onClose: () => void;
  onRepeatPayment?: (transaction: Transaction) => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  transaction,
  onClose,
  onRepeatPayment,
}) => {
  const [downloadNotice, setDownloadNotice] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);

  const handleDownload = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `EnvelopePay Receipt: ${transaction.name}`,
        text: `Transaction ${transaction.id} for ₹${transaction.amount} was successful.`,
      }).catch(() => {});
    } else {
      setShareNotice(true);
      setTimeout(() => setShareNotice(false), 2000);
    }
  };

  const isSuccess = transaction.status === 'Success';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Receipt Header */}
        <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <BrandLogo size="sm" />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Receipt Paper Card Body */}
        <div className="p-4 overflow-y-auto no-scrollbar space-y-4">
          {/* Status & Amount */}
          <div className="text-center py-2 border-b border-dashed border-slate-200">
            <div
              className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-2 ${
                isSuccess
                  ? 'bg-emerald-100 text-emerald-600'
                  : transaction.status === 'Pending'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-rose-100 text-rose-600'
              }`}
            >
              {isSuccess ? (
                <CheckCircle2 className="w-7 h-7 stroke-[2.5]" />
              ) : transaction.status === 'Pending' ? (
                <Clock className="w-7 h-7" />
              ) : (
                <AlertCircle className="w-7 h-7" />
              )}
            </div>

            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Payment {transaction.status}
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight mt-0.5">
              ₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-xs font-semibold text-slate-700 mt-0.5">
              {transaction.name}
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-2 text-xs divide-y divide-slate-100">
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Biller / Operator:</span>
              <span className="font-bold text-slate-900 text-right">
                {transaction.provider}
              </span>
            </div>

            {transaction.consumerNumber && (
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Consumer / ID:</span>
                <span className="font-mono font-bold text-slate-900">
                  {transaction.consumerNumber}
                </span>
              </div>
            )}

            <div className="flex justify-between py-1">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-semibold text-slate-800">
                {transaction.date} · {transaction.time}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500">Transaction ID:</span>
              <span className="font-mono font-bold text-slate-900">
                {transaction.id}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500">Payment Mode:</span>
              <span className="font-semibold text-slate-800">
                {transaction.paymentMethod}
              </span>
            </div>

            <div className="flex justify-between py-1">
              <span className="text-slate-500">NPCI / BBPS Ref:</span>
              <span className="font-mono text-slate-600 text-[11px]">
                {transaction.referenceId}
              </span>
            </div>

            {transaction.goldEarnedMg && (
              <div className="flex justify-between py-1 text-amber-700 font-bold bg-amber-50/70 px-2 rounded-lg">
                <span>Gold Cashback Credited:</span>
                <span>+{transaction.goldEarnedMg} mg (24K)</span>
              </div>
            )}
          </div>

          {/* Verification Badge */}
          <div className="bg-slate-50 rounded-xl p-2.5 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Bharat BillPay (BBPS) Certified Electronic Invoice</span>
          </div>

          {downloadNotice && (
            <div className="p-2 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Receipt PDF Saved
            </div>
          )}
          {shareNotice && (
            <div className="p-2 bg-indigo-100 text-indigo-800 text-xs font-bold rounded-xl text-center flex items-center justify-center gap-1">
              <Check className="w-3.5 h-3.5" />
              Receipt Link Copied
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleDownload}
              className="py-2 px-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
            <button
              onClick={handleShare}
              className="py-2 px-3 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 hover:bg-slate-50 flex items-center justify-center gap-1.5 transition-all"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
          </div>

          {onRepeatPayment && (
            <button
              onClick={() => {
                onClose();
                onRepeatPayment(transaction);
              }}
              className="w-full py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Repeat This Payment</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
